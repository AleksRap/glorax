const fs          = require('fs');
const {
  src,
  dest
}  	              = require('gulp');
const config      = require('../config.js');
const {
  sass,
  autoprefixer,
  cssnano,
  rename,
  plumber,
  notify,
  sourcemaps
}                 = require('gulp-load-plugins')();
const gulpif      = require('gulp-if');
const args        = require('yargs').argv;


module.exports = function styles(done) {
  const env = args.env || 'dev';

  fs.access(config.check.styles, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.styles)
        .pipe(plumber({
          errorHandler: notify.onError({
            title: "STYLES",
            message: "<%= error.message %>"
          })
        }))                                                                   // При ошибках компиляции не останавливаем процесс слежения, выводим ошибку
        .pipe(gulpif((env === 'prod'), sourcemaps.init({loadMaps: true})))    // Если prod === true, то передаем существующие карты
        .pipe(sass())                                                         // Преобразуем scss в css
        .pipe(gulpif((env === 'prod'), autoprefixer({cascade: true})))        // Если prod === true, то создаем префиксы
        .pipe(gulpif((env === 'prod'), cssnano()))                            // Если prod === true, то минимифицируем стили
        .pipe(gulpif((env === 'prod'), rename({suffix: '.min'})))             // Если prod === true, то добавляем суффикс min
        .pipe(gulpif((env === 'prod'), sourcemaps.write('.')))                // Если prod === true, то добавляем map файл
        .pipe(dest(config.dist.styles))                                       // Выгружаем в папку public/css
    }
  });
};
