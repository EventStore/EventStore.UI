define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersNewCtrl', [
		'$scope', '$state', 'UserService', 'MessageService',
		function ($scope, $state, userService, msg) {

			$scope.newUser = {};
			$scope.confirm = function () {
				if ($scope.newUsr.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				userService.create($scope.newUser)
				.success(function () {
					msg.success('User created');
					$state.go('^.list');
				})
				.error(function (response) {
					msg.failure('Failed to create user, reason : ' + response.error);
				});
			};
		}
	]);
});