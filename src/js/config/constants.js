define(['es-ui'], function (app) {

	'use strict';
	return app.constant('constants', {
		projectionStatus: {
			running: 'Running',
			stopped: 'Stopped'
		},
		scavengeStatus: {
		    pollInterval: 2000
		},
		tcpStats: {
			pollInterval: 1000
		},
		clusterStatus: {
			replicaPollInterval: 1000
		}
	});
});
