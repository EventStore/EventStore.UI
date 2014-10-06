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
		'urls',
		function (Base64, $q, $cookieStore, $http, $rootScope, urls) {
			// initialize to whatever is in the cookie, if anything
			// i know, hoising, but i don't like jshint warnings
			function setBaseUrl (url) {
				$rootScope.baseUrl = url;
			}

			var authdata = $cookieStore.get('authdata');
			if(authdata) {
				setBaseUrl(authdata.server);
				authdata = authdata.encoded;
			}
			$http.defaults.headers.common['Authorization'] = 'Basic ' + (authdata || '');
 
			

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
		            var encoded = Base64.encode(username + ':' + password);
		            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;

		            server = prepareUrl(server);
		            setBaseUrl(server);

		            $cookieStore.put('authdata', {
		            	encoded: encoded,
		            	server: server
		            });
		        },
		        clearCredentials: function () {
		            document.execCommand('ClearAuthenticationCache');
		            $cookieStore.remove('authdata');
		            $http.defaults.headers.common.Authorization = 'Basic ';
		        },
		        existsAndValid: function () {
		        	var deferred = $q.defer();
		        	var data = $cookieStore.get('authdata');
		        	
		        	if(!data) {
		        		deferred.reject('Data does not exists');
		        	} else {
		        		this.validate(data.encoded, data.server)
		        		.success(function() {
		        			deferred.resolve();
		        		})
		        		.error(function (){
		        			deferred.reject('Wrong credentials or server not exists');
		        		});
		        	}

		        	return deferred.promise;
		        },
		        storeServer: function (server) {
		        	$cookieStore.put('es-server', {
		        		server: server
		        	});
		        },
		        getServer: function () {
		        	var s = $cookieStore.get('es-server');
		        	if(s && s.server) {
		        		return s.server;
		        	}

		        	return '';
		        },
		        validate: function (username, password, server) {
		        	var encoded;
		        	if(!server) {
		        		server = password;
		        		encoded = username;
		        	} else {
		        		encoded = Base64.encode(username + ':' + password);
		        	}

		            server = prepareUrl(server);
		        	return $http.get(server + urls.system.info, {
		        		headers: {
		        			'Accept': '*/*',
		        			Authorization: 'Basic ' + encoded
		        		}
		        	});
		        }
		    };
		}
	]);
});