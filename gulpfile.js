'use strict';

const {
  series,
  parallel
}                 = require('gulp');
const args        = require('yargs').argv;

const env = args.env || 'dev';


const templates   = (env === 'dev') ? require('./gulp/tasks/template-incremental-build') : require('./gulp/tasks/templates');
const replaceUrl  = require('./gulp/tasks/replace-url');
const styles      = require('./gulp/tasks/styles');
const stylesLibs  = require('./gulp/tasks/styles-libs');
const js          = require('./gulp/tasks/js');
const jsLibs      = require('./gulp/tasks/js-libs');
const fonts       = require('./gulp/tasks/fonts');
const fontsTFF    = require('./gulp/tasks/fontsTFF');
const img         = require('./gulp/tasks/img');
const svg         = require('./gulp/tasks/svg');
const sprite      = require('./gulp/tasks/sprite');
const docs        = require('./gulp/tasks/docs');
const videos      = require('./gulp/tasks/videos');
const clean       = require('./gulp/tasks/clean');
const server      = require('./gulp/tasks/server');


const dev         = parallel(series(templates, replaceUrl), styles, stylesLibs, js, jsLibs, fonts, fontsTFF, img, svg, sprite, docs, videos);
const build       = series(clean, dev);

if (env === 'dev') module.exports.default = series(build, server);
if (env === 'prod') module.exports.default = series(build);
