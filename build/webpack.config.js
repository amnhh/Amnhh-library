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
      './../src/event',
      './../src/jsonp',
      './../src/amnhh'
    ]
  },

  output : {
    library : 'Amnhh',
    // libraryTarget : 'var',
    // path : 'dist/js/page',
    // 这里居然必需是一个绝对路径....我....
    path : '/Users/anning/code/Amnhh/Amnhh-library/dist',
    // 只有 [name] 才可以被识别
    // filename : '[again].bundle.js'
    filename : '[name].js'
  }
};