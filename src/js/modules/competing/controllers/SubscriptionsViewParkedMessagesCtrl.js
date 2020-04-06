define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsViewParkedMessagesCtrl', [
		'$scope', '$stateParams', 'CompetingService', 'MessageService', 
		function ($scope, $stateParams, competingService, msg) {
			var defaultPageSize = 20;
			$scope.streamId = $stateParams.streamId;
			$scope.groupName = $stateParams.groupName;
			competingService.viewParkedMessages($scope.streamId, $scope.groupName)
				.success(function(data){
					if (data.entries!=undefined){
						$scope.entries = data["entries"];
					}else{
						$scope.entries = []
					}
				});
			$scope.toggleJson = function ($event, evt) {
				$event.preventDefault();
				$event.stopPropagation();
				evt.showJson = !evt.showJson;
				showJson[evt.title] = evt.showJson;
			};
			$scope.canGoForward = function(){
				return true;
			};
			$scope.canGoBackward = function(){
				return true;
			};
			$scope.pageForward = function(entries){
				if (entries!=undefined && entries.length > 0){
					var fromEvent = entries[0]["positionEventNumber"]+defaultPageSize+1;
					competingService.viewParkedMessagesFromCount($scope.streamId, $scope.groupName,entries[0]["eventNumber"],defaultPageSize)
					.success(function(data){
						if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0)
							$scope.entries = data["entries"];
					});
				}
			};
			$scope.pageBackward = function(entries){
				if (entries!=undefined && entries.length > 0){
					var fromEvent = entries[entries.length-1]["positionEventNumber"]-1;
					competingService.viewParkedMessagesFromCount($scope.streamId, $scope.groupName,fromEvent,defaultPageSize)
					.success(function(data){
						if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0) {
							$scope.entries = data["entries"];
						}
					});
				}
			};
		}
	]);
});