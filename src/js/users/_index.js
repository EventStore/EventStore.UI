define([
	'angular',
	'uiRouter',
    './controllers/_index',
    './services/_index',
    './directives/_index'
], function (ng) {

	'use strict';
    return ng.module('es-ui.users', [
		'ui.router',
    	'es-ui.users.controllers',
    	'es-ui.users.services'
	]);
});