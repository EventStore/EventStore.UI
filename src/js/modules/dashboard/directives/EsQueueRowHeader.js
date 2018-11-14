define(['./_module'], function (app) {

    'use strict';

    return app.directive('esQueueRowHeader', [function () {
		return {
			restrict: 'A',
			templateUrl: 'dashboard.row.header.tpl.html',
			scope: {
				esQueue: '='
			},
			link: function (scope, elem) {

				scope.toggle = function () {
					scope.esQueue.show = !scope.esQueue.show;
				};

				function toggle(){
					scope.$apply(function () {
						scope.toggle();
					});
				}
				elem.bind('click', toggle);
				scope.$on('$destroy', function () {
					elem.unbind('click', toggle);
				});
			}
		};
	}]);


});