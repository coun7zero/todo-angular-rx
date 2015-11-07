module.exports = function(config) {
  config.set({

    basePath: '.',

    frameworks: ['jasmine'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/es6-module-loader/dist/es6-module-loader.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/systemjs/dist/system.js',
      {pattern: 'target/**/*.js', included: false, watched: false},
      'src/components/**/*.html',
      'karma.loader.js'
    ],

    exclude: [
      'target/app.js'
    ],

    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      'target/**/*.js': ['sourcemap']
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      stripPrefix: 'src/components/'
    },

    reporters: ['dots'],

    port: 9876,

    colors: true,

    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    autoWatchBatchDelay: 1000,

    // amount of time to wait for a message from browser before disconnecting
    // default is 10000ms (10 seconds)
    browserNoActivityTimeout: 300000, // 5 mins

    singleRun: false,

    // custom launcher for travis-ci
    customLaunchers: {
      TRAVIS_CHROME: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: process.env.TRAVIS ? ['TRAVIS_CHROME'] : ['Chrome']

  });
};
