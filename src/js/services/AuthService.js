/*jshint sub: true*/
define(['./_module'], function (app) {

	'use strict';

	return app.factory('AuthService', [
		'Base64', 
		'$q',
		'$cookies',
		'$cookieStore', 
		'$http', 
		'$rootScope',
		'$location',
		'urls',
		'UrlBuilder',
		function (Base64, $q, $cookies, $cookieStore, $http, $rootScope, $location, urls, urlBuilder) {
			function getCredentialsFromCookie(){
				var escreds = $cookieStore.get('es-creds');
				if(!escreds){
					return null;
				}
				return escreds.credentials;
			}

			function getGroupsFromCookie(){
				var escreds = $cookieStore.get('es-creds');
				if(!escreds){
					return null;
				}
				return escreds.groups;
			}

			function trySetIdTokenFromCookie(){
				var oauthIdToken = $cookies['oauth_id_token'];
				if(!oauthIdToken){
					return;
				}

				document.cookie='oauth_id_token=;path=/;max-age=-1';
				$http.defaults.headers.common.Authorization = 'Bearer ' + oauthIdToken;
			}

			function clearCredentials(){
	            document.execCommand('ClearAuthenticationCache');
		        $http.defaults.headers.common.Authorization = undefined;
	            $cookieStore.remove('es-creds');
			}

			function addCredentialsToCookie(username, password, groups){
				var escreds = $cookieStore.get('es-creds');
				if(!escreds){
					escreds = {};
				}
				escreds = {
					credentials : Base64.encode(username + ':' + password),
					groups : groups
				};
				$cookieStore.put('es-creds', escreds);
			}

			function setUserRole(groups) {
				$rootScope.isAdmin = false;
				$rootScope.isOps = false;
				if(groups && groups.length > 0)
				{
					$rootScope.isAdmin = groups.indexOf('$admins') > -1;
					$rootScope.isOps = groups.indexOf('$ops') > -1;
				}
				$rootScope.isAdminOrOps = $rootScope.isAdmin || $rootScope.isOps;
			}

			var escreds = getCredentialsFromCookie();
			if(escreds) {
				escreds = escreds.credentials;
			}

		    return {
		        setCredentials: function (username, password, groups) {
		            var credentials = Base64.encode(username + ':' + password);
		            
		            $http.defaults.headers.common.Authorization = 'Basic ' + credentials;

					setUserRole(groups);
		            addCredentialsToCookie(username, password, groups);
				},
				loadCredentials: function(){
					var credentials = getCredentialsFromCookie();
					if (!credentials){
						return;
					}
					$http.defaults.headers.common.Authorization = 'Basic ' + credentials;
				},
		        clearCredentials: function () {
		            clearCredentials();
		        },
		        existsAndValid: function () {
					var deferred = $q.defer();
					
					if($rootScope.authentication.type === 'insecure'){
						setUserRole(['$admins']);
						deferred.resolve();
					}
					else if($rootScope.authentication.type === 'oauth'){
						trySetIdTokenFromCookie();
						var authHeader = $http.defaults.headers.common.Authorization;
						if(authHeader !== undefined && authHeader.startsWith('Bearer ')){
							deferred.resolve();
						} else{
							deferred.reject('Not authenticated');
						}
					}
					else {
						var credentials = getCredentialsFromCookie();
						if(!credentials) {
							deferred.reject('Data does not exists');
						} else {
							var parts = Base64.decode(credentials).split(':');
							this.validate(parts[0], parts[1])
							.success(function() {
								var groups = getGroupsFromCookie();
								setUserRole(groups);
								deferred.resolve();
							})
							.error(function (){
								deferred.reject('Wrong credentials');
							});
						}
					}

		        	return deferred.promise;
		        },
		        resetCredentials: function(username, newPassword){
		        	var deferred = $q.defer();
		        	var credentials = getCredentialsFromCookie();
		        	var storedUsername = Base64.decode(credentials).split(':')[0];
					if(storedUsername === username){
		        		this.validate(username, newPassword)
		        		.success(function() {
		        			deferred.resolve();
		        		})
		        		.error(function (){
		        			deferred.reject('Wrong credentials');
		        		});
		        	}else{
		        		deferred.resolve();
		        	}
	        		return deferred.promise;
		        },
		        validate: function (username, password) {
		        	var credentials = Base64.encode(username + ':' + password);
					$http.defaults.headers.common['Authorization'] = 'Basic ' + (credentials || '');
		        	return $http.get($rootScope.baseUrl + urls.system.info, {
		        		headers: {
		        			'Accept': '*/*',
		        			Authorization: 'Basic ' + credentials
		        		}
		        	});
		        },
		        getUserGroups: function(username) {
		        	var deferred = $q.defer();
					$http.get(urlBuilder.build(urls.admin.login, username)).success(function(userInfo) {
		            	var groups = userInfo.data.groups;
		            	deferred.resolve(groups);
	            	});
	            	return deferred.promise;
		        }
		    };
		}
	]);
});