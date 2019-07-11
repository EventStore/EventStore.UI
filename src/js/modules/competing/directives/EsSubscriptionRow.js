define(['./_module'], function (app) {

    'use strict';

    return app.directive('esSubscriptionRow', [function ($rootScope) {
		return {
			restrict: 'A',
			templateUrl: 'subscription.row.tpl.html',
			scope: {
				esSubscription: '='
			},
			link: function () {
			}
		};
	}]);
});