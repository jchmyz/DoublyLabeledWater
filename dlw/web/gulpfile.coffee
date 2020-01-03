gulp = require 'gulp'
webpack = require 'webpack-stream'
del = require 'del'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
sourcemaps = require 'gulp-sourcemaps'
sass = require 'gulp-sass'
newer = require 'gulp-newer'
ts = require('gulp-typescript')
path = require 'path'

DIST_DIR = path.relative __dirname, './dist'
BUILD_TMP = 'build_tmp'

TS_PROJECT = ts.createProject
  noImplicitAny: true
  strictNullChecks: true
  target: "es5"
  jsx: "react"
  lib: [
    "DOM"
    "ScriptHost"
    "es2017"
  ]

# a newer() that can check either a .coffee or .cjsx against its compiled JavaScript output
newer_coffee = (target_dir)->
  compiled_name = (coffee_name)->
    return coffee_name.replace(/\.(?:coffee|cjsx)$/, '.js')
  return newer({dest: target_dir, map: compiled_name})

# compiles the webpack configs
gulp.task 'webpack-config', ->
  return gulp.src('build/*.coffee')
    .pipe(newer_coffee(BUILD_TMP))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(BUILD_TMP))

# packs up dependencies into the codepack bundle
gulp.task 'webpack-lib', ->
  return gulp.src "#{BUILD_TMP}/webpack-lib-entry.js"
    .pipe(newer("#{DIST_DIR}/codepack.js"))
    .pipe(webpack(require("./#{BUILD_TMP}/webpack-lib.conf.js")))
    .pipe(gulp.dest(DIST_DIR))

# packs all the app code into the app bundle
gulp.task 'webpack-app', ->
  return gulp.src "#{BUILD_TMP}/webpack-app-entry.js"
    .pipe(webpack(require("./#{BUILD_TMP}/webpack-app.conf.js")))
    .pipe(gulp.dest(DIST_DIR))

gulp.task 'compile-sass', ->
  STYLESHEET_URI = "#{DIST_DIR}/css/style.css"
  sass_options =
    includePaths: ["node_modules"]

  return gulp.src('sass/style.sass')
    .pipe(newer(STYLESHEET_URI))
    .pipe(sourcemaps.init())
    .pipe(sass(sass_options).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("#{DIST_DIR}/assets/css"))

gulp.task 'blueprint-resources', ->
  _dest = "#{DIST_DIR}/assets/resources"
  return gulp.src("node_modules/@blueprintjs/core/resources/**")
    .pipe(newer(_dest))
    .pipe(gulp.dest(_dest))

gulp.task 'assets', ->
  gulp.src("index.html")
    .pipe(gulp.dest("#{DIST_DIR}/"))

  gulp.src("assets/css/icons/*png")
    .pipe(gulp.dest("#{DIST_DIR}/assets/css/icons/"))

  gulp.src("assets/images/**")
    .pipe(gulp.dest("#{DIST_DIR}/assets/images/"))

  return gulp.src('assets/*')
    .pipe(gulp.dest("#{DIST_DIR}/assets/"))

# builds all coffeescript from src/ into sourcemap javascript in build_tmp, to be bundled by webpack
gulp.task 'compile-coffee', ->
  return gulp.src('src/**/*.coffee')
    .pipe(newer_coffee("#{BUILD_TMP}/app"))
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("#{BUILD_TMP}/app"))

gulp.task 'compile-ts', ->
  return gulp.src('src/**/*.ts*')
    .pipe(sourcemaps.init())
    .pipe(TS_PROJECT()).js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("#{BUILD_TMP}/app"))

# sub-task that watches for changes
gulp.task 'watch', ->
  watched_paths = [
    "src/**"
    "sass/**"
  ]
  gulp.watch(watched_paths, {}, gulp.series('dist'))

# blow away all the built stuff
gulp.task 'clean', ->
  return del [DIST_DIR, BUILD_TMP], # synchronous delete
    force: true

# builds all code into a testable form into build_tmp
gulp.task 'compile', gulp.parallel('compile-coffee', 'compile-ts')
gulp.task 'assemble', gulp.parallel('assets', 'blueprint-resources', 'compile-sass')
gulp.task 'webpack', gulp.series('webpack-config', gulp.parallel('webpack-lib', 'webpack-app'))

# constructs the full web tree
gulp.task 'dist', gulp.series('compile', 'assemble', 'webpack')

exports.clean = gulp.series('clean')
exports.compile = gulp.series('compile')
# copies assets to build tree
exports.assemble = gulp.series('assemble')
# constructs the full web tree
exports.dist = gulp.series('dist')
# full default build
exports.default = gulp.series('clean', 'dist')
