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
				msg.failure('Could not retrieve sub systems');
			});
			var stop = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
				};

			$scope.shutdown = function ($event) {
				stop($event);

				adminService.shutdown().then(function () {
					msg.success('Server shutdown initiated');
				}, function () {
					msg.failure('Shutdown failed');
				});
			};

			$scope.scavenge = function ($event) {
				stop($event);

				adminService.scavenge().then(function () {
					msg.success('Scavenge initiated');
				}, function () {
					msg.failure('Scavenge failed');
				});
			};
		}
	]);
});