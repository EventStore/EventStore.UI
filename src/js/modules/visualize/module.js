/* global define */
/*jshint sub: true */

define(['./_index'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider',
    function ($stateProvider) {

        $stateProvider
            // ========================================VISUALIZE============
            .state('visualize', {
                url: 'visualize',
                templateUrl: 'visualize.tpl.html',
                parent: 'app',
                abstract: true,                
                data: {
                    title: 'Visualize'
                }
            })
            .state('visualize.eventflow', {
                url: '',
                templateUrl: 'visualize.eventflow.tpl.html',
                controller: 'VisualizeEventFlowCtrl',
                data: {
                    title: 'Event Flow Visualization'
                }
            })            
    }]);
});