define(['es-ui'], function (app) {

	'use strict';
    app.config(['toastrConfig', function(toastrConfig){
        angular.extend(toastrConfig, {
            timeOut: 0,
            preventDuplicates: true
        });
    }]);
	return app.run([
        '$rootScope', '$location', '$state', '$stateParams', 'AuthService', 'InfoService', 'ScavengeNotificationService',
        function ($rootScope, $location, $state, $stateParams, authService, infoService, scavengeNotificationService) {
            $rootScope.projectionsEnabled = false;
            $rootScope.userManagementEnabled = false;
            $rootScope.singleNode = true;
            var log = {
                username: '',
                password: '',
                server: $location.protocol() + '://' + $location.host() + ':' + $location.port()
            };

            if(!$location.host()) {
                log.server = 'https://127.0.0.1:2113';
            }

            authService.existsAndValid(log.server)
            .then(function () {
                infoService.getInfo()
                    .success(function(info){
                        $rootScope.esVersion = info.esVersion || '0.0.0.0';
                        $rootScope.esVersion = $rootScope.esVersion  === '0.0.0.0' ? 'development build' : $rootScope.esVersion;
                        $rootScope.projectionsEnabled = info.features.projections === true;
                        $rootScope.userManagementEnabled = info.features.userManagement === true;

                        if($rootScope.isAdminOrOps) {
                            scavengeNotificationService.start();
                            infoService.getOptions().then(function onGetOptions(response){
                                var options = response.data;
                                for (var index in options) {
                                    if(options[index].name === 'ClusterSize' && options[index].value > 1){
                                        $rootScope.singleNode = false;
                                    }
                                }
                            });
                        }
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
