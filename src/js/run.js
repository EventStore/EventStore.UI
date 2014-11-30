define(['es-ui'], function (app) {

	'use strict';

	return app.run([
        '$rootScope', '$state', '$stateParams', 'AuthService', 'InfoService',
        function ($rootScope, $state, $stateParams, authService, infoService) {
            // be default disallow projections
            $rootScope.projectionsAllowed = false;
            authService.existsAndValid()
            .then(function () {
                infoService.getInfo()
                    .success(function(info){
                        $rootScope.esVersion = info.esVersion || '0.0.0.0';
                        $rootScope.projectionsAllowed = info.projectionsMode != 'None';
                    });
            }, function () {
                $rootScope.$currentState = $state.current;
                $state.go('signin');
            });

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);

});