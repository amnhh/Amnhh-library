/**
 * Author : anning
 * Date : 17/1/15
 * Mail : amnhhlod@gmail.com
 */

/**
 * 对 json 方法的封装, 使之 api 更加友好
 */

var Amnhh = require('./core');

var proto = Amnhh.prototype;

// 取得 json 的 namespace
proto.json = {};

var protoJson = proto.json;

// 先把两个常规的方法挂在 Amnhh.fn.json 上面
protoJson.parse = JSON.parse;

/**
 * 因为 stringify 的后两个参数不太好理解
 * 就直接封装出几个方法来填入后面的参数的默认值
 */
protoJson.stringify = JSON.stringify;


/**
 * 处理 json, 并且 format
 * 名字一定要长!!!
 *
 * @param {Mixed} 要被处理的东西
 * @param {Number} 缩进的数字
 *
 * @return {String} 返回 stringify 后的东西
 */
protoJson.stringifyFormatWithNumber = function (val, n) {
  return protoJson.stringify(val, null, n);
};


/**
 * 处理 json, 并且可以对字段进行过滤
 *
 * @param {Mixed} 要被处理的东西
 * @param {String} arg1, arg2, ... argn => 就是要保留的字段
 *
 * @return {String} 返回 stringify 后的东西
 */
protoJson.stringifyFilter = function () {
  var val = arguments[0];
  // 取到从第一位开始后面的那些参数
  var args = Array.prototype.slice.call(arguments, 1);

  return protoJson.stringify(val, args);
};

/**
 * 因为 stringify 会优先检测被处理的对象有没有 toJSON 方法
 * 这里就是封装了一个方法去为其添加 toJSON 方法
 * @param val
 * @param func
 */
protoJson.addToJson = function (val, func) {
  val.toJSON = func;
};


// parse 里面的方法还算好理解, 就不进行过度封装了