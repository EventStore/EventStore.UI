define(['./_module'], function (app) {

    'use strict';

    return app.controller('StreamsItemEventCtrl', [
		'$scope', '$state', '$stateParams', 'StreamsService',
		function ($scope, $state, $stateParams, streamsService) {
			
			$scope.streamId = $stateParams.streamId;
			try {
				$scope.streamId = decodeURIComponent($stateParams.streamId);
			} catch(ex) { }
			$scope.isMetadata = $state.current.data.metadata;
			$scope.eventNumber = $scope.isMetadata ? 'metadata' : $stateParams.eventNumber;

			streamsService.eventContent($scope.streamId, $scope.eventNumber)
			.success(function (data) {
				$scope.evt = data;
				$scope.isNotTheSame = data.positionStreamId !== data.streamId || data.positionEventNumber !== data.eventNumber;
				$scope.links = data.links;

				if($scope.isMetadata) {
					// if this was a metadata, we do not need to update anything
					return;
				}

				streamsService.eventContent($scope.streamId, data.positionEventNumber + 1)
				.success(function () {
					$scope.next = true;
				});

				streamsService.eventContent($scope.streamId, data.positionEventNumber - 1)
				.success(function () {
					$scope.prev = true;
				});
			});
		}
	]);
});

