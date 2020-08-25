define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemDetailsCtrl', [
		'$scope', '$state', '$stateParams', 'UserService', 'MessageService',
		function ($scope, $state, $stateParams, userService, msg) {
			
			userService.get($stateParams.username)
			.then(function (res) {
				var data = res.data;
				$scope.user = data.data;
			}, function (error) {
				msg.failure('Failed to get user: ' + error.message);
				$state.go('users');
			});
		}
	]);
});