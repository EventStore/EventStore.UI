define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsDetailCtrl', [
		'$scope', '$stateParams', 'CompetingService', 'MessageService', 
		function ($scope, $stateParams, competingService, msg) {
			$scope.streamId = $stateParams.streamId;
			$scope.groupName = $stateParams.groupName;
			competingService.subscriptionDetail($scope.streamId, $scope.groupName)
				.success(function(data){
					$scope.detail = data;
				});
		}
	]);
});