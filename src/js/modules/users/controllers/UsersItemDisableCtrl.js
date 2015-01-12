define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemDisableCtrl', [
		'$scope', '$state', '$stateParams', 'UserService', 'MessageService',
		function ($scope, $state, $stateParams, userService, msg) {
			
			$scope.disable = true;
			$scope.confirm = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				userService.disable($scope.user.loginName)
				.success(function () {
					msg.success('User disabled');
					$scope.$state.go('^.details');
				})
				.error(function (response) {
					msg.failure('Failed to disable user, reason : ' + response.error);
				});
			};

			userService.get($stateParams.username)
			.success(function (data) {
				$scope.user = data.data;
				$scope.disable = false;
				if($scope.user.disabled) {
					msg.warn('User already disabled');
					$state.go('^.details');
				}
			})
			.error(function () {
				msg.failure('User does not exist or you do not have permissions');
				$state.go('users');
			});
		}
	]);
});