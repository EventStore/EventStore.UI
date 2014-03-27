var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/spec\.js$/i.test(file)) {
			tests.push(file);
		}
	}
}
require.config({
	paths: {
		angular: '/base/singlenode-web/bower_components/angular/angular',
		ngCookies: '/base/singlenode-web/bower_components/angular-cookies/angular-cookies',
		angularRoute: '/base/singlenode-web/bower_components/angular-route/angular-route',
		angularMocks: '/base/singlenode-web/bower_components/angular-mocks/angular-mocks',
		domReady: '/base/singlenode-web/bower_components/requirejs-domready/domReady',
		uiRouter: '/base/singlenode-web/bower_components/angular-ui-router/release/angular-ui-router',
		uiUtils: '/base/singlenode-web/bower_components/angular-ui-utils/ui-utils',
		jQuery: '/base/singlenode-web/bower_components/jQuery/dist/jquery',
		sprintf: '/base/singlenode-web/bower_components/sprintf/src/sprintf',
		app: '/base/singlenode-web/js/app'

	},
	baseUrl: '/base/singlenode-web/js',
	shim: {
		angular : {
			exports : 'angular'
		},
		'ngCookies': {
			deps: ['angular'],
			exports: 'ngCookies'
		},
		angularRoute: [
			'angular'
		],
		angularMocks: {
			deps: [
				'angular'
			],
			'exports':'angular.mock'
		},
		uiRouter: {
			deps: [
				'angular'
			]
		},
		uiUtils: {
			deps: [
				'angular'
			]
		},
		sprintf: {
			exports: 'sprintf'
		}
	},
	deps: tests,
	callback: window.__karma__.start
});