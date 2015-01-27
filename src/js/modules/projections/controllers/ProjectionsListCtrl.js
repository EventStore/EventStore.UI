define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsListCtrl', [
		'$scope', 'ProjectionsService', 'ProjectionsMapper', 'poller', 'MessageService',
		function ($scope, projectionsService, projectionsMapper, pollerProvider, msg) {

			var all = pollerProvider.create({
				intevral: 2000,
				action: projectionsService.all
			});

			all.start();
			all.promise.then(null, null, function (data) {
				$scope.projections = projectionsMapper.map(data);
			});

			all.promise.catch(function () {
				msg.failure('An error occurred');
				all.stop();
			});

			$scope.disableAll = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				var confirmation = msg.confirm('Are you sure you want to disable & stop all projections?');

				if(!confirmation) {
					return;
				}

				projectionsService.disableAll().then(function () {
					msg.success('All projections have been disabled');
				}, function (err) {
					msg.failure('Disabling all the projections have failed, reason :' + '\n\r' + err);
				});
			};

			$scope.enableAll = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				var confirmation = msg.confirm('Are you sure you want to enable & start all projections?');

				if(!confirmation) {
					return;
				}

				projectionsService.enableAll().then(function () {
					msg.success('All projections have been enabled');
				}, function (err) {
					msg.failure('Enabling all projections have failed, reason : ' + '\n\r' + err);
				});
			};

			$scope.includeQueries = false;
			$scope.toggleIncludeQueries = function(){
				$scope.includeQueries = !$scope.includeQueries;
			}
			$scope.$watch('includeQueries', function (newVal, oldVal) {
				if(newVal !== oldVal) {
					all.update({params: [newVal]});
				}
				
			});
			$scope.$on('$destroy', function () {
				pollerProvider.clear();
			});
		}
	]);
});
