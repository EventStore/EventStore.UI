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
			.then(function (res) {
				var data = res.data;
				$scope.query = data.query;
				if(data.definition) {
					$scope.stream = data.definition.resultStreamName;
				} else {
					$scope.stream = undefined;
				}
				$scope.emit = data.emitEnabled;
			}, function (error) {
				msg.failure('Failed to load projection source: ' + error.message);
			});

			monitor.start($scope.location, {
				partitionProvider: $scope,
				ignoreQuery: true
			})
			.then(null, null, function (data) {
				// we need this to update buttons and start/stop values
				if(data.statistics && data.statistics.projections.length) {
					$scope.stats = data.statistics.projections[0];

					if ($scope.stats.name === '$by_category' || $scope.stats.name === '$stream_by_category') {
						$scope.aceConfig.mode = 'text';
					}

					setButtons();
				}

				if(data.result) {
					$scope.result = data.result;
				}

				if(data.state) {
					$scope.state = data.state;
				}
			});

			$scope.save = function () {

				projectionsService.updateQuery($scope.location,
					$scope.emit ? 'yes' : 'no',
					$scope.query)
				.then(function () {
					msg.success('Projection saved');
				}, function (error) {
					msg.failure('Failed to save projection: ' + error.message);
				});

			};

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
					msg.success('Projection stopped');
				}, function (error) {
					msg.failure('Failed to stop projection: ' + error.message);
				});
			};


			$scope.$on('$destroy', function () {
				monitor.stop();
			});
		}
	]);
});
