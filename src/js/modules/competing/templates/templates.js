define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscription.row.header.tpl.html',
    '<td ng-if=esSubscription.show>{{ esSubscription.streamName }} <a class=table-collapsetoggle>&minus;</a></td><td ng-if=!esSubscription.show>{{ esSubscription.streamName }} <a class=table-collapsetoggle>&plus;</a></td><td>{{ esSubscription.averageItemsPerSecond }}</td><td>{{ esSubscription.knownMessages }}</td><td>{{ esSubscription.currentMessages }}</td><td>{{ esSubscription.inFlightMessages }}</td><td>{{ esSubscription.connectionCount }}</td><td><div class="status {{ esSubscription.status }}"></div>{{ esSubscription.behindByMessages }} / {{ esSubscription.behindByTime }}</td><td>n/a</td>');
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
    '<td>{{ esSubscription.groupName }}</td><td>{{ esSubscription.averageItemsPerSecond }}</td><td>{{ esSubscription.knownMessages }}</td><td>{{ esSubscription.currentMessages }}</td><td>{{ esSubscription.inFlightMessages }}</td><td>{{ esSubscription.connectionCount }}</td><td><div class="status {{ esSubscription.status }}"></div>{{ esSubscription.behindByMessages }} / {{ esSubscription.behindByTime }}</td><td><ul class=page-nav><li ng-show=$root.isAdminOrOps class=page-nav__item><a ui-sref="^.item.edit({streamId: esSubscription.eventStreamId, groupName: esSubscription.groupName})">Edit</a></li><li ng-show=$root.isAdminOrOps class=page-nav__item><a ui-sref="^.item.delete({streamId: esSubscription.eventStreamId, groupName: esSubscription.groupName})">Delete</a></li><li class=page-nav__item><a ui-sref="^.item.detail({streamId: esSubscription.eventStreamId, groupName: esSubscription.groupName})">Detail</a></li><li ng-show=$root.isAdminOrOps class=page-nav__item><a ng-click="$parent.replayParkedMessages(esSubscription.eventStreamId, esSubscription.groupName)">Replay Parked Messages</a></li><li ng-show=$root.isAdminOrOps class=page-nav__item><a ui-sref="^.item.viewparkedmessages({ streamId: esSubscription.eventStreamId, groupName: esSubscription.groupName})">View Parked Messages</a></li></ul></td>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.item.delete.tpl.html',
    '<form novalidate name=deleteSubscription ng-submit=delete() class=delete-subscription-form><table><tbody><tr><td>Group</td><td><input ng-model=subscription required readonly=true class=form-table name=subscription ng-class="{ \'form-table--error\' : deleteSubscription.subscription.$invalid && !deleteSubscription.subscription.$pristine }"></td></tr><tr><td>Stream</td><td><input ng-model=stream required readonly=true class=form-table name=stream ng-class="{ \'form-table--error\' : deleteSubscription.stream.$invalid && !deleteSubscription.stream.$pristine }"></td></tr></tbody></table><ul class=page-nav><li class=page-nav__item><button type=submit ng-disabled=deleteSubscription.$invalid>Delete</button></li></ul></form>');
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
    '<div class=container><table><thead><tr><th>Configuration</th></tr></thead><thead><tr><th>Buffer Size</th><th>Check Point After</th><th>Extra Statistics</th><th>Live Buffer Size</th><th>Max Checkpoint Count</th><th>Max Retry Count</th><th>Message Timeout (ms)</th><th>Min Checkpoint Count</th><th>Consumer Strategy</th><th>Read Batch Size</th><th>Resolve Link tos</th><th>Start From Event</th></tr></thead><tbody><tr><td>{{ detail.config.bufferSize }}</td><td>{{ detail.config.checkPointAfterMilliseconds }}</td><td>{{ detail.config.extraStatistics }}</td><td>{{ detail.config.liveBufferSize }}</td><td>{{ detail.config.maxCheckPointCount }}</td><td>{{ detail.config.maxRetryCount }}</td><td>{{ detail.config.messageTimeoutMilliseconds }}</td><td>{{ detail.config.minCheckPointCount }}</td><td>{{ detail.config.namedConsumerStrategy }}</td><td>{{ detail.config.readBatchSize }}</td><td>{{ detail.config.resolveLinktos }}</td><td>{{ detail.config.startFrom }}</td></tr></tbody></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.item.edit.tpl.html',
    '<form novalidate name=updateSubscription ng-submit=save() class=edit-subscription-form><table><tbody><tr class=table-subheading><td colspan=2>Basic Details</td></tr><tr><td>Group</td><td><input ng-model=subscription required class=form-table readonly=true name=subscription></td></tr><tr><td>Stream</td><td><input ng-model=stream required class=form-table readonly=true name=stream></td></tr><tr class=table-subheading><td colspan=2>Configuration</td></tr><tr><td>Resolve Link Tos</td><td><input type=checkbox ng-model=config.resolveLinktos ng-disabled=resolveLinktosDisabled></td></tr><tr><td>Start From</td><td><input ng-model=config.startFrom class=form-table name=startFrom></td></tr><tr><td>Message Timeout (ms)</td><td><input ng-model=config.messageTimeoutMilliseconds class=form-table name=messageTimeoutMilliseconds></td></tr><tr><td>Extra Statistics</td><td><input type=checkbox ng-model=config.extraStatistics ng-disabled=extraStatisticsDisabled></td></tr><tr><td>Max Retry Count</td><td><input ng-model=config.maxRetryCount class=form-table name=maxRetryCount></td></tr><tr><td>Live Buffer Size</td><td><input ng-model=config.liveBufferSize class=form-table name=liveBufferSize></td></tr><tr><td>Buffer Size</td><td><input ng-model=config.bufferSize class=form-table name=bufferSize></td></tr><tr><td>Read Batch Size</td><td><input ng-model=config.readBatchSize class=form-table name=readBatchSize></td></tr><tr><td>CheckPoint After (ms)</td><td><input ng-model=config.checkPointAfterMilliseconds class=form-table name=checkPointAfterMilliseconds></td></tr><tr><td>Min CheckPoint Count</td><td><input ng-model=config.minCheckPointCount class=form-table name=minCheckPointCount></td></tr><tr><td>Max CheckPoint Count</td><td><input ng-model=config.maxCheckPointCount class=form-table name=maxCheckPointCount></td></tr><tr><td>Max Subscriber Count</td><td><input ng-model=config.maxSubscriberCount class=form-table name=maxSubscriberCount></td></tr><tr><td>Named Consumer Strategy</td><td><select ng-model=config.namedConsumerStrategy class=form-table ng-options="obj.value as obj.name for obj in namedConsumerStrategies"></select></td></tr></tbody></table><ul class=page-nav><li class=page-nav__item><button type=submit ng-disabled=updateSubscription.$invalid>Update</button></li></ul></form>');
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
    '<header class=page-header><h2 class=page-title>Subscription - {{ streamId }}/{{ groupName }}</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><ul style="list-style-type: none; padding:0 0 0.75rem 0 !important"><li class=page-nav__item ng-repeat="link in links"><a ng-href={{link.uri}}>{{ link.relation }}</a></li></ul><br><div ui-view es-link-header></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.item.viewparkedmessages.tpl.html',
    '<ul style="list-style-type: none; padding:0 0 0.75rem 0 !important"><li class=page-nav__item><a ng-click=pageForward(entries) ng-disabled=!canGoForward()>Next</a> <a ng-click=pageBackward(entries) ng-disabled=!canGoForward()>Previous</a></li></ul><br><table><thead><tr><th>Event #</th><th>Name</th><th>Type</th><th>Created Date</th><th></th></tr></thead><tbody ng-repeat="event in entries track by event.title"><tr ng-class="{ \\\'invalid\\\': !event.streamId }"><td>{{ event.positionEventNumber }}</td><td>{{ event.title }}</td><td>{{ event.eventType }}</td><td>{{ event.updated | date:\'yyyy-MM-dd HH:mm:ss\'}}</td><td><a ng-click="toggleJson($event, event)" style="cursor: pointer;" ng-if="event.isJson || event.isLinkMetaData || event.isMetaData">JSON</a></td></tr><tr ng-show=event.showJson><td colspan=5><div ng-if=event.isJson><strong>Data</strong><pre>{{ event.data }}</pre></div><div ng-if=event.metaData><strong>Metadata</strong><pre>{{ event.metaData }}</pre></div><div ng-if=event.isLinkMetaData><strong>Link metadata</strong><pre>{{ event.linkMetaData }}</pre></div></td></tr></tbody></table>');
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
    '<header class=page-header><h2 class=page-title>Dashboard</h2><ul class=page-nav><li ng-show=!isAdminOrOps class=page-nav__item><em>You must be in the $admins or $ops group to manage persistent subscriptions and replay parked messages.</em></li><li ng-show=isAdminOrOps class=page-nav__item><a ui-sref=^.new>New Subscription</a></li></ul></header><table class=table-subscriptions><thead><tr><th>Stream/Group(s)</th><th>Rate (messages/s)</th><th colspan=3>Messages</th><th>Connections</th><th>Status<br># of msgs / estimated time to catchup in seconds</th><th></th></tr><tr><th></th><th></th><th class=table-subheading>Known</th><th class=table-subheading>Current</th><th class=table-subheading>In Flight</th><th></th><th></th><th></th></tr></thead><tbody ng-repeat="(key, prop) in subscriptions track by key"><tr ng-if=prop.groups class=table-subheading style="cursor: pointer;" es-subscription-row-header es-subscription=prop></tr><tr ng-if=!prop.groups es-subscription-row es-subscription=prop></tr><tr ng-show=prop.show ng-repeat="item in prop.groups" class=table-indentedrow es-subscription-row es-subscription=item></tr></tbody><tbody ng-hide=subscriptions><tr><td colspan=8><em>No subscriptions</em></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.competing.templates');
} catch (e) {
  module = angular.module('es-ui.competing.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscriptions.new.tpl.html',
    '<header class=page-header><h2 class=page-title>New Subscription</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><form novalidate name=newSubscription ng-submit=save() class=new-subscription-form><table><tbody><tr class=table-subheading><td colspan=2>Basic Details</td></tr><tr><td>Group</td><td><input ng-model=subscription required class=form-table name=subscription ng-class="{ \'form-table--error\' : newSubscription.subscription.$invalid && !newSubscription.subscription.$pristine }"></td></tr><tr><td>Stream</td><td><input ng-model=stream required class=form-table name=stream ng-class="{ \'form-table--error\' : newSubscription.stream.$invalid && !newSubscription.stream.$pristine }"></td></tr><tr class=table-subheading><td colspan=2>Configuration</td></tr><tr><td>Resolve Link Tos</td><td><input type=checkbox ng-model=resolveLinktos ng-disabled=resolveLinktosDisabled></td></tr><tr><td>Start From</td><td><input ng-model=startFrom class=form-table name=startFrom></td></tr><tr><td>Message Timeout (ms)</td><td><input ng-model=messageTimeoutMilliseconds class=form-table name=messageTimeoutMilliseconds></td></tr><tr><td>Extra Statistics</td><td><input type=checkbox ng-model=extraStatistics ng-disabled=extraStatisticsDisabled></td></tr><tr><td>Max Retry Count</td><td><input ng-model=maxRetryCount class=form-table name=maxRetryCount></td></tr><tr><td>Live Buffer Size</td><td><input ng-model=liveBufferSize class=form-table name=liveBufferSize></td></tr><tr><td>Buffer Size</td><td><input ng-model=bufferSize class=form-table name=bufferSize></td></tr><tr><td>Read Batch Size</td><td><input ng-model=readBatchSize class=form-table name=readBatchSize></td></tr><tr><td>CheckPoint After (ms)</td><td><input ng-model=checkPointAfterMilliseconds class=form-table name=checkPointAfterMilliseconds></td></tr><tr><td>Min CheckPoint Count</td><td><input ng-model=minCheckPointCount class=form-table name=minCheckPointCount></td></tr><tr><td>Max CheckPoint Count</td><td><input ng-model=maxCheckPointCount class=form-table name=maxCheckPointCount></td></tr><tr><td>Max Subscriber Count</td><td><input ng-model=maxSubscriberCount class=form-table name=maxSubscriberCount></td></tr><tr><td>Named Consumer Strategy</td><td><select ng-model=namedConsumerStrategy class=form-table ng-options="obj.value as obj.name for obj in namedConsumerStrategies"></select></td></tr></tbody></table><ul class=page-nav><li class=page-nav__item><button type=submit ng-disabled=newSubscription.$invalid>Create</button></li></ul></form>');
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