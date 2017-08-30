define(['./_module'], function (app) {
    'use strict';

    return app.controller('StreamsItemAddEventCtrl', [
		'$scope', '$state', '$stateParams', 'StreamsService', 'MessageService',
		function ($scope, $state, $stateParams, streams, msg) {

                        $scope.streamId = $stateParams.streamId;
                        initializeEventState();
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
                                  data: parseJsonOrUndefined($scope.eventData),
                                  metadata: parseJsonOrUndefined($scope.eventMetadata)
                                }
                            )
                            .then(
                                function () {
                                  msg.success('Event ' + $scope.eventId + '(' + $scope.eventType + ') created');
                                  initializeEventState();
                                },
                                function (response) {
                                  msg.failure('Could not create event. ' + response.statusText);
                                }
                            );
                        };

                        function parseJsonOrUndefined(raw) {
                          try {
                            return JSON.parse(raw);
                          } catch (e) {
                            return undefined;
                          }
                        }

                        function initializeEventState() {
                          $scope.eventId = generateArbitraryEventId();

                          $scope.eventData = '{\n}';
                          $scope.eventMetadata = '{\n}';
                        }
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
