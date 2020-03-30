define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsViewParkedMessagesCtrl', [
		'$scope', '$stateParams', 'CompetingService', 'MessageService', 
		function ($scope, $stateParams, competingService, msg) {
			$scope.streamId = $stateParams.streamId;
			$scope.groupName = $stateParams.groupName;
			competingService.viewParkedMessages($scope.streamId, $scope.groupName)
				.success(function(data){
					//TODO: Add null checks
					$scope.entries = data["entries"];
					console.log($scope.entries["entries"]);
				});
		}
	]);
});