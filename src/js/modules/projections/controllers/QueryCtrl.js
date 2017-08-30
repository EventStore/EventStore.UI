/*jshint sub: true,bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

    // todo: remove State Params if we will not add query for existing queries

    return app.controller('QueryCtrl', [
		'$scope', '$state', '$stateParams', 'QueryService', 'ProjectionsMonitor', 'MessageService','ProjectionsService',
		function ($scope, $state, $stateParams, queryService, monitor, msg, projectionsService) {

			var location;
			if ($stateParams.location) {
				location = $stateParams.location;
                projectionsService.query(location).then(function (result) {
	                $scope.query = result.data.query
                });
			}

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
					var projection, status, stateReason, stopped;

					if(data.state) {
						$scope.state = data.state;
						if($scope.isStopped) {
							stopAndDisable();
						}
					}
					
					if(data.statistics && data.statistics.projections.length) {
						projection = data.statistics.projections[0];
						status = projection.status;
						stateReason = projection.stateReason;
						$scope.status = status;
						var lines = stateReason.match(/[^\r\n]+/g);
						$scope.stateReason = lines !== null && lines.length > 0 ? lines[0] : stateReason;
						stopped = (!!~status.indexOf('Stopped') && !~status.indexOf('Preparing')) || !!~status.indexOf('Faulted') ||!!~status.indexOf('Completed');
						$scope.isStopped = stopped;
					}
				});
			}

			function stopAndDisable () {
				monitor.stop();
				return queryService.disable(location);
			}

			function run () {
				$scope.maximized = false;
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
				.error(function (response, statusCode) {
					if(statusCode == 404){
						msg.failure("The query was not updated because it was not found. The query probably expired and was deleted.");
					}else{
						msg.failure('Query not updated');
					}
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
				queryService.disable(location)
                .then(function onQueryDisabled(){
                    queryService.reset(location)
                    .then(function onQueryReset(){
                        $state.go('projections.item.debug', {
                            location: encodeURIComponent(location),
                            fromQueryState : true
                        }, { 
                            inherit: false 
                        });
                    })
                });
			};

			var unbindHandler = $scope.$watch('query', function(scope, newValue, oldValue) {
				if(newValue != oldValue) {
					//$scope.isCreated = false;
				}
			});

			$scope.$on('$destroy', function () {
				unbindHandler();
				monitor.stop();
			});
		}
	]);
});
