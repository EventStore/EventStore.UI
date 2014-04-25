/* global define */
/*jshint sub: true */

define(['es-ui'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $provide) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            // ========================================DASHBOARD============
            .state('dashboard', {
                url: '/',
                templateUrl: 'dashboard.tpl.html',
                abstract: true,
                data: {
                    title: 'Dashboard'
                }
            })
            .state('dashboard.list', {
                url: '',
                templateUrl: 'dashboard.list.tpl.html',
                controller: 'DashboardListCtrl',
                
                data: {
                    title: 'Dashboard'
                }
            })
            .state('dashboard.snapshot', {
                url: 'snapshot',
                templateUrl: 'dashboard.snapshot.tpl.html',
                controller: 'DashboardSnaphostCtrl',
                data: {
                    title: 'Dashboard Snapshot'
                }
            })

            // ========================================PROJECTIONS============
            .state('projections', {
                url: '/projections',
                abstract: true,
                templateUrl: 'projections.tpl.html',
                data: {
                    title: 'Projections'
                }
            })
            .state('projections.list', {
                url: '',
                templateUrl: 'projections.list.tpl.html',
                controller: 'ProjectionsListCtrl',
                data: {
                    title: 'Projections'
                }
            })
            .state('projections.new', {
                url: '/new',
                templateUrl: 'projections.new.tpl.html',
                controller: 'ProjectionsNewCtrl',
                data: {
                    title: 'New Projection'
                }
            })

            .state('projections.standard', {
                url: '/standard',
                templateUrl: 'projections.standard.tpl.html',
                controller: 'ProjectionsStandardCtrl',
                data: {
                    title: 'New Standard Projection'
                }
            })
            .state('projections.item', {
                url: '/{location}',
                abstract: true,
                templateUrl: 'projections.item.tpl.html',
            })
            .state('projections.item.details', {
                url: '',
                templateUrl: 'projections.item.details.tpl.html',
                controller: 'ProjectionsItemDetailsCtrl',
                data: {
                    title: 'Projection Details'
                }
            })
            .state('projections.item.delete', {
                url: '/delete',
                templateUrl: 'projections.item.delete.tpl.html',
                controller: 'ProjectionsItemDeleteCtrl',
                data: {
                    title: 'Projection Delte'
                }
            })
            .state('projections.item.debug', {
                url: '/debug',
                templateUrl: 'projections.item.debug.tpl.html',
                controller: 'ProjectionsItemDebugCtrl',
                data: {
                    title: 'Projection Debug'
                }
            })
            .state('projections.item.edit', {
                url: '/edit',
                templateUrl: 'projections.item.edit.tpl.html',
                controller: 'ProjectionsItemEditCtrl',
                data: {
                    title: 'Projection Edit'
                }
            })

            // ========================================STREAMS============
            .state('streams', {
                url: '/streams',
                templateUrl: 'streams.tpl.html',
                abstract: true
            })
            .state('streams.list', {
                url: '',
                templateUrl: 'streams.list.tpl.html',
                controller: 'StreamsListCtrl',
                data: {
                    title: 'Stream Browser'
                }
            })
            .state('streams.item', {
                url: '/{streamId}',
                templateUrl: 'streams.item.tpl.html',
                abstract: true,
                controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                    $scope.streamId = $stateParams.streamId;
                }],
                data: {
                    title: 'Stream'
                }
            })
            .state('streams.item.events', {
                url: '',
                templateUrl: 'streams.item.events.tpl.html',
                controller: 'StreamsItemEventsCtrl',
                data: {
                    title: 'Stream'
                }
            })
            .state('streams.item.navigation', {
                url: '/{position}/{type}/{count:[0-9]{1,99}}',
                //url: '/{position}/{type:\bbackward|forward\b}/{count:[0-9]{1,99}}',
                templateUrl: 'streams.item.events.tpl.html',
                controller: 'StreamsItemEventsCtrl',
                data: {
                    title: 'Stream'
                }
            })
            .state('streams.item.metadata', {
                url: '/metadata',
                views: {
                    '@streams': {
                        templateUrl: 'streams.item.event.tpl.html',
                        controller: 'StreamsItemEventCtrl'
                    }
                },
                data: {
                    metadata: true,
                    title: 'Stream Event'
                }
            })
            .state('streams.item.event', {
                url: '/{eventNumber:[0-9]{1,99}}',
                views: {
                    '@streams': {
                        templateUrl: 'streams.item.event.tpl.html',
                        controller: 'StreamsItemEventCtrl'
                    }
                },
                data: {
                    title: 'Stream Event'
                }
            })
            .state('streams.item.acl', {
                url: '/acl',
                views: {
                    '@streams': {
                        templateUrl: 'streams.item.acl.tpl.html',
                        controller: 'StreamsItemAclCtrl'
                    }
                },
                data: {
                    title: 'Edit Stream ACL'
                }

            })

            // // handling: /streams/{stream}/[head|num]/{count}
            // .state('streams.stream-position-count', {
            //     url: '/{streamId}/{position}/{count:[0-9]{1,99}}',
            //     templateUrl: 'streams-stream.tpl.html',
            //     controller: 'StreamsStreamCtrl',
            //     data: {
            //         title: 'Stream'
            //     }
            // })

            // // handling: /streams/{stream}/[head|num]/[backward|forward]/{count}
            // .state('streams.stream-position-type', {
            //     url: '/{streamId}/{position}/{type}/{count:[0-9]{1,99}}',
            //     templateUrl: 'streams-stream.tpl.html',
            //     controller: 'StreamsStreamCtrl',
            //     data: {
            //         title: 'Stream'
            //     }
            // })



            // ========================================QUERY============
            .state('query', {
                url: '/query',
                templateUrl: 'query.tpl.html',
                controller: 'QueryCtrl',
                data: {
                    title: 'Query'
                }
            })

            // ========================================USERS============
            .state('users', {
                url: '/users',
                templateUrl: 'users.tpl.html',
                abstract: true,
                data: {
                    title: 'Users'
                }
            })
            .state('users.list', {
                url: '',
                templateUrl: 'users.list.tpl.html',
                controller: 'UsersListCtrl',
                data: {
                    title: 'Users'
                }
            })
            .state('users.new', {
                url: '/new',
                templateUrl: 'users.new.tpl.html',
                controller: 'UsersNewCtrl',
                data: {
                    title: 'New User'
                }
            })
            .state('users.item', {
                url: '/{username}',
                abstract: true,
                templateUrl: 'users.item.tpl.html',
                data: {
                    title: 'User Details'
                }
            })
            .state('users.item.details', {
                url: '',
                templateUrl: 'users.item.details.tpl.html',
                controller: 'UsersItemDetailsCtrl',
                data: {
                    title: 'User Details'
                }
            })
            .state('users.item.edit', {
                url: '/edit',
                templateUrl: 'users.item.edit.tpl.html',
                controller: 'UsersItemEditCtrl',
                data: {
                    title: 'Edit User'
                }
            })
            .state('users.item.disable', {
                url: '/disable',
                templateUrl: 'users.item.disable.tpl.html',
                controller: 'UsersItemDisableCtrl',
                data: {
                    title: 'Disable User'
                }
            })
            .state('users.item.enable', {
                url: '/enable',
                templateUrl: 'users.item.enable.tpl.html',
                controller: 'UsersItemEnableCtrl',
                data: {
                    title: 'Enable User'
                }
            })
            .state('users.item.delete', {
                url: '/delete',
                templateUrl: 'users.item.delete.tpl.html',
                controller: 'UsersItemDeleteCtrl',
                data: {
                    title: 'Delete User'
                }
            })
            .state('users.item.reset', {
                url: '/reset',
                templateUrl: 'users.item.reset.tpl.html',
                controller: 'UsersItemResetCtrl',
                data: {
                    title: 'Reset User Password'
                }
            })

            // ========================================ADMIN============
            .state('admin', {
                url: '/admin',
                templateUrl: 'admin.tpl.html',
                controller: 'AdminCtrl',
                data: {
                    title: 'Admin'
                }
            });
    }]);
});