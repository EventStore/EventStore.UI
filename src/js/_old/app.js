define([
	'angular',
	'uiRouter',
	'uiUtils',
	'uiAce',
	'./controllers/_index',
	'./directives/_index',
	'./filters/_index',
	'./services/_index',
	'./templates/_index'
], function (ng) {
	'use strict';

	// defines application, and depedencies

	return ng.module('es-ui', [
		'es-ui.controllers',
		'es-ui.directives',
		'es-ui.services',
		//'es-ui.filters',
		'es-ui.templates',
		'ui.router',
		'ui.utils',
		'ui.ace'
	]);
});