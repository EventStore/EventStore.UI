define(['./_module'], function (app) {
    'use strict';

    return app.controller('StreamsItemAddEventCtrl', [
		'$scope', '$state', '$q', '$stateParams', 'StreamsService', 'MessageService',
		function ($scope, $state, $q, $stateParams, streams, msg) {

                        $scope.streamId = $stateParams.streamId;
                        $scope.eventData = '{\n}';
                        $scope.eventMetadata = '{\n}';
                        $scope.eventId = generateArbitraryEventId();

                        $scope.aceConfig = {
                          mode: 'json',
                          useWrapMode: false,
                          showGutter: true,
                          theme: 'monokai'
                        };

                        $scope.addEvent = function () {
                          $q
                            .all([
                                nothingOrValidJson('Event Data', $scope.eventData),
                                nothingOrValidJson('Event Metadata', $scope.eventMetadata)
                            ])
                            .then(function (jsons) {
                              return streams
                                .addEvent(
                                    $scope.streamId,
                                    {
                                      eventId: $scope.eventId,
                                      eventType: $scope.eventType,
                                      data: jsons[0],
                                      metadata: jsons[1]
                                    }
                                );
                            })
                            .then(
                                function () {
                                  msg.success('Event ' + $scope.eventId + '(' + $scope.eventType + ') created');
                                  $scope.eventId = generateArbitraryEventId();
                                },
                                function (response) {
                                  msg.failure('Could not create event. ' + response.statusText);
                                }
                            );
                        };

                        function nothingOrValidJson(description, value) {
                          return $q(function (resolve, reject) {
                            if (/^\s*$/.test(value)) {
                              return resolve(undefined);
                            }

                            try
                            {
                              return resolve(JSON.parse(value));
                            } catch (e) {
                              return reject({ statusText: description + ' is not valid JSON.' });
                            }
                          });
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
