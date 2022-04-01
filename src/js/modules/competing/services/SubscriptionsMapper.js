define(['./_module'], function (app) {

	'use strict';

	return app.provider('SubscriptionsMapper', function () {
		if (!String.prototype.startsWith) {
		  String.prototype.startsWith = function(searchString, position) {
		    position = position || 0;
		    return this.indexOf(searchString, position) === position;
		  };
		}
		function createEmptyGroup (groupName) {
			return {
                streamName: groupName,
                averageItemsPerSecond: 0,
                totalItemsProcessed: 0,
                connectionCount: 0,
                lastKnownEventPosition: undefined,
                lastCheckpointedEventPosition: undefined,
                inFlightMessages: 0,
                status: 'Idle',
                behindByMessages: 0.0,
                behindByTime: 0.0,
                groups: []
			};
		}

		function findGroup(group, groupName){
			for(var index in group){
				if(group[index].groupName === groupName){
					return group[index];
				}
			}
		}

		function determineGroupStatus(group){
			for(var index in group.groups){
				if(group.groups[index].status.indexOf('behind') >= 0){
					return group.groups[index].status;
				}
			}
			return group.groups[0].status;
		}

		function parsePrepareCommitPos(pos){
			return {
				commit: parseInt(pos.split('/')[0].split('C:')[1]),
				prepare: parseInt(pos.split('/')[1].split('P:')[1])
			};
		}

		function minPosition(pos1, pos2, isPrepareCommitPos){
			if(pos1 === undefined){
				return pos2;
			}

			if(pos2 === undefined){
				return pos1;
			}

			if(pos1 === null){
				return pos1;
			}

			if(pos2 === null){
				return pos2;
			}

			if(isPrepareCommitPos){
				var pcPos1 = parsePrepareCommitPos(pos1);
				var pcPos2 = parsePrepareCommitPos(pos2);

				var chkPos1 = Math.max(pcPos1.commit, pcPos1.prepare);
				var chkPos2 = Math.max(pcPos2.commit, pcPos2.prepare);
				if(chkPos1 <= chkPos2){
					return pos1;
				}
				return pos2;
			} else{
				var pos1Int = parseInt(pos1);
				var pos2Int = parseInt(pos2);
				if(pos1Int <= pos2Int){
					return pos1;
				}
				return pos2;
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
				var key = current.eventStreamId;
				if(key.startsWith('$'))
				{
					key = '_' + key;
				}
				
	            var previous = findGroup(source[key] ? source[key].groups : [], current.groupName);
				if (current.eventStreamId === '$all'){
					current.behindByMessages = (current.lastKnownEventPosition === current.lastCheckpointedEventPosition) ? 0 : undefined;
					current.behindByTime = undefined;
					current.behindStatus = '';
				} else {
					current.behindByMessages = (current.lastKnownEventPosition - current.lastCheckpointedEventPosition);
					current.behindByTime = Math.round((current.behindByMessages / current.averageItemsPerSecond) * 100)/100;
					current.behindByTime = isFinite(current.behindByTime) ? current.behindByTime : 0;
					current.behindStatus = current.behindByMessages + ' / ' + current.behindByTime;
				}
				current.averageItemsPerSecond = previous ? current.totalItemsProcessed - previous.totalItemsProcessed : 0;
				current.inFlightMessages = current.totalInFlightMessages;

	            if(key) {
	                if(!result[key]) {
	                    group = createEmptyGroup(current.eventStreamId);
	                } else {
	                    group = result[key];
	                }

	                exists = source[key];

	                group.show = exists ? exists.show : false;
	                group.groups.push(current);

					group.inFlightMessages += current.totalInFlightMessages;
					group.averageItemsPerSecond += current.averageItemsPerSecond;
					group.connectionCount += current.connectionCount;

					group.lastKnownEventPosition = minPosition(group.lastKnownEventPosition, current.lastKnownEventPosition, current.eventStreamId === '$all');
					group.lastCheckpointedEventPosition = minPosition(group.lastCheckpointedEventPosition, current.lastCheckpointedEventPosition, current.eventStreamId === '$all');

					if (current.eventStreamId === '$all') {
						group.behindByMessages = undefined;
						group.behindByTime = undefined;
						group.behindStatus = '';
					} else {
						group.behindByMessages += current.behindByMessages;
						group.behindByTime += current.behindByTime;
						group.behindByTime = Math.round(current.behindByTime * 100)/100;
						group.behindStatus = group.behindByMessages + ' / ' + group.behindByTime;
					}
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
