define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsViewParkedMessagesCtrl', [
		'$scope', '$stateParams', 'CompetingService', 'MessageService', 
		function ($scope, $stateParams, competingService, msg) {
			var defaultPageSize = 20;
			$scope.streamId = $stateParams.streamId;
			$scope.groupName = $stateParams.groupName;
			$scope.$parent.showHeader = false;

			competingService.viewParkedMessagesBackward($scope.streamId, $scope.groupName, "head", defaultPageSize)
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
			$scope.pageForward = function(entries){
				if (entries!=undefined && entries.length > 0){
					var fromEvent = entries[0]["positionEventNumber"]+1;
					competingService.viewParkedMessagesForward($scope.streamId, $scope.groupName,fromEvent,defaultPageSize)
					.success(function(data){
						if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0)
							$scope.entries = data["entries"];
					});
				}
			};
			$scope.pageBackward = function(entries){
				if (entries!=undefined && entries.length > 0){
					var fromEvent = entries[entries.length-1]["positionEventNumber"]-1;
					competingService.viewParkedMessagesBackward($scope.streamId, $scope.groupName,fromEvent,defaultPageSize)
					.success(function(data){
						if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0) {
							$scope.entries = data["entries"];
						}
					});
				}
			};
			$scope.pageFirst = function(entries){
				competingService.viewParkedMessagesBackward($scope.streamId, $scope.groupName,"head",defaultPageSize)
				.success(function(data){
					if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0) {
						$scope.entries = data["entries"];
					}
				});
			};
			$scope.pageLast = function(entries){
				competingService.viewParkedMessagesForward($scope.streamId, $scope.groupName,0,defaultPageSize)
				.success(function(data){
					if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0) {
						$scope.entries = data["entries"];
					}
				});
			};

		}
	]);
});