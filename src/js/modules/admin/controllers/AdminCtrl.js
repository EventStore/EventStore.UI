define(['./_module'], function (app) {

    'use strict';

    return app.controller('AdminCtrl', [
		'$scope', 'AdminService', 'MessageService',
		function ($scope, adminService, msg) {

			var stop = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
				};

			$scope.shutdown = function ($event) {
				stop($event);

				adminService.shutdown().then(function () {
					msg.info('server shutdown');
				}, function () {
					msg.error('halt failed');
				});
			};

			$scope.scavenge = function ($event) {
				stop($event);

				adminService.scavenge().then(function () {
					msg.info('ok');
				}, function () {
					msg.error('scavenge failed');
				});
			};
		}
	]);


});