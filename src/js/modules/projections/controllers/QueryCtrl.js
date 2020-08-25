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
	                $scope.query = result.data.query;
                }, function(error){
									msg.failure('Failed to load query source: ' + error.message);
								});
			} else if ($stateParams.initStreamId) {
                          $scope.query = 'fromStream(\'' + $stateParams.initStreamId + '\')\n  .when({\n  })';
                        } else {
                          $scope.query = queryService.retrieveQuery();
                        }

			function create () {
				var param = {
					emit: 'no',
					checkpoints: 'no',
					enabled: 'no'
				};

				queryService.create($scope.query, param)
				.then(function (res) {
					var headers = res.headers;
					location = headers()['location'];
					$scope.isCreated = true;
					run();
				}, function (error) {
					$scope.isCreated = false;
					msg.failure('Failed to create new query: ' + error.message);
				});
			}


			function monitorState () {

				$scope.state = undefined;

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
						$scope.progress = projection.progress;
					}
				});
			}

			function stopAndDisable () {
				monitor.stop();
				return queryService.disable(location);
			}

			function run () {
				$scope.maximized = false;
				var updated = queryService.update(location, $scope.query)
				.then(function () {

					var enabled = queryService.enable(location);
					// start monitoring ms before query will be enabled
					monitorState();

					enabled.catch(function (error) {
						msg.failure('Failed to start query: ' + error.message);
						monitor.stop();
					});
				}, function (error) {
					if(error.statusCode === 404){
						msg.failure('The query was not updated because it was not found. The query probably expired and was deleted.');
					}else{
						msg.failure('Failed to update the query: ' + error.message);
					}
				});
			}

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai',
                                onChange: function () {
                                  queryService.rememberQuery($scope.query);
                                }
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
				stopAndDisable().catch(function (error) {
					msg.failure('Failed to stop query: ' + error.message);
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
                    }, function(error){
											msg.failure('Failed to reset query: ' + error.message);
										});
                }, function(error){
										msg.failure('Failed to stop query: ' + error.message);
								});
			};

			var unbindHandler = $scope.$watch('query', function(scope, newValue, oldValue) {
				if(newValue !== oldValue) {
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
