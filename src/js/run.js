define(['es-ui'], function (app) {

	'use strict';
    app.config(['toastrConfig', function(toastrConfig){
        angular.extend(toastrConfig, {
            timeOut: 0,
            preventDuplicates: true
        });
    }]);
	return app.run([
        '$rootScope', '$location', '$state', '$stateParams', 'AuthService', 'InfoService', 'ScavengeNotificationService', 'MessageService',
        function ($rootScope, $location, $state, $stateParams, authService, infoService, scavengeNotificationService, msg) {
            $rootScope.baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();
            $rootScope.projectionsEnabled = false;
            $rootScope.userManagementEnabled = false;
            $rootScope.streamsBrowserEnabled = false;
            $rootScope.singleNode = true;
            var log = {
                username: '',
                password: '',
                server: $location.protocol() + '://' + $location.host() + ':' + $location.port()
            };

            if(!$location.host()) {
                log.server = 'https://127.0.0.1:2113';
            }

            infoService.getInfo()
            .success(function(info){
                $rootScope.esVersion = info.esVersion || '0.0.0.0';
                $rootScope.esVersion = $rootScope.esVersion  === '0.0.0.0' ? 'development build' : $rootScope.esVersion;
                $rootScope.projectionsEnabled = info.features.projections === true;
                $rootScope.userManagementEnabled = info.features.userManagement === true;
                $rootScope.streamsBrowserEnabled = info.features.atomPub === true;
                $rootScope.authentication = info.authentication;
                $rootScope.logoutEnabled = info.authentication.type !== 'insecure';
                $rootScope.previousUrl = $location.$$path;

                authService.existsAndValid(log.server)
                .then(function () {
                    setSingleNodeOrCluster();
                    redirectAfterLoggingIn();
                }, function () {
                    $state.go('signin');
                });
            })
			.error(function(){
				msg.failure('Could not load /info endpoint');
            });
            
            function setSingleNodeOrCluster(){
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
            }

			function redirectAfterLoggingIn() {
				if($rootScope.previousUrl && $rootScope.previousUrl !== '/'){
					var urltoNavigateTo = $rootScope.previousUrl;
					$rootScope.previousUrl = null;
					$location.path(urltoNavigateTo);
				}else{
					$state.go('dashboard.list');
				}
			}

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
});
