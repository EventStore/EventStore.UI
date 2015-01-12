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
				}, function () {
					msg.failure('User was not deleted');
				});
			};

			userService.get($stateParams.username)
			.success(function (data) {
				$scope.user = data;
				$scope.disable = false;
			})
			.error(function () {
				msg.failure('User does not exists or you do not have permissions');
				$state.go('users');
			});
		}
	]);
});