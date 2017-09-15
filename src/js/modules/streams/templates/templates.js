define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.streams.templates');
} catch (e) {
  module = angular.module('es-ui.streams.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.event.new.tpl.html',
    '<header class=page-header><h2 class=page-title>New Event</h2></header><form novalidate name=newEvent ng-submit=save() class=new-subscription-form><table><tbody><tr><td>Stream ID</td><td><input ng-model=streamId class=form-table name=stream ng-class="{ \'form-table--error\' : newEvent.stream.$invalid && !newEvent.stream.$pristine }" ng-disabled="addingToSpecificStream"></td></tr><tr><td>Event ID</td><td><input ng-model=eventId class=form-table name=evnt ng-class="{ \'form-table--error\' : newEvent.evnt.$invalid && !newEvent.evnt.$pristine }"></td></tr><tr><td>Event Type</td><td><input ng-model=eventType class=form-table name=eventType ng-class="{ \'form-table--error\' : newEvent.eventType.$invalid && !newEvent.eventType.$pristine }"></td></tr><tr class=table-subheading><td colspan=2>Data</td></tr><tr><td colspan=2><div ui-ace=aceConfig style="min-height: 350px; max-height: 350px" ng-model=eventData></div></td></tr><tr class=table-subheading><td colspan=2>Metadata</td></tr><tr><td colspan=2><div ui-ace=aceConfig style="min-height: 150px; max-height: 150px" ng-model=eventMetadata></div></td></tr></tbody></table><ul class=page-nav><li class=page-nav__item><button type=submit ng-click=addEvent() ng-disabled=newEvent.$invalid>Add</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.streams.templates');
} catch (e) {
  module = angular.module('es-ui.streams.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.acl.tpl.html',
    '<header class=page-header><h2 class=page-title>Edit ACL for Event Stream \'{{ streamId }}\'</h2><ul class=page-nav><li class=page-nav__item><a ui-sref=^.events>Back</a></li></ul></header><form novalidate name=editAcl ng-submit=updateAcl()><table><tbody><tr><td>Reader</td><td><input name=reader class=form-table ng-model=reader></td></tr><tr><td>Writer</td><td><input name=writer class=form-table ng-model=writer></td></tr><tr><td>Deleter</td><td><input name=deleter class=form-table ng-model=deleter></td></tr><tr><td>Meta Reader</td><td><input name=metareader class=form-table ng-model=metareader></td></tr><tr><td>Meta Writer</td><td><input name=metawriter class=form-table ng-model=metawriter></td></tr></tbody></table><ul class=page-nav><li class=page-nav__item><button type=submit>Save</button></li></ul></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.streams.templates');
} catch (e) {
  module = angular.module('es-ui.streams.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.event.tpl.html',
    '<header class=page-header><h2 class=page-title>{{ evt.title }} <small ng-if=isNotTheSame>Link from {{ evt.positionEventNumber + \'@\' + evt.positionStreamId }}</small></h2><ul class=page-nav><li class=page-nav__item><a ng-if=evt ui-sref="^.addStreamEvent({ fromEvent: evt })">Add New Like This</a></li><li class=page-nav__item><a ui-sref=^.events>Back</a></li></ul></header><ul class=page-nav style="padding:0 0 0.75rem 0 !important"><li class=page-nav__item ng-if=next><a ui-sref=".({streamId: evt.streamId, eventNumber: evt.positionEventNumber + 1})">next</a></li><li class=page-nav__item ng-if=prev><a ui-sref=".({streamId: evt.streamId, eventNumber: evt.positionEventNumber - 1})">prev</a></li></ul><br><table><thead><tr><th>No</th><th>Stream</th><th>Type</th><th>Timestamp</th></tr></thead><tbody><tr><td>{{ evt.eventNumber }}</td><td><a ui-sref="^.events({streamId: evt.streamId})">{{ evt.streamId }}</a></td><td>{{ evt.eventType }}</td><td>{{ evt.updated | date:\'yyyy-MM-dd HH:mm:ss\'}}</td></tr><tr ng-if="evt.isJson || evt.isMetaData || evt.isLinkMetaData"><td colspan=4><div ng-if=evt.isJson><strong>Data</strong><pre>\n' +
    '{{ evt.data }}\n' +
    '				</pre></div><div ng-if=evt.isMetaData><strong>Metadata</strong><pre>\n' +
    '{{ evt.metaData }}\n' +
    '				</pre></div><div ng-if=evt.isLinkMetaData><strong>Link metadata</strong><pre>\n' +
    '{{ evt.content.linkMetaData }}\n' +
    '				</pre></div></td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.streams.templates');
} catch (e) {
  module = angular.module('es-ui.streams.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.events.tpl.html',
    '<table><thead><tr><th>Event #</th><th>Name</th><th>Type</th><th>Created Date</th><th></th></tr></thead><tbody ng-repeat="event in streams track by event.title"><tr ng-class="{ \'invalid\': !event.streamId }"><td><a ng-if=event.streamId ui-sref="^.event({streamId: event.streamId, eventNumber: event.eventNumber})">{{ event.positionEventNumber }}</a><text ng-if=!event.streamId>{{ event.positionEventNumber }}</text></td><td><a ng-if=event.streamId ui-sref="^.event({streamId: event.streamId, eventNumber: event.eventNumber})">{{ event.title }}</a><text ng-if=!event.streamId>{{ event.title }}</text></td><td>{{ event.eventType }}</td><td>{{ event.updated | date:\'yyyy-MM-dd HH:mm:ss\'}}</td><td><a ng-click="toggleJson($event, event)" style="cursor: pointer" ng-if="event.isJson || event.isLinkMetaData || event.isMetaData">JSON</a></td></tr><tr ng-show=event.showJson><td colspan=5><div ng-if=event.isJson><strong>Data</strong><pre>\n' +
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
  module = angular.module('es-ui.streams.templates');
} catch (e) {
  module = angular.module('es-ui.streams.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.item.tpl.html',
    '<header class=page-header><h2 class=page-title>Event Stream \'{{ streamId }}\'</h2><ul class=page-nav><li class=page-nav__item><a ng-class="{highlight: isPolling == false}" ng-click=togglePause() ng-show=headOfStream>{{ isPolling == true ? \'Pause\' : \'Resume\' }}</a></li><li class=page-nav__item><a ui-sref=.acl ng-show="streamId !== \'$all\' && isAdmin">Edit ACL</a></li><li class=page-nav__item><a ui-sref=.addStreamEvent ng-show="streamId.indexOf(\'$\') !== 0">Add Event</a></li><li class=page-nav__item><a ng-click=deleteStream()>Delete</a></li><li ng-if=projectionsAllowed class=page-nav__item><a ui-sref="query({ initStreamId: streamId })">Query</a></li><li class=page-nav__item><a ui-sref=^.list>Back</a></li></ul></header><ul style="list-style-type: none; padding:0 0 0.75rem 0 !important"><li class=page-nav__item ng-repeat="link in links"><a ng-href={{link.uri}}>{{ link.relation }}</a></li></ul><br><div ui-view es-link-header></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.streams.templates');
} catch (e) {
  module = angular.module('es-ui.streams.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.list.tpl.html',
    '<header class=page-header><h2 class=page-title>Stream Browser</h2><ul class=page-nav><li class=page-nav__item><form><input ui-keypress="{\'enter\': \'gotoStream($event)\'}" ng-model=search placeholder="Search for stream"></form></li><li class=page-nav__item><a ui-sref=.addStreamEvent>Add Event</a></li></ul></header><div ng-if=isAdmin class=container><div class=container-left><table><thead><tr><th>Recently Created Streams</th></tr></thead><tbody><tr ng-repeat="stream in createdStreams"><td><a ui-sref="^.item.events({streamId: stream.streamId})">{{ stream.streamId }}</a></td></tr><tr ng-hide=createdStreams><td><em>No recently created streams</em></td></tr></tbody></table></div><div class=container-right><table><thead><tr><th>Recently Changed Streams</th></tr></thead><tbody><tr ng-repeat="stream in changedStreams"><td><a ui-sref="^.item.events({streamId: stream.streamId})">{{ stream.streamId }}</a></td></tr><tr ng-hide=changedStreams><td><em>No recently changed streams</em></td></tr></tbody></table></div></div><em ng-if=!isAdmin>You must be an admin to view recently created streams</em>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.streams.templates');
} catch (e) {
  module = angular.module('es-ui.streams.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('streams.tpl.html',
    '<div ui-view></div>');
}]);
})();
 });