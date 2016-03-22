/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('StreamsItemEventsCtrl', [
		'$scope', '$stateParams', 'AtomEventsReader', 'MessageService',
		function ($scope, $stateParams, atom, msg) {

			var showJson = {};

			$scope.$parent.streams = [];
			$scope.$parent.links = [];

			$scope.streamId = $stateParams.streamId;

			atom.start({streamId: encodeStreamId($scope.streamId)})
			.then(null, function () {
				msg.failure('stream does not exist');
			}, function (data) {
				$scope.$parent.headOfStream = data.headOfStream;	
				$scope.$broadcast('add-link-header', findSelf(data.links));
				
				$scope.$parent.streams = atom.map(data.entries, showJson);
				$scope.$parent.links = data.links;
				if($scope.streamId == '$all' || $scope.streamId.indexOf('$$$') === 0){
					$scope.$parent.links = removeMetadataLinkFrom($scope.$parent.links);
				}
			});
            
            function encodeStreamId(streamId) {
                var escapedStream = streamId;
                try {
                    escapedStream = decodeURIComponent(escapedStream);
                } catch (ex) { }
                return encodeURIComponent(escapedStream);
            }

			function removeMetadataLinkFrom(links){
				var index = -1;
				for(var i = 0, len = links.length; i < len; i++) {
				    if (links[i].relation === 'metadata') {
				        index = i;
				        break;
				    }
				}
				if(index !== -1){
					links.splice(index, 1);
				}
				return links;
			}

			function findSelf (links) {
				var i = 0;
				for(; i < links.length; i++) {
					if(links[i].relation === 'self') {
						return links[i].fullUri;
					}
				}
			}

			$scope.toggleJson = function ($event, evt) {
				$event.preventDefault();
				$event.stopPropagation();

				evt.showJson = !evt.showJson;
				showJson[evt.title] = evt.showJson;
			};

			$scope.$parent.isPolling = true;
			$scope.$parent.togglePause = function (){
				if($scope.$parent.isPolling){
					atom.pause();
				}else{
					atom.resumePaused();
				}

				$scope.$parent.isPolling = !$scope.$parent.isPolling;
			};

			$scope.getTextToCopy = function(event){
				msg.info('The event data for ' + event.title + ' will be copied to the clipboard', 'Copied to clipboard');
				return event.data;
			}

			$scope.$on('$destroy', function () {
				atom.stop();
				$scope.$parent.streams = [];
				$scope.$parent.links = [];
				$scope.$parent.isPolling = null;
				showJson = {};
			});
		}
	]);
});

