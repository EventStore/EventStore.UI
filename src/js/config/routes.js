/* global define */
/*jshint sub: true */

define(['es-ui'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            // ========================================DASHBOARD============
            .state('app', {
                url: '/',
                templateUrl: 'index.tpl.html',
                abstract: true,
                controller: ['$scope', function($scope) {
                    $scope.notAdminMessage = 'You must be an admin to view this item';
                    $scope.notAdminOrOpsMessage = 'You must be in the $admins or $ops group to view this item';
                    $scope.projectionsNotRunningMessage = 'Projections are not running on Event Store';
                    $scope.atomDisabledMessage = 'AtomPub over HTTP has been disabled on the server';
                }]
            });
    }]);
});