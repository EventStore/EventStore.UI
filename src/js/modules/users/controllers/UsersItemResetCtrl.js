define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemResetCtrl', [
		'$rootScope','$scope', '$state', 'UserService', 'MessageService', 'AuthService',
		function ($rootScope, $scope, $state, userService, msg, authService) {
			
			$scope.confirm = function () {
				if ($scope.resetPwd.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				userService.resetPassword($scope.user.loginName, $scope.password)
				.success(function () {
					msg.success('Password has been reset');
					authService.resetCredentials($scope.user.loginName, $scope.password, $rootScope.baseUrl)
					.then(function(){
						$state.go('^.details');
					}, function(){
						msg.failure("We tried to reset the credentials in the cookie and failed. Please log in again.");
						$state.go('signin');
					});
				})
				.error(function () {
					msg.failure('Password not reset');
				});
			};

			userService.get($scope.$stateParams.username)
			.success(function (data) {
				$scope.user = data.data;
			})
			.error(function () {
				msg.failure('User does not exist or you do not have permission');
				$state.go('users');
			});
		}
	]);
});