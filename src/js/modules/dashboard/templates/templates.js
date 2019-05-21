define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.dashboard.templates');
} catch (e) {
  module = angular.module('es-ui.dashboard.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Dashboard</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.snapshot>Snapshot</a></li></ul></header><table class=table-queues><thead><tr><th>Queue Name</th><th colspan=2>Length</th><th>Rate (items/s)</th><th>Time (ms/item)</th><th>Items Processed</th><th>Current / Last Message</th></tr><tr><th></th><th class=table-subheading>Current</th><th class=table-subheading>Peak</th><th></th><th></th><th></th><th></th></tr></thead><tbody ng-repeat="(key, prop) in queues track by key"><tr ng-if=prop.queues class=table-subheading style="cursor: pointer;" es-queue-row-header es-queue=prop></tr><tr ng-if=!prop.queues es-queue-row es-queue=prop></tr><tr ng-show=prop.show ng-repeat="item in prop.queues" class=table-indentedrow es-queue-row es-queue=item></tr></tbody><tbody ng-hide=queues><tr><td colspan=8><em>No stats to display</em></td></tr></tbody></table><br><br><header class=page-header><h2 class=page-title>Connections ({{tcpStats.length}})</h2><ul class=page-nav><li class=page-nav__item><button ng-click=tcpStatsPaging.nextPage() ng-disabled=!tcpStatsPaging.canPageNext()>Next</button></li><li class=page-nav__item><button ng-click=tcpStatsPaging.previousPage() ng-disabled=!tcpStatsPaging.canPagePrevious()>Previous</button></li></ul></header><table class=table-subscriptions><thead><tr><th>Connection</th><th>Client Connection Name</th><th>Type</th><th>IP Address</th><th colspan=3>Sent (Bytes)</th><th colspan=3>Received (Bytes)</th></tr><tr><th></th><th></th><th></th><th></th><th class=table-subheading>Rate (Bytes/s)</th><th class=table-subheading>Current</th><th class=table-subheading>Pending</th><th class=table-subheading>Rate (Bytes/s)</th><th class=table-subheading>Current</th><th class=table-subheading>Pending</th></tr></thead><tbody><tr ng-repeat="stat in tcpStats | startFrom:tcpStatsPaging.currentPage * tcpStatsPaging.pageSize | limitTo: tcpStatsPaging.pageSize"><td>{{stat.connectionId}}</td><td>{{stat.clientConnectionName ? stat.clientConnectionName : \'N/A\'}}</td><td>{{stat.isExternalConnection ? \'External\' : \'Internal\'}} {{stat.isSslConnection ? \'SSL\' : \'\'}}</td><td>{{stat.remoteEndPoint}}</td><td>{{stat.averageBytesSentPerSecond | number}}</td><td>{{stat.totalBytesSent | number}}</td><td>{{stat.pendingSendBytes | number}}</td><td>{{stat.averageBytesReceivedPerSecond | number}}</td><td>{{stat.totalBytesReceived | number}}</td><td>{{stat.pendingReceivedBytes | number}}</td></tr></tbody><tbody ng-hide=tcpStats.length><tr><td colspan=9><em>No Connections</em></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.dashboard.templates');
} catch (e) {
  module = angular.module('es-ui.dashboard.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.row.header.tpl.html',
    '<td ng-if=esQueue.show>{{ esQueue.queueName }} <a class=table-collapsetoggle>&minus;</a></td><td ng-if=!esQueue.show>{{ esQueue.queueName }} <a class=table-collapsetoggle>&plus;</a></td><td>{{ esQueue.lengthCurrentTryPeak }}</td><td>{{ esQueue.lengthLifetimePeak }}</td><td>{{ esQueue.avgItemsPerSecond }}</td><td>{{ esQueue.avgProcessingTime.toFixed(3)}}</td><td>{{ esQueue.totalItemsProcessed }}</td><td style="text-align: right">n/a</td>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.dashboard.templates');
} catch (e) {
  module = angular.module('es-ui.dashboard.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.row.tpl.html',
    '<td>{{ esQueue.queueName }}</td><td>{{ esQueue.lengthCurrentTryPeak }}</td><td>{{ esQueue.lengthLifetimePeak }}</td><td>{{ esQueue.avgItemsPerSecond }}</td><td>{{ esQueue.avgProcessingTime.toFixed(3)}}</td><td>{{ esQueue.totalItemsProcessed }}</td><td style="text-align: right">{{ esQueue.inProgressMessage }} / {{ esQueue.lastProcessedMessage }}</td>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.dashboard.templates');
} catch (e) {
  module = angular.module('es-ui.dashboard.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.snapshot.tpl.html',
    '<header class=page-header><h2 class=page-title>Dashboard Snapshot</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=dashboard.list>Back</a></li></ul></header><pre ng-bind=snapshot>\n' +
    '\n' +
    '</pre>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.dashboard.templates');
} catch (e) {
  module = angular.module('es-ui.dashboard.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.tpl.html',
    '<div ui-view></div>');
}]);
})();
 });