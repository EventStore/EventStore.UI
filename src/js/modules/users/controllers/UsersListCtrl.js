define(['./_module'], function (app) {

    'use strict';



    return app.controller('UsersListCtrl', [
		'$rootScope', '$state', '$scope', 'UserService', 'poller', 'MessageService',
		function ($rootScope, $state, $scope, userService, poller, msg) {
			function initialize() {
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
		
				all.promise.catch(function (error) {
					all.stop();
					msg.failure('Failed to retrieve list of users: ' + error.message);
				});
		
		
				$scope.$on('$destroy', function () {
					poller.clear();
				});
			}

			if ($rootScope.initialized) {
				initialize();
			} else {
				var unregister = $rootScope.$on("initialized", function() {
					initialize();
					unregister();
				});
			}
		}
	]);
});