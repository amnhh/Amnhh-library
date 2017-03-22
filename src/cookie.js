/**
 * Created by anning on 2017/3/22.
 */
var Amnhh = require('./core');

var proto = Amnhh.prototype;

/**
 * 设置 cookie
 */
proto.setCookie = function (name) {
  // 处理 `name` 为 `name=`
  var cookieName = encodeURIComponent(name) + '=';
  // 使用 `document.cookie` 超过两次, 转外部变量为局部变量
  var documentCookie = document.cookie;
  // 获取 `name=` 的位置
  var startIdx = documentCookie.indexOf(cookieName);
  // 声明返回值
  var ret;

  // 如果 `document.cookie` 字符串中有这个 `name=`
  if (startIdx > -1) {
    // 取到自 `name=` 后的第一个 `;` -> 如果说有
    var endIdx = documentCookie.indexOf(';', startIdx);
    // 如果说没有分号的话, 说明已经到了末尾了
    if (endIdx === -1) {
      endIdx = documentCookie.length;
    }
    ret = decodeURIComponent(
      documentCookie.slice(startIdx, endIdx)
    );
  }
  
  return ret;
};

/**
 * 获取 cookie
 */
proto.getCookie = function () {};