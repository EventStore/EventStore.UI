/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsItemDetailsCtrl', [
		'$scope', '$state', '$stateParams', 'ProjectionsService', 'ProjectionsMonitor', 'MessageService',
		function ($scope, $state, $stateParams, projectionsService, monitor, msg) {

			var lastSinceRestart = null,
				lastTimestamp = null;

			$scope.location = $stateParams.location;

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
				// onLoad: function (_editor) {
				// 	_editor.setReadOnly(true);
				// 	console.log(_editor);
				// }
			};

			function setButtons () {
				// todo: refactor, don't like indexOf and not sure if i do test proper things
				var s = $scope.stats.status;

				$scope.isRunning = !(s.indexOf('Loaded') === 0 ||
                        s.indexOf('Stopped') === 0 ||
                        s.indexOf('Completed') === 0 ||
                        s.indexOf('Faulted') === 0);

				$scope.isStopped = !!~s.indexOf('Stopped');
			}

			monitor.start($scope.location, { partitionProvider: $scope })
			.then(null, null, function (data) {
				if(data.statistics && data.statistics.projections.length) {
					$scope.stats = data.statistics.projections[0];
					$scope.isTransientProjection = $scope.stats.mode == "Transient";

					if ($scope.stats.name === '$by_category' || $scope.stats.name === '$stream_by_category') {
						$scope.aceConfig.mode = 'text';
					}

					if (lastSinceRestart !== null) {
                        $scope.stats.eventsPerSecond = (1000.0 * ($scope.stats.eventsProcessedAfterRestart - lastSinceRestart) / (new Date() - lastTimestamp)).toFixed(1);
                    }
                    lastTimestamp = new Date();
                    lastSinceRestart = $scope.stats.eventsProcessedAfterRestart;

					setButtons();
				}

				if(data.query) {
					if(data.query.definition) {
						$scope.stream = data.query.definition.resultStreamName;	
					} else {
						$scope.stream = undefined;
					}
					
					$scope.query = data.query.query;
				}

				if(data.result) {
					$scope.result = data.result;
				}

				if(data.state) {
					$scope.state = data.state;
				}
			});

			$scope.reset = function () {
				var m = 'Projection reset is an unsafe operation. Any previously emitted events will be emitted again to the same streams and handled by their subscribers.\n\rAre you sure?',
					confirmation = msg.confirm(m);

				if(!confirmation) {
					return;
				}

				projectionsService.reset($scope.location)
				.then(function () {
					msg.success('Projection has been reset');
				}, function (error) {
					msg.failure('Failed to reset projection: ' + error.message);
				});
			};

			$scope.start = function () {
				projectionsService.enable($scope.location)
				.then(function () {
					msg.success('Projection started');
				}, function (error) {
					msg.failure('Failed to start projection: ' + error.message);
				});
			};

			$scope.stop = function () {
				projectionsService.disable($scope.location)
				.then(function () {
					msg.success('Projection has been stopped');
				}, function (error) {
					msg.failure('Failed to stop projection: ' + error.message);
				});
			};

			$scope.$on('$destroy', function () {
				monitor.stop();
			});

                        $scope.clearState = function () {
				$scope.state = undefined;
                        };
		}
	]);
});
