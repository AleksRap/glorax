const fs              = require('fs');
const {
  src,
  dest
}                     = require('gulp');
const config          = require('../config.js');
const {
  plumber,
  notify,
  pug,
  debug
} 	                  = require('gulp-load-plugins')();
const htmlValidator   = require ('gulp-w3c-html-validator');
const gulpIf          = require('gulp-if');
const through2        = require('through2');
const emitty          = require('@emitty/core').configure();
const languagePug     = require('@emitty/language-pug').parse;

emitty.language({
  extensions: ['.pug'],                                                           // Указываем язык на котором написаны шаблоны
  parser: languagePug                                                             // Добавляем библиотеку для парсинга шаблонов
});

global.state = {                                                                  // Создаем глобальный стейт
  watch: {
    templates: undefined
  }                                                                               // Измененные файлы записываются по имени задачи, которая будет их обрабатывать.
};                                                                                // Это необходимо для поддержки нескольких языков в @emitty


function getFilter(taskName) {
  return through2.obj(function (file, _encoding, callback) {
    emitty.filter(file.path, global.state.watch[taskName]).then((result) => {
      if (result) {
        this.push(file);
      }
      callback();
    });
  });
}                                                                                 // Функция для фильтрации измененных файлов

module.exports = function templates(done) {

  fs.access(config.check.pug, error => {
    if (error) {
      return done();
    } else {
      done();

      return src(config.app.pug)
        .pipe(getFilter('templates'))                                             // Выполняем фильтрацию
        .pipe(debug())                                                            // Показываем сколько файлов было пересобрано
        .pipe(plumber({
          errorHandler: notify.onError({
            title: 'PUG',
            message: '<%= error.message %>'
          })
        }))                                                                       // При ошибках компиляции не останавливаем процесс слежения, выводим ошибку
        .pipe(pug({pretty: true}))                                                // Компилируем, запрещая минифицировать HTML
        .pipe(htmlValidator())                                                    // W3C html валидатор
        .pipe(dest(config.dist.dist))                                             // Выгружаем в папку public
    }
  });
};