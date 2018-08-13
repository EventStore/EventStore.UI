define(['./_module'], function (app) {

    'use strict';

    return app.controller('ClusterStatusSnapshotCtrl', ['$scope', 'dateFilter', 'poller', 'SprintfService', 'ClusterStatusService',
		function ClusterStatusSnapshotCtrl($scope, dateFilter, poller, sprintf, clusterStatusService) {
		    function format(data) {
		    	var nodes = data.members;
		        var snapshotLines = sprintf.format('%s\n', 'Snapshot taken at ' + dateFilter(new Date(), 'yyyy-MM-d HH:mm:ss'));
		        snapshotLines += sprintf.format('%-31s %-31s %-23s %-23s %-7s %-14s %-19s %-10s\n', 'Internal Tcp', 'External Tcp', 'Internal Http', 'External Http', 'Status', 'State', 'Timestamp (UTC)', 'Checkpoints');
		        for (var i = 0; i < nodes.length; i++) {
		            var node = nodes[i];
		            snapshotLines += sprintf.format('%-30s  %-30s  %-22s  %-22s  %-6s  %-12s  %19s  %-90s\n',
                               node.internalTcpIp + ':' + node.internalTcpPort + ' (' + (node.internalSecureTcpPort || 'n/a') + ')',
                               node.externalTcpIp + ':' + node.externalTcpPort + ' (' + (node.externalSecureTcpPort || 'n/a') + ')',
                               node.internalHttpIp + ':' + node.internalHttpPort,
                               node.externalHttpIp + ':' + node.externalHttpPort,
                               node.isAlive ? 'Alive' : 'Dead',
                               node.state,
                               dateFilter(node.timeStamp, 'yyyy-MM-d HH:mm:ss'),
                               node.state === 'Manager' ? 'n/a'
                                    : sprintf.format('L%d/W%d/C%d/E%d@%d:{%s}', node.lastCommitPosition, node.writerCheckpoint, node.chaserCheckpoint,
                                                                          node.epochNumber, node.epochPosition, node.epochId));
		        }
		        $scope.snapshot = snapshotLines;
		    }
		    $scope.$on('$destroy', function () {
				poller.clear();
			});
			clusterStatusService.gossip().success(format);
		}]);
});