define(['./_module'], function (app) {

	'use strict';

	return app.provider('SubscriptionsMapper', function () {
		function createEmptyGroup (groupName) {
			return {
                streamName: groupName,
                averageItemsPerSecond: 0,
                totalItemsProcessed: 0,
                connectionCount: 0,
                groups: []
			};
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
	            
	            if(current.eventStreamId) {
	                
	                if(!result[current.eventStreamId]) {
	                    group = createEmptyGroup(current.eventStreamId);
	                } else {
	                    group = result[current.eventStreamId];
	                }

	                exists = source[current.eventStreamId];
	                group.show = exists ? exists.show : false;
	                group.groups.push(current);

                    group.averageItemsPerSecond += current.averageItemsPerSecond;
                    group.totalItemsProcessed += current.totalItemsProcessed;
                    group.connectionCount += current.connectionCount;
                    
	                result[current.eventStreamId] = group;
	            } else {
	                result[current.eventStreamId] = current;
	            }
	        }
	       	console.log(result); 
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