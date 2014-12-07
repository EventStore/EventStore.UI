define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscription.deteail.tpl.html',
    '<header class=page-header><h2 class=page-title>Subscription Detail</h2><ul class=page-nav></ul></header><table class=table-subscriptions><thead><tr><th>Stream Name</th><th>Group Name</th><th>Rate (items/s)</th><th>Total Items Processed</th><th>Last Processed Event Number</th><th>Last Known Event Number</th><th>No. of Connections</th><th>Status</th><th></th></tr></thead><tbody ng-repeat="(key, prop) in subscriptions track by key"><tr><td>{{ prop.eventStreamId }}</td><td>{{ prop.groupName }}</td><td>{{ prop.averageItemsPerSecond }}</td><td>{{ prop.totalItemsProcessed }}</td><td>{{ prop.lastProcessedEventNumber }}</td><td>{{ prop.lastKnownEventNumber }}</td><td>{{ prop.connectionCount }}</td><td>{{ prop.status }}</td><td><a ng-repeat="link in prop.links" ui-sref="^.item.events({streamId: prop.eventStreamId})">{{ link.rel }}</a></td></tr></tbody><tbody ng-hide=subscriptions><tr><td colspan=8><em>No subscriptions</em></td></tr></tbody></table>');
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
    '');
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
    '<header class=page-header><h2 class=page-title>Subscriptions</h2><ul class=page-nav></ul></header><table class=table-subscriptions><thead><tr><th>Stream Name</th><th>Group Name</th><th>Rate (items/s)</th><th>Total Items Processed</th><th>Last Processed Event Number</th><th>Last Known Event Number</th><th>No. of Connections</th><th>Status</th><th></th></tr></thead><tbody ng-repeat="(key, prop) in subscriptions track by key"><tr><td>{{ prop.eventStreamId }}</td><td>{{ prop.groupName }}</td><td>{{ prop.averageItemsPerSecond }}</td><td>{{ prop.totalItemsProcessed }}</td><td>{{ prop.lastProcessedEventNumber }}</td><td>{{ prop.lastKnownEventNumber }}</td><td>{{ prop.connectionCount }}</td><td>{{ prop.status }}</td><td><a ng-repeat="link in prop.links" ui-sref="^.item.detail({streamId: prop.eventStreamId})">{{ link.rel }}</a></td></tr></tbody><tbody ng-hide=subscriptions><tr><td colspan=8><em>No subscriptions</em></td></tr></tbody></table>');
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