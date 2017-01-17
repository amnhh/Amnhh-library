/**
 * Author : anning
 * Date : 17/1/16
 * Mail : amnhhlod@gmail.com
 */

/**
 * 对事件的封装
 *
 * 这里预计的只是对事件绑定的一个封装, 并将其集成在 Amnhh 这个对象上面
 */

var Amnhh = require('./core');

require('./array');

var proto = Amnhh.fn;


var addEvent = function (ele, type, func) {
  if (typeof ele.addEventListener === 'function') {
    return ele.addEventListener(type, func);
  } else if (typeof ele.attachEvent === 'function') {
    return ele.attachEvent('on' + type, func);
  } else {
    ele['on' + type] = func;
  }
};

var removeEvent = function (ele, type, func) {
  if (typeof ele.removeEventListener === 'function') {
    return ele.removeEventListener(type, func);
  } else if (typeof ele.detachEvent === 'function') {
    return ele.detachEvent('on' + type, func)
  } else {
    ele['on' + type] = null;
  }
};

proto.add = function (ele, type, func) {
  // var amnhh = Amnhh(xxx); amnhh.add('type', func) 的处理函数
  console.log(this)
  if (proto.isAmnhh(this)) {
    var tmp = type;
    type = ele;
    func = tmp;
    ele = this[0];
  }
  addEvent(ele, type, func);
};

proto.remove = function (ele, type, func) {
  if (proto.isAmnhh(this)) {
    var tmp = type;
    type = ele;
    func = tmp;
    ele = this[0];
  }
  removeEvent(ele, type, func);
};

var eventStr = 'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu';


proto.each(eventStr.split(' '), function (val) {
  proto[val] = function (func) {
    this.add(val, func);
  };
});

proto.on = proto.add;

