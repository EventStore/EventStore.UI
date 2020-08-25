/*jshint sub: true*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsNewCtrl', [
		'$scope', '$state', 'ProjectionsService', 'MessageService',
		function ($scope, $state, projectionsService, msg) {

			function yesOrNo(val) {
				return val ? 'yes' : 'no';
			}

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};

			$scope.modes = [{
				value: 'onetime',
				name: 'One-Time'
			}, {
				value: 'continuous',
				name: 'Continuous'
			}];
			$scope.mode = 'onetime';
			$scope.enabled = true;
			$scope.checkpointsDisabled = false;
			$scope.checkpoints = false;
			$scope.trackEmittedStreams = false;

			$scope.save = function () {

				if($scope.newProj.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				var param = {
					name: $scope.name,
					emit: yesOrNo($scope.emit),
					checkpoints: yesOrNo($scope.checkpoints),
					enabled: yesOrNo($scope.enabled),
					trackemittedstreams: yesOrNo($scope.trackemittedstreams),
				};

				projectionsService.create($scope.mode, $scope.source, param)
					.then(function (res) {
						var headers = res.headers;
						var location = headers()['location'];
						$state.go('^.item.details', {
							location: encodeURIComponent(location)
						});
					}, function (error) {
						msg.failure('Failed to create new projection: ' + error.message);
					});
			};

			var unbindModeHandler = $scope.$watch('mode', function (newVal, oldVal) {
				var isContinuous;
				if(newVal !== oldVal) {
					isContinuous = newVal === 'continuous';

					if(isContinuous) {
						$scope.checkpoints = true;
						$scope.checkpointsDisabled = true;
					} else {
						$scope.checkpointsDisabled = false;
						$scope.checkpoints = true;
					}
				}
			});
			
			$scope.$on('$destroy', function () {
				unbindModeHandler();
			});
		}
	]);
});
