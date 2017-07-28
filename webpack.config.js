'use strict';

var path = require('path');

var pkg = require('./package.json');

module.exports = {
  entry: path.resolve(pkg.main),
  output: {
    filename: path.join('dist', pkg.name + '.js'),
    library: 'TinyConf',
    libraryTarget: 'umd'
  }
};
