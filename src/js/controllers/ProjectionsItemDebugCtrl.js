define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsItemDebugCtrl', [
		'$scope', '$stateParams','$q', '$timeout', 'ProjectionsService', 'MessageService',
		function ($scope, $stateParams, $q, $timeout, projectionsService, msg) {

			function updateStatusInfo (message) {
				if(!message) {
					message = 'N/A';
				}
				$scope.statusInfo = message;
			}

			function setPartition (partition) {
				partition = '(' + partition + ')';
				$scope.currentPartition = partition;
			}

			updateStatusInfo('');
			$scope.location = $stateParams.location;

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};

			$scope.aceEventsConfig = {
				mode: 'json',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};

			$scope.isRunning = false;
			$scope.query = '';
			$scope.state = {};
			$scope.events = '';
			$scope.rawEvents = null;
			$scope.currentEvent = {};

			var requests = [];
			updateStatusInfo('Loading definition...');
			var stats = projectionsService.statistics($scope.location);
			var state = projectionsService.state($scope.location);
			var query = projectionsService.query($scope.location);

			requests.push(stats);
			requests.push(state);
			requests.push(query);

			$q.allSettled(requests)
			.then(function (data) {
				// 0 - stats
				// 1 - state
				// 2 - query
				var stats = data[0],
					state = data[1],
					query = data[2],
					position;

				position = state.headers()['es-position'];
				$scope.currentPosition = angular.fromJson(position); 
				$scope.definition = query.data.definition;
				$scope.query = query.data.query;

				updateStatusInfo('');
				loadEvents();
			});

			function loadEvents () {
				projectionsService.readEvents($scope.definition, $scope.currentPosition)
				.success(function (data) {
					$scope.events = JSON.stringify(data, undefined, 4);
					$scope.rawEvents = data.events;

					if($scope.rawEvents && $scope.rawEvents.length) {
						prepare ();
					} else {
						updateStatusInfo('No further events are available. Waiting...');
						$timeout(loadEvents, 1000);
					}

				})
				.error(function () {
					$timeout(loadEvents, 1000);
				});
			}

			function prepare () {
				if($scope.initialized) {
					loadState();
					return;
				}

				updateStatusInfo('Running the definition...');
				// todo: load resources
			}

			function loadState () {
				console.trace();
			}

			$scope.update = function () {
				projectionsService.updateQuery($scope.location, $scope.query)
				.success(function () {
					msg.info('projection updated');
					// todo: not sure, we can reset debugging state, or
					// transfer user to different page?
				})
				.error(function () {
					msg.error('Projection not updated');
				});
			};
			$scope.stop = function () {
				projectionsService.disable($scope.location)
				.success(function () {
					msg.info('projection stopped');
				})
				.error(function () {
					msg.error('projection could not be stopped');
				});
			};
		}
	]);
});