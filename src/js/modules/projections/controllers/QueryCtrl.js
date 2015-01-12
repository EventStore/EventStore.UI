/*jshint sub: true,bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

    // todo: remove State Params if we will not add query for existing queries

    return app.controller('QueryCtrl', [
		'$scope', '$state', '$stateParams', 'QueryService', 'ProjectionsMonitor', 'MessageService',
		function ($scope, $state, $stateParams, queryService, monitor, msg) {

			var location;

			function create () {
				var param = {
					emit: 'no',
					checkpoints: 'no',
					enabled: 'no'
				};

				queryService.create($scope.query, param)
				.success(function (data, status, headers) {
					location = headers()['location'];
					$scope.isCreated = true;
					run();
				})
				.error(function () {
					$scope.isCreated = false;
					msg.failure('Couldn\'t create new query');
				});
			}


			function monitorState () {

				monitor.stop();
				monitor.start(location, {
					ignoreQuery: true,
					ignoreResult: true
				}).then(null, null, function (data) {
					var s, stopped;

					if(data.state) {
						$scope.state = data.state;
						if($scope.isStopped) {
							stopAndDisable();
						}
					}
					
					if(data.statistics && data.statistics.projections.length) {
						s = data.statistics.projections[0].status;
						$scope.status = s;

						stopped = (!!~s.indexOf('Stopped') && !~s.indexOf('Preparing')) || !!~s.indexOf('Faulted') ||!!~s.indexOf('Completed');
						$scope.isStopped = stopped;
					}
				});
			}

			function stopAndDisable () {
				monitor.stop();
				return queryService.disable(location);
			}

			function run () {
				var updated = queryService.update(location, $scope.query);
				
				updated.success(function () {

					var enabled = queryService.enable(location);
					// start monitoring ms before query will be enabled
					monitorState();

					enabled.error(function () {
						msg.failure('Could not start query');
						monitor.stop();
					});

					//var disable = queryService.disable(location);
					//disable.success(function () {
						
					//});
				})
				.error(function () {
					msg.failure('Query not updated');
				});
			}

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};

			$scope.disableStop = function () {

				if(!$scope.isCreated) {
					return true;
				}

				if($scope.isStopped) {
					return true;
				}

				return false;
			};

			$scope.run = function () {
				if($scope.isCreated) {
					run();
				} else {
					create();
				}
			};

			$scope.stop = function () {

				var disable = stopAndDisable();
				
				disable.error(function () {
					msg.failure('Could not break query');
				});
			};

			$scope.debug = function () {
				$state.go('projections.item.debug', { 
					location: encodeURIComponent(location) 
				}, { 
					inherit: false 
				});
			};

			$scope.$watch('query', function(scope, newValue, oldValue) {
				if(newValue != oldValue) {
					//$scope.isCreated = false;
				}
			});

			$scope.$on('$destroy', function () {
				monitor.stop();
			});
		}
	]);
});