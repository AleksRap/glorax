const fs          = require('fs');
const {
  src,
  dest
}               = require('gulp');
const config    = require('../config.js');
const changed 	= require('gulp-changed');


module.exports = function docs(done) {

  fs.access(config.check.fonts, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.fonts)
        .pipe(changed(config.dist.fonts))   // Смотрим изменились ли файлы
        .pipe(dest(config.dist.fonts))      // Переносим шрифты в public/fonts
    }
  });
};