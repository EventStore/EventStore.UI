define(['./_module'], function (app) {

	'use strict';

	return app.provider('SubscriptionsMapper', function () {
		function createEmptyGroup (groupName) {
			return {
                streamName: groupName,
                averageItemsPerSecond: 0,
                totalItemsProcessed: 0,
                connectionCount: 0,
                readyItems: 0,
                unackedItems: 0,
                status: 'Idle',
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

		function map (data, source) {
			var groups = data,
				prop,
				current,
				result = {},
				group,
				exists;

	        for(prop in groups) {
	            current = groups[prop];
	            var previous = findGroup(source[current.eventStreamId] ? source[current.eventStreamId].groups : [], current.groupName);
	            current.averageItemsPerSecond = previous ? current.totalItemsProcessed - previous.totalItemsProcessed : 0;
	            current.readyItems = current.lastKnownEventNumber - (current.totalItemsProcessed - 1);
	            current.unackedItems = current.lastKnownEventNumber - current.lastProcessedEventNumber;
	            if(current.eventStreamId) {
	                if(!result[current.eventStreamId]) {
	                    group = createEmptyGroup(current.eventStreamId);
	                } else {
	                    group = result[current.eventStreamId];
	                }

	                exists = source[current.eventStreamId];

	                group.show = exists ? exists.show : false;
	                group.groups.push(current);

	                group.readyItems += current.readyItems;
                    group.unackedItems += current.unackedItems;
                    group.averageItemsPerSecond += current.averageItemsPerSecond;
                    group.totalItemsProcessed += current.totalItemsProcessed;
                    group.connectionCount += current.connectionCount;
                    
	                result[current.eventStreamId] = group;
	            } else {
	                result[current.eventStreamId] = current;
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