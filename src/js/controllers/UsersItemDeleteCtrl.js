define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemDeleteCtrl', [
		'$scope', '$state', '$stateParams', 'UserService',
		function ($scope, $state, $stateParams, userService) {
			
			$scope.disable = true;
			$scope.confirm = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				userService.remove($scope.user.loginName).then(function () {
					alert('user deleted');
					$state.go('users.list');
				}, function () {
					alert('user not deleted');
				});
			};

			userService.get($stateParams.username)
			.success(function (data) {
				$scope.user = data;
				$scope.disable = false;
			})
			.error(function () {
				alert('user does not exists or you do not have perms');
				$state.go('users');
			});
		}
	]);
});