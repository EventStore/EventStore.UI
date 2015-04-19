define(['./_module'], function (app) {

    'use strict';

    return app.controller('DashboardListCtrl', [
		'$scope', 'DashboardService', 'DashboardMapper', 'poller', 'MessageService', 
		function ($scope, dashboardService, dashboardMapper, pollerProvider, msg) {

			var statsPoll = pollerProvider.create({
				interval: 1000,
				action: dashboardService.stats,
				params: []
			});

			$scope.queues = {};
			$scope.queues.__tag = "queues";

			statsPoll.start();
			statsPoll.promise.then(null, null, function (data) { 
				$scope.queues = dashboardMapper.map(data, $scope.queues);
			});
			statsPoll.promise.catch(function () {
				msg.failure('An error occured.');
				$scope.queues = null;
				statsPoll.stop(); // if error we do not want to continue...
			});
			
			$scope.$on('$destroy', function () {
				pollerProvider.clear();
				$scope.queues = {};
			});
		}
	]);
});