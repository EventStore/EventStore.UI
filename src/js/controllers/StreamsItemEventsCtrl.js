define(['./_module'], function (app) {

    'use strict';

    return app.controller('StreamsItemEventsCtrl', [
		'$scope', '$stateParams', '$q', '$timeout', 'StreamsService', 'uri', 'MessageService',
		function ($scope, $stateParams, $q, $timeout, streamsService, uriProvider, msg) {

			function doPoll () {
				$timeout(function() {
					streamsService.streamEvents($stateParams)
					.success(map);
				}, 1000);
			}

			function map (data) {
				var i = 0, 
					l = data.links, 
					length = l.length, 
					item, 
					uri,
					previousIndex = -1,
					poll = false;

				//$scope.$parent.links = [];
				for(; i < length; i++) {
					item = l[i];
					uri = uriProvider.parse(item.uri).pathname;
					item.fullUri = item.uri;
					item.uri = '#' + uri;
					item.isNavigation = item.relation === 'next' || 
						item.relation === 'previous' || 
						item.relation === 'first' || 
						item.relation === 'last';

					l[i] = item;

					if(item.relation === 'previous') {
						previousIndex = i;
					}
				}

				// no previous link, we should do poll
				if(!~previousIndex) {
					doPoll();
				}

				// previous link exists, lets see if we shell do the poll
				if(!!~previousIndex) {
					poll = false;
					item = l[previousIndex];
					uri = item.fullUri;

					streamsService.validateFullUrl(uri)
					.success(function (data) {

						for(i = 0; i< data.links.length; i++) {
							// previous exists, we do not do poll
							if(data.links[i].relation === 'previous') {
								poll = false;
								// this ensure that poll stay's false
								continue;
							}
							poll = true;
						}

						if(poll) {
							doPoll();
						}
					});
				}

				$scope.$parent.streams = data.entries;
				$scope.$parent.links = l;
			}

			$scope.streamId = $stateParams.streamId;

			streamsService.streamEvents($stateParams)
				.success(map)
				.error(function () {
					msg.error('stream does not exists');
				});

			$scope.toggleJson = function ($event, evt) {
				$event.preventDefault();
				$event.stopPropagation();

				evt.showJson = !evt.showJson;
			};
		}
	]);
});

