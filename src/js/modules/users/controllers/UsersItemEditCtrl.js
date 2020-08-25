/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

	return app.controller('UsersItemEditCtrl', [
		'$scope', '$state', '$stateParams', 'UserService', 'MessageService',
		function ($scope, $state, $stateParams, userService, msg) {
			$scope.confirm = function () {
				if ($scope.editUsr.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}
				userService.update($scope.user.loginName, 
					$scope.fullName, $scope.user.role)
				.then(function () {
					msg.success('user updated');
					$state.go('^.details');
				}, function (error) {
					msg.failure('Failed to update user: ' + error.message);
				});
			};

			userService.get($stateParams.username)
			.then(function (res) {
				var data = res.data;
				$scope.user = data.data;
				$scope.user.role = data.data.groups[0];
				$scope.fullName = $scope.user.fullName;
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
