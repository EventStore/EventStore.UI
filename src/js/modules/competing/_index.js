define([
	'angular',
	'uiRouter',
    './controllers/_index',
    './services/_index',
    './directives/_index',
    './templates/templates'
], function (ng) {

	'use strict';
    return ng.module('es-ui.competing', [
		'ui.router',
        'es-ui.competing.templates',
    	'es-ui.competing.controllers',
    	'es-ui.competing.services',
        'es-ui.competing.directives'
	]);
});