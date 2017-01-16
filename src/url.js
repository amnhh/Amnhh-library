/**
 * Author : anning
 * Date : 17/1/16
 * Mail : amnhhlod@gmail.com
 */

/**
 * 对 url 的一些方法的封装
 */

var Amnhh = require('./core');


var proto = Amnhh.fn;
var protoUrl = proto.url = {};

/**
 * 对当前 url 的 参数进行处理, 返回 [[key1, val1], [key2, val2]] 的形式
 */
protoUrl.getSearchParams = function () {
  var params = location.search.slice(1);
  return params === ''
    ? ''
    : (function () {
      var ret = [];
      var paramList = params.split('&');
      // map 着赋值
      paramList.map(function (val, idx) {
        val = val.split('=');
        ret[idx] = [val[0], val[1]];
      });
      return ret;
    })();
};

/**
 * 得到当前 url 里面的 name 字段的值
 *
 * @param {String} name 值
 * @return {String} name 对应的 value 的值
 */
protoUrl.getParamValue = function (name) {
  // 获取参数列表
  var paramsArr = protoUrl.getSearchParams();
  var ret;
  // 找到就给 ret 赋值
  paramsArr.some(function (val) {
    return val[0] === name && (ret = val[1])
  });
  // 最后返回 ret
  return ret || '';
};