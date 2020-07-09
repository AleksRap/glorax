const fs            = require('fs');
const {
  src,
  dest
} 	                = require('gulp');
const config 	      = require('../config.js');
const fileinclude   = require('gulp-file-include');
const {
  rename,
  cssnano,
  sourcemaps
} 			            = require('gulp-load-plugins')();
const gulpif        = require('gulp-if');
const args          = require('yargs').argv;


module.exports = function stylesLibs() {
  const env = args.env || 'dev';

  // fs.access(config.check.stylesLibs, error => {
  //   if (error) {
  //     return done();
  //   } else {
  //     done();

  return src(config.app.stylesLibs)
    .pipe(gulpif((env === 'prod'), sourcemaps.init({loadMaps: true})))    // Если prod === true, то передаем существующие карты
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './node_modules/'
    }))                                                                   // Инклудим модули библиотек
    .pipe(gulpif((env === 'prod'), cssnano()))                            // Если prod === true, то минифицируем либы
    .pipe(gulpif((env === 'prod'), rename({suffix: '.min'})))             // Если prod === true, то добавляем суффикс min
    .pipe(gulpif((env === 'prod'), sourcemaps.write('.')))                // Если prod === true, то добавляем map файл
    .pipe(dest(config.dist.styles))                                       // Выгружаем в папку public/css
  //   }
  // });
};