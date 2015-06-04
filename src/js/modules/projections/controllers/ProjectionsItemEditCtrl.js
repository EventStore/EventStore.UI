/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsItemEditCtrl', [
		'$scope', '$state', '$stateParams', 'ProjectionsService', 'ProjectionsMonitor', 'MessageService',
		function ($scope, $state, $stateParams, projectionsService, monitor, msg) {

			$scope.location = $stateParams.location;

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};

			function setButtons () {
				var s = $scope.stats.status;

				$scope.isRunning = !(s.indexOf('Loaded') === 0 ||
                        s.indexOf('Stopped') === 0 ||
                        s.indexOf('Completed') === 0 ||
                        s.indexOf('Faulted') === 0);

				$scope.isStopped = !!~s.indexOf('Stopped');
			}

			// load query info
			projectionsService.query($scope.location)
			.success(function (data) {
				$scope.query = data.query;
				if(data.definition) {
					$scope.stream = data.definition.resultStreamName;
				} else {
					$scope.stream = undefined;
				}
				$scope.emit = data.emitEnabled;
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

					setButtons();
				}

				if(data.result) {
					$scope.result = data.result;
				}

				if(data.state) {
					$scope.sate = data.state;
				}
			});

			$scope.save = function () {

				projectionsService.updateQuery($scope.location,
					$scope.emit ? 'yes' : 'no',
					$scope.query)
				.success(function () {
					msg.success('Projection saved');
				})
				.error(function () {
					msg.failure('Projection not saved');
				});

			};

			$scope.reset = function () {
				var m = 'Projection reset is an unsafe operation. Any previously emitted events will be emitted again to the same streams and handled by their subscribers.\n\rAre you sure?',
					confirmation = msg.confirm(m);

				if(!confirmation) {
					return;
				}

				projectionsService.reset($scope.location)
				.success(function () {
					msg.success('Projection has been reset');
				})
				.error(function () {
					msg.failure('Reset failed');
				});
			};

			$scope.start = function () {
				projectionsService.enable($scope.location)
				.success(function () {
					msg.success('Projection started');
				})
				.error(function () {
					msg.failure('projection could not be started');
				});
			};

			$scope.stop = function () {
				projectionsService.disable($scope.location)
				.success(function () {
					msg.success('Projection stopped');
				})
				.error(function () {
					msg.failure('Projection could not be stopped');
				});
			};


			$scope.$on('$destroy', function () {
				monitor.stop();
			});
		}
	]);
});