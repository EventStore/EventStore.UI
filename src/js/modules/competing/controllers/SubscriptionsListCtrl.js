define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsListCtrl', [
		'$scope', 'CompetingService', 'SubscriptionsMapper', 'poller', 'MessageService', 
		function ($scope, competingService, subscriptionsMapper, pollerProvider, msg) {

			var subscriptionsPoll  = pollerProvider.create({
				intevral: 1000,
				action: competingService.subscriptions,
				params: []
			});

			$scope.subscriptions = {};

			subscriptionsPoll.start();
			subscriptionsPoll.promise.then(null, null, function (data) { 
				console.log(data);
				$scope.subscriptions = subscriptionsMapper.map(data, $scope.subscriptions);
			});
			subscriptionsPoll.promise.catch(function () {
				msg.error('An error occured.');
				$scope.subscriptions = null;
				subscriptionsPoll.stop(); 
			});
			
			$scope.$on('$destroy', function () {
				pollerProvider.clear();
			});
		}
	]);
});