define(['./_module'], function(app) {

    'use strict';

    return app.provider('StreamsService', function() {
        this.$get = [
            '$http', '$q', 'urls', 'UrlBuilder',
            function($http, $q, urls, urlBuilder) {

                return {
                    getAcl: function(streamId) {
                        var url = urlBuilder.build(urls.streams.metadata, '$$', streamId);

                        return $http.get(url);
                    },
                    updateAcl: function(streamId, post) {
                        var url = urlBuilder.build(urls.streams.updateAcl, streamId);
                        
                        return $http.post(url, JSON.stringify(post), {
                            headers: {
                                'ES-EventType':'$metadata',
                                'Content-Type':'application/json'
                            }
                        });
                    },
                    addEvent: function (streamId, eventData) {
                        var url = urlBuilder.build(urls.streams.events, streamId);
                        return $http.post(
                            url,
                            JSON.stringify([eventData]),
                            {
                              headers: {
                                  'Content-Type':'application/vnd.eventstore.events+json'
                            }
                        });
                    },
                    validateFullUrl: function(check) {
                        var url = urlBuilder.simpleBuild(urls.streams.base, check);

                        return $http.get(url);
                    },
                    recentlyChangedStreams: function() {
                        var url = urlBuilder.build(urls.streams.recent);
                        return $http.get(url);
                    },
                    recentlyCreatedStreams: function() {
                        var url = urlBuilder.build(urls.streams.created);
                        return $http.get(url);
                    },
                    streamEvents: function(state) {
                        var url = urlBuilder.build(urls.streams.events, state.streamId);

                        if (state.position) {
                            url += '/' + state.position;
                        }

                        if (state.type) {
                            url += '/' + state.type;
                        }

                        if (state.count) {
                            url += '/' + state.count;
                        }

                        url += urls.streams.tryharder;
                        
                        return $http.get(url);
                        
                    },
                    eventContent: function(streamId, eventNumber) {
                        var url = urlBuilder.build(urls.streams.eventDetails, streamId, eventNumber);
                        var header = {
                            headers: {
                                Accept: 'application/vnd.eventstore.atom+json'
                            }
                        };

                        return $http.get(url, header);
                    },
                    checkStreamExists: function(streamId) {
                        var url = urlBuilder.build(urls.streams.events, streamId);
                        return $http.get(url);
                    },
                    deleteStream: function(streamId) {
                        var url = urlBuilder.build(urls.streams.events, streamId);
                        return $http.delete(url);
                    }
                };
            }
        ];
    });
});
