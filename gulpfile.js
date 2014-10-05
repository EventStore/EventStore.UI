'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    ngHtml2Js = require('gulp-ng-html2js'),
    wrap = require('gulp-wrap'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma'),
    cache = require('gulp-cached'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    // new packages for dist
    insert = require('gulp-insert'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    rjs = require('gulp-requirejs'),
    htmlreplace = require('gulp-html-replace');

var paths = {
    app: {
        templatesSource: './src/views/*.tpl.html',
        templatesDestination: './src/js/templates',
        source: './src/js/**/*.js'
    },
    all: [
        './src/js/**/*.js',
        './test/**/*.js'
    ],
    tests: './test/**/*.js'
};

var rjsOpts = {
    baseUrl: './src/js/',
    name: 'bootstrap',
    findNestedDependencies: true,
    out: 'app.min.js',
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
        'uiAce': {
            deps: ['angular', 'ace']
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
    paths: {
        'domReady': '../bower_components/requirejs-domready/domReady',
        'angular': '../bower_components/angular/angular',
        'ngCookies': '../bower_components/angular-cookies/angular-cookies',
        'angularMocks': '../bower_components/angular-mocks/angular-mocks',
        'uiRouter': '../bower_components/angular-ui-router/release/angular-ui-router',
        'uiUtils': '../bower_components/angular-ui-utils/ui-utils',
        'jQuery': '../bower_components/jQuery/dist/jquery',
        'sprintf': '../bower_components/sprintf/src/sprintf',
        'uiAce': '../bower_components/angular-ui-ace/ui-ace',
        'ace': '../bower_components/ace-builds/src-min-noconflict/ace',
        'es-ui': './app'
    }
};

gulp.task('bower', function() {
    bower();
});

gulp.task('dist-min-css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(minifyCSS())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./es-dist/css/'));
});

gulp.task('dist-min-images', function () {

    // minify images and copy
    gulp.src('./src/images/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('./es-dist/images/'));

    gulp.src('./src/*.png')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('./es-dist/'));

});

gulp.task('dist-copy-fonts', function () {
    return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./es-dist/fonts'));
});

gulp.task('dist-js', function () {

    gulp.src('./src/bower_components/requirejs/*.js')
    .pipe(concat('requirejs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./es-dist/js/'));

    rjs(rjsOpts)
    .pipe(insert.append('require(["bootstrap"]);'))
    .pipe(uglify())
    .pipe(gulp.dest('./es-dist/js/'));

});

gulp.task('dist', ['html', 'dist-min-css', 'dist-min-images', 'dist-copy-fonts', 'dist-js'], function() {
    return gulp.src('./src/index.html') 
        .pipe(htmlreplace({
          css: 'css/main.min.css',
          js: {
            src: [['js/app.min.js', 'js/requirejs.min.js']],
            tpl: '<script data-main="%s" src="%s"></script>'
          }
        }))
        .pipe(gulp.dest('./es-dist/'));
});

/**
 * Creates JS version of HTML tpl files used
 * by ES UI
 **/

function templateForModule (moduleSource, moduleDest, moduleName) {
    gulp.src(moduleSource)
        .pipe(cache('html'))
        .pipe(htmlmin({
            //collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: moduleName,
            prefix: ''
        }))
        .pipe(concat('templates.js'))
        .pipe(wrap('define([\'angular\'], function (angular) {\'use strict\'; <%= contents %> });'))
        .pipe(gulp.dest(moduleDest));
}

gulp.task('html', function () {
	templateForModule('./src/views/*.tpl.html', 
        './src/js/templates', 
        'es-ui.templates');
    templateForModule('./src/js/modules/projections/views/*.tpl.html',
        './src/js/modules/projections/templates',
        'es-ui.projections.templates');
    templateForModule('./src/js/modules/security/views/*.tpl.html',
        './src/js/modules/security/templates',
        'es-ui.security.templates');
    templateForModule('./src/js/modules/dashboard/views/*.tpl.html',
        './src/js/modules/dashboard/templates',
        'es-ui.dashboard.templates');
    templateForModule('./src/js/modules/streams/views/*.tpl.html',
        './src/js/modules/streams/templates',
        'es-ui.streams.templates');
    templateForModule('./src/js/modules/users/views/*.tpl.html',
        './src/js/modules/users/templates',
        'es-ui.users.templates');
    templateForModule('./src/js/modules/admin/views/*.tpl.html',
        './src/js/modules/admin/templates',
        'es-ui.admin.templates');
});

/**
 * Executes JS Hint verification against code
 **/
gulp.task('lint', function() {

    // we are only intereseted in our app src and test code
    return gulp.src(paths.all)
        .pipe(cache('linting'))
        .pipe(jshint({
            // load .jshintrc file
            lookup: true
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Executes Unit Tests
 **/
gulp.task('karma', function () {

    return gulp.src(['no need to supply files because everything is in config file'])
        .pipe(karma({
            configFile: 'config/karma.conf.js',
            action: 'watch'
        }));
});

/**
 * Dev task, executes watches for templates, js files (lint)
 * unit tests, and web browser to test "normally"
 **/
gulp.task('dev', function () {

    // whenever templates changes, re-run templates
    gulp.watch(paths.app.templatesSource, ['html']);
    // whenever code changes, re-run templates
    gulp.watch(paths.all, ['lint']);
    
    gulp.run('bower');
    gulp.run('lint');
    gulp.run('karma');
    gulp.run('connect');
});

gulp.task('watch-lint', function () {
    gulp.watch(paths.all, ['lint']);
    gulp.run('lint');
});


/**
 * Opens browser with application loaded
 **/
gulp.task('connect', connect.server({
    root: ['src'],
    port: 8888,
    livereload: true,
    open: {
        browser: 'chrome'
    }
}));

gulp.task('default', ['dev']);
