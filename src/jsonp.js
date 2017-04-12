/**
 * Author : Amnhh
 * Email : amnhhlod@gmail.com
 * Date : 2017/4/12
 */

var Amnhh = require('./core');

/**
 * 删除 function 命名空间
 * @param name
 */
function deleteFunction (name) {
  try {
    delete window[name];
  } catch (e) {
    window[name] = null;
  }
}

/**
 * remove <script> 标签
 * @param id
 */
function deleteScriptTag (id) {
  var scriptTag = document.getElementById(id);
  window.document.head.removeChild(scriptTag);
}

/**
 *
 * @param options
 *  @son-param : url
 *  @son-param : data
 *  @son-param : jsonp
 *  @son-param : successFunc
 *  @son-param : errorFunc
 */
Amnhh.jsonp = function (options) {
  // 单出口, `url` 必须存在, 不然报错
  if (!options.url) {
    throw new Error('Url Needed');
    return false;
  }
  var _data = '';
  // 处理 `data`
  if (typeof data === 'string') {
    // 是 `string` 的话就直接拼 `url`
    _data = data;
  } else if (typeof data === 'object' && !data) {

    // 是 `object` 且不为 `null`
    var keys = Object.keys(data);
    keys.map(function (val, idx, arr) {
      _data += '&' + val + '=' + data[val];
    });
    // 去掉最前面的 '&'
    _data = _data.slice(1);
  }

  url += url.indexOf('?') === -1
    // 等于 -1 说明 `url` 上没挂参数, 拼问号 ?
    ? '?'
    // 不等于 -1 说明 `url` 上挂了参数, 拼连接符
    : '&';
  // 拼上 `data`
  url += _data;

};



