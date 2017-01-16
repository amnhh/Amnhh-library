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

proto.data = function () {
  var self = this;
  var options = arguments[0];
  if (proto.util.isObject(options)) {
    var keys = proto.object.keys(options);
    keys.map(function (val) {
      // 这里用 keys 调用的话, this 的指向会有问题
      // 所以用 call 而没有直接使用 proto.data(val, options[val])
      proto.data.call(self, String(val), String(options[val]));
    });
    return;
  }
  var name = arguments[0];
  var value = arguments[1];
  // 是只有一个参数, 则为获取属性的值
  if (value === undefined) {
    return this.attr('data-' + String(name));
  }
  // 两个参数, 则设置属性
  this.attr('data-' + name, String(value));
};

proto.removeData = function () {
  var self = this;
  var options = arguments[0];
  var ret;
  // 是个 array 的话, 代表要批量搞
  if (proto.util.isArray(options)) {
    options.map(function (val) {
      proto.removeData.call(self, val);
    });
  }
  var name = arguments[0];
  this.removeAttr('data-' + name);
};