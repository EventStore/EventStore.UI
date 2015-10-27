define(['./_module'], function (app) {

	'use strict';

	return app.provider('ClusterStatusService', function () {

		this.$get = [
			'$http', 'urls', 'UrlBuilder',
			function ($http, urls, urlBuilder) {

				return {
					gossip: function () {
						var url = urlBuilder.build(urls.gossip);

						return $http.get(url);
					}
				};
			}
		];
    });
});