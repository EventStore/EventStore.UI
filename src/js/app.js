define([
	'angular',
	'uiRouter',
	'uiUtils',
	'uiAce',
	'./projections/module',
	'./admin/module',
	'./dashboard/module',
	'./query/module',
	'./streams/module',
	'./users/module',
	'./services/_index',
	'./templates/_index'
], function (ng) {
	'use strict';

	// defines application, and depedencies

	return ng.module('es-ui', [
		'es-ui.controllers',
		'es-ui.directives',
		'es-ui.services',
		'es-ui.templates',
		'ui.router',
		'ui.utils',
		'ui.ace'
	]);
});