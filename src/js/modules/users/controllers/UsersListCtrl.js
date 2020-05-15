define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersListCtrl', [
		'$rootScope', '$scope', 'UserService', 'poller', 'MessageService',
		function ($rootScope, $scope, userService, poller, msg) {
            if(!$rootScope.userManagementEnabled) {
                msg.failure('User Management is not available');
                $state.go('dashboard.list');
                return;
            }

			var all = poller.create({
				interval: 1000,
				action: userService.all,
				params: [
				]
			});

			all.start();
			all.promise.then(null, null, function (data) {
				$scope.users = data.data;
			});

			all.promise.catch(function () {
				all.stop();
				msg.failure('Cannot get list of users');
			});


			$scope.$on('$destroy', function () {
				poller.clear();
			});
		}
	]);
});