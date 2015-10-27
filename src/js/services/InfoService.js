/*jshint sub: true*/
define(['./_module'], function (app) {
	'use strict';
	return app.factory('InfoService', ['$http', '$rootScope', 'urls', 'UrlBuilder',
		function ($http, $rootScope, urls, urlBuilder) {
		    return {
		        getInfo: function () {
		        	var url = urlBuilder.build(urls.system.info);
                    return $http.get(url);
		        },
		        getOptions: function () {
		        	var url = urlBuilder.build(urls.system.options);
                    return $http.get(url);
		        }
		    };
		}
	]);
});