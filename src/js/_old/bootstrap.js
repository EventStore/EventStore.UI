define([
		'require',
		'angular',
		'app',
		'run',
		'consts',
		'routes'
], function (require, ng) {
	'use strict';

	require(['domReady!'], function (document) {
		ng.bootstrap(document, ['es-ui']);
	});

});