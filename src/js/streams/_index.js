define([
	'angular',
	'uiRouter',
    './controllers/_index',
    './services/_index',
    './directives/_index'
], function (ng) {

	'use strict';
    return ng.module('es-ui.streams', [
		'ui.router',
    	'es-ui.streams.controllers',
    	'es-ui.streams.services'
	]);
});