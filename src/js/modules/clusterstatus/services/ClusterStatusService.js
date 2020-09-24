define(['./_module'], function (app) {

	'use strict';

	return app.provider('ClusterStatusService', function () {

		this.$get = [
			'$http', 'urls', 'UrlBuilder', '$q', '$location',
			function ($http, urls, urlBuilder, $q, $location) {

				return {
					gossip: function () {
						var url = urlBuilder.build(urls.gossip);

						return $http.get(url);
					},
					replicaStats: function(leaderUrl) {
						if(!leaderUrl) {
							var deferred = $q.defer();
							deferred.resolve({});
							return deferred.promise;
						}
						var url = $location.protocol() + '://' + leaderUrl + urls.replicationStats;
						return $http.get(url);
					}
				};
			}
		];
    });
});