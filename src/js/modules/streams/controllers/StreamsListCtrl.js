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

				streamsService.checkStreamExists($scope.search).then(function() {
						$state.go('^.item.events', { streamId: $scope.search });
				}, function(error){
					if(error.statusCode === 404){
						msg.warn('The stream \'' + $scope.search +'\' does not exist.');
					} else {
						msg.failure('Failed to read stream \''+$scope.search+'\': ' + error.message);
					}
				});
			};

			$scope.search = '$all';
			$scope.noChangedStreamsText = 'No recently changed streams';
			$scope.noCreatedStreamsText = 'No recently created streams';
		
			streamsService.recentlyChangedStreams().then(
			function (res) {
				$scope.changedStreams = filter(res.data.entries);
			},
			function(error){
				if(error.statusCode === 401){
					$scope.noChangedStreamsText = 'You are not authorized to view recently changed streams';
				} else if(error.statusCode === 404){
					$scope.noChangedStreamsText = 'No recently changed streams';
				} else{
					msg.failure('Failed to load recently changed streams: ' + error.message);
				}
			});

			streamsService.recentlyCreatedStreams().then(
			function (res) {
				$scope.createdStreams = filter(res.data.entries);
			},
			function(error){
				if(error.statusCode === 401){
					$scope.noCreatedStreamsText = 'You are not authorized to view recently created streams';
				} else if(error.statusCode === 404){
					$scope.noCreatedStreamsText = 'No recently created streams';
				} else{
					msg.failure('Failed to load recently created streams: ' + error.message);
				}
			});
		}
	]);
});

