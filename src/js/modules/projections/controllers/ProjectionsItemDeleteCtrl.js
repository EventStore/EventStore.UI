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
			.then(function (res) {
				$scope.projection.state = res.data;
			}, function (error) {
				msg.failure('Failed to load the projection state: ' + error.message);
			});

			projectionsService.query($scope.location)
			.then(function (res) {
				$scope.projection.source = res.data.query;
				$scope.projection.name = res.data.name;
			}, function (error) {
				msg.failure('Failed to load projection source: ' + error.message);
			});

			function removeProjection(location){
				projectionsService.remove($scope.location, {
					deleteCheckpointStream: $scope.deleteCheckpoint ? 'yes' : 'no',
					deleteStateStream: $scope.deleteState ? 'yes' : 'no',
					deleteEmittedStreams: $scope.deleteEmittedStreams ? 'yes' : 'no'
				})
				.then(function () {
					msg.success('Projection has been removed');
					$state.go('projections.list');
				}, function (error) {
					msg.failure('Failed to remove projection: ' + error.message);
				});
			}

			$scope.remove = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				projectionsService.disable($scope.location)
				.then(function () {
					removeProjection($scope.location);
				}, function (error) {
					if(error.message.indexOf('Not enabled') !== -1) {
						removeProjection($scope.location);
					} else{
						msg.failure('Failed to stop projection: ' + error.message);
					}
				});
			};
		}
	]);
});