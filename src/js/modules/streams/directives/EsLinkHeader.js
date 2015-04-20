define(['./_module'], function (app) {

    'use strict';

    function destroy () {
		var elem = document.querySelector('link[type="application/atom+xml"]');

		if(elem) {
			document.head.removeChild(elem);
		}
    }

    return app.directive('esLinkHeader', [function () {
		return {
			restrict: 'A',
	        link: function(scope) { //, elm, attrs, ctrl

	        		var unbindHandler = scope.$on('add-link-header', function (evt, linkUrl) {

					destroy();

					var link = document.createElement('link');
		        	link.rel = 'alternative';
		        	link.type = 'application/atom+xml';
		        	link.href = linkUrl;
					
					document.head.appendChild(link);
				});
	        	scope.$on('$destroy', function esLinkHeaderScopeDestroyed(){
					unbindHandler();
				});
	        }
		};
	}]);


});