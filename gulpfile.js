const { src, dest, watch, series } = require("gulp");

// Css & Sass
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano')

// Imagenes
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src("src/scss/app.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));

    done();
}

function imagenes(done) {
    src("src/img/**/*")
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest("build/img"));

    done();
}

function versionWebp(done){
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}
function versionAvif(done){
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{jpg, png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}

function dev() {
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
