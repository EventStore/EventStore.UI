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
				.then(function () {
					msg.success('Password has been reset');
					authService.resetCredentials($scope.user.loginName, $scope.password)
					.then(function(){
						$state.go('^.details');
					}, function(){
						msg.failure('We tried to reset the credentials in the cookie and failed. Please log in again.');
						$state.go('signin');
					});
				}, function (error) {
					msg.failure('Failed to reset password: ' + error.message);
				});
			};

			userService.get($scope.$stateParams.username)
			.then(function (res) {
				var data = res.data;
				$scope.user = data.data;
			}, function (error) {
				if(error.statusCode === 404){
					msg.failure('User does not exist');
				} else{
					msg.failure('Failed to get user: ' + error.message);
				}
				$state.go('users');
			});
		}
	]);
});