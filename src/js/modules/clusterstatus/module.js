/* global define */
/*jshint sub: true */

define(['./_index'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider',
    function ($stateProvider) {

        $stateProvider
            // ========================================CLUSTERSTATUS============
            .state('clusterstatus', {
                parent: 'app',
                url: 'clusterstatus',
                templateUrl: 'clusterstatus.tpl.html',
                abstract: true,
                data: {
                    title: 'Cluster Status'
                }
            })
            .state('clusterstatus.list', {
                url: '',
                templateUrl: 'clusterstatus.list.tpl.html',
                controller: 'ClusterStatusListCtrl',
                
                data: {
                    title: 'Cluster Status'
                }
            })
            .state('clusterstatus.snapshot', {
                url: '/snapshot',
                templateUrl: 'clusterstatus.snapshot.tpl.html',
                controller: 'ClusterStatusSnapshotCtrl',
                data: {
                    title: 'Cluster Status Snapshot'
                }
            });
    }]);
});