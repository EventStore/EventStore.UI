define(['es-ui'], function (app) {

	'use strict';

	return app.config(['$httpProvider', function ($httpProvider) {
    
        // configuring httpProvider:

        //      all request will be json type
        $httpProvider.defaults.headers.common.Accept = 'application/json';
        //      all get request will use long polling
        //      get as object, as potst, put and common are only created in angularjs
        $httpProvider.defaults.headers.get = {
            'ES-LongPoll': 5 // in sec
        };

        $httpProvider.interceptors.push(['$q', function($q) {
            return {
                'responseError': function(rejection){
                    var defer = $q.defer();

                    //handle some common status codes
                    var commonStatusCodes = {
                        400 : 'Bad Request',
                        401 : 'Unauthorized',
                        403 : 'Forbidden',
                        404 : 'Not Found',
                        405 : 'Method Not Allowed',
                        406 : 'Not Acceptable',
                        409 : 'Conflict',
                        500 : 'Internal Server Error',
                        502 : 'Bad Gateway',
                        503 : 'Service Unavailable'
                    };

                    var error = {
                        message: 'Unknown error',
                        statusCode : rejection.status,
                        errorData: rejection.data
                    };

                    var contentTypeHeader = rejection.headers()['content-type'];
                    if(contentTypeHeader && contentTypeHeader.indexOf('text/plain') !== -1 && rejection.data !== ''){
                        error.message = rejection.data;
                    } else if(rejection.statusText !== ''){
                        error.message = rejection.statusText;
                    } else if(rejection.status in commonStatusCodes){
                        error.message = commonStatusCodes[rejection.status];
                    }

                    defer.reject(error);
                    return defer.promise;
                }
            };
        }]);
    }]);

});