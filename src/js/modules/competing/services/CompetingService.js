define(['./_module'], function (app) {

    'use strict';

    return app.provider('CompetingService', function () {

        this.$get = [
            '$http', '$cookieStore', 'urls', 'UrlBuilder',
            function ($http, $cookieStore, urls, urlBuilder) {

                return {
                    subscriptions: function (url) {
                        return $http.get(url);
                    },
                    getSubscriptionsFirstUrl: function(pageSize) {
                        return urlBuilder.build(urls.competing.subscriptions, 0, pageSize);
                    },
                    subscriptionDetail: function (subscriptionId, groupName) {
                        var url = urlBuilder.build(urls.competing.subscriptionDetails, subscriptionId, groupName);
                        return $http.get(url);
                    },
                    create: function (stream, subscription, config) {
                        var url = urlBuilder.build(urls.competing.create, stream, subscription);
                        return $http.put(url, config, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    },
                    update: function (stream, subscription, config) {
                        var url = urlBuilder.build(urls.competing.update, stream, subscription);
                        return $http.post(url, config, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    },
                    delete: function (stream, subscription) {
                        var url = urlBuilder.build(urls.competing.delete, stream, subscription);
                        return $http.delete(url, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    },
                    replayParked: function (stream, subscription) {
                        var url = urlBuilder.build(urls.competing.replayParked, stream, subscription);
                        return $http.post(url, {}, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    },
                    viewParkedMessagesBackward: function (streamId, groupName, fromEvent, count) {
                        var url = urlBuilder.build(urls.competing.viewParkedMessagesBackward, streamId, groupName, fromEvent, count);
                        return $http.get(url, {
                            headers: {
                                'Accept': 'application/vnd.eventstore.competingatom+json'
                            }
                        });
                    },
                    viewParkedMessagesForward: function (streamId, groupName, fromEvent, count) {
                        var url = urlBuilder.build(urls.competing.viewParkedMessagesForward, streamId, groupName, fromEvent, count);
                        return $http.get(url, {
                            headers: {
                                'Accept': 'application/vnd.eventstore.competingatom+json'
                            }
                        });
                    },
                    getPageSizeFromCookie: function() {
                        var psubOpts = $cookieStore.get('es-subscription-options');
                        if(!psubOpts){
                            return null;
                        }
                        return psubOpts.pageSize;
                    },
                    savePageSizeToCookie: function(pageSize) {
                        var psubOpts = $cookieStore.get('es-subscription-options');
                        if(!psubOpts){
                            psubOpts = {};
                        }
                        psubOpts.pageSize = pageSize;
                        $cookieStore.put('es-subscription-options', psubOpts);
                    },
                    getPageRefreshIntervalSecondsFromCookie: function() {
                        var psubOpts = $cookieStore.get('es-subscription-options');
                        if(!psubOpts){
                            return null;
                        }
                        return psubOpts.pageRefreshIntervalSeconds;
                    },
                    savePageRefreshIntervalSecondsToCookie: function(pageRefreshIntervalSeconds) {
                        var psubOpts = $cookieStore.get('es-subscription-options');
                        if(!psubOpts){
                            psubOpts = {};
                        }
                        psubOpts.pageRefreshIntervalSeconds = pageRefreshIntervalSeconds;
                        $cookieStore.put('es-subscription-options', psubOpts);
                    }
                };
            }
        ];
    });
});
