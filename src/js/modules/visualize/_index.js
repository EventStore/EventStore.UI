define([
	'angular',
	'uiRouter',
    './controllers/_index',
    './services/_index',
    './templates/templates'
], function (ng) {

	'use strict';
    return ng.module('es-ui.visualize', [
		'ui.router',
        'es-ui.visualize.templates',
    	'es-ui.visualize.services',
    	'es-ui.visualize.controllers',
	]);
});