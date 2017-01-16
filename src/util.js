/**
 * Author : anning
 * Date : 17/1/13
 * Mail : amnhhlod@gmail.com
 */

var Amnhh = require('./core');
require('./array');
var proto = Amnhh.fn;

// 初始化 uitl
proto.util = {};
var protoUtil = Amnhh.fn.util;

var constant = require('./constant');

protoUtil.isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};


protoUtil.class2type = {};

protoUtil.toString = Object.prototype.toString;

/**
 * 对 isError, isArguments... 之类的定义
 */
proto.array.each(['Arguments', 'Function', 'Object', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Undefined', 'Null', 'Boolean', 'Array'], function (type) {

  /** 对 class2type 扩展
   *
   * @type {string}
   *
   * @example
   *   class2type['[object Object]'] = 'object'
   */
  protoUtil.class2type['[object ' + type + ']'] = type.toLowerCase();
  proto.util['is' + type] = function (val) {
    return protoUtil.toString.call(val) === '[object ' + type + ']';
  };
});

/**
 * 判断是不是 NaN
 *
 * @member Amnhh.fn.util
 *
 * @param {Mixed} val 检测的值
 * @returns {Boolean} 返回是否是 NaN
 *
 * 主要思路就是使用 Number.isNaN 进行检测, 再加上 NaN 是唯一一个不等于自身的东西这一条特性的判断
 */
proto.util.isNaN = function (val) {
  return Number.isNaN(val) && val !== val;
};

/**
 * 检测是不是 window
 *
 * @param {Mixed} val 待检测的值
 * @return {Boolean} 返回是否是 window
 */
proto.util.isWindow = function (val) {
  return val != null && val.window === val;
  // fuck ie, support ie 8+
  // reutrn val != null && val.window === val && protoUtil.toString.call(val) === '[object Window]';
  // 多加的那个条件, 是为了兼容这中, var a = {}; a.window = a; => 不加最后那个条件的话, 会返回 true
};


/**
 * 检测入参的类型
 * @param {Mixed} val
 * @returns {String} 标示类型的字符串
 */
protoUtil.type = function (val) {
  return (typeof val === 'function' || typeof val === 'object')
    ? protoUtil.class2type[protoUtil.toString.call(val)] : typeof val;
};





