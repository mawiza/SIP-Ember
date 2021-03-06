// Karma configuration
// Generated on Fri Jun 06 2014 13:49:54 GMT+0200 (Rom, sommertid)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
        'js/libs/jquery-2.1.1.js',
        'js/libs/handlebars-1.1.2.js',
        'js/libs/ember.js',
        'js/libs/ember-data.js',
        'js/libs/vis.js',
        'js/libs/adapter.js',
        'js/libs/bootstrap.min.js',
        'js/libs/bootstrap-colorpicker.js',
        'js/libs/plurals.js',
        'js/libs/i18n.js',
        'js/libs/nprogress.js',
        /*'js/app/app-compiled.min.js',*/
        'js/app/app-debug.js',
        "js/app/templates.js",
        'tests/fixtures.coffee',
        'tests/test_helper.coffee',
        'tests/app_spec.coffee',
        'tests/administrations_spec.coffee',
        'tests/themes_spec.coffee',
        'tests/focusareas_spec.coffee',
        'tests/strategies_spec.coffee',
        'tests/graph_spec.coffee'
    ],


    // list of files to exclude
    exclude: [
      
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    //
    preprocessors: {
        "**/app/**/*.hbs": ['ember'],
        '**/app/**/*.coffee': ['coffee'],
        '**/tests/**/*.coffee': ['coffee'],
        '**/app/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type : 'html',
        dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS', 'Chrome'],
      browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
