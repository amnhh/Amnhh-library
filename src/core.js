/**
 * Author : anning
 * Date : 17/1/13
 * Mail : amnhhlod@gmail.com
 */

// require list

var constant = require('./constant');


function Amnhh (selector) {
  return new Amnhh.fn.init(selector);
}


Amnhh.fn = Amnhh.prototype = {
  constructor: Amnhh,

  version : '0.0.1',

  getElementsByClassName : function (name) {
    return typeof document.getElementsByClassName === 'function'
      ? document.getElementsByClassName(name)
      : (function (name) {
        var ret = [];
        var reg = new RegExp(name);
        // 筛选出来一个 nodeList
        var allElement = document.getElementsByTagName('*');
        for (var i = 0, len = allElement.length; i < len; i ++) {
          var className = allElement[i].className;
          if (reg.test(className)) {
            ret.push(allElement[i]);
          }
        }
        return ret;
      })(name);
  },

  init: function (selector) {

    // 之前是通过 typeof document.querySelectorAll() && /^\s+$/.test(selector) && selector !== '' 来做
    // 现在的想法就是, 使用 try/catch 语句, 如果一个抛错误, 就用另一个, 可以增强代码的可读性
    try {
      var ret = document.querySelectorAll(selector);
      var len = ret.length;

      // 如果没有的话, 说明没有筛选到
      if (len === 0) return this;
      if (len === 1) {
        this.selector = selector;
        this.length = 1;
        this[0] = this._dom = ret[0];
        return this;
      }
      for (var i = 0; i < len; i ++) {
        this[i] = ret[i];
        this.length = len;
        this.selector = selector;
      }
      return this;
    } catch (e) {
      // 不能用的话就只能靠自己了...

      // 处理传入 undefined, null 的情况
      if (selector == null) {
        return this;
      }

      // 处理传入一个 dom
      if (selector.nodeType) {
        this[0] = this._dom = selector;
        this.length = 1;
        return this;
      }

      // 处理不为 string 的情况
      if (typeof selector !== 'string') {
        throw new Error('Amnhh 入参必须是 String / Dom');
      }

      // string 去除前后空格
      selector = selector.replace(/^\s+/, '').replace(/\s+$/, '');



      // 传入的为 #xxx => Id 选择器
      if (selector[0] === '#') {
        // 这样就取到了一个 dom, 就直接在调用一次 init 就好了
        // var dom = document.getElementById(selector.slice(1));
        // return new Amnhh.fn.init(dom);

        // 更新 : 在能挂上 selector 的时候, 最好还是在 selector 上挂上东西
        this[0] = this._dom = document.getElementById(selector.slice(1));
        this.selector = selector;
        return this;
      }

      // 传入的为 .xxx => class 选择器
      if (selector[0] === '.') {
        // 先把 class 为 selector 的 nodeList 选出来
        var ret = Amnhh.fn.getElementsByClassName(selector.slice(1));
        var len = ret.length;
        for (var i = 0; i < len; i ++) {
          this[i] = ret[i];
        }
        this.length = len;
        this.selector = selector;
        return this;
      }



      // 最后支持的一种是 tag 选择器
      var ret = document.getElementsByTagName(selector);
      var len = ret.length;
      if (ret.length === 0) return this;
      if (ret.length === 1) {
        this.length = 1;
        this[0] = this._dom = ret[0];
        this.selector = selector;
        return this;
      }
      // 最后就是一个 init list
      for (var i = 0; i < len; i ++) {
        this[i] = ret[i];
      }
      this.length = len;
      this.selector = selector;
      return this;

    }
  }
};



module.exports = Amnhh;