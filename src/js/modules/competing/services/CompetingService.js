define(['./_module'], function (app) {

	'use strict';

	return app.provider('CompetingService', function () {

		this.$get = [
			'$http', 'urls', 'UrlBuilder',
			function ($http, urls, urlBuilder) {

				return {
					subscriptions: function () {
						var url = urlBuilder.build(urls.competing.subscriptions);
						return $http.get(url);
					},
					subscriptionDetail: function(subscriptionId, groupName){
                        subscriptionId = encodeURIComponent(subscriptionId);
						var url = urlBuilder.build(urls.competing.subscriptionDetails, subscriptionId, groupName);
						return $http.get(url);	
					},
					create: function (stream, subscription, config) {
                        stream = encodeURIComponent(stream);
						var url = urlBuilder.build(urls.competing.create, stream, subscription);
						return $http.put(url, config, {
							headers: {
                                'Content-Type':'application/json'
                            }
						});
					},
					update: function (stream, subscription, config) {
                        stream = encodeURIComponent(stream);
						var url = urlBuilder.build(urls.competing.update, stream, subscription);
						return $http.post(url, config, {
							headers: {
                                'Content-Type':'application/json'
                            }
						});
					},
					delete: function (stream, subscription) {
                        stream = encodeURIComponent(stream);
						var url = urlBuilder.build(urls.competing.delete, stream, subscription);
						return $http.delete(url, {
							headers: {
                                'Content-Type':'application/json'
                            }
						});
					},
				};
			}
		];
    });
});