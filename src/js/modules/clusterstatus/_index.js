define([
	'angular',
	'uiRouter',
    './controllers/_index',
    './services/_index',
    './templates/templates'
], function (ng) {

	'use strict';
    return ng.module('es-ui.clusterstatus', [
		'ui.router',
        'es-ui.clusterstatus.templates',
    	'es-ui.clusterstatus.services',
    	'es-ui.clusterstatus.controllers',
	]);
});