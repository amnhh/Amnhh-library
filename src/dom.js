/**
 * Author : anning
 * Date : 17/1/14
 * Mail : amnhhlod@gmail.com
 */

/**
 * 对 dom 的扩展
 */


var Amnhh = require('./core');
require('./util');

// 拿到 prototype 的引用
var proto = Amnhh.fn;
var protoUtil = proto.util;



// 必须 $.fn.xxx, 不能使 $.fn.dom.xxx => 因为后者的话, this 的取值会发生变化, 而且有些过度封装的感觉


proto.attr = function (name, value) {
  // 不会做入参非 string 的兼容, 所以检测不是 string 的话直接抛错
  if (protoUtil.type(name) !== 'string' || (protoUtil.type(value) !== 'string' && value !== undefined)) {
    throw new TypeError('此方法需要传值类型为 string');
  }
  if (/^\s+$/.test(name) || name === '') {
    throw new TypeError('name 为非空字符串');
  }
  // 如果说有 value 的话, 则说明是要添加属性
  // 则给他添加属性并返回
  if (value != undefined) {
    this[0].setAttribute(name, value);
    return value;
  } else {
    // 为 undefined 的时候, 说明是取属性
    return this[0].getAttribute(name);
  }
};

proto.removeAttr = function (name) {
  if (protoUtil.type(name) !== 'string') {
    throw new TypeError('需要类型为 string');
  }
  if (/^\s+$/.test(name) || name === '') {
    throw new TypeError('name 为非空字符串');
  }

  try {
    this[0].removeAttribute(name);
    return true;
  } catch (e) {
    return false;
  }
};


/**
 * 获取 value 属性
 * @returns {string}
 */
proto.getValue = function () {
  return this.attr('value');
};

/**
 * 获取 id
 */
proto.getId = function () {
  return this.attr('id');
};

/**
 * 获取 class 属性
 */
proto.getClass = function () {
  return this.attr('class');
};

/**
 * 添加属性
 * @param className
 */
proto.addClass = function (className) {
  if (protoUtil.type(className) !== 'string') {
    throw new TypeError('想加 class 都不给字符串, 搞毛线!');
  }
  // 如果 classList 支持的话, 就直接使用 classList 的原生方法
  if (this[0].classList != null) {
    this[0].classList.add(className);
  }
  this.attr('class', this.attr('class') + ' ' + className);
};

/**
 * 移除属性
 * @param className
 */
proto.removeClass = function (className) {
  if (protoUtil.type(className) !== 'string') {
    throw new TypeError('想删 class 都不给字符串, 搞毛线!');
  }
  // 如果 classList 支持的话, 就直接使用 classList 的原生方法
  if (this[0].classList != null) {
    this[0].classList.remove(className);
  }
  // 这里不会去管首尾的空格, 所以有可能生成的 class 会前后有空格
  this.attr('class', this.attr('class').split(className).join(''));
};

/**
 * 检测是否有 className
 * @param className
 * @returns {boolean}
 */
proto.hasClass = function (className) {
  if (protoUtil.type(className) !== 'string') {
    throw new TypeError('想查 class 都不给字符串, 搞毛线!');
  }
  if (this[0].classList != null) {
    return this[0].classList.contains(className);
  }
  return this.attr('class').indexOf(className) !== -1;
};

/**
 * 检测一个当前 Amnhh 实例的 dom 是否包含另一个节点
 *
 * @param element
 * @returns {boolean}
 *
 * @example
 *   Amnhh('#myDiv').contain(Amnhh('#a-link'))
 */
proto.contain = function (element) {
  // 添加对传入 Amnhh 实例的兼容
  if (element instanceof Amnhh) {
    element = element[0];
  }
  while (element !== document.documentElement) {
    if (element === this[0]) {
      return true;
    }

    element = element.parentNode;
  }
  return false;
};

/**
 * 替换内部 html 代码的方法
 *
 * 就是把 innerHTML 绑定到了我的元素上面
 *
 * @param code
 */
proto.html = function (code) {
  if (protoUtil.type(code) !== 'string') {
    throw new TypeError('html 方法需要入参为字符串');
  }
  this[0].innerHTML = code;
};

/**
 * 替换内部 text 的方法
 *
 * 就是把 innerText 绑定到了我的元素上面
 * @param code
 */
proto.text = function (code) {
  if (protoUtil.type(code) !== 'string') {
    throw new TypeError('text 方法需要入参为字符串');
  }
  this[0].innerText = code;
};