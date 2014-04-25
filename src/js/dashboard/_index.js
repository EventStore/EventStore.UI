define([
	'angular',
	'uiRouter',
    './controllers/_index',
    './services/_index',
    './directives/_index'
], function (ng) {

	'use strict';
    return ng.module('es-ui.dashboard', [
		'ui.router',
    	'es-ui.dashboard.controllers',
    	'es-ui.dashboard.services'
	]);
});