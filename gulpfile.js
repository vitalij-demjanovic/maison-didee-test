const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
//const avif = require('gulp-avif');
//const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');


const prefixerOptions = {
    overrideBrowserslist: ['last 2 versions']
};

function images() {
    return src(['app/images/*.*', '!app/images/*.svg'])
        .pipe(newer('app/images/dist'))
        //.pipe(avif({ quality: 50 }))

        //.pipe(src('app/images/src/*.*'))
        //.pipe(webp())

        //.pipe(src('app/images/src/*.*'))
        .pipe(imagemin())
        .pipe(dest('app/images/dist'))
    
}

function sprite() {
    return src('app/images/dist/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/dist'))
}

function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}
function styles() {
    return src('app/styles/**/*.sass')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(prefixerOptions))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch('app/styles/**/*.sass', styles)
    watch(['app/images/'], images)
    watch(['app/js/main.js'], scripts)
    watch("app/*.html").on('change', browserSync.reload);
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/images/*.*',
        'app/js/main.min.js',
        'app/**/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function cleanDist(){
    return src('dist').pipe(clean())
}

exports.styles = styles;
exports.images = images;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, images, scripts, watching)


