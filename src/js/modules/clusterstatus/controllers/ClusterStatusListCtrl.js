define(['./_module'], function (app) {

    'use strict';

    return app.controller('ClusterStatusListCtrl', ['$scope', 'poller', 'ClusterStatusService', 'InfoService', 'constants', 'MessageService',
		function ClusterStatusListCtrl($scope, poller, clusterStatusService, infoService, constants, msg) {
            $scope.replicas = [];
            var leaderNodeUrl = '';

			infoService.getOptions().then(
			function(response){
				var options = response.data;
				for (var index in options) {
					if(options[index].name === 'ClusterSize' && options[index].value > 1){
						setupGossipPoller();
					}
				}
			},
			function(error){
                msg.failure('Failed to load options: ' + error.message);
            });

            var replicaStatsQuery;
			function setupGossipPoller(){
				var gossipQuery = poller.create({
			        interval: 1000,
			        action: clusterStatusService.gossip,
			        params: []
			    });
			    gossipQuery.start();
			    gossipQuery.promise.then(null, function(error){
                    msg.failure('Failed to retrieve gossip info: ' + error.message);
                }, function (response) {
			        $scope.lastUpdatedTime = new Date();
			        if (response.error) {
			            $scope.errorMessage = 'couldn\'t connect to manager';
			        } else {
			            $scope.errorMessage = '';
                        $scope.nodes = response.members;
                        var leader = getLeaderNode();
                        if(leader) {
                            var leaderUrl = leader.httpEndPointIp + ':' + leader.httpEndPointPort;
                            if(!replicaStatsQuery || leaderUrl !== leaderNodeUrl) {
                                leaderNodeUrl = leaderUrl;
                                setupReplicaStatsPoller();
                            }
                        }
                    }
                });
            }

            function setupReplicaStatsPoller() {
                replicaStatsQuery = poller.create({
                    interval: constants.clusterStatus.replicaPollInterval,
                    action: clusterStatusService.replicaStats,
                    params: [leaderNodeUrl]
                });
                replicaStatsQuery.start();
                replicaStatsQuery.promise.then(null, function(error){
                    msg.failure('Failed to retrieve replica stats: ' + error.message);
                }, function(response) {
                    var leader = getLeaderNode();
                    for(var i = 0; i < response.length; i++)
                    {
                        var replica = response[i];
                        var prevStats = getPrevStatsForReplica(replica.connectionId, $scope.replicas);
                        var node = getNodeForReplica(replica.subscriptionEndpoint, $scope.nodes);
                        calculateReplicaStats(replica, leader, node, prevStats);
                    }
                    $scope.replicas = response;
                });
            }

            function calculateReplicaStats(replica, leader, node, prevStats) {
                if (!node) return;
                replica.isCatchingUp = node.state === 'CatchingUp';
                replica.bytesToCatchUp = leader.writerCheckpoint - node.writerCheckpoint;

                replica.catchupStartTime = new Date().getTime();
                replica.catchupStartBytesSent = replica.totalBytesSent;

                if(prevStats) {
                    if(prevStats.isCatchingUp) {
                        replica.catchupStartTime = prevStats.catchupStartTime;
                        replica.catchupStartBytesSent = prevStats.catchupStartBytesSent;
                    }
                    var seconds = (new Date().getTime() - replica.catchupStartTime) / constants.clusterStatus.replicaPollInterval;
                    var bytes = replica.totalBytesSent - replica.catchupStartBytesSent;
                    replica.approxSpeed = Math.round(bytes / seconds);
                    var estimatedTime = Math.round(replica.bytesToCatchUp / replica.approxSpeed);
                    if(estimatedTime < 1) {
                        estimatedTime = 1;
                    }
                    replica.estimatedTime = formatEstimatedTime(estimatedTime);
                }
            }

            function formatEstimatedTime(seconds)
            {
                function padNumber(num) {
                    if(num < 10) {
                        return '0' + num;
                    }
                    return num;
                }
                var hours = Math.floor((seconds % 86400) / 3600);
                var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
                var secs = ((seconds % 86400) % 3600) % 60;
                return padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(secs);
            }

            function getPrevStatsForReplica(connectionId, prevReplicas) {
                for(var i = 0; i < prevReplicas.length; i++) {
                    if(prevReplicas[i].connectionId === connectionId) {
                        return prevReplicas[i];
                    }
                }
            }

            function getNodeForReplica(endpoint, nodes) {
                for(var i = 0; i < nodes.length; i++) {
                    var tcpPort = nodes[i].internalSecureTcpPort ? nodes[i].internalSecureTcpPort : nodes[i].internalTcpPort;
                    var internalTcpIp = nodes[i].internalTcpIp + ':' + tcpPort;
                    endpoint = endpoint.replace('Unspecified/', '')
                    if(internalTcpIp === endpoint) {
                        return nodes[i];
                    }
                }
            }

            function getLeaderNode() {
                for(var i = 0; i < $scope.nodes.length; i++) {
                    if($scope.nodes[i].state === 'Leader') {
                        return $scope.nodes[i];
                    }
                }
            }

		    $scope.$on('$destroy', function () {
				poller.clear();
			});
		}]);
});