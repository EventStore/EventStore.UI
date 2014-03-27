define(['./app'], function (app) {

	'use strict';

	return app.run([
        '$rootScope', '$state', '$stateParams', 'AuthService',
        function ($rootScope, $state, $stateParams, authService) {

			// for testing purpose
			authService.setCredentials('admin', 'changeit');

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);

});