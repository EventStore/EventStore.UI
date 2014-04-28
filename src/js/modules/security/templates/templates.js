define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.security.templates');
} catch (e) {
  module = angular.module('es-ui.security.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signin.tpl.html',
    '<div class=page-logon><div class=logon-container><h1 class=site-title><a href="javascript:return false;"><img src=images/logo.svg height=29 width=119 alt="Event Store"></a></h1><form class=login-form><label for=username>Username</label><input id=username placeholder=Username><label for=password>Password</label><input type=password id=password placeholder=Password><button type=submit>Log In</button></form></div><footer class=site-footer><p>Event Store 2.1 &middot; <a href=#>Forgotten your password? - ARE WE MISSING THIS FROM ES?</a></p></footer></div>');
}]);
})();
 });