define(['./_module'], function (app) {

    'use strict';

    return app.directive('esProjDebugFrame', [function () {
		return {
			restrict: 'A',
			templateUrl: 'projections.debug.frame.tpl.html',
			scope: {
				esLocation: '='
			},
			link: function (scope, elem) {
			}
		};
	}]);


});