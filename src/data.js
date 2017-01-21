/**
 * Author : anning
 * Date : 17/1/16
 * Mail : amnhhlod@gmail.com
 */

/**
 * data 模块
 *
 * 预期只做
 * .data(name), .data(name, value), .data(options{name1 : vlaue, name2 : value...})
 * .removeData(name), .removeData(options[name1, name2, name3])...
 */

var Amnhh = require('./core');
require('./dom');
require('./util');
require('./object');

var proto = Amnhh.fn;

// 定义 expando -> 作为 Amnhh 的唯一标示
// 由 'Amnhh' + 时间戳 + 时间戳 * random 组成
proto.expando = 'Amnhh' + Date.now() + Math.floor(Math.random() * Date.now());
// 初始 uid 为 0
proto.uid = 0;

// 定义全局 cache 对象
proto.cache = {};


/**
 * 缓存到 cache 里面
 * @param key
 * @param value
 * @returns {*}
 */
proto.data = function (key, value) {
  var ownCacheKey;
  if (this[0].cacheKey) {
    // 有的话就用它之前的
    ownCacheKey = this[0].cacheKey;
    // 把这个 cache 中唯一的 key 放在这个 dom 上
  } else {
    // 为每个 dom 在 cache 中创建唯一的 key
    ownCacheKey = this.expando + ++ this.uid;
    // 初始化在 cache 中的每个 dom 对应的的缓存对象
    this.cache[ownCacheKey] = {};
    this[0].cacheKey = ownCacheKey;
  }

  // 如果是取数据
  if (value === undefined && this.cache[ownCacheKey]) {
    return this.cache[ownCacheKey][key];
  } else {
    this.cache[ownCacheKey][key] = value;
  }
};


