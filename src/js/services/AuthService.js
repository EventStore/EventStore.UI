/*jshint sub: true*/
define(['./_module'], function (app) {

	'use strict';

	// http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/
	return app.factory('AuthService', [
		'Base64', 
		'$q',
		'$cookieStore', 
		'$http', 
		'$rootScope',
		'$location',
		'urls',
		function (Base64, $q, $cookieStore, $http, $rootScope, $location, urls) {
			// initialize to whatever is in the cookie, if anything
			// i know, hoising, but i don't like jshint warnings
			var currentUrl = $location.host() + ':' + $location.port();

			function getCredentialsFromCookie(server){
				var escreds = $cookieStore.get('es-creds');
				if(!escreds || !escreds.servers[server]){
					return null;
				}
				return escreds.servers[server].credentials;
			}

			function clearCredentials(server){
	            document.execCommand('ClearAuthenticationCache');
		        $http.defaults.headers.common.Authorization = 'Basic ';
	            var escreds = $cookieStore.get('es-creds');
	            if(escreds){
	            	escreds.servers[server] = {};
	            	$cookieStore.put('es-creds', escreds);
	            }
			}

			function addCredentialsToCookie(server, username, password){
				var escreds = $cookieStore.get('es-creds');
				if(!escreds){
					escreds = {
						servers : {}
					}
				}
				escreds.servers[server] = {
					credentials : Base64.encode(username + ':' + password)
				}
				$cookieStore.put('es-creds', escreds);
			}

			function setBaseUrl (url) {
				$rootScope.baseUrl = url;
			}

			var escreds = getCredentialsFromCookie(currentUrl);
			if(escreds) {
				setBaseUrl(currentUrl);
				escreds = escreds.credentials;
			}
 
 			function prepareUrl (str) {
				if(str.indexOf('/', str.length - '/'.length) !== -1) {
	            	str = str.substring(0, str.length - 1);
	            }

	            if(str.indexOf('http') === -1) {
	            	str = 'http://' + str;
	            }

	            return str;
			}


		    return {
		        setCredentials: function (username, password, server) {
		            var credentials = Base64.encode(username + ':' + password);
		            $http.defaults.headers.common.Authorization = 'Basic ' + credentials;

		            server = prepareUrl(server);
		            setBaseUrl(server);

		            addCredentialsToCookie(server, username, password);
		        },
		        clearCredentials: function () {
		            clearCredentials($rootScope.baseUrl);
		        },
		        existsAndValid: function (server) {
		        	var deferred = $q.defer();
		        	var credentials = getCredentialsFromCookie(server);
		        	if(!credentials) {
		        		deferred.reject('Data does not exists');
		        	} else {
		        		this.validate(credentials, server)
		        		.success(function() {
		        			deferred.resolve();
		        		})
		        		.error(function (){
		        			deferred.reject('Wrong credentials or server not exists');
		        		});
		        	}

		        	return deferred.promise;
		        },
		        validate: function (username, password, server) {
		        	var credentials;
		        	if(!server) {
		        		server = password;
		        		credentials = username;
		        	} else {
		        		credentials = Base64.encode(username + ':' + password);
		        	}

		            server = prepareUrl(server);
		            setBaseUrl(server);
					$http.defaults.headers.common['Authorization'] = 'Basic ' + (credentials || '');
		        	return $http.get(server + urls.system.info, {
		        		headers: {
		        			'Accept': '*/*',
		        			Authorization: 'Basic ' + credentials
		        		}
		        	});
		        }
		    };
		}
	]);
});