define(['./_module'], function (app) {

	'use strict';

	return app.provider('AdminService', function () {
		this.$get = [
			'$http', 'urls', 'UrlBuilder',
			function ($http, urls, urlBuilder) {

				return {
					halt: function () {
						var url = urlBuilder.build(urls.admin.halt);
						return $http.post(url);
					},
					shutdown: function () {
						var url = urlBuilder.build(urls.admin.shutdown);
						return $http.post(url);
					},
					maintenance: function () {
						var url = urlBuilder.build(urls.admin.maintenance);
						return $http.post(url);
					},
					disablemaintenance: function () {
						var url = urlBuilder.build(urls.admin.disablemaintenance);
						return $http.post(url);
					},
					scavenge: function () {
						var url = urlBuilder.build(urls.admin.scavenge);
						return $http.post(url);
					},
					stopScavenge: function($scavengeId){
						var url = urlBuilder.build(urls.admin.scavenge + '/' + $scavengeId);
						return $http.delete(url);
					},
					getSubsystems: function() {
                        var url = urlBuilder.build(urls.system.subsystems);
                        return $http.get(url);
                    },
                    scavengeStatus: function() {
                    	var url = urlBuilder.build(urls.streams.scavenges + '?embed=tryharder');
                    	return $http.get(url);
                    },
                    scavengeInfo: function(scavengeId, fromEvent, pageSize) {
                    	var url = urlBuilder.build(urls.streams.scavenges + '-' + scavengeId + '/' + fromEvent + '/' + pageSize + '?embed=tryharder');
                    	return $http.get(url);
                    },
                    lastScavengeStatus: function() {
                    	var url = urlBuilder.build(urls.streams.scavenges + '/head/1?embed=tryharder');
                    	return $http.get(url);
                    }
				};
		}];
	});

});
