[![Build Status](https://travis-ci.org/r-park/todo-angular-rx.svg?branch=master)](https://travis-ci.org/r-park/todo-angular-rx)


# Todo app with Angular 1.5 and RxJS
A simple Todo app example utilizing a RxJS `Subject` as a Flux-like dispatcher.

- [Angular](https://github.com/angular/angular.js) `1.5.0-beta.2`
- [Angular UI-Router](https://github.com/angular-ui/ui-router) `~0.2.15`
- [RxJS](https://github.com/ReactiveX/RxJS) `5.0.0-alpha.10`
- [Babel](https://github.com/babel/babel) `~6.2.1`
- [Gulp](https://github.com/gulpjs/gulp) `4.0.0-alpha.2`
- [Karma](https://github.com/karma-runner/karma)
- [JSON-Server](https://github.com/typicode/json-server)
- [Webpack](https://github.com/webpack/webpack)

## Installing dependencies
```bash
npm install
```

#### Gulp v4 (optional)
```bash
npm install -g gulpjs/gulp-cli#4.0
```
The gulp tasks for this project require gulp v4-alpha. If you don't wish to globally install the v4 gulp-cli, you can run the gulp tasks using the locally installed gulp under `./node_modules/.bin` — for example:
```bash
./node_modules/.bin/gulp run
```


## Developing
```bash
gulp
```
Executing the default `gulp` command will:
- Build the project
- Start the server at <a href="http://localhost:7000" target="_blank">localhost:7000</a>
- Watch for changes to the source files and process changes
- Live-reload the browser


## Testing
```bash
gulp test.watch
```
Executing `gulp test.watch` will:
- Run the test suites
- Watch for changes to the source files
- Re-run the tests whenever the sources are modified

For a single test run without auto-watch, execute `gulp test` instead.
