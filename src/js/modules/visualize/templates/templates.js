define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.visualize.templates');
} catch (e) {
  module = angular.module('es-ui.visualize.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('visualize.eventflow.tpl.html',
    '<style>.node {\n' +
    '	  cursor: pointer;\n' +
    '	}\n' +
    '\n' +
    '	.node circle {\n' +
    '	  fill: #fff;\n' +
    '	  stroke: #2E9625;\n' +
    '	  stroke-width: 1.5px;\n' +
    '	}\n' +
    '\n' +
    '	.node text {\n' +
    '	  font: 14px sans-serif;\n' +
    '	}\n' +
    '\n' +
    '	.link {\n' +
    '	  fill: none;\n' +
    '	  stroke: #ccc;\n' +
    '	  stroke-width: 1.5px;\n' +
    '	}\n' +
    '\n' +
    '	.arrow{\n' +
    '		stroke-width:8;\n' +
    '		stroke:#000;\n' +
    '	}\n' +
    '\n' +
    '	.tree_path{\n' +
    '		font-size: 20px;\n' +
    '		font-weight: bold;\n' +
    '		margin-top: 10px;\n' +
    '		margin-bottom: 10px;\n' +
    '		padding: 6px 20px 6px 20px;\n' +
    '	}\n' +
    '\n' +
    '	.tree_path_separator{\n' +
    '		width: 40px;\n' +
    '		float: left;\n' +
    '		font-weight: bold;\n' +
    '		text-align: center;\n' +
    '	}\n' +
    '\n' +
    '	#canvas{\n' +
    '		width: 100%;\n' +
    '		height: 600px;\n' +
    '	}\n' +
    '\n' +
    '	.input_control{\n' +
    '		width: 150px;\n' +
    '	}\n' +
    '\n' +
    '	.input_controls div{\n' +
    '		margin-bottom: 10px;\n' +
    '	}\n' +
    '\n' +
    '	.input_controls label{\n' +
    '		display:inline-block;\n' +
    '		width: 140px;\n' +
    '	}\n' +
    '\n' +
    '	.tips{\n' +
    '		position: absolute;\n' +
    '		top: 70px;\n' +
    '		right: 10px;\n' +
    '		width: 400px;\n' +
    '	}\n' +
    '\n' +
    '	.tips ul{\n' +
    '		margin: 0;\n' +
    '		padding: 0;\n' +
    '	}\n' +
    '	.event-detail{\n' +
    '		position: absolute;\n' +
    '		top: 70px;\n' +
    '		right: 450px;\n' +
    '		width: 250px;\n' +
    '	}\n' +
    '	.edge-label{\n' +
    '		font-size: 10px;\n' +
    '	}\n' +
    '	.node-timestamp{\n' +
    '		font-size: 10px !important;\n' +
    '		color: red; \n' +
    '	}\n' +
    '	.xaxis line{\n' +
    '	stroke: #2E9625;\n' +
    '	stroke-width: 1px;\n' +
    '	}\n' +
    '\n' +
    '	.xaxis path{\n' +
    '	stroke: #2E9625;\n' +
    '	stroke-width: 1px;\n' +
    '	}\n' +
    '\n' +
    '	.xaxis text{\n' +
    '	fill:black;\n' +
    '}</style><header class=page-header><h2 class=page-title>Event Flow Visualization</h2><ul class=page-nav><li class=page-nav__item></li></ul><div class=tips><h2>Some tips to get started</h2><ul><li>Make sure that the <strong>$by_correlation_id</strong> projection is running.<br><strong>Current status:</strong></li><li>Enter the <strong>Correlation ID</strong> of the event flow you want to visualize</li><li>Click on green events <svg height=12 width=12><circle cx=6 cy=6 r=5 fill="#2E9625"></svg> to expand</li><li>Hold your click on any event for 2 seconds make it the root node</li></ul></div><div class=event-detail><h2>Event Detail</h2><div>Name: {{selectedEventName}}</div><div>Event ID: {{selectedEventID}}</div><div>Timestamp: {{selectedEventTimestamp}}</div><div>id: <a target=_blank href={{selectedEventLink}}>{{selectedEventLink}}</a></div></div></header><div class=input_controls><form><div><label for=correlation_id_prop>Correlation ID property:&nbsp;</label><input class=input_control id=correlation_id_property value=$correlationId disabled=true></div><div><label for=caused_by_prop>Caused By property:&nbsp;</label><input class=input_control id=caused_by_property ng-model=causedByProperty></div><div><label for=correlation_id>Correlation ID:&nbsp;</label><input class=input_control id=correlation_id ng-model=correlationId> <input type=submit ng-click=go() value="Let\'s go!"></div></form></div><div style=clear:both></div><div class=tree_path><span ng-repeat="node in tree.path"><div class=tree_path_separator ng-if="$index > 0">></div><div style="float: left" ng-click=tree.makeRootNode(node)><a href=javascript:;>{{ node.name }}</a></div></span><div style=clear:both></div></div><div class=tree_controls><button ng-click=tree.collapseAll()>Collapse all</button> <button ng-click=tree.expandAll()>Expand all</button> <button ng-click=tree.collapseReset()>Reset</button></div><div id=canvas></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('es-ui.visualize.templates');
} catch (e) {
  module = angular.module('es-ui.visualize.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('visualize.tpl.html',
    '<div ui-view></div>');
}]);
})();
 });