/**
 * Author : anning
 * Date : 17/1/14
 * Mail : amnhhlod@gmail.com
 */

/**
 * 对 object 的扩展
 */

var Amnhh = require('./core');
require('./util');
Amnhh.fn.object = {};
var proto = Amnhh.fn;
var protoObj = proto.object;

protoObj.keys = function (obj) {
  if (!proto.util.isObject(obj)) return;
  if (typeof Object.keys === 'function') {
    return Object.keys(obj);
  }
  var keys = [];
  for (var name in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, name)) {
      keys.push(name)
    }
  }
  return keys;
};

/**
 * 取到所有 Object 里面的键的键值, 丢到一个数组里面返回
 *
 * @param {Object} obj
 * @returns {Array} 返回 obj 里所有键的键值组成的数组
 */
protoObj.values = function (obj) {
  if (!proto.util.isObject(obj)) return;

  var keys = protoObj.keys(obj);
  var len = keys.length;
  var ret = Array(len);

  for (var i = 0; i < len; i ++) {
    ret[i] = obj[keys[i]]
  }
  return ret;
};

