define(['./_module'], function (app) {

    'use strict';

    return app.controller('StreamsItemEventCtrl', [
		'$scope', '$state', '$stateParams', 'StreamsService', 'MessageService',
		function ($scope, $state, $stateParams, streamsService, msg) {
			
            $scope.streamId = $stateParams.streamId;
            $scope.isMetadata = $state.current.data.metadata;
			$scope.eventNumber = $scope.isMetadata ? 'metadata' : $stateParams.eventNumber;

			streamsService.eventContent($scope.streamId, $scope.eventNumber)
			.then(function (res) {
				var data = res.data;
				$scope.evt = data;
				$scope.isNotTheSame = data.positionStreamId !== data.streamId || data.positionEventNumber !== data.eventNumber;
				$scope.links = data.links;

				if($scope.isMetadata) {
					// if this was a metadata, we do not need to update anything
					return;
				}

				streamsService.eventContent($scope.streamId, data.positionEventNumber + 1)
				.then(function () {
					$scope.next = true;
				}, function(error){
					if(error.statusCode !== 404){
						msg.failure('Failed to load event content for stream \'' + $scope.streamId + '\': ' + error.message);
					}
				});

				if(data.positionEventNumber - 1 >= 0){
					streamsService.eventContent($scope.streamId, data.positionEventNumber - 1)
					.then(function () {
						$scope.prev = true;
					}, function(error){
						if(error.statusCode !== 404){
							msg.failure('Failed to load event content for stream \'' + $scope.streamId + '\': ' + error.message);
						}
					});
				}
			}, function(error){
				msg.failure('Failed to load event content for stream \'' + $scope.streamId + '\': ' + error.message);
			});
		}
	]);
});

