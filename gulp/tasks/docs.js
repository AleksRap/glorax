const fs          = require('fs');
const {
  src,
  dest
}  	            = require('gulp');
const config 	  = require('../config.js');
const changed		= require('gulp-changed');


module.exports = function docs(done) {

  fs.access(config.check.docs, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.docs)
        .pipe(changed(config.dist.docs))     // Смотрим изменились ли файлы
        .pipe(dest(config.dist.docs));       // Переносим файлы в папку public/docs
    }
  });
};