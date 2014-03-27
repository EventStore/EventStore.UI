define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemEnableCtrl', [
		'$scope', '$state', '$stateParams', 'UserService',
		function ($scope, $state, $stateParams, userService) {
			
			$scope.disable = true;
			$scope.confirm = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				userService.enable($scope.user.loginName)
				.success(function () {
					alert('user enabled');
					$state.go('^.details');
				})
				.error(function () {
					alert('user not enabled');
				});
			};

			userService.get($stateParams.username)
			.success(function (data) {
				$scope.user = data.data;
				$scope.disable = false;

				if(!$scope.user.disabled) {
					alert('user already enabled');
					$state.go('^.details');
				}
			})
			.error(function () {
				alert('user does not exists or you do not have perms');
				$state.go('users');
			});
		}
	]);
});