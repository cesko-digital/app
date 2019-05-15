var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
//var imageop = require('gulp-image-optimization');
//var clean = require('gulp-clean');
var asciify = require('asciify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var serverPort = 8085;

// dirs prefix
var sourcesRoot = 'src/';
var develRoot = '_devel/';
var distRoot = '_dist/';


var workingRoot = develRoot;

var releasing = false;

// files configuration
var FILES = {
	sassToStart: sourcesRoot + 'css/style.scss',
	sassToWatch: sourcesRoot + 'css/**/*.scss',
	js: sourcesRoot + 'js/*',
	thirdPartyToBundle: sourcesRoot + 'js/third-party/*.js',
	thirdPartyProvided: sourcesRoot + 'js/provided/*.js',
	images: sourcesRoot + 'img/**',
	html: sourcesRoot + '*.html',
	copy: [
		sourcesRoot + '**/*.woff',
		sourcesRoot + '**/*.ttf',
		sourcesRoot + '**/*.woff2',
		sourcesRoot + '**/*.eot',
		sourcesRoot + '**/*.mp4',
		sourcesRoot + '**/*.swf'
	]
};


//Sass task se sourcemaps, prefixerem a minifikaci
gulp.task('sass', function () {
    return gulp.src(FILES.sassToStart)
		.pipe(plumber())
		.pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(cleanCSS())
		.pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(workingRoot + 'css'))
        .pipe(connect.reload());
});


// Devel tasks
gulp.task('server', function() {
	connect.server({
		livereload: true,
		root: [workingRoot],
		port: serverPort
	});
});

//js stejne jako third-party se sourcemaps a uglify
gulp.task('js', function() {
	gulp.src([FILES.js, '!'+sourcesRoot + 'js/provided', '!'+sourcesRoot + 'js/third-party'])
        .pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(workingRoot + 'js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(workingRoot + 'js'))
		.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src(FILES.html, { base: '' })
		.pipe(gulp.dest(workingRoot)).pipe(connect.reload())
	;
});

gulp.task('copy', function(){
	gulp.src(FILES.copy, { base: '' })
		.pipe(gulp.dest(workingRoot)).pipe(connect.reload())
	;
});

gulp.task('third-party', function() {
	gulp.src(FILES.thirdPartyToBundle)
        .pipe(sourcemaps.init())
        .pipe(plumber())
		.pipe(uglify())
		.pipe(rename('third-party.min.js'))
		.pipe(gulp.dest(workingRoot + 'js/third-party'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(workingRoot + 'js/third-party'))
		.pipe(connect.reload());

    gulp.src(FILES.thirdPartyProvided, { base: '' })
		.pipe(gulp.dest(workingRoot+"/js/provided")).pipe(connect.reload())
});

// watch for dev server
gulp.task('watch', function () {
	gulp.watch(FILES.sassToWatch, ['sass']);
	gulp.watch(FILES.js, ['js']);
	gulp.watch(FILES.images, ['images']);
	gulp.watch(FILES.html, ['html']);
	gulp.watch(FILES.copy, ['copy']);
});

gulp.task('devel', ['server', 'sass', 'js', 'third-party', 'html', 'copy', 'watch'], function() {
	asciify('Watching changes', {color:'yellow', font: 'smshadow'}, function(err, res){ console.log(res); });
});

gulp.task('configure-release', function() {
	workingRoot = distRoot;
	releasing = true;
});

gulp.task('release', ['configure-release', 'sass', 'js', 'third-party', 'copy', 'html'], function() {
	asciify('Releasing', {color:'yellow', font: 'smshadow'}, function(err, res){ console.log(res); });
});

gulp.task('images', function(){
    gulp.src(FILES.images, { base: '' })
        .pipe(gulp.dest(workingRoot + 'img')).pipe(connect.reload())
    ;
});


gulp.task('default', function() {
	gutil.log('\n\n\n' + 'Usage: gulp ' + gutil.colors.red('<command>') + '\n'
		+ '\n' + 'Where ' + gutil.colors.red('<command>') + 'if one of:' + '\n'
		+ '\t ' + gutil.colors.green('devel') + ' - start server on port: ' + serverPort + ' and live reload your changes' + '\n'
		+ '\t ' + gutil.colors.green('release') + ' - builds and copies to ' + distRoot
	);
});




