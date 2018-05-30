define([
	'angular',
	'uiRouter',
	'uiUtils',
	'uiAce',
	'ngToastr',
	'angular-clipboard',
	'./modules/projections/module',
	'./modules/admin/module',
	'./modules/dashboard/module',
	'./modules/clusterstatus/module',
	'./modules/streams/module',
	'./modules/security/module',
	'./modules/users/module',
	'./modules/competing/module',
	'./modules/visualize/module',
	'./services/_index',
	'./directives/_index',
	'./templates/_index'
], function (ng) {
	'use strict';

	// defines application, and depedencies

	return ng.module('es-ui', [
		'es-ui.projections',
		'es-ui.admin',
		'es-ui.dashboard',
		'es-ui.clusterstatus',
		'es-ui.streams',
		'es-ui.users',
		'es-ui.competing',
		'es-ui.security',
		'es-ui.directives',
		'es-ui.services',
		'es-ui.templates',
		'es-ui.visualize',
		'ui.router',
		'ui.utils',
		'ui.ace',
		'toastr',
		'angular-clipboard',
	]);
});
