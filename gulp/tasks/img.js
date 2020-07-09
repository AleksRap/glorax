const fs        = require('fs');
const {
  src,
  dest
}  	            = require('gulp');
const config 	  = require('../config.js');
const {
  imagemin,
  changed
} 		          = require('gulp-load-plugins')();
const gulpif    = require('gulp-if');
const args      = require('yargs').argv;


module.exports = function img(done) {
  const env = args.env || 'dev';

  fs.access(config.check.img, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.img)
        .pipe(changed(config.dist.img))                               // Смотрим изменились ли файлы
        .pipe(gulpif((env === 'prod'), imagemin([
          imagemin.gifsicle({interlaced: true}),                      // Сжимаем gif файлы
          imagemin.mozjpeg({quality: 75, progressive: true}),         // Сжимаем jpg файлы
          imagemin.optipng({optimizationLevel: 5}),                   // Сжимаем png файлы
        ])))
        .pipe(dest(config.dist.img));                                 // Выгружаем в папку public/images
    }
  });
};