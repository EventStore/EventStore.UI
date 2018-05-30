define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('es-toggable-row.tpl.html',
    '<td ng-if=esQueue.show>{{ esQueue.queueName }} <a class=table-collapsetoggle>&minus;</a></td><td ng-if=!esQueue.show>{{ esQueue.queueName }} <a class=table-collapsetoggle>&plus;</a></td><td>{{ esQueue.lengthCurrentTryPeak }}</td><td>{{ esQueue.lengthLifetimePeak }}</td><td>{{ esQueue.avgItemsPerSecond }}</td><td>{{ esQueue.avgProcessingTime.toFixed(3)}}</td><td>{{ esQueue.busy }}</td><td>{{ esQueue.totalItemsProcessed }}</td><td style="text-align: right">n/a</td>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index.tpl.html',
    '<header class=site-header><h1 class=site-title><a ui-sref=dashboard.list><img src=images/logo.svg height=29 width=119 alt="Event Store"></a></h1><ul class=site-nav><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'dashboard\') }"><a ui-sref=dashboard.list>Dashboard</a></li><li ng-if=!singleNode class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'clusterstatus\') }"><a ui-sref=clusterstatus.list>Cluster Status</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'streams\') }"><a ui-sref=streams.list>Stream Browser</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'projections\') }" title="{{!isAdmin ? notAdminMessage : !projectionsAllowed ? projectionsNotRunningMessage : \'\'}}"><a ng-class="{\'disabled\': !projectionsAllowed || !isAdmin}" ui-sref=projections.list>Projections</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'query\') }" title="{{!projectionsAllowed ? projectionsNotRunningMessage : \'\'}}"><a ng-class="{\'disabled\':!projectionsAllowed}" ui-sref=query>Query</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'visualize\') }" title="{{!projectionsAllowed ? projectionsNotRunningMessage : \'\'}}"><a ng-class="{\'disabled\':!projectionsAllowed}" ui-sref=visualize.eventflow>Visualize</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'competing\') }" title="{{!isAdmin ? notAdminMessage : \'\'}}"><a ng-class="{\'disabled\': !isAdmin}" ui-sref=subscriptions.list>Persistent Subscriptions</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'admin\') }" title="{{!isAdmin ? notAdminMessage : \'\'}}"><a ng-class="{\'disabled\': !isAdmin}" ui-sref=admin>Admin</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'users\') }" title="{{!isAdmin ? notAdminMessage : \'\'}}"><a ng-class="{\'disabled\': !isAdmin}" ui-sref=users.list>Users</a></li><li class=site-nav__item ng-class="{\'site-nav__item--active\': $state.includes(\'signout\') }"><a ui-sref=signout>Log Out</a></li></ul></header><main class=site-main><div ui-view></div></main><footer class=site-footer><p>Event Store {{ esVersion }} &middot; <a href="http://eventstore.org/docs/" target=_blank>Documentation</a> &middot; <a href="http://eventstore.org/support/" target=_blank>Support</a></p></footer>');
}]);
})();
 });