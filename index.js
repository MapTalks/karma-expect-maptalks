
var path = require('path');

var pattern = function (file) {
  return {pattern: file, included: true, served: true, watched: false};
};

var framework = function (files) {
    var index = -1,
        postfix = path.join('expect.js' , 'index.js'),
        pa;
    for (var i = 0; i < files.length; i++) {
        pa = files[i].pattern;
        if (pa.length > postfix.length && pa.substring(pa.length - postfix.length) === postfix) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        throw new Error('expect-maptalks can not find expect.js.');
    }
    if (index === files.length - 1) {
        files.push(pattern(path.resolve(require.resolve('expect-maptalks'))));
    } else {
        files.splice(index + 1, 0, pattern(path.resolve(require.resolve('expect-maptalks'))));
    }
};

framework.$inject = ['config.files'];

module.exports = {'framework:expect-maptalks': ['factory', framework]};
