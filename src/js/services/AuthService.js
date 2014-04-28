/*jshint sub: true*/
define(['./_module'], function (app) {

	'use strict';

	// http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/
	return app.factory('AuthService', [
		'Base64', 
		'$cookieStore', 
		'$http', 
		function (Base64, $cookieStore, $http) {
			// initialize to whatever is in the cookie, if anything
			var authdata = $cookieStore.get('authdata');
			$http.defaults.headers.common['Authorization'] = 'Basic ' + (authdata || '');
 
		    return {
		        setCredentials: function (username, password) {
		            var encoded = Base64.encode(username + ':' + password);
		            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
		            $cookieStore.put('authdata', encoded);
		        },
		        clearCredentials: function () {
		            document.execCommand('ClearAuthenticationCache');
		            $cookieStore.remove('authdata');
		            $http.defaults.headers.common.Authorization = 'Basic ';
		        }
		    };
		}
	]);
});