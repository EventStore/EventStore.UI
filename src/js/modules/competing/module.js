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
            .state('subscriptions.new', {
                url: '/new',
                templateUrl: 'subscriptions.new.tpl.html',
                controller: 'SubscriptionsNewCtrl',
                data: {
                    title: 'New Subscription'
                }
            })
            .state('subscriptions.item', {
                url: '/{streamId}/{groupName}',
                templateUrl: 'subscriptions.item.tpl.html',
                abstract: true,
                controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                    $scope.streamId = $stateParams.streamId;
                    $scope.groupName = $stateParams.groupName;
                    $scope.showHeader = true;
                }],
                data: {
                    title: 'Subscriptions'
                }
            })
            .state('subscriptions.item.detail', {
                url: '',
                templateUrl: 'subscriptions.item.detail.tpl.html',
                controller: 'SubscriptionsDetailCtrl',
                data: {
                    title: 'Subscription Detail'
                }
            })
            .state('subscriptions.item.edit', {
                url: '/edit',
                templateUrl: 'subscriptions.item.edit.tpl.html',
                controller: 'SubscriptionsEditCtrl',
                data: {
                    title: 'Edit Subscription'
                }
            })
            .state('subscriptions.item.delete', {
                url: '/delete',
                templateUrl: 'subscriptions.item.delete.tpl.html',
                controller: 'SubscriptionsDeleteCtrl',
                data: {
                    title: 'Delete Subscription'
                }
            }).state('subscriptions.item.viewparkedmessages', {
                url: '/viewparkedmessages/',
                templateUrl: 'subscriptions.item.viewparkedmessages.tpl.html',
                controller: 'SubscriptionsViewParkedMessagesCtrl',
                data: {
                    title: 'View Parked Messages Subscription'
                }
            });
    }]);
});
