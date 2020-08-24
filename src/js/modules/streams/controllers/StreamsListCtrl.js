define(['./_module'], function (app) {

    'use strict';

    return app.controller('StreamsListCtrl', [
		'$rootScope', '$scope', '$state', 'StreamsService', 'MessageService',
		function ($rootScope, $scope, $state, streamsService, msg) {
			function filter (entries) {
				var filtered = {}, i = 0, length = entries.length, item, result = [];

				for(; i<length; i++) {
					if(entries[i].streamId){
						item = entries[i];
						filtered[item.streamId] = true;
					}
				}

				for (item in filtered) {
					result.push({ streamId: item });
				}

				return result;
			}

			$scope.gotoStream = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				streamsService.checkStreamExists($scope.search).then(function(exists) {
					if(exists) {
						$state.go('^.item.events', { streamId: $scope.search });
					} else {
						msg.warn('Could not open stream ' + $scope.search +'. This usually means the stream does not exist or you do not have permission to view it');
					}
				});
			};

			$scope.search = '$all';
		
			streamsService.recentlyChangedStreams()
			.success(function (data) {
				$scope.changedStreams = filter(data.entries);
			});

			streamsService.recentlyCreatedStreams()
			.success(function (data) {
				$scope.createdStreams = filter(data.entries);
			});
		}
	]);
});

