define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsListCtrl', [
        '$scope', 'CompetingService', 'SubscriptionsMapper', 'poller', 'MessageService', 'urls', 'UrlBuilder',
        function ($scope, competingService, subscriptionsMapper, pollerProvider, msg, urls, urlBuilder) {
            function startPolling(count, offset, intervalSeconds) {
                pollerProvider.clear();
                var subscriptionsPoll = pollerProvider.create({
                    interval: intervalSeconds * 1000,
                    action: competingService.subscriptions,
                    params: [count, offset]
                });
                subscriptionsPoll.start();
                subscriptionsPoll.promise.then(null, null, function (data) {
                    $scope.paging.currentOffset = data.offset;
                    $scope.paging.count = data.count;
                    $scope.paging.total = data.total;
                    if (data.count === 0) {
                        $scope.paging.firstEntry = 0;
                        $scope.paging.lastEntry = 0;
                    } else {
                        $scope.paging.firstEntry = data.offset + 1;
                        $scope.paging.lastEntry = data.offset + data.count;
                    }
                    $scope.subscriptions = subscriptionsMapper.map(data.subscriptions, $scope.subscriptions);
                });
                subscriptionsPoll.promise.catch(function (error) {
                    msg.failure('Failed to retrieve list of subscriptions: ' + error.message);
                    $scope.subscriptions = null;
                    subscriptionsPoll.stop();
                });
            }

            let initialPageSize = competingService.getPageSizeFromCookie() || 100;
            let initialRefreshIntervalSeconds = competingService.getPageRefreshIntervalSecondsFromCookie() || 1;
            $scope.paging = {
                currentOffset : 0,
                pageSize : initialPageSize,
                pageSizeInput : initialPageSize,
                pageRefreshInterval: initialRefreshIntervalSeconds,
                pageRefreshIntervalInput: initialRefreshIntervalSeconds,
                firstEntry: 0,
                lastEntry: 0,
                total: 0,
                canPageNext : function() {
                    return $scope.paging.total > $scope.paging.lastEntry;
                },
                canPagePrevious: function() {
                    return $scope.paging.currentOffset > 0;
                },
                firstPage: function() {
                    startPolling($scope.paging.pageSize, 0);
                },
                nextPage: function() {
                    if($scope.paging.canPageNext()) {
                        startPolling($scope.paging.pageSize, $scope.paging.currentOffset + $scope.paging.pageSize, $scope.paging.pageRefreshInterval);
                    }
                },
                previousPage: function() {
                    if($scope.paging.canPagePrevious()) {
                        startPolling($scope.paging.pageSize, Math.max(0, $scope.paging.currentOffset - $scope.paging.pageSize), $scope.paging.pageRefreshInterval);
                    }
                },
                onPageSizeChanged: function() {
                    if ($scope.paging.pageSizeInput >= 1 && $scope.paging.pageSizeInput !== $scope.paging.pageSize) {
                        $scope.paging.pageSize = $scope.paging.pageSizeInput;
                        competingService.savePageSizeToCookie($scope.paging.pageSize);
                        startPolling($scope.paging.pageSize, $scope.paging.offset);
                    }
                },
                onPageRefreshIntervalChanged: function() {
                    if ($scope.paging.pageRefreshIntervalInput >= 1 && $scope.paging.pageRefreshIntervalInput !== $scope.paging.pageRefreshInterval) {
                        $scope.paging.pageRefreshInterval = $scope.paging.pageRefreshIntervalInput;
                        competingService.savePageRefreshIntervalSecondsToCookie($scope.paging.pageRefreshInterval);
                        startPolling($scope.paging.pageSize, $scope.paging.offset, $scope.paging.pageRefreshInterval);
                    }
                }
            };

            $scope.replayParkedMessages = function (streamId, groupName) {
                competingService.replayParked(streamId, groupName).then(function () {
                    msg.success('Replaying Parked Messages');
                }, function (error) {
                    msg.failure('Failed to initiate replaying of parked messages: ' + error.message);
                });
            };

            $scope.subscriptions = {};
            startPolling($scope.paging.pageSize, $scope.paging.currentOffset);

            $scope.$on('$destroy', function () {
                pollerProvider.clear();
            });
        }
    ]);
});