define(['./_module'], function (app) {

	'use strict';

	return app.provider('SubscriptionsMapper', function () {
		function createEmptyGroup (groupName) {
			return {
                streamName: groupName,
                averageItemsPerSecond: 0,
                totalItemsProcessed: 0,
                connectionCount: 0,
                knownMessages: 0,
                currentMessages: 0,
                inFlightMessages: 0,
                status: 'Idle',
                behindByMessages: 0.0,
                behindByTime: 0.0,
                groups: []
			};
		}

		function findGroup(group, groupName){
			for(var index in group){
				if(group[index].groupName == groupName){
					return group[index];
				}
			}
		}

		function determineStatus(subscription){
			if(subscription.behindByMessages > 0){
				if(subscription.averageItemsPerSecond > 0){
					return 'behind-catchingup';
				}else{
					return 'behind-notcatchingup';
				}
			}
			return 'idle';
		}

		function determineGroupStatus(group){
			for(var index in group.groups){
				if(group.groups[index].status.indexOf('behind') >= 0){
					return group.groups[index].status;
				}
			}
			return group.groups[0].status;
		}

		function map (data, source) {
			var groups = data,
				prop,
				current,
				result = {},
				group,
				exists;

	        for(prop in groups) {
	            current = groups[prop];
				var key = current.eventStreamId;
				if(key.startsWith("$"))
				{
					key = "_" + key
				}
				
	            var previous = findGroup(source[key] ? source[key].groups : [], current.groupName);
	            current.averageItemsPerSecond = previous ? current.totalItemsProcessed - previous.totalItemsProcessed : 0;
	            current.knownMessages = current.lastKnownEventNumber + 1;
	            current.currentMessages = current.lastProcessedEventNumber + 1;
	            current.inFlightMessages = current.totalInFlightMessages;
	            current.behindByMessages = (current.knownMessages - current.currentMessages);
	            current.behindByTime = current.behindByMessages / current.averageItemsPerSecond;
	            current.behindByTime = isFinite(current.behindByTime) ? current.behindByTime : 0;
	            current.status = determineStatus(current);
	            if(key) {
	                if(!result[key]) {
	                    group = createEmptyGroup(current.eventStreamId);
	                } else {
	                    group = result[key];
	                }

	                exists = source[key];

	                group.show = exists ? exists.show : false;
	                group.groups.push(current);

	                group.knownMessages += current.knownMessages;
                    group.currentMessages += current.currentMessages;
                    group.inFlightMessages += current.totalInFlightMessages;
                    group.averageItemsPerSecond += current.averageItemsPerSecond;
                    group.connectionCount += current.connectionCount;
                    group.behindByMessages += current.behindByMessages;
                    group.behindByTime += current.behindByTime;
                    group.status = determineGroupStatus(group);
                    
	                result[key] = group;
	            } else {
	                result[key] = current;
	            }
	        }
	        return result;
		}

		this.$get = [
			function () {
				return {
					map: map
				};
			}
		];
    });

});
