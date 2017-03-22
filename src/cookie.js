/**
 * Created by anning on 2017/3/22.
 */
var Amnhh = require('./core');

var proto = Amnhh.prototype;

/**
 * 获取 cookie
 */
proto.getCookie = function (name) {
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
 *
 * @param name  {String}  cookie 名字
 * @param value  {Any}  cookie 值
 * @param expires  {Date}  啥时候过期
 * @param path  {String} 路径
 * @param domain  {String}  域
 * @param secure  {Boolean}  是否加 secure tag
 */
proto.setCookie = function (name, value, expires, path, domain, secure) {
  // 生成 `cookie` 的字符串
  var cookieAddText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  // 如果 `expires` 是个 `Date` 的实例
  if (expires instanceof Date) {
    cookieAddText += '; expires=' + expires.toGMTString();
  }

  // 如果有 `url` 路径
  if (path) {
    cookieAddText += '; path=' + path;
  }

  // 如果有 `domain` 域
  if (domain) {
    cookieAddText += '; domain=' + domain;
  }

  // 如果有 `secure` 的话
  if (secure) {
    cookieAddText += '; secure';
  }

  // 挂在 `document.cookie` 上
  document.cookie = cookieAddText;
};

/**
 * 删除 cookie
 * @param name  {String}  cookie 名字
 * @param path  {String}  路径
 * @param domain  {String}  域
 * @param secure  {Boolean}  是否添加 secure 的 tag
 */
proto.unset = function (name, path, domain, secure) {
  // 设置一个时间为 0 的 `cookie`
  this.setCookie(name, '', newDate(0), paht, domain, secure);
};