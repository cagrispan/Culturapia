//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'test/unit/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        singleRun: false,

        preprocessors: {
            'app/src/**/*.js': ['coverage']
        },

        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }
    });
};
