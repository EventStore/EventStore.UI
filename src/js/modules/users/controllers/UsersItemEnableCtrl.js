define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemEnableCtrl', [
		'$scope', '$state', '$stateParams', 'UserService', 'MessageService',
		function ($scope, $state, $stateParams, userService, msg) {
			
			$scope.disable = true;
			$scope.confirm = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				userService.enable($scope.user.loginName)
				.then(function () {
					msg.success('user enabled');
					$state.go('^.details');
				}, function (error) {
					msg.failure('Failed to enable user: ' + error.message);
				});
			};

			userService.get($stateParams.username)
			.then(function (res) {
				var data = res.data;
				$scope.user = data.data;
				$scope.disable = false;

				if(!$scope.user.disabled) {
					msg.warn('user already enabled');
					$state.go('^.details');
				}
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