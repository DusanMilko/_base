var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var rename = require('gulp-rename');
var cssGlobbing = require('gulp-css-globbing');
var gutil = require('gutil');

// images
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// iconfont task
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var lodash = require('lodash');

// js
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var reactify = require('reactify');

// static site
var assemble = require('assemble');
var app = assemble();

var paths = {
  src: 'src/',
  build: 'build/',
  images: 'src/assets/img/**/*'
};

var sassPaths = [
  'node_modules/foundation-sites/scss'
];


gulp.task('default', ['iconfont','images','fonts','scss','js','assemble'], function() {
  gulp.watch(paths.src+'assets/scss/**/*.scss', ['scss']);
  gulp.watch(paths.src+'assets/js/**/*.js', ['js']);
  gulp.watch(paths.src+'assets/imgs/**/*.{jpg,png,gif}', ['images']);
  gulp.watch(paths.src+'views/**/*.hbs', ['assemble']);
});

gulp.task('build', ['clean'], function() {
  gulp.run('default');
});

gulp.task('clean', function(cb) {
  var del = require('del');

  return del([paths.build+'**/*'], cb);
});

// ----------------------------------------------------------------

// Generate conteful

gulp.task('data', function() {
  var contentful = require('contentful');
  var source = require('vinyl-source-stream');

  content = contentful.createClient({
    space : '58klxragf689',
    accessToken : 'c5b61820586316fe18e557fbb7cbd3fe0261ef2647e30f0e9a7803ca6f67a772'
  }); 
 
  content.getEntries()
  .then(function(entries) {
    var stream = source('all.json');
    stream.end( JSON.stringify(entries) );
    stream.pipe(gulp.dest(paths.src+'data'));
  });

  content.getEntries({
    content_type : 'article'
  })
  .then(function(entries) {
    var stream = source('articles.json');
    stream.end( JSON.stringify(entries) );
    stream.pipe(gulp.dest(paths.src+'data'));
  });
});

// ----------------------------------------------------------------

// Generate Css from Scss
gulp.task('scss', function() {
  gulp.src(paths.src+'assets/scss/main.scss')
    .pipe(cssGlobbing({
      extensions: ['.css', '.scss'],
      ignoreFolders: ['../styles'],
      autoReplaceBlock: {
        onOff: false,
        globBlockBegin: 'cssGlobbingBegin',
        globBlockEnd: 'cssGlobbingEnd',
        globBlockContents: '../**/*.scss'
      },
      scssImportPath: {
        leading_underscore: false,
        filename_extension: false
      }
    }))
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest(paths.build+'assets/css'));

  // docs css
  gulp.src(paths.src+'assets/scss/docs/docs.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest(paths.build+'docs/css'));
});

// ----------------------------------------------------------------

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({optimizationLevel: 7})))
    .pipe(gulp.dest(paths.build+'assets/imgs'));
});

// Copy all fonts
gulp.task('fonts', function() {
  return gulp.src(paths.src+'assets/fonts/**/*')
    .pipe(gulp.dest(paths.build+'assets/fonts'));
});

// ----------------------------------------------------------------

// Generate Icon font form svgs 
gulp.task('iconfont', function(){
  gulp.src([paths.src+'assets/icons/svgs/*.svg'])
    .pipe(iconfont({ 
      fontName: 'custom-icon-font',
      formats: ['ttf', 'eot', 'woff', 'svg'],
      normalize: true,
      fontHeight: 400
    }))
    .on('glyphs', function(glyphs, options) {
      gulp.src(paths.src+'assets/icons/icon-font.scss')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: 'custom-icon-font',
          fontPath: '../fonts/icons/',
          className: 'i'
        }))
        .pipe(gulp.dest(paths.src+'assets/scss/base'));
    })
    .pipe(gulp.dest(paths.src+'assets/fonts/icons'));
});

// ----------------------------------------------------------------

// Generate JS with browserify with sourcemaps
gulp.task('js', function() {
  gulp.src(paths.src+'assets/js/libs/**/*')
    .pipe(gulp.dest(paths.build+'assets/js/libs'));
  gulp.src(paths.src+'assets/js/data/**/*')
    .pipe(gulp.dest(paths.build+'assets/js/data'));
  gulp.src(paths.src+'assets/js/main.js')
    .pipe(browserify({ 
      debug : true,
      transform: [reactify],
    }))
    .on('error', function (err) {
      gutil.log('ERROR: '+err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(paths.build+'assets/js'))
});

// Compress js
gulp.task('compressjs', function() {
  gulp.src(paths.build+'assets/js/main.js')
    .pipe(uglify())
    .pipe(rename('min.js'))
    .pipe(gulp.dest(paths.build+'assets/js'))
});

// ----------------------------------------------------------------

// Contentful

// ----------------------------------------------------------------

// Assemble
app.data(paths.src+'data/**/*.{json,yml}');
app.helpers(paths.src+'helpers/**/*.js');
app.partials(paths.src+'views/partials/**/*.hbs');
app.layouts(paths.src+'views/layouts/**/*.hbs')

gulp.task('assemble', function() {
  app.build(['views'], function(err) {
    if (err) return cb(err);
    console.log('Pages Are Complete!');
  });
});

app.task('views', function() {
  app.pages(paths.src+'views/pages/**/*.hbs');

  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(rename(function (path) {
      path.extname = ".html"
    }))
    .pipe(app.dest(paths.build));
});

module.exports = app;