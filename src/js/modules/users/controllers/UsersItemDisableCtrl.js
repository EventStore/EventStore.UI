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
				.then(function () {
					msg.success('User disabled');
					$scope.$state.go('^.details');
				}, function (error) {
					msg.failure('Failed to disable user: ' + error.message);
				});
			};

			userService.get($stateParams.username)
			.then(function (res) {
				var data = res.data;
				$scope.user = data.data;
				$scope.disable = false;
				if($scope.user.disabled) {
					msg.warn('User already disabled');
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