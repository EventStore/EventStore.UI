define(['./_module'], function (app) {

	'use strict';

	return app.provider('VisualizeService', function () {

		this.$get = [
			'$http', 'urls', 'UrlBuilder',
			function ($http, urls, urlBuilder) {
				return {
				};
			}
		];
    });

});
