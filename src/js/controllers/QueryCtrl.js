/*jshint sub: true*/
define(['./_module'], function (app) {

    'use strict';

    // todo: remove State Params if we will not add query for existing queries

    return app.controller('QueryCtrl', [
		'$scope', '$state', '$stateParams', 'QueryService', 'MessageService',
		function ($scope, $state, $stateParams, queryService, msg) {

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

			function run () {
				var updated = queryService.update(location, $scope.query);
				
				// 3 steps:
				// 1: update
				// 2: execute
				// 3: get state
				updated.success(function () {

					var enabled = queryService.enable(location);
					enabled.success(function () {
						var state = queryService.state(location);
						state.success(function (data) {
							$scope.state = data;
						});
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
				$state.go('projections.item.debug', { location: encodeURIComponent(location) }, { inherit: false });
			};
		}
	]);
});