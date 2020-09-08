define(['es-ui'], function (app) {

	'use strict';
    app.config(['toastrConfig', function(toastrConfig){
        angular.extend(toastrConfig, {
            timeOut: 0,
            preventDuplicates: true
        });
    }]);
	return app.run([
        '$rootScope', '$location', '$state', '$stateParams', 'AuthService', 'InfoService', 'ScavengeNotificationService', 'MessageService','$http',
        function ($rootScope, $location, $state, $stateParams, authService, infoService, scavengeNotificationService, msg, $http) {
            $rootScope.baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();
            /*$rootScope.baseUrl = 'https://127.0.0.1:2113'; //uncomment during development*/
            $rootScope.projectionsEnabled = false;
            $rootScope.userManagementEnabled = false;
            $rootScope.streamsBrowserEnabled = false;
            $rootScope.logoutEnabled = true;
            $rootScope.logoutButtonText = 'Log Out';
            $rootScope.logoutText = 'You have been logged out.';
            $rootScope.singleNode = true;

            authService.loadCredentials();

            infoService.getInfo()
            .then(function(res){
                var info = res.data;
                $rootScope.esVersion = info.esVersion || '0.0.0.0';
                $rootScope.esVersion = $rootScope.esVersion  === '0.0.0.0' ? 'development build' : $rootScope.esVersion;
                $rootScope.projectionsEnabled = info.features.projections === true;
                $rootScope.userManagementEnabled = info.features.userManagement === true;
                $rootScope.streamsBrowserEnabled = info.features.atomPub === true;
                $rootScope.authentication = info.authentication;
                $rootScope.logoutEnabled = info.authentication.type !== 'insecure';
                $rootScope.logoutButtonText = info.authentication.type === 'oauth' ? 'Disconnect' : $rootScope.logoutButtonText;
                $rootScope.logoutText = info.authentication.type === 'oauth' ? 'You have been disconnected.' : $rootScope.logoutText;
                $rootScope.previousUrl = $location.$$path;

                authService.existsAndValid()
                .then(function () {
                    setSingleNodeOrCluster();
                    redirectAfterLoggingIn();
                }, function () {
                    if($rootScope.authentication.type === 'oauth'){
                        var authorizationEndpoint = $rootScope.authentication.properties.authorization_endpoint;
                        var clientId = encodeURIComponent($rootScope.authentication.properties.client_id);
                        var responseType = encodeURIComponent($rootScope.authentication.properties.response_type);
                        var scope = encodeURIComponent($rootScope.authentication.properties.scope);
                        var codeChallengeUri = $rootScope.baseUrl + $rootScope.authentication.properties.code_challenge_uri;

                        $http.get(codeChallengeUri)
                        .then(function(res){
                            var codeChallenge = res.data.code_challenge;
                            var codeChallengeMethod = res.data.code_challenge_method;
                            var state = {
                                'code_challenge_correlation_id': res.data.code_challenge_correlation_id
                            };
                            state = btoa(JSON.stringify(state));
                            var redirectUri = encodeURIComponent($rootScope.baseUrl + $rootScope.authentication.properties.redirect_uri);
                            var authorizationUri = authorizationEndpoint + '?response_type=' + responseType + '&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=' + scope + '&code_challenge=' + codeChallenge + '&code_challenge_method=' + codeChallengeMethod + '&state=' + state;
                            window.location.href = authorizationUri;
                        },
                        function(){
                            msg.failure('Could not fetch OAuth code challenge');
                        });
                    } else{
                        //default behaviour is to sign-in with username/password
                        $state.go('signin');
                    }
                });
            }, function(error){
                msg.failure('Failed to load /info endpoint: ' + error.message);
                authService.clearCredentials();
            });
            
            function setSingleNodeOrCluster(){
                scavengeNotificationService.start();
                infoService.getOptions().then(function onGetOptions(response){
                    var options = response.data;
                    for (var index in options) {
                        if(options[index].name === 'ClusterSize' && options[index].value > 1){
                            $rootScope.singleNode = false;
                        }
                    }
                }, function(error){
                    if(error.statusCode === 401){
                        return;
                    }
                    msg.failure('Failed to load options: ' + error.message);
                });
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
