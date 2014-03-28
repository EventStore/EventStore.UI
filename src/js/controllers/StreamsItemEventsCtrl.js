define(['./_module'], function (app) {

    'use strict';

    return app.controller('StreamsItemEventsCtrl', [
		'$scope', '$stateParams', '$q', 'StreamsService', 'uri', 'MessageService',
		function ($scope, $stateParams, $q, streamsService, uriProvider, msg) {

			function map (data) {
				var i = 0, 
					l = data.links, 
					length = l.length, 
					item, 
					result = [],
					uri;

				$scope.$parent.links = [];
				for(; i < length; i++) {
					item = l[i];
					uri = uriProvider.parse(item.uri).pathname;
					item.uri = '#' + uri;
					item.isNavigation = item.relation === 'next' || 
						item.relation === 'previous' || 
						item.relation === 'first' || 
						item.relation === 'last';

					l[i] = item;

					// streamsService.validate(uri)
					// .then((function create (item, i, entires) {
						
					// 	return function (d) {
					// 		if(item.isNavigation) {
					// 			if(d.entires != entires) {
					// 				result[i] = item;	
					// 			}
					// 		} else {
					// 			result[i] = item;
					// 		}
					// 	};

					// })(item, i, data.entires));
				}

				// I don't like this, however, otherwise screen blinks, which is quite annoying
				// this only means that this controller is tided with parent
				$scope.$parent.streams = data.entries;
				$scope.$parent.links = l;
				//$scope.$parent.streams = data.entries;
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

