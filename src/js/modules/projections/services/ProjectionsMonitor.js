define(['./_module'], function (app) {

	'use strict';

	return app.factory('ProjectionsMonitor', [
		'$q', 'poller', 'ProjectionsService',
		function ($q, pollerProvider, projectionsService) {
			var stats,
				state,
				query,
				result,
				deferred;

			function createAndStartPoller (url, action, callback) {

				var poller = pollerProvider.create({
					interval: 1000,
					action: action,
					params: [
						url
					]
				});
				
				poller.start();
				poller.promise.then(function () {}, function () {}, callback);

				return poller;
			}

			function start (url, opts) {
				opts = opts || {};
				deferred = $q.defer();
				
				if(!opts.ignoreStats) {
					stats = createAndStartPoller(url, 
						projectionsService.statistics, 
						function (data) {
							if(!deferred) { 
								console.log('deffered is null');
								return ;
							}
							deferred.notify({
								statistics: data
							});
						}
					);
				}

				if(!opts.ignoreState) {
					state = createAndStartPoller(url, 
						projectionsService.state, 
						function (data) {
							if(!deferred) { 
								console.log('deffered is null');
								return ;
							}
							deferred.notify({
								state: data
							});
						}
					);
				}

				if(!opts.ignoreQuery) {
					query = createAndStartPoller(url, 
						projectionsService.query, 
						function (data) {
							if(!deferred) { 
								console.log('deffered is null');
								return ;
							}
							deferred.notify({
								query: data
							});
						}
					);
				}

				if(!opts.ignoreResult) {
					result = createAndStartPoller(url, 
						projectionsService.result, 
						function (data) {
							if(!deferred) { 
								console.log('deffered is null');
								return ;
							}
							deferred.notify({
								result: data
							});
						}
					);
				}

				return deferred.promise;
			}

			function stop () {

				pollerProvider.clear();
				
				stats = null;
				state = null;
				query = null;
				result = null;

				if(deferred) {
					deferred.resolve();	
				}
			}

			return {
				start: start,
				stop: stop
			};
		}
	]);

});