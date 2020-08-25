define(['./_module'], function (app) {

    'use strict';

    return app.controller('AdminCtrl', [
        '$scope', 'AdminService', 'MessageService', 'poller', '$state', 'ScavengeNotificationService', 'constants', '$timeout',
        function ($scope, adminService, msg, poller, $state, scavengeNotificationService, constants, $timeout) {
            $scope.subSystems = null;
            $scope.scavengeHistory = null;

            $scope.noSubSystemsText = 'No sub systems are running.';
            $scope.noScavengeHistoryText = 'No scavenges have been run.';

			adminService.getSubsystems()
			.then(function(res){
                var data = res.data;
				if(!data){
					return;
				}
				$scope.subSystems = data;
			}, function(error){
                if(error.statusCode === 401){
                    $scope.noSubSystemsText = 'You are not authorized to view enabled sub systems.';
                } else{
                    msg.failure('Failed to retrieve sub systems: ' + error.message);
                }
			});
			var stop = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
				};

			$scope.shutdown = function ($event) {
				stop($event);
				var confirmation = msg.confirm('Are you sure you wish to shutdown the node?');
				if(!confirmation) {
					return;
				}
				adminService.shutdown().then(function () {
					msg.success('Server shutdown initiated');
				}, function (error) {
					msg.failure('Shutdown failed: ' + error.message);
				});
			};

			$scope.scavenge = function ($event) {
				stop($event);

				adminService.scavenge().then(null, function (error) {
					msg.failure('Scavenge failed: ' + error.message);
				});
            };
            
            $scope.stopScavenge = function ($event, $history) {
				stop($event);

				adminService.stopScavenge($history.scavengeId).then(null, function (error) {
					msg.failure('Stopping scavenge ' + $history.scavengeId + ' failed: ' + error.message);
				});
			};

            $scope.scavengeHistoryButton = function() {
                $state.go('streams.item.events', {streamId: '$scavenges'});
            };

            function getScavengeHistory(res) {
                if(!res) {
                    return;
                }
                var aggregated = {};
                for(var i = 0; i < res.entries.length; i++) {
                    var entry = res.entries[i];
                    var data = JSON.parse(entry.data);
                    var currScavenge = aggregated[data.scavengeId];
                    if(!currScavenge) {
                        currScavenge = {
                            scavengeId : data.scavengeId,
                            nodeEndpoint : data.nodeEndpoint
                        };
                        aggregated[data.scavengeId] = currScavenge;
                    }
                    if(entry.eventType === '$scavengeStarted') {
                        currScavenge.startTime = new Date(entry.updated);
                    }
                    if(entry.eventType === '$scavengeCompleted') {
                        currScavenge.endTime = new Date(entry.updated);
                        currScavenge.result = data.result;
                    }
                }
                var agg = Object.keys(aggregated).map(function (key) {return aggregated[key];});
                var history = [];
                for(var j = 0; j < agg.length; j++) {
                    // if we don't have start time, we have an odd number of events
                    // if that's the case, ignore it
                    if(agg[j].startTime) {
                        history.push(agg[j]);
                    }
                }
                $scope.scavengeHistory = history;
            }

            var scavengeQuery = {};
            var timeout;
            function setupScavengeStatusPoller() {
                scavengeQuery = poller.create({
                    interval: constants.scavengeStatus.pollInterval,
                    action: adminService.scavengeStatus,
                    params: []
                });
                scavengeQuery.start();

                scavengeQuery.promise.then(null,
                    function(error) {
                        if(error.statusCode === 401){
                            $scope.noScavengeHistoryText = 'You are not authorized to view the scavenge history';
                            return;
                        }
                        if(timeout){
                            $timeout.cancel(timeout);
                            timeout = null;
                        }
                        timeout = $timeout(function() {
                            setupScavengeStatusPoller();
                        }, constants.scavengeStatus.pollInterval);
                    }, getScavengeHistory);
            }

            setupScavengeStatusPoller();

            $scope.$on('$destroy', function() {
                if(timeout){
                    $timeout.cancel(timeout);
                    timeout = null;
                }
                scavengeQuery.stop();
            });
        }
	]);
});
