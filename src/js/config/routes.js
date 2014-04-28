/* global define */
/*jshint sub: true */

define(['es-ui'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $provide) {

        $urlRouterProvider
            .otherwise('/');

    }]);
});