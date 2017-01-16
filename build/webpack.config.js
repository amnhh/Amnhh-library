/**
 * Author : anning
 * Date : 17/1/13
 * Mail : amnhhlod@gmail.com
 */

var webpack = require('webpack');



module.exports = {

  entry : {
    Amnhh : [
      './../src/core',
      './../src/dom',
      './../src/util',
      './../src/array',
      './../src/object',
      './../src/json',
      './../src/promise',
      './../src/data',
      './../src/url',
      './../src/amnhh']
  },

  output : {
    library : 'Amnhh',
    libraryTarget : 'var',
    // path : 'dist/js/page',
    path : './../dist/',
    // 只有 [name] 才可以被识别
    // filename : '[again].bundle.js'
    filename : '[name].js'

  }
};