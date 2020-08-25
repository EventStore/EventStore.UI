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
				.then(function () {
					msg.success('User created');
					$state.go('^.list');
				}, function (error) {
					msg.failure('Failed to create user: ' + error.message);
				});
			};
		}
	]);
});
