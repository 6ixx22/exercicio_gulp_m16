const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    styles: {
        src: 'src/scss/main.scss/*.scss', 
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/js/comprime.js/*.js',
        dest: 'dist/js'
    },
    images: {
        src: 'src/images/imagens/*.{jpg,png}',  
        dest: 'dist/images'
    }
};

function compileSass() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
}

function compressImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

function compressJS() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watchFiles() {
    gulp.watch(paths.styles.src, compileSass);
    gulp.watch(paths.scripts.src, compressJS);
    gulp.watch(paths.images.src, compressImages);
}

exports.sass = compileSass;
exports.images = compressImages;
exports.js = compressJS;
exports.default = gulp.series(
    gulp.parallel(compileSass, compressImages, compressJS),
    watchFiles
);
