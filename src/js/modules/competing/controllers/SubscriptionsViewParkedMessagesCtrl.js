define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsViewParkedMessagesCtrl', [
		'$scope', '$stateParams', 'CompetingService', 'MessageService', 'poller',
		function ($scope, $stateParams, competingService, msg, pollerProvider) {
			var defaultPageSize = 20;
			$scope.streamId = $stateParams.streamId;
			$scope.groupName = $stateParams.groupName;
			$scope.$parent.showHeader = false;
			var showJson = {};
			
			competingService.viewParkedMessagesBackward($scope.streamId, $scope.groupName, "head", defaultPageSize)
				.success(function(data){
					if (data.entries!=undefined){
						$scope.entries = data["entries"];
					}else{
						$scope.entries = []
					}
				});
			
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
			$scope.pageForwardPoll = function(){
				var fromEvent = 0
				if ($scope.entries!=undefined && $scope.entries.length > 0){
					fromEvent = $scope.entries[0]["positionEventNumber"]+1;
				}
				return competingService.viewParkedMessagesForward($scope.streamId, $scope.groupName,fromEvent,defaultPageSize);
			};


			var firstPagePoll  = pollerProvider.create({
				interval: 5000,
				action: $scope.pageForwardPoll,
				params: []
			});

			firstPagePoll.start();
			firstPagePoll.promise.then(null, null, function (data) {
				if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0){
					//add new entries
					for(var entry in data["entries"]){
						if (data["entries"][entry]["positionEventNumber"] > $scope.entries[0]["positionEventNumber"])
							$scope.entries.unshift(data["entries"][entry]);
					}
				}
					
			});
			firstPagePoll.promise.catch(function () {
				msg.failure('An error occured.');
				firstPagePoll.stop(); 
			});

			$scope.pageBackward = function(entries){
				firstPagePoll.stop();
				if (entries!=undefined && entries.length > 0){
					var fromEvent = entries[entries.length-1]["positionEventNumber"]-1;
					competingService.viewParkedMessagesBackward($scope.streamId, $scope.groupName,fromEvent,defaultPageSize)
					.success(function(data){
						firstPagePoll.stop();
						if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0) {
							$scope.entries = data["entries"];
						}
					});
				}
				
			};
			
			$scope.pageFirst = function(){
				competingService.viewParkedMessagesBackward($scope.streamId, $scope.groupName,"head",defaultPageSize)
				.success(function(data){
					if(data!==undefined && data["entries"]!==undefined && data["entries"].length > 0) {
						$scope.entries = data["entries"];
					}
				});
				firstPagePoll.start();
			};

			$scope.$on('$destroy', function () {
				firstPagePoll.clear();
			});
			
			$scope.toggleJson = function ($event, evt) {
				$event.preventDefault();
				$event.stopPropagation();
				evt.showJson = !evt.showJson;
				showJson[evt.title] = evt.showJson;
			};

		}
	]);
});