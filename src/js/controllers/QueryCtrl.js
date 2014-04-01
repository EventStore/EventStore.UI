define(['./_module'], function (app) {

    'use strict';

    return app.controller('QueryCtrl', [
		'$scope', 
		function ($scope) {

			$scope.aceConfig = {
				mode: 'javascript',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};
		}
	]);
});