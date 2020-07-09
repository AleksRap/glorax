const fs            = require('fs');
const {
  src,
  dest
} 	                = require('gulp');
const config 	      = require('../config.js');
const fileinclude   = require('gulp-file-include');
const {
  rename,
  uglify,
  sourcemaps
} 			            = require('gulp-load-plugins')();
const gulpif        = require('gulp-if');
const args          = require('yargs').argv;


module.exports = function jsLibs(done) {
  const env = args.env || 'dev';


  fs.access(config.check.scriptsLibs, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.scriptsLibs)
        .pipe(gulpif((env === 'prod'), sourcemaps.init({loadMaps: true})))   // Если prod === true, то передаем существующие карты
        .pipe(fileinclude({
          prefix: '@@',
          basepath: './node_modules/'
        }))                                                                  // Инклудим модули библиотек
        .pipe(gulpif((env === 'prod'), uglify()))                            // Если prod === true, то минифицируем либы
        .pipe(gulpif((env === 'prod'), rename({suffix: '.min'})))            // Если prod === true, то добавляем суффикс min
        .pipe(gulpif((env === 'prod'), sourcemaps.write('.')))               // Если prod === true, то добавляем map файл
        .pipe(dest(config.dist.scripts))                                     // Выгружаем в папку public/scripts
    }
  });
};