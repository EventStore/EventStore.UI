define(['./_module'], function (app) {

	'use strict';

	return app.factory('AtomEventsReader', [
		'$q', '$timeout', 'StreamsService', 'uri', 'poller',
		function ($q, $timeout, streams, uriProvider, poller) {

			var deferredGlobal, polling, atom;


			function map(data) {
				var resultEntries = [], resultLinks = [], i, length, item, previous = {};

				resultEntries = data.entries;

				// map links with extra info
				length = data.links.length;
				for(i = 0; i < length; i++) {
					item = data.links[i];
					item.fullUri = item.uri;
					item.uri = '#' + uriProvider.parse(item.uri).pathname;

					if(item.relation === 'previous') {
						previous = {
							index: i,
							uri: item.fullUri
						};
					}

					resultLinks.push(item);
				}

				return {
					headOfStream: data.headOfStream,
					entries: resultEntries,
					links: resultLinks,
					previous: previous
				};
			}

			function checkIfPoll (previous, headOfStream, onContinuePollCallback, doNotPollCallback) {
				if(!headOfStream){
					doNotPollCallback();
					return;
				}
				if(!previous.uri) {
					// case: we have reached head of stream. there is a chance, that
					// after some time previous will show up
					onContinuePollCallback();
				}
				streams.validateFullUrl(previous.uri)
				.success(function (data) {
					onContinuePollCallback();
				});
			}

			atom = {
				start: function (params) {

					// make sure that everything is stopped					
					this.stop();

					deferredGlobal = $q.defer();
					polling = poller.create({
						interval: 1000,
						action: streams.streamEvents,
						params: [
							params
						]
					});

					polling.start();
					polling.promise.then(null, null, function (data) {
						poller.stopAll();

						var result = map(data);

						deferredGlobal.notify(result);

						checkIfPoll(result.previous, data.headOfStream,
						function onContinuePolling(){
							poller.resume();
						},
						function onNotPolling() {
							poller.clear();
							deferredGlobal.resolve();
						});
					});

					polling.promise.catch(function () {
						poller.clear();
						deferredGlobal.reject();
					});
					
					return deferredGlobal.promise;
				},
				map: function (entries, currentEntries) {
					var i, item, length = entries.length;

					for(i = 0; i < length; i++) {
						item = entries[i];
						
						if(currentEntries[item.title]) {
							item.showJson = true;
						}

						entries[i] = item;
					}

					return entries;
				},
				stop: function () {
					poller.clear();
				},
				pause: function() {
					poller.pauseAll();
				},
				resume: function() {
					poller.resume();
				},
				resumePaused: function() {
					poller.resumePaused();
				}
			};

			return atom;
		}
    ]);
});