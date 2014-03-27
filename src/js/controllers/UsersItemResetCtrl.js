define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemResetCtrl', [
		'$scope', '$state', 'UserService',
		function ($scope, $state, userService) {
			
			$scope.confirm = function () {
				if ($scope.resetPwd.$invalid) {
					alert('Please fix all validation errors');
					return;
				}

				userService.resetPassword($scope.user.loginName, $scope.password)
				.success(function () {
					alert('password reseted');
					$state.go('^.details');
				})
				.error(function () {
					alert('password not reseted');
				});
			};

			userService.get($scope.$stateParams.username)
			.success(function (data) {
				$scope.user = data.data;
			})
			.error(function () {
				alert('user does not exists or you do not have perms');
				$state.go('users');
			});
		}
	]);
});