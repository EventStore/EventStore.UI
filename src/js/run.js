define(['es-ui'], function (app) {

	'use strict';
    app.config(['toastrConfig', 'ngClipProvider', function(toastrConfig, ngClipProvider){
        ngClipProvider.setPath("../../assets/ZeroClipboard.swf");

        angular.extend(toastrConfig, {
            timeOut: 0,
            preventDuplicates: true
        });
    }]);
	return app.run([
        '$rootScope', '$location', '$state', '$stateParams', 'AuthService', 'InfoService',
        function ($rootScope, $location, $state, $stateParams, authService, infoService) {
            $rootScope.projectionsAllowed = false;
            authService.existsAndValid()
            .then(function () {
                infoService.getInfo()
                    .success(function(info){
                        $rootScope.esVersion = info.esVersion || '0.0.0.0';
                        $rootScope.esVersion = $rootScope.esVersion  == '0.0.0.0' ? 'development build' : $rootScope.esVersion;
                        $rootScope.projectionsAllowed = info.projectionsMode != 'None';
                    });
            }, function () {
                $rootScope.previousUrl = $location.$$path;
                $state.go('signin');
            });

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
});