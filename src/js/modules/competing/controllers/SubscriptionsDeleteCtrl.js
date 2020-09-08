/*jshint sub: true*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsDeleteCtrl', [
		'$scope', '$state', 'CompetingService', 'MessageService',
		function ($scope, $state, competingService, msg) {
			$scope.stream = $state.params.streamId;
			$scope.subscription = $state.params.groupName;

			$scope.delete = function () {
				var confirmation = msg.confirm('Are you sure you wish to delete the subscription?');
				if(!confirmation){
					return;
				}
				competingService.delete($scope.stream, $scope.subscription)
				.then(function(){
						msg.success('Subscription has been deleted');
						$state.go('subscriptions.list');
				},function(error){
						msg.failure('Failed to delete subscription: ' + error.message);
				});
			};
		}
	]);
});