define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsListCtrl', [
        '$scope', 'CompetingService', 'SubscriptionsMapper', 'poller', 'MessageService', 'urls', 'UrlBuilder',
        function ($scope, competingService, subscriptionsMapper, pollerProvider, msg, urls, urlBuilder) {

            var subscriptionsPoll = pollerProvider.create({
                interval: 1000,
                action: competingService.subscriptions,
                params: []
            });

            $scope.replayParkedMessages = function (streamId, groupName) {
                competingService.replayParked(streamId, groupName).then(function () {
                    msg.success('Replaying Parked Messages');
                }, function (error) {
                    msg.failure('Failed to initiate replaying of parked messages: ' + error.message);
                });
            };

            $scope.subscriptions = {};

            subscriptionsPoll.start();
            subscriptionsPoll.promise.then(null, null, function (data) {
                $scope.subscriptions = subscriptionsMapper.map(data, $scope.subscriptions);
            });
            subscriptionsPoll.promise.catch(function (error) {
                msg.failure('Failed to retrieve list of subscriptions: ' + error.message);
                $scope.subscriptions = null;
                subscriptionsPoll.stop();
            });

            $scope.$on('$destroy', function () {
                pollerProvider.clear();
            });
        }
    ]);
});