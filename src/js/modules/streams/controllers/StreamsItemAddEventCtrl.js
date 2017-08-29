define(['./_module'], function (app) {
    'use strict';

    return app.controller('StreamsItemAddEventCtrl', [
		'$scope', '$state', '$stateParams', 'StreamsService', 'MessageService',
		function ($scope, $state, $stateParams, streamsService, msg) {
			$scope.streamId = $stateParams.streamId;

                        $scope.eventId = generateArbitraryEventId();

			$scope.aceConfig = {
				mode: 'json',
				useWrapMode: false,
				showGutter: true,
				theme: 'monokai'
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
