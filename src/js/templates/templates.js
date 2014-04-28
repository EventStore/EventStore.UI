define(['angular'], function (angular) {'use strict'; (function(module) {
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
 });