/* global define */
/*jshint sub: true */

define(['es-ui'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        // $stateProvider
        //     // ========================================DASHBOARD============
        //     .state('main', {
        //         url: '/',
        //         templateUrl: 'index.tpl.html',
        //         controller: ['$state', function ($state) {
        //             $state.go('signin');
        //         }]
        //     });;
    }]);
});