define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.clusterstatus.templates');
} catch (e) {
  module = angular.module('es-ui.clusterstatus.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('clusterstatus.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Cluster Status</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.snapshot>Snapshot</a></li></ul></header><div class=last-updated>Last updated: <span>{{ lastUpdatedTime | date : \'yyyy-MM-d HH:mm:ss\' }}</span></div><div><table class=table-nodes><thead><tr><th>State</th><th>Status</th><th>Timestamp (UTC)</th><th>Checkpoints</th><th>Tcp</th><th>Http</th><th>Actions</th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr ng-repeat="node in nodes" ng-class="{dead: !node.isAlive}"><td><text ng-if="node.state == \'Leader\'"><b>{{ node.state }}</b></text><text ng-if="node.state == \'Manager\'" style=color:lightgray>{{ node.state }}</text><text ng-if="node.state != \'Leader\' && node.state != \'Manager\'">{{ node.state }}</text></td><td ng-class="{dead: !node.isAlive}"><text ng-if=node.isAlive>Alive</text><text ng-if=!node.isAlive>Dead</text></td><td>{{ node.timeStamp | date : \'yyyy-MM-d HH:mm:ss\' }}</td><td><text ng-if="node.state == \'Manager\'">n/a</text><text ng-if="node.state != \'Manager\'">L{{ node.lastCommitPosition}} / W {{node.writerCheckpoint}} / C {{node.chaserCheckpoint}}<br>E{{ node.epochNumber }} @ {{ node.epochPosition }} : { {{ node.epochId }} }</text></td><td>Internal : {{ node.internalTcpIp }}:{{ node.internalSecureTcpPort || node.internalTcpPort }}<br>External : {{ node.externalTcpIp }}:{{ node.externalSecureTcpPort || node.externalTcpPort }}</td><td>{{ node.httpEndPointIp }}:{{ node.httpEndPointPort }}</td><td style=text-align:center;><ul class=page-nav><li class=page-nav__item><a ng-href="//{{node.httpEndPointIp}}:{{node.httpEndPointPort}}/ping?format=json" target=_blank>ping</a></li><li class=page-nav__item><a ng-href=//{{node.httpEndPointIp}}:{{node.httpEndPointPort}} target=_blank>show website</a></li><li class=page-nav__item><a ng-href="//{{node.httpEndPointIp}}:{{node.httpEndPointPort}}/gossip?format=json" target=_blank>show gossip</a></li></ul></td></tr><tr ng-hide=nodes><td colspan=9><em>No nodes in the cluster</em></td></tr></tbody></table><br><div ng-show="replicas.length > 0"><br><header class=page-header><h2 class=page-title>Replica Status</h2></header><table class=table-nodes><thead><tr><th>Replica Endpoint</th><th>Total Sent (bytes)</th><th>Total Received (bytes)</th><th>Pending Send (bytes)</th><th>Pending Receive (bytes)</th><th>Send Queue Size</th><th>To Catch Up (bytes)</th><th>Transfer Speed (bytes/second)</th><th>Estimated Time</th></tr></thead><tbody><tr ng-repeat="replica in replicas"><td>{{replica.subscriptionEndpoint}}</td><td>{{replica.totalBytesSent | number}}</td><td>{{replica.totalBytesReceived | number}}</td><td>{{replica.pendingSendBytes | number}}</td><td>{{replica.pendingReceivedBytes | number}}</td><td>{{replica.sendQueueSize | number}}</td><td ng-if=!replica.isCatchingUp colspan=3>Caught Up</td><td ng-if=replica.isCatchingUp>{{replica.bytesToCatchUp | number}}</td><td ng-if=replica.isCatchingUp>{{replica.approxSpeed | number}}</td><td ng-if=replica.isCatchingUp>{{replica.estimatedTime}}</td></tr></tbody></table></div></div><script>function selectText(element) {\n' +
    '        var doc = document\n' +
    '          , text = doc.getElementById(element)\n' +
    '          , range\n' +
    '          , selection;\n' +
    '        if (doc.body.createTextRange) { //ms\n' +
    '            range = doc.body.createTextRange();\n' +
    '            range.moveToElementText(text);\n' +
    '            range.select();\n' +
    '        } else if (window.getSelection) { //all others\n' +
    '            selection = window.getSelection();\n' +
    '            range = doc.createRange();\n' +
    '            range.selectNodeContents(text);\n' +
    '            selection.removeAllRanges();\n' +
    '            selection.addRange(range);\n' +
    '        }\n' +
    '    }</script>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.clusterstatus.templates');
} catch (e) {
  module = angular.module('es-ui.clusterstatus.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('clusterstatus.snapshot.tpl.html',
    '<header class=page-header><h2 class=page-title>Cluster Status Snapshot</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=clusterstatus.list>Back</a></li></ul></header><pre ng-bind=snapshot>\n' +
    '\n' +
    '</pre>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.clusterstatus.templates');
} catch (e) {
  module = angular.module('es-ui.clusterstatus.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('clusterstatus.tpl.html',
    '<div ui-view></div>');
}]);
})();
 });