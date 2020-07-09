const del  	    = require('del');
const config    = require('../config.js');


module.exports = function clean(done) {
  return del(config.dist.dist).then(() => {     // Удаляем папку public
    done();                                     // Сообщаем об окончании выполнения
  });
};