define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.security.templates');
} catch (e) {
  module = angular.module('es-ui.security.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signin.tpl.html',
    '<div class=page-logon es-height><div class=logon-container><h1 class=site-title><a href="javascript:return false;"><img src=images/logo.svg height=29 width=119 alt="Event Store"></a></h1><form novalidate name=login ng-submit=signIn() class=login-form><label for=username>Username</label> <input placeholder=Username autofocus required name=username es-auto-focus ng-class="{ \'form-table--error\' : login.username.$invalid && !login.username.$pristine }" ng-model=log.username> <label for=password>Password</label> <input type=password ng-class="{ \'form-table--error\' : login.password.$invalid && !login.password.$pristine }" name=password class=form-table placeholder=Password ng-model=log.password required> <button type=submit style=cursor:pointer; ng-disabled=login.$invalid>Sign In</button></form></div><footer class=site-footer><p>Event Store</p></footer></div>');
}]);
})();
 });