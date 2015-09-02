var apiServer     = require('todo-server'),
    assign        = require('object-assign'),
    babel         = require('gulp-babel'),
    browserSync   = require('browser-sync'),
    Builder       = require('systemjs-builder'),
    del           = require('del'),
    eslint        = require('gulp-eslint'),
    exec          = require('child_process').exec,
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    header        = require('gulp-header'),
    inject        = require('gulp-inject'),
    KarmaServer   = require('karma').Server,
    minifyHtml    = require('gulp-minify-html'),
    path          = require('path'),
    sourceMaps    = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache');


/*=========================================================
  ENV
---------------------------------------------------------*/
var DIST = gutil.env._[0] === 'dist';


/*=========================================================
  PATHS
---------------------------------------------------------*/
var paths = {
  lib: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-storage/dist/angular-storage.min.js',
    'node_modules/babel-core/external-helpers.min.js',
    'node_modules/es6-module-loader/dist/es6-module-loader.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/fastclick/lib/fastclick.js'
  ],

  src: {
    assets: 'src/assets/**/*',
    html: 'src/*.html',
    js: 'src/**/*.js',
    tpl: 'src/app/components/**/*.html'
  },

  target: 'target'
};


/*=========================================================
  CONFIG
---------------------------------------------------------*/
var config = {
  babel: {
    modules: 'system',
    stage: 0
  },

  browserSync: {
    browser: ['google chrome canary'],
    files: [paths.target + '/**/*'],
    notify: false,
    port: 7000,
    reloadDelay: 200,
    server: {baseDir: '.'},
    startPath: paths.target
  },

  copy: {
    lib: {
      dest: paths.target + '/lib'
    }
  },

  eslint: {
    src: [paths.src.js]
  },

  header: {
    src: paths.target + '/*.js',
    template: '/* <%= name %> v<%= version %> - <%= date %> - <%= url %> */\n'
  },

  inject: {
    src: 'target/index.html',
    includes: [
      'target/app.js'
    ],
    options: {relative: true}
  },

  karma: {
    configFile: __dirname + '/karma.conf.js'
  },

  minifyHtml: {
    cdata: false,
    comments: false,
    conditionals: true,
    empty: true,
    quotes: true,
    spare: false
  },

  systemBuilder: {
    entry: 'app/app.js',
    outfile: paths.target + '/app.js',
    options: {
      minify: true,
      sourceMaps: true
    }
  },

  templateCache: {
    options: {
      module: 'app.templates',
      standalone: true
    },
    outfile: 'app-templates.js'
  }
};

config.system = {
  babelOptions: config.babel,
  baseURL: 'src',
  defaultJSExtensions: true,
  transpiler: 'babel'
};


/*=========================================================
  TASKS
---------------------------------------------------------*/
gulp.task('clean.target', function(){
  return del(paths.target);
});


gulp.task('copy.assets', function(){
  return gulp
    .src(paths.src.assets)
    .pipe(gulp.dest(paths.target));
});


gulp.task('copy.html', function(){
  return gulp
    .src(paths.src.html)
    .pipe(gulp.dest(paths.target));
});


gulp.task('copy.lib', function(){
  return gulp
    .src(paths.lib)
    .pipe(gulp.dest(config.copy.lib.dest));
});


gulp.task('headers', function(){
  var pkg = require('./package.json');
  var headerContent = {date: (new Date()).toISOString(), name: pkg.name, version: pkg.version, url: pkg.homepage};

  return gulp.src(config.header.src)
    .pipe(header(config.header.template, headerContent))
    .pipe(gulp.dest(paths.target));
});


gulp.task('inject', function(){
  return gulp
    .src(config.inject.src)
    .pipe(inject(
      gulp.src(config.inject.includes, {read: false}),
      config.inject.options
    ))
    .pipe(gulp.dest(paths.target));
});


gulp.task('js', function(){
  return gulp
    .src(paths.src.js)
    .pipe(sourceMaps.init())
    .pipe(babel(config.babel))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(paths.target));
});


gulp.task('js.bundle', function(done){
  var builder = new Builder(config.system);
  builder
    .build(
      config.systemBuilder.entry,
      config.systemBuilder.outfile,
      config.systemBuilder.options
    )
    .then(function(){
      done();
    })
    .catch(function(error){
      console.log('Builder Error:', error);
      done();
    });
});


gulp.task('karma', function(done){
  var conf = assign({}, config.karma, {singleRun: true});
  var server = new KarmaServer(conf, function(error){
    if (error) process.exit(error);
    else done();
  });

  server.start();
});


gulp.task('karma.run', function(done){
  var cmd = process.platform === 'win32' ? 'node_modules\\.bin\\karma run karma.conf.js' : 'node node_modules/.bin/karma run karma.conf.js';
  exec(cmd, function(error, stdout){
    // Ignore errors in the interactive (non-ci) mode.
    // Karma server will print all test failures.
    done();
  });
});


gulp.task('karma.watch', function(done){
  var server = new KarmaServer(config.karma, function(error){
    if (error) process.exit(error);
    else done();
  });

  server.start();
});


gulp.task('lint', function(){
  return gulp
    .src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('server', function(done){
  browserSync
    .create()
    .init(config.browserSync, done);
});


gulp.task('server.api', function(done){
  apiServer.start();
  done();
});


gulp.task('templates', function(){
  return gulp
    .src(paths.src.tpl)
    .pipe(minifyHtml(config.minifyHtml))
    .pipe(templateCache(config.templateCache.outfile, config.templateCache.options))
    .pipe(gulp.dest(paths.target));
});


gulp.task('test', gulp.series('lint', 'clean.target', 'js', 'karma'));


gulp.task('test.watch', gulp.series('lint', 'clean.target', 'js', 'karma.watch'));


gulp.task('tdd', function(){
  gulp.watch(paths.src.js, gulp.series('js', 'karma.run'));
});


gulp.task('build', gulp.series(
  'clean.target',
  'copy.assets',
  'copy.html',
  'copy.lib',
  DIST ? 'js.bundle' : 'js',
  'templates'
));


gulp.task('default', gulp.series('build', function watch(){
  gulp.watch(paths.src.assets, gulp.task('copy.assets'));
  gulp.watch(paths.src.html, gulp.task('copy.html'));
  gulp.watch(paths.src.js, gulp.task('js'));
  gulp.watch(paths.src.tpl, gulp.task('templates'));
}));


gulp.task('dist', gulp.series('test', 'build', 'inject', 'headers'));
