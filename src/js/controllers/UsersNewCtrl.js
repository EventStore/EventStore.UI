define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersNewCtrl', [
		'$scope', '$state', 'UserService',
		function ($scope, $state, userService) {

			$scope.newUser = {};
			$scope.confirm = function () {
				if ($scope.newUsr.$invalid) {
					alert('Please fix all validation errors');
					return;
				}

				userService.create($scope.newUser)
				.success(function () {
					alert('user created');
					$state.go('^.list');
				})
				.error(function () {
					alert('user not created');
				});
			};
		}
	]);
});