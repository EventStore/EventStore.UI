define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('admin.tpl.html',
    '<header class=page-header><h2 class=page-title>Admin</h2><ul class=page-nav><li class=page-nav__item><a href=# ng-click=halt($event)>Halt Server</a></li><li class=page-nav__item><a href=# ng-click=shutdown($event)>Shutdown Server</a></li><li class=page-nav__item><a href=# ng-click=scavenge($event)>Scavenge</a></li></ul></header><p>Nothing here... ????</p><p>Orginal code contains ajax call to get <code>/sys/subsystems</code> but this is not used anywhere on the web page. Moreover, code is used only to set <code>linkToChat.style.display</code> to <code>inline</code> or write message to console <code>"Not expected subsystem " + item + " has been found in list."</code>.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Dashboard</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.snapshot>Snapshot</a></li></ul></header><table class=table-queues><thead><tr><th>Queue Name</th><th colspan=2>Length</th><th>Rate (items/s)</th><th>Time (ms/item)</th><th>Activity</th><th>Items Processed</th><th>Current / Last Message</th></tr><tr><th></th><th class=table-subheading>Current</th><th class=table-subheading>Peak</th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody ng-repeat="(key, prop) in queues track by key"><tr ng-if=prop.queues class=table-subheading style="cursor: pointer" es-queue-row-header="" es-queue=prop></tr><tr ng-if=!prop.queues es-queue-row="" es-queue=prop></tr><tr ng-show=prop.show ng-repeat="item in prop.queues" class=table-indentedrow es-queue-row="" es-queue=item></tr></tbody><tbody ng-hide=queues><tr><td colspan=8><em>No stats to display</em></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.row.header.tpl.html',
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
  $templateCache.put('dashboard.row.tpl.html',
    '<td>{{ esQueue.queueName }}</td><td>{{ esQueue.lengthCurrentTryPeak }}</td><td>{{ esQueue.lengthLifetimePeak }}</td><td>{{ esQueue.avgItemsPerSecond }}</td><td>{{ esQueue.avgProcessingTime.toFixed(3)}}</td><td>{{ esQueue.busy }}</td><td>{{ esQueue.totalItemsProcessed }}</td><td style="text-align: right">{{ esQueue.inProgressMessage }} / {{ esQueue.lastProcessedMessage }}</td>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
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
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard.tpl.html',
    '<div ui-view=""></div>');
}]);
})();

(function(module) {
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
  $templateCache.put('login.tpl.html',
    '<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=1024"><meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1"><title>Event Store</title><link rel=stylesheet href=css/main.css><link rel=apple-touch-icon href=apple-touch-icon.png><link rel=icon type=image/png href=favicon.png><meta name=msapplication-TileImage content=es-tile.png><meta name=msapplication-TileColor content=#6BA300></head><body class=page-logon><div class=logon-container><h1 class=site-title><a href=#><img src=images/logo.svg height=29 width=119 alt="Event Store"></a></h1><form class=login-form><label for=username>Username</label><input id=username placeholder=Username><label for=password>Password</label><input type=password id=password placeholder=Password><button type=submit>Log In</button></form></div><footer class=site-footer><p>Event Store 2.1 &middot; <a href=#>Forgotten your password?</a></p></footer></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.item.debug.tpl.html',
    '<header class=page-header><h2 class=page-title>Projection Debug</h2><ul class=page-nav><li class=page-nav__item><a href=#>Run</a></li><li class=page-nav__item><a href=#>Update</a></li><li class=page-nav__item><a href=#>Back</a></li></ul></header><div class=container><div class=container-left><h3 class=block-title>Source</h3><div ui-ace=aceConfig ng-model=query></div></div><div class=container-right><h3 class=block-title>State</h3><textarea class="code-half code-read-only">Text</textarea><h3 class=block-title>Events</h3><textarea class="code-half code-read-only">Text</textarea></div></div><p>NOT SURE IF THIS SHOULD BE REPEATED</p><ul class=page-nav><li class=page-nav__item><a href=#>Update</a></li><li class=page-nav__item><a href=#>Run</a></li></ul><div class=container><div class=container-left><div class=block><h3 class=block-title>Instructions</h3><ol><li>Make sure you use the Google Chrome browser.</li><li>Open a debugger (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> on Windows).</li><li>Check the debugger console for errors (occurred while running the projection definition on while loading state and events).</li><li>Click the ‘Run’ button above.</li><li>Watch for errors in the debugger console</li><li>Check the debugging status on XXXXXXXXX.</li><li>Execution will stop on ‘debugger’ statement immediately before invoking your event handler.</li></ol><p>Any log output and emitted events will appear in the log viewer.</p></div></div><div class=container-right><h3 class=block-title>Log Viewer</h3><textarea class="code-half code-read-only code-console">Console</textarea></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.item.delete.tpl.html',
    '<header class=page-header><h2 class=page-title>Delete Projection</h2><ul class=page-nav><li class=page-nav__item><a ng-click=remove($event) href=#>Confirm Delete</a> <a ui-sref=^.details>Back</a></li></ul></header><table><tbody><tr><td>Name</td><td><span>{{ projection.name }}</span></td></tr><tr><td>State</td><td><span>{{ projection.state }}</span></td></tr><tr><td>Source</td><td><pre>\n' +
    '{{ projection.source }}\n' +
    '				</pre></td></tr><tr><td></td><td><label><input type=checkbox ng-model=deleteCheckpoint>Delete Checkpoint Stream</label></td></tr><tr><td></td><td><label><input type=checkbox ng-model=deleteState>Delete State Stream</label></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.item.details.tpl.html',
    '<header class=page-header><h2 class=page-title>Projection Details</h2><ul class=page-nav><li class=page-nav__item><button ng-click=start() ng-disabled=isRunning href=#>Start</button></li><li class=page-nav__item><button ng-click=stop() ng-disabled=isStopped>Stop</button></li><li class=page-nav__item><a ui-sref=^.edit>Edit</a></li><li class=page-nav__item><a ui-sref=^.debug>Debug</a></li><li class=page-nav__item><a ui-sref=^.delete>Delete</a></li><li class=page-nav__item><button ng-click=reset($event)>Reset</button></li><li class=page-nav__item><a ui-sref=^.^.list>Back</a></li></ul></header><h3>{{stats.name}} - {{stats.status}}</h3><p><strong>mode:</strong><span>{{stats.mode}}</span></p><p style="background-color: red; color: white" ng-if=stats.stateReason>{{stats.stateReason}}</p><div class=container><div class=container-left><h3 class=block-title>Source</h3><div readonly=true ui-ace=aceConfig ng-model=query></div></div><div class=container-right><h3 class=block-title>Stats</h3><table><tr><td>Events/sec</td><td>{{ stats.eventsPerSecond }}</td></tr><tr><td>Buffered events</td><td>{{ stats.bufferedEvents }}</td></tr><tr><td>Events processed</td><td>{{ stats.eventsProcessedAfterRestart }}</td></tr><tr><td>Partitions cached</td><td>{{ stats.partitionsCached }}</td></tr><tr><td>Reads in-progress</td><td>{{ stats.readsInProgress }}</td></tr><tr><td>Writes in-progress</td><td>{{ stats.writesInProgress }}</td></tr><tr><td>Write queue</td><td>{{ stats.writePendingEventsAfterCheckpoint }}</td></tr><tr><td>Write queue (chkp)</td><td>{{ stats.writePendingEventsBeforeCheckpoint }}</td></tr><tr><td>Checkpoint status</td><td>{{ stats.checkpointStatus }}</td></tr><tr><td>Position</td><td>{{ stats.position }}</td></tr><tr><td>Last checkpoint</td><td>{{ stats.lastCheckpoint }}</td></tr><table><h3 class=block-title>Results <span ng-show=stream>(<a ui-sref="streams.item.events({streamId: stream})">{{ stream }}</a>)</span></h3><pre>\n' +
    '{{result | json}}\n' +
    '		</pre><h3 class=block-title>State</h3><pre>\n' +
    '{{state | json}}\n' +
    '		</pre></table></table></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.item.edit.tpl.html',
    '<header class=page-header><h2 class=page-title>Projection Edit</h2><ul class=page-nav><li class=page-nav__item><button ng-click=start() ng-disabled=isRunning href=#>Start</button></li><li class=page-nav__item><button ng-click=stop() ng-disabled=isStopped>Stop</button></li><li class=page-nav__item><button ng-click=save()>Save</button></li><li class=page-nav__item><button ng-click=reset($event)>Reset</button></li><li class=page-nav__item><a ui-sref=^.details>Back</a></li></ul></header><h3>{{stats.name}} - {{stats.status}}</h3><p><strong>mode:</strong><span>{{stats.mode}}</span></p><p style="background-color: red; color: white" ng-if=stats.stateReason>{{stats.stateReason}}</p><div class=container><div class=container-left><h3 class=block-title>Source</h3><div ui-ace=aceConfig ng-model=query></div><label><input type=checkbox ng-model=emit>Emit enabled</label></div><div class=container-right><h3 class=block-title>Results <span ng-show=stream>(<a ui-sref="streams.item.events({streamId: stream})">{{ stream }}</a>)</span></h3><pre>\n' +
    '{{result | json}}\n' +
    '		</pre><h3 class=block-title>State</h3><pre>\n' +
    '{{state | json}}\n' +
    '		</pre></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.item.tpl.html',
    '<div ui-view=""></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Projections</h2><ul class=page-nav><li class=page-nav__item><a ng-click=disableAll($event)>Disable All</a></li><li class=page-nav__item><a ng-click=enableAll($event)>Enable All</a></li><li class=page-nav__item><input type=checkbox ng-model=includeQueries>Include Queries</li><li class=page-nav__item><a ui-sref=^.new>New Projection</a></li></ul></header><table class=table-projections><thead><tr><th>Name</th><th>Status</th><th>Mode</th><th>Done</th><th>Read / Write in Progress</th><th>Write Queues</th><th>Partitions Cached</th><th>Rate (events/s)</th><th colspan=2>Events</th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th class=table-subheading>Processed</th><th class=table-subheading>Buffered</th></tr></thead><tbody><tr ng-repeat="projection in projections"><td><a ui-sref="^.item.details({location: projection.location})">{{ projection.name }}</a></td><td>{{ projection.status }}{{ projection.checkpointStatus }}</td><td>{{ projection.mode }}</td><td>{{ projection.progress.toFixed(1) }}%</td><td>{{ projection.readsInProgress }} / {{ projection.writesInProgress }}</td><td>{{ projection.writePendingEventsAfterCheckpoint }} / {{ projection.writePendingEventsBeforeCheckpoint }}</td><td>{{ projection.partitionsCached }}</td><td>{{ projection.eventsPerSecond }}</td><td>{{ projection.eventsProcessedAfterRestart }}</td><td>{{ projection.bufferedEvents }}</td></tr><tr ng-hide=projections><td colspan=10><em>No projections</em></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.new.tpl.html',
    '<header class=page-header><h2 class=page-title>New Projection</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><div><a ui-sref=^.standard>You can also post a standard projection</a></div><form novalidate="" name=newProj ng-submit=save()><table><tbody><tr><td>Name</td><td><input ng-model=name required="" class=form-table name=projName ng-class="{ \'form-table--error\' : newProj.projName.$invalid && !newProj.projName.$pristine }"></td></tr><tr><td>Source</td><td><div ui-ace=aceConfig required="" ng-model=source></div></td></tr><tr><td>Mode</td><td><select ng-model=mode class=form-table ng-options="obj.value as obj.name for obj in modes"></select></td></tr><tr><td>Checkpoints Enabled</td><td><input type=checkbox ng-model=checkpoints ng-disabled=checkpointsDisabled></td></tr><tr><td>Emit Enabled</td><td><input type=checkbox ng-model=emit></td></tr><tr><td>Enabled</td><td><input type=checkbox ng-model=enabled></td></tr></tbody></table><ul><li><button type=submit ng-disabled=newProj.$invalid>Create</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.standard.tpl.html',
    '<header class=page-header><h2 class=page-title>New Standard Projection</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><form novalidate="" name=newProj ng-submit=save()><table><tbody><tr><td>Name</td><td><input ng-model=name required="" class=form-table name=projName ng-class="{ \'form-table--error\' : newProj.projName.$invalid && !newProj.projName.$pristine }"></td></tr><tr><td>Source</td><td><div ui-ace=aceConfig required="" ng-model=source></div></td></tr><tr><td>Select Type</td><td><select ng-model=type required="" class=form-table ng-options="obj.value as obj.name for obj in types"></select></td></tr></tbody></table><ul><li><button type=submit ng-disabled=newProj.$invalid>Create</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('projections.tpl.html',
    '<div ui-view=""></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('query.tpl.html',
    '<header class=page-header><h2 class=page-title>Query</h2><ul class=page-nav><li class=page-nav__item><a href=#>Run</a></li><li class=page-nav__item><a href=#>Break</a></li><li class=page-nav__item><a href=#>Debug</a></li></ul></header><div class=container><div class=container-left><h3 class=block-title>Source</h3><div ui-ace=aceConfig ng-model=query></div></div><div class=container-right><h3 class=block-title>State</h3><textarea class="code-half code-read-only">Text</textarea></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.acl.tpl.html',
    '<header class=page-header><h2 class=page-title>Edit ACL for Event Stream \'{{ streamId }}\'</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.events>Back</a></li></ul></header><form novalidate="" name=editAcl ng-submit=updateAcl()><table><tbody><tr><td>Reader</td><td><input name=reader class=form-table ng-model=reader></td></tr><tr><td>Writer</td><td><input name=writer class=form-table ng-model=writer></td></tr><tr><td>Deleter</td><td><input name=deleter class=form-table ng-model=deleter></td></tr><tr><td>Meta Reader</td><td><input name=metareader class=form-table ng-model=metareader></td></tr><tr><td>Meta Writer</td><td><input name=metawriter class=form-table ng-model=metawriter></td></tr></tbody></table><ul><li><button type=submit>Save</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.event.tpl.html',
    '<header class=page-header><h2 class=page-title>{{ evt.title }} <small ng-if=isNotTheSame>Link from {{ evt.positionEventNumber + \'@\' + evt.positionStreamId }}</small></h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.events>Back</a></li></ul></header><ul><li ng-if=next><a ui-sref=".({streamId: evt.streamId, eventNumber: evt.positionEventNumber + 1})">next</a></li><li ng-if=prev><a ui-sref=".({streamId: evt.streamId, eventNumber: evt.positionEventNumber - 1})">prev</a></li><li>NOT SURE WHAT EDIT/ALERNATE SHOULD DO</li><li ng-repeat="link in links"><a href=#>{{ link.relation }}</a></li></ul><table><thead><tr><th>No</th><th>Stream</th><th>Type</th><th>Timestamp</th></tr></thead><tbody><tr><td>{{ evt.eventNumber }}</td><td><a ui-sref="^.events({streamId: evt.streamId})">{{ evt.streamId }}</a></td><td>{{ evt.eventType }}</td><td>{{ evt.updated | date:\'yyyy-MM-dd HH:mm\'}}</td></tr><tr ng-if="evt.isJson || evt.isMetaData || evt.isLinkMetaData"><td colspan=4><div ng-if=evt.isJson><strong>Data</strong><pre>\n' +
    '{{ evt.data }}\n' +
    '				</pre></div><div ng-if=evt.isMetaData><strong>Metdata</strong><pre>\n' +
    '{{ evt.metaData }}\n' +
    '				</pre></div><div ng-if=evt.isLinkMetaData><strong>Link metadata</strong><pre>\n' +
    '{{ evt.content.linkMetaData }}\n' +
    '				</pre></div></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.events.tpl.html',
    '<table><thead><tr><th>Event #</th><th>Name</th><th>Type</th><th>Created Date</th><th></th></tr></thead><tbody ng-repeat="event in streams"><tr><td><a ui-sref="^.event({streamId: event.streamId, eventNumber: event.positionEventNumber})">{{ event.positionEventNumber }}</a></td><td><a ui-sref="^.event({streamId: event.streamId,eventNumber: event.positionEventNumber})">{{ event.title }}</a></td><td>{{ event.eventType }}</td><td>{{ event.updated | date:\'yyyy-MM-dd HH:mm\'}}</td><td><a ng-click="toggleJson($event, event)" style="cursor: pointer" ng-if="event.isJson || event.isLinkMetaData || event.isMetaData">JSON</a></td></tr><tr ng-show=event.showJson><td colspan=5><div ng-if=event.isJson><strong>Data</strong><pre>\n' +
    '{{ event.data }}					\n' +
    '					</pre></div><div ng-if=event.metaData><strong>Metadata</strong><pre>\n' +
    '{{ event.metaData }}					\n' +
    '					</pre></div><div ng-if=event.isLinkMetaData><strong>Link metadata</strong><pre>\n' +
    '{{ event.linkMetaData }}					\n' +
    '					</pre></div></td></tr></tbody><tbody ng-hide=streams><tr><td colspan=5><em>No events for current path: {{ $stateParams | json }}</em></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.tpl.html',
    '<header class=page-header><h2 class=page-title>Event Stream \'{{ streamId }}\'</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=.acl>Edit ACL</a></li><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><ul><li ng-repeat="link in links"><a ng-href={{link.uri}}>{{ link.relation }}</a> </li></ul><div ui-view=""></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Stream Browser</h2><ul class=page-nav><li class=page-nav__item><form><input ui-keypress="{\'enter\': \'gotoStream($event)\'}" ng-model=search></form></li></ul></header><div class=container><div class=container-left><table><thead><tr><th>Recently Created Streams <small>issue: #1</small></th></tr></thead><tbody><tr ng-repeat="stream in createdStreams"><td><a ui-sref="^.item.events({streamId: stream.streamId})">{{ stream.streamId }}</a></td></tr><tr ng-hide=createdStreams><td><em>No recently created streams</em></td></tr></tbody></table></div><div class=container-right><table><thead><tr><th>Recently Changed Streams</th></tr></thead><tbody><tr ng-repeat="stream in changedStreams"><td><a ui-sref="^.item.events({streamId: stream.streamId})">{{ stream.streamId }}</a></td></tr><tr ng-hide=changedStreams><td><em>No recently changed streams</em></td></tr></tbody></table></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.tpl.html',
    '<div ui-view=""></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.item.delete.tpl.html',
    '<header class=page-header><h2 class=page-title>Delete User {{ user.loginName }}</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.details>Back</a></li></ul></header><pre>\n' +
    '{{ user | json }}\n' +
    '</pre><ul><li><a href=# ng-click=confirm($event) ng-disabled=disable>Delete</a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.item.details.tpl.html',
    '<div ui-view=""><header class=page-header><h2 class=page-title>User Details {{ user.loginName }}</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.edit>Edit</a></li><li class=page-nav__item><a ui-sref=^.delete>Delete</a></li><li class=page-nav__item ng-hide=user.disabled><a ui-sref=^.disable>Disable</a></li><li class=page-nav__item ng-show=user.disabled><a ui-sref=^.enable>Enable</a></li><li class=page-nav__item><a ui-sref=^.reset>Password reset</a></li><li class=page-nav__item><a ui-sref=^.^.list>Back</a></li></ul></header><pre>\n' +
    '{{ user | json }}\n' +
    '</pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.item.disable.tpl.html',
    '<header class=page-header><h2 class=page-title>Disable User {{ user.loginName }}</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.details>Back</a></li></ul></header><pre>\n' +
    '{{ user | json }}\n' +
    '</pre><ul><li><a href=# ng-click=confirm($event) ng-disabled=disable>Disable</a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.item.edit.tpl.html',
    '<header class=page-header><h2 class=page-title>Edit User {{ user.loginName }}</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.details>Back</a></li></ul></header><form novalidate="" name=editUsr ng-submit=confirm()><table><tbody><tr><td>Login Name</td><td>{{ user.loginName}}</td></tr><tr><td>Full Name</td><td><input name=fullName class=form-table ng-class="{ \'form-table--error\' : editUsr.fullName.$invalid && !editUsr.fullName.$pristine }" ng-model=fullName required=""></td></tr><tr><td>Groups</td><td><input type=checkbox name=isAdmin ng-model=isAdmin><label for=isAdmin>Is Administrator</label></td></tr></tbody></table><ul><li><button type=submit ng-disabled=editUsr.$invalid>Update</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.item.enable.tpl.html',
    '<header class=page-header><h2 class=page-title>Enable User {{ user.loginName }}</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.details>Back</a></li></ul></header><pre>\n' +
    '{{ user | json }}\n' +
    '</pre><ul><li><a href=# ng-click=confirm($event) ng-disabled=disable>Enable</a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.item.reset.tpl.html',
    '<header class=page-header><h2 class=page-title>Reset User {{ user.loginName }} Password</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.details>Back</a></li></ul></header><form novalidate="" name=resetPwd ng-submit=confirm()><table><tbody><tr><td>Login Name</td><td>{{ user.loginName}}</td></tr><tr><td>Password</td><td><input type=password name=password class=form-table ng-class="{ \'form-table--error\' : resetPwd.password.$invalid && !resetPwd.password.$pristine }" ng-model=password required=""></td></tr><tr><td>Confirm Password</td><td><input type=password class=form-table name=confirmPassword ng-model=confirmPassword ng-class="{ \'form-table--error\' : resetPwd.confirmPassword.$invalid && !resetPwd.confirmPassword.$pristine }" es-validate-equals=password></td></tr></tbody></table><ul><li><button type=submit ng-disabled=resetPwd.$invalid>Reset password</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.item.tpl.html',
    '<div ui-view=""></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.list.tpl.html',
    '<div ui-view=""><header class=page-header><h2 class=page-title>Users</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.new>New User</a></li></ul></header><table class=table-queues><thead><tr><th>Login Name</th><th>Full Name</th><th>Groups</th><th>Disabled</th><th>Updated</th></tr></thead><tbody><tr ng-repeat="user in users"><td><a ui-sref="^.item.details({username: user.loginName})">{{ user.loginName }}</a></td><td>{{ user.fullName }}</td><td>{{ user.groups.join(\', \') }}</td><td>{{ user.disabled }}</td><td>{{ user.dateLastUpdated | date:\'short\' }}</td></tr><tr ng-hide=users><td colspan=5><em>No users</em></td></tr></tbody></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.new.tpl.html',
    '<header class=page-header><h2 class=page-title>New User</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><form novalidate="" name=newUsr ng-submit=confirm()><table><tbody><tr><td>Login Name</td><td><input class=form-table autofocus="" required="" name=loginName ng-class="{ \'form-table--error\' : newUsr.loginName.$invalid && !newUsr.loginName.$pristine }" ng-model=newUser.loginName></td></tr><tr><td>Full Name</td><td><input ng-class="{ \'form-table--error\' : newUsr.fullName.$invalid && !newUsr.fullName.$pristine }" name=fullName class=form-table required="" ng-model=newUser.fullName></td></tr><tr><td>Password</td><td><input type=password ng-class="{ \'form-table--error\' : newUsr.password.$invalid && !newUsr.password.$pristine }" name=password class=form-table ng-model=newUser.password required=""></td></tr><tr><td>Confirm Password</td><td><input type=password ng-class="{ \'form-table--error\' : newUsr.confirmPassword.$invalid && !newUsr.confirmPassword.$pristine }" name=confirmPassword class=form-table required="" ng-model=newUser.confirmPassword es-validate-equals=newUser.password></td></tr><tr><td>Groups</td><td><input type=checkbox name=isAdmin ng-model=newUser.isAdmin><label for=isAdmin>Is Administrator</label></td></tr></tbody></table><ul><li><button type=submit ng-disabled=newUsr.$invalid>Create</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.templates');
} catch (e) {
  module = angular.module('es-ui.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users.tpl.html',
    '<div ui-view=""></div>');
}]);
})();
 });