define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscription.row.header.tpl.html',
    '<td ng-if=esSubscription.show>{{ esSubscription.streamName }} <a class=table-collapsetoggle>&minus;</a></td><td ng-if=!esSubscription.show>{{ esSubscription.streamName }} <a class=table-collapsetoggle>&plus;</a></td><td>{{ esSubscription.averageItemsPerSecond }}</td><td>{{ esSubscription.knownMessages }}</td><td>{{ esSubscription.currentMessages }}</td><td>{{ esSubscription.inFlightMessages }}</td><td>{{ esSubscription.connectionCount }}</td><td><div class="status {{ esSubscription.status }}"></div>{{ esSubscription.behindByMessages }} / {{ esSubscription.behindByTime | number:0 }}</td><td>n/a</td>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscription.row.tpl.html',
    '<td>{{ esSubscription.groupName }}</td><td>{{ esSubscription.averageItemsPerSecond }}</td><td>{{ esSubscription.knownMessages }}</td><td>{{ esSubscription.currentMessages }}</td><td>{{ esSubscription.inFlightMessages }}</td><td>{{ esSubscription.connectionCount }}</td><td><div class="status {{ esSubscription.status }}"></div>{{ esSubscription.behindByMessages }} / {{ esSubscription.behindByTime }}</td><td><a ng-repeat="link in esSubscription.links" ui-sref="^.item.detail({streamId: esSubscription.eventStreamId, groupName: esSubscription.groupName})">{{ link.rel }}</a></td>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.item.detail.tpl.html',
    '<div class=container><table><thead><tr><th>Configuration</th></tr></thead><thead><tr><th>Buffer Size</th><th>Check Point After</th><th>Extra Statistics</th><th>Live Buffer Size</th><th>Max Checkpoint Count</th><th>Max Retry Count</th><th>Message Timeout (ms)</th><th>Min Checkpoint Count</th><th>Prefer Round Robin</th><th>Read Batch Size</th><th>Resolve Link tos</th><th>Start From Event</th></tr></thead><tbody><tr><td>{{ detail.config.bufferSize }}</td><td>{{ detail.config.checkPointAfterMilliseconds }}</td><td>{{ detail.config.extraStatistics }}</td><td>{{ detail.config.liveBufferSize }}</td><td>{{ detail.config.maxCheckPointCount }}</td><td>{{ detail.config.maxRetryCount }}</td><td>{{ detail.config.messageTimeoutMilliseconds }}</td><td>{{ detail.config.minCheckPointCount }}</td><td>{{ detail.config.preferRoundRobin }}</td><td>{{ detail.config.readBatchSize }}</td><td>{{ detail.config.resolveLinktos }}</td><td>{{ detail.config.startFrom }}</td></tr></tbody></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.item.tpl.html',
    '<header class=page-header><h2 class=page-title>Subscription Id \'{{ streamId }}\'</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><ul style="list-style-type: none; padding:0 0 0.75rem 0 !important"><li class=page-nav__item ng-repeat="link in links"><a ng-href={{link.uri}}>{{ link.relation }}</a></li></ul><br><div ui-view es-link-header></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Dashboard</h2><ul class=page-nav></ul></header><table class=table-subscriptions><thead><tr><th>Stream/Group(s)</th><th>Rate (messages/s)</th><th colspan=3>Messages</th><th>Connections</th><th>Status<br># of msgs / estimated time to catchup in seconds</th><th></th></tr><tr><th></th><th></th><th class=table-subheading>Known</th><th class=table-subheading>Current</th><th class=table-subheading>In Flight</th><th></th><th></th><th></th></tr></thead><tbody ng-repeat="(key, prop) in subscriptions track by key"><tr ng-if=prop.groups class=table-subheading style="cursor: pointer" es-subscription-row-header es-subscription=prop></tr><tr ng-if=!prop.groups es-subscription-row es-subscription=prop></tr><tr ng-show=prop.show ng-repeat="item in prop.groups" class=table-indentedrow es-subscription-row es-subscription=item></tr></tbody><tbody ng-hide=subscriptions><tr><td colspan=8><em>No subscriptions</em></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.tpl.html',
    '<div ui-view></div>');
}]);
})();
 });