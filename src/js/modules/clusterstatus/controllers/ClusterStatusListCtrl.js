define(['./_module'], function (app) {

    'use strict';

    return app.controller('ClusterStatusListCtrl', ['$scope', 'poller', 'ClusterStatusService', 'InfoService',
		function ClusterStatusListCtrl($scope, poller, clusterStatusService, infoService) {
			infoService.getOptions().then(
			function(response){
				var options = response.data;
				for (var index in options) {
					if(options[index].name == "ClusterSize" && options[index].value > 1){
						setupGossipPoller();
					}
				}
			}, 
			function(){

			});
			function setupGossipPoller(){
				var gossipQuery = poller.create({
			        interval: 1000,
			        action: clusterStatusService.gossip,
			        params: []
			    });
			    gossipQuery.start();
			    gossipQuery.promise.then(null, null, function (response) {
			        $scope.lastUpdatedTime = new Date();
			        if (response.error) {
			            $scope.errorMessage = "couldn't connect to manager";
			        } else {
			            $scope.errorMessage = '';
			            $scope.nodes = response.members;
			        }
			    });
			}
		    $scope.$on('$destroy', function () {
				poller.clear();
			});
		}]);
});