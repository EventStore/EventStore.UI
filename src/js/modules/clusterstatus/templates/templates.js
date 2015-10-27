define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.clusterstatus.templates');
} catch (e) {
  module = angular.module('es-ui.clusterstatus.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('clusterstatus.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Cluster Status</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.snapshot>Snapshot</a></li></ul></header><div><table class=table-nodes><thead><tr><th>Internal Tcp</th><th>External Tcp</th><th>Internal Http</th><th>External Http</th><th>Status</th><th>State</th><th>Timestamp (UTC)</th><th>Checkpoints</th><th>Actions</th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr ng-repeat="node in nodes" ng-class="{dead: !node.isAlive}"><td>{{ node.internalTcpIp }}:{{ node.internalTcpPort }}</td><td>{{ node.externalTcpIp }}:{{ node.externalTcpPort }}</td><td>{{ node.internalHttpIp }}:{{ node.internalHttpPort }}</td><td>{{ node.externalHttpIp }}:{{ node.externalHttpPort }}</td><td ng-class="{dead: !node.isAlive}"><text ng-if=node.isAlive>Alive</text><text ng-if=!node.isAlive>Dead</text></td><td><text ng-if="node.state == \'Master\'"><b>{{ node.state }}</b></text><text ng-if="node.state == \'Manager\'" style=color:lightgray>{{ node.state }}</text><text ng-if="node.state != \'Master\' && node.state != \'Manager\'">{{ node.state }}</text></td><td>{{ node.timeStamp | date : \'yyyy-MM-d HH:mm:ss\' }}</td><td><text ng-if="node.state == \'Manager\'">n/a</text><text ng-if="node.state != \'Manager\'">L{{ node.lastCommitPosition}} / W {{node.writerCheckpoint}} / C {{node.chaserCheckpoint}}<br>E{{ node.epochNumber }} @ {{ node.epochPosition }} : { {{ node.epochId }} }</text></td><td style=text-align:center><ul class=page-nav><li class=page-nav__item><a ng-href=http://{{node.externalHttpIp}}:{{node.externalHttpPort}}/ping target=_blank>ping</a></li><li class=page-nav__item><a ng-href=http://{{node.externalHttpIp}}:{{node.externalHttpPort}} target=_blank>show website</a></li><li class=page-nav__item><a ng-href=http://{{node.internalHttpIp}}:{{node.internalHttpPort}}/gossip target=_blank>show gossip</a></li></ul></td></tr><tr ng-hide=nodes><td colspan=9><em>No nodes in the cluster</em></td></tr></tbody></table><div class=last-updated>Last updated: <span>{{ lastUpdatedTime | date : \'yyyy-MM-d HH:mm:ss\' }}</span></div></div><script>function selectText(element) {\n' +
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