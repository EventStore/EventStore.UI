define(['./_module'], function (app) {

    'use strict';

    return app.controller('AdminCtrl', [
		'$scope', 'AdminService',
		function ($scope, adminService) {

			var stop = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
				};

			$scope.halt = function ($event) {
				stop($event);

				adminService.halt().then(function () {
					alert('server halted');
				}, function () {
					alert('halt failed');
				});
			};

			$scope.shutdown = function ($event) {
				stop($event);

				adminService.shutdown().then(function () {
					alert('server shutdown');
				}, function () {
					alert('halt failed');
				});
			};

			$scope.scavenge = function ($event) {
				stop($event);

				adminService.scavenge().then(function () {
					alert('ok');
				}, function () {
					alert('scavenge failed');
				});
			};
		}
	]);


});