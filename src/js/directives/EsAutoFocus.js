define(['./_module'], function (app) {

    'use strict';
    
    return app.directive('esAutoFocus', ['$timeout', function ($timeout) {
		return {
			restrict: 'AC',
	        link: function(_scope, _element) {
	            $timeout(function(){
	                _element[0].focus();
	            }, 0);
	        }
		};
	}]);


});