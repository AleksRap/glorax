const fs        = require('fs');
const {
  src,
  dest
}               = require('gulp');
const config    = require('../config.js');
const replace   = require('gulp-replace');
const gulpif    = require('gulp-if');
const args      = require('yargs').argv;


module.exports = function replaceUrl() {
  const env = args.env || 'dev';

  return src(config.dist.html)
    .pipe(gulpif((env === 'prod'), replace('css/libs.css', 'css/libs.min.css')))      // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), replace('css/style.css', 'css/style.min.css')))    // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), replace('js/libs.js', 'js/libs.min.js')))          // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), replace('js/script.js', 'js/script.min.js')))      // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), dest(config.dist.dist)))                           // Выгружаем в папку public

};