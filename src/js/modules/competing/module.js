/* global define */
/*jshint sub: true */

define(['./_index'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider',
    function ($stateProvider) {

        $stateProvider
            // ========================================Competing Consumers============
            .state('subscriptions', {
                parent: 'app',
                url: 'subscriptions',
                templateUrl: 'subscriptions.tpl.html',
                abstract: true,
                data: {
                    title: 'Competing Consumers'
                }
            })
            .state('subscriptions.list', {
                url: '',
                templateUrl: 'subscriptions.list.tpl.html',
                controller: 'SubscriptionsListCtrl',
                
                data: {
                    title: 'Subscriptions'
                }
            })
            .state('subscriptions.item', {
                url: '/{streamId}',
                templateUrl: 'subscriptions.item.tpl.html',
                abstract: true,
                controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                    $scope.streamId = $stateParams.streamId;
                }],
                data: {
                    title: 'Stream'
                }
            })
            .state('subscriptions.item.detail', {
                url: '',
                templateUrl: 'subscriptions.item.detail.tpl.html',
                controller: 'SubscriptionsDetailCtrl',
                data: {
                    title: 'Subscription Detail'
                }
            });
    }]);
});