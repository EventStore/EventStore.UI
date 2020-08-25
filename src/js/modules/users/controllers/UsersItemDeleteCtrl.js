define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemDeleteCtrl', [
		'$scope', '$state', '$stateParams', 'UserService', 'MessageService',
		function ($scope, $state, $stateParams, userService, msg) {
			
			$scope.disable = true;
			$scope.confirm = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				userService.remove($scope.user.loginName).then(function () {
					msg.success('User deleted');
					$state.go('users.list');
				}, function (error) {
					msg.failure('Failed to delete user: ' + error.message);
				});
			};

			userService.get($stateParams.username)
			.then(function (res) {
				var data = res.data;
				$scope.user = data.data;
				$scope.disable = false;
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