/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

	return app.controller('UsersItemEditCtrl', [
		'$scope', '$state', '$stateParams', 'UserService',
		function ($scope, $state, $stateParams, userService) {
			
			$scope.confirm = function () {
				if ($scope.editUsr.$invalid) {
					alert('Please fix all validation errors');
					return;
				}

				userService.update($scope.user.loginName, 
					$scope.fullName, 
					$scope.isAdmin)
				.success(function () {
					alert('user updated');
					$state.go('^.details');
				})
				.error(function () {
					alert('user not updated');
				});
			};

			userService.get($stateParams.username)
			.success(function (data) {
				$scope.user = data.data;
				$scope.isAdmin = !!~data.data.groups.indexOf('$admin');
				$scope.fullName = $scope.user.fullName;
			})
			.error(function () {
				alert('user does not exists or you do not have perms');
				$state.go('users');
			});
		}
	]);
});