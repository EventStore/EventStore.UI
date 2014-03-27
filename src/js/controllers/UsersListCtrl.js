define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersListCtrl', [
		'$scope', 'UserService',
		function ($scope, userService) {

			userService.all().success(function (data) {
				$scope.users = data.data;
			});
		}
	]);
});