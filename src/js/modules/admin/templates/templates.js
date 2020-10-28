define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.admin.templates');
} catch (e) {
  module = angular.module('es-ui.admin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('admin.tpl.html',
    '<header class=page-header><h2 class=page-title>Admin</h2><ul class=page-nav><li class=page-nav__item><a href=# ng-click=shutdown($event)>Shutdown Server</a></li><li class=page-nav__item><a href=# ng-click=scavenge($event)>Scavenge</a></li></ul></header><div class=container><div class=container-left><table><thead><tr><th>Enabled Sub Systems</th></tr></thead><tbody><tr ng-repeat="subSystem in subSystems"><td>{{ subSystem }}</td></tr><tr ng-hide=subSystems><td><em>No sub systems are running.</em></td></tr></tbody></table></div><div class=container-right><table><thead><tr><th>Scavenge</th><th>Started</th><th>Completed</th><th>Result</th></tr></thead><tbody><tr ng-hide="scavengeHistory.length > 0"><td colspan=4><em>No scavenges have been run.</em></td></tr><tr ng-repeat="history in scavengeHistory track by history.scavengeId | orderBy : \'startTime\'"><td><a ui-sref="scavenge({scavengeId: history.scavengeId, page: 0, from: 0})">{{history.nodeEndpoint}}<br>{{history.scavengeId}}</a></td><td>{{history.startTime | date:\'yyyy-MM-dd HH:mm\'}}</td><td><span ng-show=history.endTime>{{history.endTime | date:\'yyyy-MM-dd HH:mm\'}}</span><span ng-hide=history.endTime><em>Not Finished</em></span></td><td><span ng-show=history.result>{{history.result}}</span> <span ng-hide=history.result class=page-nav__item><a ui-sref=# ng-click="stopScavenge($event, history)">Cancel</a></span></td></tr></tbody></table><span class=note--warning>If the progress of your scavenge(s) does not appear to be updating, this might indicate that there was an issue writing the status to disk. Please consult your logs.</span><ul class=page-nav><li class=page-nav__item><a href=#/streams/$scavenges>Scavenge History</a></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.admin.templates');
} catch (e) {
  module = angular.module('es-ui.admin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('scavenge.tpl.html',
    '<header class=page-header><h2 class=page-title>Scavenge {{nodeEndpoint}}</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=admin>Back</a></li></ul></header><h3 class=page-title><em>{{scavengeId}}</em></h3><ul style="list-style-type: none; padding:0 0 0.75rem 0 !important"><li class=page-nav__item><a ng-click=pageForward() ng-disabled=!pagination.canGoForward()>Next</a> <a ng-click=pageBackward() ng-disabled=!pagination.canGoBackward()>Previous</a></li></ul><br><div class=container><table><thead><tr><th>Status</th><th>Space Saved (bytes)</th><th>Time Taken</th><th>Result</th></tr></thead><tbody><tr ng-repeat="info in scavengeInfo"><td>{{info.status}}</td><td>{{info.spaceSaved | number}}</td><td>{{info.timeTaken}}</td><td>{{info.result}}</td></tr></tbody></table></div>');
}]);
})();
 });