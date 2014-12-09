define(['./_module'], function (app) {

    'use strict';

    return app.directive('esSubscriptionRowHeader', [function () {
		return {
			restrict: 'A',
			templateUrl: 'subscription.row.header.tpl.html',
			scope: {
				esSubscription: '='
			},
			link: function (scope, elem) {
				scope.toggle = function () {
					scope.esSubscription.show = !scope.esSubscription.show;
				};

				elem.bind('click', function () {
					scope.$apply(function () {
						scope.toggle();
					});
				});
			}
		};
	}]);
});