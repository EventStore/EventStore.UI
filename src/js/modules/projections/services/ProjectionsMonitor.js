define(['./_module'], function (app) {

	'use strict';

	return app.factory('ProjectionsMonitor', [
		'$q', 'poller', 'ProjectionsService', 'MessageService',
		function ($q, pollerProvider, projectionsService, msg) {
			var stats,
				state,
				query,
				result,
				deferred;

			function createAndStartPoller (url, action, callback, errorCallback) {
				var poller = pollerProvider.create({
					interval: 1000,
					action: action,
					params: [
						url
					]
				});
				
				poller.start();
				poller.promise.then(null, errorCallback, callback);

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
						},
						function(error){
							msg.failure('Failed to fetch projection statistics: ' + error.message);
						}
					);
				}

				if(!opts.ignoreState && opts.partitionProvider) {
					state = createAndStartPoller(url, 
						projectionsService.partitionedState(opts.partitionProvider),
						function (data) {
							if(!deferred) { 
								console.log('deffered is null');
								return ;
							}
							deferred.notify({
								state: data
							});
						}, function(error){
							msg.failure('Failed to fetch projection partition state: ' + error.message);
						}
					);
				} else if(!opts.ignoreState && !opts.partitionProvider) {
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
						}, function(error){
							msg.failure('Failed to fetch projection state: ' + error.message);
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
						}, function(error){
							msg.failure('Failed to fetch projection query: ' + error.message);
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
						}, function(error){
							msg.failure('Failed to fetch projection result: ' + error.message);
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
