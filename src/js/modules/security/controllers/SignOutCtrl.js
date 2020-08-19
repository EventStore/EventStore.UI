define(['./_module'], function (app) {

    'use strict';

    return app.controller('SignOutCtrl', [
		'$scope', '$state', 'AuthService', '$rootScope',
		function ($scope, $state, authService, $rootScope) {
			authService.clearCredentials();

			if($rootScope.authentication.type === 'oauth'){
				$rootScope.hideMenuOptions = true;
			} else{
				$state.go('signin');
			}
		}
	]);


});