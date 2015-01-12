define(['./_module'], function (app) {

    'use strict';

    return app.controller('AdminCtrl', [
		'$scope', 'AdminService', 'MessageService',
		function ($scope, adminService, msg) {
			$scope.subSystems = [];
			adminService.getSubsystems()
			.success(function(data){
				if(!data){
					return;
				}
				$scope.subSystems = data;
			})
			.error(function(){
				msg.failure('could not get sub systems');
			});
			var stop = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
				};

			$scope.shutdown = function ($event) {
				stop($event);

				adminService.shutdown().then(function () {
					msg.info('server shutdown');
				}, function () {
					msg.failure('halt failed');
				});
			};

			$scope.scavenge = function ($event) {
				stop($event);

				adminService.scavenge().then(function () {
					msg.info('ok');
				}, function () {
					msg.failure('scavenge failed');
				});
			};
		}
	]);
});