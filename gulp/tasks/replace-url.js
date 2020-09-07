const fs        = require('fs');
const {
  src,
  dest
}               = require('gulp');
const config    = require('../config.js');
const replace   = require('gulp-replace');
const gulpif    = require('gulp-if');
const args      = require('yargs').argv;
const filenames = require('gulp-filenames');

module.exports = function replaceUrl() {
  const env = args.env || 'dev';

  return src(config.dist.html)
    .pipe(gulpif((env === 'prod'), replace('css/libs.css',  `css/${filenames.get('libs-style')}`)))  // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), replace('css/style.css', `css/${filenames.get('style')}`)))       // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), replace('js/libs.js', `js/${filenames.get('libs-script')}`)))     // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), replace('js/script.js', `js/${filenames.get('script')}`)))        // Заменяем ссылку
    .pipe(gulpif((env === 'prod'), dest(config.dist.dist)))                                                                   // Выгружаем в папку public
};
