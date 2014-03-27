define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsItemDebugCtrl', [
		'$scope', '$stateParams',
		function ($scope, $stateParams) {

			$scope.location = $stateParams.location;
		}
	]);
});