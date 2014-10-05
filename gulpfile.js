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

gulp.task('bower', function() {
    bower();
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
