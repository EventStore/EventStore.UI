define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsListCtrl', [
        '$scope', 'CompetingService', 'SubscriptionsMapper', 'poller', 'MessageService', 'urls', 'UrlBuilder',
        function ($scope, competingService, subscriptionsMapper, pollerProvider, msg, urls, urlBuilder) {
            function startPolling(url, intervalSeconds) {
                var interval = !intervalSeconds ? 1 : intervalSeconds;
                pollerProvider.clear();
                var subscriptionsPoll = pollerProvider.create({
                    interval: interval * 1000,
                    action: competingService.subscriptions,
                    params: [url]
                });
                subscriptionsPoll.start();
                subscriptionsPoll.promise.then(null, null, function (data) {
                    let links = data.links.reduce((prev, curr) => ({...prev, [curr.rel]:curr.href}), {});
                    $scope.paging.currentOffset = data.offset;
                    $scope.paging.count = data.count;
                    $scope.paging.total = data.total;
                    $scope.paging.firstEntry = 0;
                    $scope.paging.lastEntry = 0;
                    if (data.count > 0) {
                        $scope.paging.firstEntry = data.offset + 1;
                        $scope.paging.lastEntry = data.offset + data.count;
                    }
                    $scope.paging.firstUrl = links.first;
                    $scope.paging.selfUrl = links.self;
                    $scope.paging.nextUrl = links.next;
                    $scope.paging.previousUrl = links.previous;
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
                firstUrl: competingService.getSubscriptionsFirstUrl(initialPageSize),
                selfUrl: null,
                nextUrl: null,
                previousUrl: null,
                canPageNext : function() {
                    return $scope.paging.nextUrl;
                },
                canPagePrevious: function() {
                    return $scope.paging.previousUrl;
                },
                firstPage: function() {
                    startPolling($scope.paging.firstUrl, $scope.paging.pageRefreshInterval);
                },
                nextPage: function() {
                    if($scope.paging.canPageNext()) {
                        startPolling($scope.paging.nextUrl, $scope.paging.pageRefreshInterval);
                    }
                },
                previousPage: function() {
                    if($scope.paging.canPagePrevious()) {
                        startPolling($scope.paging.previousUrl, $scope.paging.pageRefreshInterval);
                    }
                },
                onPageSizeChanged: function() {
                    if ($scope.paging.pageSizeInput >= 1 && $scope.paging.pageSizeInput !== $scope.paging.pageSize) {
                        $scope.paging.pageSize = $scope.paging.pageSizeInput;
                        competingService.savePageSizeToCookie($scope.paging.pageSize);
                        startPolling(competingService.getSubscriptionsFirstUrl($scope.paging.pageSize), $scope.paging.pageRefreshInterval);
                    }
                },
                onPageRefreshIntervalChanged: function() {
                    if ($scope.paging.pageRefreshIntervalInput >= 1 && $scope.paging.pageRefreshIntervalInput !== $scope.paging.pageRefreshInterval) {
                        $scope.paging.pageRefreshInterval = $scope.paging.pageRefreshIntervalInput;
                        competingService.savePageRefreshIntervalSecondsToCookie($scope.paging.pageRefreshInterval);
                        startPolling($scope.paging.selfUrl, $scope.paging.pageRefreshInterval);
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
            startPolling($scope.paging.firstUrl, $scope.paging.pageRefreshInterval);

            $scope.$on('$destroy', function () {
                pollerProvider.clear();
            });
        }
    ]);
});