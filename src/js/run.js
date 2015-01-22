define(['es-ui'], function (app) {

	'use strict';
    app.config(['toastrConfig', function(toastrConfig){
        angular.extend(toastrConfig, {
            timeOut: 0,
            preventDuplicates: true
        });
    }]);
	return app.run([
        '$rootScope', '$state', '$stateParams', 'InfoService',
        function ($rootScope, $state, $stateParams, infoService) {
            // be default disallow projections
            $rootScope.projectionsAllowed = false;
            $rootScope.$currentState = $state.current;
            $state.go('signin');

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
});