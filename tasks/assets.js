const { src, dest, parallel } = require('gulp');


function copyCss() {
  return src('app/renderer/**/*.css').pipe(dest('build/renderer'));
}
function copyHtml() {
  return src('app/renderer/index.html').pipe(dest('build/renderer'));
}

copyCss.displayName = 'copy-css';
copyHtml.displayName = 'copy-html';

exports.copyAll = parallel(copyCss, copyHtml);
exports.copyCss = copyCss;
exports.copyHtml = copyHtml;
