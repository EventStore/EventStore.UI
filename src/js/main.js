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
		'es-ui': './app',
		'zeroclipboard': '../bower_components/zeroclipboard/dist/ZeroClipboard',
		'ngClip': '../bower_components/ng-clip/dest/ng-clip.min',
		'angular-clipboard': '../bower_components/angular-clipboard/angular-clipboard',
		'd3': '../bower_components/d3/d3.min'
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
		},
		'ngClip': {
			deps: ['zeroclipboard', 'angular'],
			exports: 'ngClip'
		},
		'angular-clipboard': {
			deps: ['angular'],
			exports: 'angular-clipboard'
		},
		'd3':{
			exports: 'd3'
		}
	},
	priority: [
		'angular'
	],
	deps: [
		'./bootstrap'
	]

});
