define(['./_module'], function (app) {
    'use strict';

    return app.controller('StreamsItemAddEventCtrl', [
		'$scope', '$state', '$stateParams', 'StreamsService', 'MessageService',
		function ($scope, $state, $stateParams, streams, msg) {
			$scope.streamId = $stateParams.streamId;

                        $scope.eventId = generateArbitraryEventId();

                        $scope.eventData = '{\n}';
                        $scope.eventMetadata = '{\n}';

			$scope.aceConfig = {
				mode: 'json',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
			};

                        $scope.addEvent = function () {
                          streams
                            .addEvent(
                                $scope.streamId,
                                {
                                  eventId: $scope.eventId,
                                  eventType: $scope.eventType,
                                  data: JSON.parse($scope.eventData),
                                  metadata: JSON.parse($scope.eventMetadata)
                                }
                            );
                        };
		}
	]);

    function generateArbitraryEventId() {
      var ticks = (new Date()).getTime().toString();

      return [
        ticks.slice(-9, -1),
        ticks.slice(-5, -1),
        ticks.slice(-5, -1),
        ticks.slice(-5, -1),
        ticks.slice(-13, -1)
      ].join('-');
    }
});
