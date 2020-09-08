define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsDetailCtrl', [
		'$scope', '$stateParams', 'CompetingService', 'MessageService', 
		function ($scope, $stateParams, competingService, msg) {
			$scope.streamId = $stateParams.streamId;
			$scope.groupName = $stateParams.groupName;
			competingService.subscriptionDetail($scope.streamId, $scope.groupName)
				.then(function(res){
					$scope.detail = res.data;
				}, function(error){
					msg.failure('Failed to retrieve subscription details: ' + error.message);
				});
		}
	]);
});