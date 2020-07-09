const fs            = require('fs');
const {
  src,
  dest
}                   = require('gulp');
const config 	      = require('../config.js');
const fileinclude   = require('gulp-file-include');
const {
  babel,
  uglify,
  rename,
  plumber,
  notify,
  sourcemaps
} 	                = require('gulp-load-plugins')();
const gulpif        = require('gulp-if');
const args          = require('yargs').argv;


module.exports = function js(done) {
  const env = args.env || 'dev';

  fs.access(config.check.scripts, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.scripts)
        .pipe(plumber({
          errorHandler: notify.onError({
            title: "Java Script",
            message:"<%= error.message %>"
          })
        }))                                                                 // При ошибках компиляции не останавливаем процесс слежения, выводим ошибку
        .pipe(gulpif((env === 'prod'), sourcemaps.init({loadMaps: true})))  // Если prod === true, то передаем существующие карты
        .pipe(fileinclude({
          prefix:   '@@',
          basepath: './src/js/modules/'
        }))                                                                 // Инклудим модули
        .pipe(babel({presets: ['@babel/env']}))                             // Транспилируем через babel
        .pipe(gulpif((env === 'prod'), uglify()))                           // Если prod === true, то минифицируем скрипты
        .pipe(gulpif((env === 'prod'), rename({suffix: '.min'})))           // Если prod === true, то добавляем суффикс min
        .pipe(gulpif((env === 'prod'), sourcemaps.write('.')))              // Если prod === true, то добавляем map файл
        .pipe(dest(config.dist.scripts))                                    // Выгружаем в папку public/scripts
    }
  });
};