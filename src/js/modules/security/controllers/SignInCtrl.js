define(['./_module'], function (app) {

    'use strict';

    return app.controller('SignInCtrl', [
		'$scope', '$rootScope', '$state', '$location', 'AuthService', 'MessageService', 'InfoService', 'ScavengeNotificationService',
		function ($scope, $rootScope, $state, $location, authService, msg, infoService, scavengeNotificationService) {

			$scope.log = {
				username: '',
				password: '',
				server: $location.protocol() + '://' + $location.host() + ':' + $location.port()
			};

			if(!$location.host()) {
				$scope.log.server = 'https://127.0.0.1:2113';
			}

			$scope.signIn = function () {
				if ($scope.login.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				authService.validate($scope.log.username, $scope.log.password, $scope.log.server)
				.success(function (info) {
					$rootScope.singleNode = true;
					$rootScope.esVersion = info.esVersion || '0.0.0.0';
                    $rootScope.esVersion = $rootScope.esVersion  === '0.0.0.0' ? 'development build' : $rootScope.esVersion;
                    $rootScope.projectionsEnabled = info.features.projections === true;
                    $rootScope.userManagementEnabled = info.features.userManagement === true;
                    $rootScope.streamsBrowserEnabled = info.features.atomPub === true;

                    authService.getUserGroups($scope.log.username).then(function(groups) {
						authService.setCredentials($scope.log.username, $scope.log.password, $scope.log.server, groups);
						if($rootScope.isAdminOrOps) {
	                    	scavengeNotificationService.start();
		                    infoService.getOptions().then(function onGetOptions(response){
		                        var options = response.data;
		                        for (var index in options) {
		                            if(options[index].name === 'ClusterSize' && options[index].value > 1){
		                                $rootScope.singleNode = false;
		                            }
		                        }
								redirectAfterLoggingIn();
		                    });
	                	} else {
	                		redirectAfterLoggingIn();
	                	}
                    });
				})
				.error(function () {
					msg.warn('Server does not exist or incorrect user credentials supplied.');
				});
			};


			function redirectAfterLoggingIn() {
				if($rootScope.previousUrl && $rootScope.previousUrl !== '/'){
					var urltoNavigateTo = $rootScope.previousUrl;
					$rootScope.previousUrl = null;
					$location.path(urltoNavigateTo);
				}else{
					$state.go('dashboard.list');
				}
			}

			function checkCookie () {
				authService.existsAndValid($scope.log.server)
				.then(function () {
					redirectAfterLoggingIn();
				});
			}

			checkCookie();

		}
	]);


});
