require.config({

	paths: {
		'domReady': '../bower_components/requirejs-domready/domReady',
		'angular': '../bower_components/angular/angular',
		'ngCookies': '../bower_components/angular-cookies/angular-cookies',
		'angularMocks': '../bower_components/angular-mocks/angular-mocks',
		'uiRouter': '../bower_components/angular-ui-router/release/angular-ui-router',
		'uiUtils': '../bower_components/angular-ui-utils/ui-utils',
		'jQuery': '../bower_components/jQuery/dist/jquery',
		'sprintf': '../bower_components/sprintf/src/sprintf'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'ngCookies': {
			deps: ['angular'],
			exports: 'ngCookies'			
		},
		'uiRouter': {
			deps: ['angular']
		},
		'uiUtils': {
			deps: ['angular']
		},
		'angularMocks': {
			deps: ['angular'],
			'exports': 'angular.mock'
		},
		'sprintf': {
			exports: 'sprintf'
		}
	},
	priority: [
		'angular'
	],
	deps: [
		'./bootstrap'
	]

});