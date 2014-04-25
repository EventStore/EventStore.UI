define([
	'require',
	'angular',
	'es-ui',
	'run',
	'./config/consts',
	'./config/http',
	'./config/qDecorator',
	'./config/routes'
], function (require, ng) {
	'use strict';

	require(['domReady!'], function (document) {
		ng.bootstrap(document, ['es-ui']);
	});

});