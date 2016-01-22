define(['./_module'], function (app) {

    'use strict';

    return app.controller('DashboardListCtrl', [
		'$scope', 'DashboardService', 'DashboardMapper', 'poller', 'MessageService', 'constants',
		function ($scope, dashboardService, dashboardMapper, pollerProvider, msg, constants) {

			var statsPoll = pollerProvider.create({
				interval: 1000,
				action: dashboardService.stats,
				params: []
			});

			$scope.queues = {};
			$scope.queues.__tag = 'queues';

			statsPoll.start();
			statsPoll.promise.then(null, null, function (data) { 
				$scope.queues = dashboardMapper.map(data, $scope.queues);
			});
			statsPoll.promise.catch(function () {
				msg.failure('An error occured.');
				$scope.queues = null;
				statsPoll.stop(); // if error we do not want to continue...
			});

            // TCP Stats
            $scope.tcpStats = [];
            var tcpStatsPoll = pollerProvider.create({
                interval: constants.tcpStats.pollInterval,
                action: dashboardService.tcpStats,
                params: []
            });

            tcpStatsPoll.start();
            tcpStatsPoll.promise.then(null, null, function(data) {
                for(var i = 0; i < data.length; i++) {
                    var stat = data[i];
                    var previous = getPreviousTcpStat(stat.connectionId, $scope.tcpStats);
                    stat.averageBytesSentPerSecond = previous ? stat.totalBytesSent - previous.totalBytesSent : 0;
                    stat.averageBytesReceivedPerSecond = previous ? stat.totalBytesReceived - previous.totalBytesReceived : 0;
                }
                $scope.tcpStats = data;
            });

            function getPreviousTcpStat(connectionId, previousTcpStats) {
                if(!previousTcpStats) {
                    return null;
                }
                for(var i = 0; i < previousTcpStats.length; i++) {
                    if(previousTcpStats[i].connectionId === connectionId) {
                        return previousTcpStats[i];
                    }
                }
                return null;
            }

            $scope.tcpStatsPaging = {
                currentPage : 0,
                pageSize : 5,
                canPageNext : function() {
                    return $scope.tcpStatsPaging.currentPage < $scope.tcpStats.length / $scope.tcpStatsPaging.pageSize - 1;
                },
                canPagePrevious: function() {
                    return $scope.tcpStatsPaging.currentPage > 0;
                },
                nextPage: function() {
                    if($scope.tcpStatsPaging.canPageNext()) {
                        $scope.tcpStatsPaging.currentPage++;
                    }
                },
                previousPage: function() {
                    if($scope.tcpStatsPaging.canPagePrevious()) {
                        $scope.tcpStatsPaging.currentPage--;
                    }
                }
            };

            $scope.$on('$destroy', function () {
                pollerProvider.clear();
                $scope.queues = {};
                $scope.tcpStats = [];
            });
		}
	]).filter('startFrom', function() {
        return function(input, start) {
            if(!input) {
                return;
            }
            start = parseInt(start);
            return input.slice(start);
        };
    });
});
