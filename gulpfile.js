var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');


//handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

//less plugins

var less = require('gulp-less');
var LessAutoPrefix = require('less-plugin-autoprefix');
var lessAutoPrefix = new LessAutoPrefix({
   browsers: ['last 2 versions']
});
//file paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var TEMPLATES_PATH = 'templates/**/*.hbs';
//Styles here
// gulp.task('styles', function (){
// 	console.log("style here");
//    return gulp.src(['public/css/reset.css',CSS_PATH])
//    .pipe(plumber(function (err) {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//    }))
//    .pipe(sourcemaps.init())
//    .pipe(autoprefixer())
//    .pipe(concat('styles.css'))
//    .pipe(minifyCss())
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest(DIST_PATH))
//    .pipe(livereload());
// });

// //scss styles
// gulp.task('styles', function (){
//    console.log("style here");
//    return gulp.src('public/scss/styles.scss')
//    .pipe(plumber(function (err) {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//    }))
//    .pipe(sourcemaps.init())
//    .pipe(autoprefixer())
//    .pipe(sass({
//       outputStyle: 'compressed'
//    }))
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest(DIST_PATH))
//    .pipe(livereload());
// });

//less  styles
gulp.task('styles', function (){
   console.log("style here");
   return gulp.src('public/less/styles.less')
   .pipe(plumber(function (err) {
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
   }))
   .pipe(sourcemaps.init())
   .pipe(less({
      plugins: [lessAutoPrefix]
   }))
   .pipe(minifyCss())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(DIST_PATH))
   .pipe(livereload());
});
//Scripts
gulp.task('default' ,['images','templates','scripts','styles'], function(){
   console.log("default here ");
});

//file paths



gulp.task('scripts' , function(){
   console.log("Scripts here ");

   return gulp.src(SCRIPTS_PATH)
   .pipe(plumber( function (err) {
      console.log('script error ');
      console.log(err);
      this.emit('end');
   }))
   .pipe(sourcemaps.init())
   .pipe(babel({
      presets: ['es2015']
   }))
   .pipe(uglify())
   .pipe(concat('scripts.js'))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(DIST_PATH))
   .pipe(livereload());
});

gulp.task('templates', function() {
    return gulp.src(TEMPLATES_PATH)
    .pipe(handlebars({
      handlebars: handlebarsLib
    }))
    .pipe(wrap('Handlebars.template(<%= contents%>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH))
   .pipe(livereload());
});

gulp.task('images' , function(){
   console.log("images here ");
});

gulp.task('watch' ,['default'], function() {
	console.log('chnge here');
	require('./server.js');
   livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
   //gulp.watch(CSS_PATH, ['styles']);
   //gulp.watch('public/scss/**/*.scss',['styles']);
   gulp.watch('public/less/**/*.less', ['styles']);
   gulp.watch(TEMPLATES_PATH, ['templates']);
});
//Images Compressed

