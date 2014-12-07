define(['./_module'], function (app) {

	'use strict';

	return app.provider('SubscriptionsMapper', function () {
		function map (data, source) {
	        return data;
		}

		this.$get = [
			function () {
				return {
					map: map
				};
			}
		];
    });

});