var autoprefixer  = require('autoprefixer'),
    babel         = require('gulp-babel'),
    browserSync   = require('browser-sync'),
    connect       = require('gulp-connect'),
    Builder       = require('systemjs-builder'),
    del           = require('del'),
    eslint        = require('gulp-eslint'),
    exec          = require('child_process').exec,
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    header        = require('gulp-header'),
    inject        = require('gulp-inject'),
    karma         = require('karma'),
    minifyHtml    = require('gulp-minify-html'),
    postcss       = require('gulp-postcss'),
    sass          = require('gulp-sass'),
    path          = require('path'),
    sourceMaps    = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    todoServer    = require('todo-server');


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
    'node_modules/systemjs/dist/system.js'
  ],

  src: {
    assets: 'src/assets/**/*',
    html: 'src/*.html',
    js: 'src/**/*.js',
    sass: 'src/styles/**/*.scss',
    tpl: 'src/app/components/**/*.html'
  },

  target: 'target'
};


/*=========================================================
  CONFIG
---------------------------------------------------------*/
var config = {
  autoprefixer: {
    browsers: ['last 3 versions', 'Firefox ESR', 'Opera 12.1']
  },

  babel: {
    modules: 'system',
    stage: 0
  },

  browserSync: {
    browser: ['google chrome'],
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
      'target/main.js'
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

  sass: {
    errLogToConsole: true,
    outputStyle: DIST ? 'compressed' : 'nested',
    precision: 10,
    sourceComments: false
  },

  systemBuilder: {
    entry: 'app/main.js',
    outfile: paths.target + '/main.js',
    options: {
      minify: true,
      sourceMaps: true
    }
  },

  templateCache: {
    options: {
      module: 'templates',
      standalone: true
    },
    outfile: 'templates.js'
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
  var builder = new Builder('src', config.system);
  builder
    .bundle(
      config.systemBuilder.entry,
      config.systemBuilder.outfile,
      config.systemBuilder.options
    )
    .then(function(){
      done();
    })
    .catch(function(error){
      gutil.log(gutil.colors.red('Builder Error: ' + error));
      done();
    });
});


gulp.task('lint', function(){
  return gulp
    .src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('sass', function(){
  return gulp
    .src(paths.src.sass)
    .pipe(sass(config.sass))
    .pipe(postcss([
      autoprefixer(config.autoprefixer)
    ]))
    .pipe(gulp.dest(paths.target));
});


gulp.task('server', function(done){
  connect.server({
    port: 7000,
    livereload: false,
    root: paths.target
  });
  done();
});


gulp.task('server.api', function(done){
  todoServer.start();
  done();
});


gulp.task('server.sync', function(done){
  browserSync
    .create()
    .init(config.browserSync, done);
});


gulp.task('templates', function(){
  return gulp
    .src(paths.src.tpl)
    .pipe(minifyHtml(config.minifyHtml))
    .pipe(templateCache(config.templateCache.outfile, config.templateCache.options))
    .pipe(gulp.dest(paths.target));
});


/*===========================
  BUILD
---------------------------*/
gulp.task('build', gulp.series(
  'clean.target',
  'copy.assets',
  'copy.html',
  'copy.lib',
  'sass',
  'templates',
  'js'
));


/*===========================
  DEVELOP
---------------------------*/
gulp.task('dev', gulp.series('build', 'server.sync', function watch(){
  gulp.watch(paths.src.assets, gulp.task('copy.assets'));
  gulp.watch(paths.src.html, gulp.task('copy.html'));
  gulp.watch(paths.src.sass, gulp.task('sass'));
  gulp.watch(paths.src.js, gulp.task('js'));
  gulp.watch(paths.src.tpl, gulp.task('templates'));
}));


/*===========================
  TEST
---------------------------*/
function karmaServer(options, done) {
  var server = new karma.Server(options, function(error){
    if (error) process.exit(error);
    done();
  });
  server.start();
}


gulp.task('karma', function(done){
  karmaServer(config.karma, done);
});


gulp.task('karma.single', function(done){
  config.karma.singleRun = true;
  karmaServer(config.karma, done);
});


gulp.task('karma.run', function(done){
  var cmd = process.platform === 'win32' ? 'node_modules\\.bin\\karma run karma.conf.js' : 'node node_modules/.bin/karma run karma.conf.js';
  exec(cmd, function(error, stdout){
    // Ignore errors in the interactive (non-ci) mode.
    // Karma server will print all test failures.
    done();
  });
});


gulp.task('test', gulp.series('lint', 'build', 'karma.single'));


gulp.task('test.watch', gulp.parallel(gulp.series('lint', 'build', 'karma'), function(){
  gulp.watch(paths.src.js, gulp.series('js', 'karma.run'));
}));


/*===========================
  RELEASE
---------------------------*/
gulp.task('dist', gulp.series(
  'lint',
  'build',
  'karma.single',
  'js.bundle',
  'inject',
  'headers'
));


/*===========================
  RUN
---------------------------*/
gulp.task('default', gulp.series('build', 'server'));
