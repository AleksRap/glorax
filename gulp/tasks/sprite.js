const fs        = require('fs');
const {
  src,
  dest
}  	            = require('gulp');
const config 		= require('../config.js');
const {
  imagemin,
  replace,
  cheerio,
  svgSprite
} 			        = require('gulp-load-plugins')();


module.exports = function sprite(done) {

  fs.access(config.check.sprite, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.sprite)
        .pipe(imagemin([
          imagemin.svgo({
            plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
          })
        ]))                                                                     // Сжимаем svg файлы
        .pipe(cheerio({
          run: function ($) {                                                   // Удаляем атрибуты и теги, чтобы не перебивали стили заданные через CSS
            $('[fill]').removeAttr('fill');                                     // Удаляем fill
            $('[stroke]').removeAttr('stroke');                                 // Удаляем stroke
            $('[style]').removeAttr('style');                                   // Удаляем style
            $('[opacity]').removeAttr('opacity');                               // Удаляем opacity
            $('title').remove();                                                // Удаляем title
            $('path')
              .removeAttr('mask')                                               // Удаляем mask
              .attr('fill', 'currentColor');                                    // Добавляем атрибут fill со значением currentColor
          },
          parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))                                             // Исправляем баг с символом >
        .pipe(svgSprite({
          mode: {
            symbol: {
                bust: false,                                                    // Отключаем ичистку кэша
              dest: ".",
              sprite: 'sprite.svg',                                             // Имя спрайта
              render: {
                scss: {
                  dest: '../../' + config.app.spriteStyles + 'sprite.scss',     // Указываем пусть сохранения файла sprite.scss
                  template: config.app.spriteStyles + 'sprite-template.scss'    // Указываем пусть к шаблону формирования стилей
                }
              }
            }
          }
        }))                                                                     // Собираем спрайт
        .pipe(dest(config.dist.svg));                                           // Выгружаем в папку public/svg
    }
  });
};