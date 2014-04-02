/*jshint sub: true*/
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
					msg.error('Couldn\'t create new query');
				});
			}


			function monitorState () {

				monitor.stop();
				monitor.start(location, {
					ignoreQuery: true,
					ignoreResult: true
				}).then(null, null, function (data) {
					var s;

					$scope.state = data.state;
					if(data.statistics && data.statistics.projections.length) {
						s = data.statistics.projections[0].status;
						$scope.status = s;

						// todo: shell we stop monitoring when status is completed/faulted?
					}
				});
			}

			function run () {
				var updated = queryService.update(location, $scope.query);
				
				updated.success(function () {
					var enabled = queryService.enable(location);
					enabled.success(function () {
						monitorState();
					})
					.error(function () {
						msg.error('Could not start query');
						monitor.stop();
					});
				})
				.error(function () {
					msg.error('Query not updated');
				});
			}

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};

			$scope.run = function () {
				if($scope.isCreated) {
					run();
				} else {
					create();
				}
			};

			$scope.debug = function () {
				$state.go('projections.item.debug', { 
					location: encodeURIComponent(location) 
				}, { 
					inherit: false 
				});
			};

			$scope.$on('$destroy', function () {
				monitor.stop();
			});
		}
	]);
});