require.config({

	paths: {
		'domReady': '../bower_components/requirejs-domready/domReady',
		'angular': '../bower_components/angular/angular',
		'ngCookies': '../bower_components/angular-cookies/angular-cookies',
		'uiRouter': '../bower_components/angular-ui-router/release/angular-ui-router',
		'ngToastr': '../bower_components/angular-toastr/dist/angular-toastr',
		'uiUtils': '../bower_components/angular-ui-utils/ui-utils',
		'jQuery': '../bower_components/jQuery/dist/jquery',
		'sprintf': '../bower_components/sprintf/src/sprintf',
		'uiAce': '../bower_components/angular-ui-ace/ui-ace',
		'ace': '../bower_components/ace-builds/src-min-noconflict/ace',
		'es-ui': './app'
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
		'ngToastr': {
			deps: ['angular'],
			exports: 'ngToastr'
		},
		'uiAce': {
			deps: ['angular', 'ace']
		},
		'uiUtils': {
			deps: ['angular']
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