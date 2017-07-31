/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsItemConfigCtrl', [
		'$scope', '$state', '$stateParams', 'ProjectionsService', 'ProjectionsMonitor', 'MessageService',
		function ($scope, $state, $stateParams, projectionsService, monitor, msg) {

			$scope.location = $stateParams.location;
			projectionsService.configuration($scope.location)
			.success(function (data) {
				$scope.config = data;
			})
			.error(function () {
				msg.failure('Projection does not exist or is inaccessible');
			});

			monitor.start($scope.location, {
				ignoreQuery: true
			})
			.then(null, null, function (data) {
				// we need this to update buttons and start/stop values
				if(data.statistics && data.statistics.projections.length) {
					$scope.stats = data.statistics.projections[0];
				}

				if(data.result) {
					$scope.result = data.result;
				}

				if(data.state) {
					$scope.sate = data.state;
				}
			});

			$scope.save = function () {
				var param = {
					emitEnabled: $scope.config.emitEnabled,
					trackEmittedStreams: $scope.config.trackEmittedStreams,
					checkpointAfterMs: $scope.config.checkpointAfterMs,
					checkpointHandledThreshold: $scope.config.checkpointHandledThreshold,
					checkpointUnhandledBytesThreshold: $scope.config.checkpointUnhandledBytesThreshold,
					pendingEventsThreshold: $scope.config.pendingEventsThreshold,
					maxWriteBatchLength: $scope.config.maxWriteBatchLength,
					maxAllowedWritesInFlight: $scope.config.maxAllowedWritesInFlight,
				};
				projectionsService.updateConfiguration($scope.location, param)
				.success(function () {
					msg.success('Projection configuration saved');
				})
				.error(function (failureMessage) {
					msg.failure(failureMessage, 'Projection configuration not saved');
				});

			};

			$scope.$on('$destroy', function () {
				monitor.stop();
			});
		}
	]);
});