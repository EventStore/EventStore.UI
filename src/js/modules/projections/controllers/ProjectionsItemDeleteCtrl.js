define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsItemDeleteCtrl', [
		'$scope', '$state', '$stateParams', 'ProjectionsService', 'MessageService',
		function ($scope, $state, $stateParams, projectionsService, msg) {
			$scope.location = $stateParams.location;

			$scope.projection = {
				name: '',
				source: '',
				state: ''
			};

			projectionsService.state($scope.location)
			.success(function (data) {
				$scope.projection.state = data;
			});

			projectionsService.query($scope.location)
			.success(function (data) {
				$scope.projection.source = data.query;
				$scope.projection.name = data.name;
			});

			function removeProjection(location){
				projectionsService.remove($scope.location, {
					deleteCheckpointStream: $scope.deleteCheckpoint ? 'yes' : 'no',
					deleteStateStream: $scope.deleteState ? 'yes' : 'no',
					deleteEmittedStreams: $scope.deleteEmittedStreams ? 'yes' : 'no'
				})
				.success(function () {
					msg.success('Projection has been removed');
					$state.go('projections.list');
				})
				.error(function () {
					msg.failure('Projection not removed');
				});
			}

			$scope.remove = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				projectionsService.disable($scope.location)
				.success(function () {
					removeProjection($scope.location);
				})
				.error(function (message) {
					if(message.indexOf('Not enabled') != -1){
						removeProjection($scope.location);
					}else{
						msg.failure('Projection could not be stopped');
					}
				});
			};
		}
	]);
});