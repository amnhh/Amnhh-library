var Amnhh =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	module.exports = __webpack_require__(10);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/13
	 * Mail : amnhhlod@gmail.com
	 */

	// require list

	var constant = __webpack_require__(2);


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

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Author : anning
	 * Date : 17/1/13
	 * Mail : amnhhlod@gmail.com
	 */

	module.exports = {
	  ARRAY_RANGE : Math.pow(2, 53) - 1,
	  promise : {
	    PENDING : 0,
	    RESOLVED : 1,
	    REJECTED : 2
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/14
	 * Mail : amnhhlod@gmail.com
	 */

	/**
	 * 对 dom 的扩展
	 */


	var Amnhh = __webpack_require__(1);
	__webpack_require__(4);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/13
	 * Mail : amnhhlod@gmail.com
	 */

	var Amnhh = __webpack_require__(1);
	__webpack_require__(5);
	var proto = Amnhh.fn;

	// 初始化 uitl
	proto.util = {};
	var protoUtil = Amnhh.fn.util;

	var constant = __webpack_require__(2);

	protoUtil.isObject = function (obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	};


	protoUtil.class2type = {};

	protoUtil.toString = Object.prototype.toString;

	/**
	 * 对 isError, isArguments... 之类的定义
	 */
	proto.array.each(['Arguments', 'Function', 'Object', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Undefined', 'Null', 'Boolean', 'Array'], function (type) {

	  /** 对 class2type 扩展
	   *
	   * @type {string}
	   *
	   * @example
	   *   class2type['[object Object]'] = 'object'
	   */
	  protoUtil.class2type['[object ' + type + ']'] = type.toLowerCase();
	  proto.util['is' + type] = function (val) {
	    return protoUtil.toString.call(val) === '[object ' + type + ']';
	  };
	});

	/**
	 * 判断是不是 NaN
	 *
	 * @member Amnhh.fn.util
	 *
	 * @param {Mixed} val 检测的值
	 * @returns {Boolean} 返回是否是 NaN
	 *
	 * 主要思路就是使用 Number.isNaN 进行检测, 再加上 NaN 是唯一一个不等于自身的东西这一条特性的判断
	 */
	proto.util.isNaN = function (val) {
	  return Number.isNaN(val) && val !== val;
	};

	/**
	 * 检测是不是 window
	 *
	 * @param {Mixed} val 待检测的值
	 * @return {Boolean} 返回是否是 window
	 */
	proto.util.isWindow = function (val) {
	  return val != null && val.window === val;
	  // fuck ie, support ie 8+
	  // reutrn val != null && val.window === val && protoUtil.toString.call(val) === '[object Window]';
	  // 多加的那个条件, 是为了兼容这中, var a = {}; a.window = a; => 不加最后那个条件的话, 会返回 true
	};


	/**
	 * 检测入参的类型
	 * @param {Mixed} val
	 * @returns {String} 标示类型的字符串
	 */
	protoUtil.type = function (val) {
	  return (typeof val === 'function' || typeof val === 'object')
	    ? protoUtil.class2type[protoUtil.toString.call(val)] : typeof val;
	};







/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/14
	 * Mail : amnhhlod@gmail.com
	 */

	/**
	 * Array 扩展
	 */

	var Amnhh = __webpack_require__(1);
	var constant = __webpack_require__(2);
	var proto = Amnhh.fn;

	__webpack_require__(6);

	// 初始化 array
	proto.array = {};
	var protoArr = proto.array;


	/**
	 * 获取相应的属性
	 * 属于函数式编程
	 *
	 * @param key
	 * @returns {Function}
	 *
	 * @example
	 *  底下的 getLength 方法定义的时候以传参的形式调用 property 来进行定义
	 *  可以结合其参数理解
	 */
	var property = function (key) {
	  return function (obj) {
	    return obj != null && obj[key];
	  };
	};

	/**
	 * @member Amnhh.fn.array
	 *
	 * 会获取 this 的 length
	 * @type {Function}
	 */
	protoArr.getLength = property('length');



	/**
	 * 检测是不是类数组对象
	 * 其实就是去检测 length 属性
	 * 用的时候也是根据这个来确定是使用 for 循环还是 for/in 循环
	 *
	 * @member Amnhh.fn.array
	 *
	 * @param {Mixed} col 集合
	 * @returns {boolean} 返回是否是类数组对象
	 *
	 * @example
	 *   Amnhh().array.isArrayLike([])
	 */
	protoArr.isArrayLike = function (col) {
	  var length = protoArr.getLength(col);
	  return typeof length === 'number' && length >= 0 && length < constant.ARRAY_RANGE;
	};


	/**
	 * 定义 each/forEach 循环
	 *
	 * @member Amnhh.fn.array
	 *
	 * @param {Array, Object} arr 可以是类数组对象, 可以是对象, 可以是数组
	 * @param func
	 */
	protoArr.each = protoArr.forEach = function (arr, func) {
	  if (protoArr.isArrayLike(arr)) {
	    for (var i = 0, len = protoArr.getLength(arr); i < len; i ++) {
	      func(arr[i], i, arr);
	    }
	  } else {
	    var keys = proto.object.keys(arr);
	    for (var i = 0, len = protoArr.getLength(keys); i < len; i ++) {
	      var key = keys[i];
	      func(arr[key], key, arr);
	    }
	  }
	}


	/**
	 * 对 every 方法的封装
	 * arr 的每一项执行 func, 结果都为 true 的话, 总体表达式返回 true， 否则返回 false
	 *
	 * @param {Array, Object} arr 待处理的集合, 可以是 Array/Object
	 * @param {Function} func 执行函数
	 * @type {proto.array.forEach}
	 *
	 * @return {Boolean}
	 */
	protoArr.every = function (arr, func) {
	  // 复杂实现
	  // if (protoArr.isArrayLike(arr)) {
	  //   for (var i = 0, len = protoArr.getLength(arr); i < len; i ++) {
	  //     if (!func(arr[i], i, arr)) return false;
	  //   }
	  //   return true;
	  // } else {
	  //   var keys = proto.object.keys(arr);
	  //   for (var i = 0, len = protoArr.getLength(keys); i < len; i ++) {
	  //     var key = keys[i];
	  //     if (!func(arr[key], key, arr)) return false;
	  //   }
	  //   return true;
	  // }

	  // 简写一下
	  var keys = protoArr.isArrayLike(arr) ? arr : proto.object.keys(arr);
	  var len = (keys || arr).length;
	  for (var i = 0; i < len; i ++) {
	    var key = keys ? keys[i] : i;
	    if (!func(arr[key], key, arr)) return false;
	  }
	  return true;
	};


	protoArr.some = function (arr, func) {
	  // if (protoArr.isArrayLike(arr)) {
	  //   for (var i = 0, len = protoArr.getLength(arr); i < len; i ++) {
	  //     if (func(arr[i], i, arr)) return true;
	  //   }
	  //   return false;
	  // } else {
	  //   var keys = proto.object.keys(arr);
	  //   for (var i = 0, len = protoArr.getLength(keys); i < len; i ++) {
	  //     var key = keys[i];
	  //     if (func(arr[key], key, arr)) return true;
	  //   }
	  //   return false;
	  // }

	  // 这里也同样简写一下
	  var keys = protoArr.isArrayLike(arr) ? arr : proto.object.keys(arr);
	  var len = (keys || arr).length;
	  for (var i = 0; i < len; i ++) {
	    var key = keys ? keys[i] : i;
	    if (func(arr[key], key, arr)) return true;
	  }
	  return false;
	};




/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/14
	 * Mail : amnhhlod@gmail.com
	 */

	/**
	 * 对 object 的扩展
	 */

	var Amnhh = __webpack_require__(1);
	__webpack_require__(4);
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



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/15
	 * Mail : amnhhlod@gmail.com
	 */

	/**
	 * 对 json 方法的封装, 使之 api 更加友好
	 */

	var Amnhh = __webpack_require__(1);

	var proto = Amnhh.prototype;

	// 取得 json 的 namespace
	proto.json = {};

	var protoJson = proto.json;

	// 先把两个常规的方法挂在 Amnhh.fn.json 上面
	protoJson.parse = JSON.parse;

	/**
	 * 因为 stringify 的后两个参数不太好理解
	 * 就直接封装出几个方法来填入后面的参数的默认值
	 */
	protoJson.stringify = JSON.stringify;


	/**
	 * 处理 json, 并且 format
	 * 名字一定要长!!!
	 *
	 * @param {Mixed} 要被处理的东西
	 * @param {Number} 缩进的数字
	 *
	 * @return {String} 返回 stringify 后的东西
	 */
	protoJson.stringifyFormatWithNumber = function (val, n) {
	  return protoJson.stringify(val, null, n);
	};


	/**
	 * 处理 json, 并且可以对字段进行过滤
	 *
	 * @param {Mixed} 要被处理的东西
	 * @param {String} arg1, arg2, ... argn => 就是要保留的字段
	 *
	 * @return {String} 返回 stringify 后的东西
	 */
	protoJson.stringifyFilter = function () {
	  var val = arguments[0];
	  // 取到从第一位开始后面的那些参数
	  var args = Array.prototype.slice.call(arguments, 1);

	  return protoJson.stringify(val, args);
	};

	/**
	 * 因为 stringify 会优先检测被处理的对象有没有 toJSON 方法
	 * 这里就是封装了一个方法去为其添加 toJSON 方法
	 * @param val
	 * @param func
	 */
	protoJson.addToJson = function (val, func) {
	  val.toJSON = func;
	};


	// parse 里面的方法还算好理解, 就不进行过度封装了

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/15
	 * Mail : amnhhlod@gmail.com
	 */

	/**
	 * 调用方法 :
	 *
	 * Promise = (typeof Promise  === 'function')
	 *    ? Promise
	 *    : Amnhh.fn.Promise; // 也可以是 Amnhh().Promise
	 */

	var Amnhh = __webpack_require__(1);

	var proto = Amnhh.fn;

	var constant = __webpack_require__(2).promise;


	// 如果原生支持 promise 的话, 就直接用原生的 promise
	if (typeof Promise !== 'undefined') {
	  proto.Promise = Promise;
	} else {

	  // 三种状态
	  // 规定 pending -> 0, resolved -> 1, rejected -> 2
	  var PENDING = constant.PENDING;
	  var RESOLVED = constant.RESOLVED;
	  var REJECTED = constant.REJECTED;

	  proto.Promise = function (func) {
	    // 如果说入参不是一个 function 的话, 直接报错
	    if (typeof func !== 'function') {
	      throw new TypeError('promise 传入的应该是一个函数');
	      return;
	    }

	    var me = this;

	    // 定义内部变量 resolve, reject
	    // 就是我们平时看到的 new Promise((resolve, reject) => {})
	    // 平时在调用的时候不需要指定, 而是系统预先定义好的
	    // 而现在我们在实现这个 promise, 所以需要自己预定义好
	    var resolve = function (val) {
	      me.resolve(val);
	    };

	    var reject = function (val) {
	      me.reject(val);
	    };

	    // 指定初始状态为 PENDING
	    this._status = PENDING;
	    // 初始化成功回调函数 list 和失败回调函数 list
	    this._onResolved = [];
	    this._onRejected = [];

	    func && func(resolve, reject);
	  };

	  // 取出来更简单点的变量
	  var Promise = proto.Promise;
	  var fn = Promise.prototype;

	  /**
	   *
	   * 这里需要定义上面用到的 this.resolve 和 this.reject
	   * 因为我们在调用 Promise 构造函数的时候通常都是 new Promise(xxx), 所以内部指向的 this 为新创建的那个实例
	   * 而一个实例上可以调用的方法, 除非在实例化的时候手动指定, 否则一般来自 constructor.prototype, 也就是浏览器中的 __prpto__
	   * 所以 this.resolve 和 this.reject 统统都定义在 Promise.prototype 上
	   *
	   * @member Amnhh.fn.Promise.prototoype
	   *
	   *
	   * @param val
	   */
	  fn.resolve = function (val) {
	    // promise 规范中, 如果说状态不为 PENDING 的话, 我们对 status 不可修改, 除非是 then 里面返回了一个新的 promise
	    // 所以这里 status 不为 PENDING 的话, resolve 方法失效
	    if (this._status !== PENDING) {
	      return;
	    }
	    // 修改值
	    this._status = RESOLVED;
	    this._value = val;
	    // 依次执行 resolved 回调 list
	    for (var i = 0, len = this._onResolved.length; i < len; i ++) {
	      this._onResolved[i](val);
	    }
	  };

	  /**
	   * @member Amnhh.fn.Promise.prototype
	   *
	   * @param val
	   */
	  fn.reject = function (val) {
	    if (this._status !== PENDING) {
	      return;
	    }
	    this._status = REJECTED;
	    this._value = val;
	    // 依次执行 reject 回调 list
	    for (var i = 0, len = this._onRejected.length; i < len; i ++) {
	      this._onRejected[i](val);
	    }
	  };

	  /**
	   * catch 只是 promise.then(null, onRejected) 的别名
	   * 所以这里可以模拟出来, 但是依赖 then 方法的定义
	   *
	   * @param onRejected
	   */
	  fn.catch = function (onRejected) {
	    this.then(null, onRejected);
	  };

	  /**
	   * then 方法
	   *
	   * 每个实例都可以使用, 说一定是挂在原型链上的
	   *
	   * @member Amnhh.fn.Promise.prototype
	   *
	   *
	   */
	  fn.then = function (onResolved, onRejected) {
	    var self = this;
	    // 返回一个新的 promise 对象以完成链式调用
	    return new Promise(function (resolve, reject) {

	      // 定义 resolve 状态的执行函数
	      var onResolvedWrapper = function (val) {
	        var ret = onResolved ? onResolved(val) : val;

	        if (Promise.isPromise(ret)) {
	          // 如果传递给 then 的是一个 promise 对象的话
	          // then 里面需要等待这个 promise 的状态从 pending 变为 resolved 或者 rejected 的时候再去决定
	          // 执行的是 resolved 回调函数还是 rejected 回调函数
	          ret.then(function (val) {
	            resolve(val);
	          });
	        } else {
	          // 如果不是一个 promise 对象的话, 直接 resolve 这个东西
	          resolve(ret);
	        }
	      };
	      // 定义 reject 状态的执行函数
	      var onRejectedWrapper = function (val) {
	        var ret = onRejected ? onRejected(val) : val;
	        reject(val);
	      };

	      // 向 resolved 和 rejected 的回调函数 list 添加上面调用的两个 lsit
	      self._onResolved.push(onResolvedWrapper);
	      self._onRejected.push(onRejectedWrapper);

	      // 之前对 fn.resolve 和 fn.reject 定义的时候, 都会有个 val = this._value
	      // 是为了在这里的参数传递
	      // 就在这里进行调用
	      if (self._status === RESOLVED) {
	        // setTimeout(onResolvedWrapper(self._value), 0);
	        onResolvedWrapper(self._value)
	      }
	      if (self._status === REJECTED) {
	        // setTimeout(onRejectedWrapper(self._value), 0);
	        onRejectedWrapper(self._value);
	      }
	    });
	  };

	  /**
	   * 检测入参是不是 promise 对象
	   * @param val
	   * @returns {boolean}
	   */
	  Promise.isPromise = function (val) {
	    return val instanceof Promise;
	  };

	  /**
	   * 直接获得一个 resolve 状态的 promise 对象
	   *
	   * @member Amnhh.fn.Promise
	   *
	   * @param obj
	   * @returns new Promise => resolve 状态
	   */
	  Promise.resolve = function (obj) {
	    if (Promise.isPromise(obj)) {
	      return obj;
	    }
	    return new Promise(function (resolve) {
	      resolve();
	    });
	  };

	  /**
	   * 直接获得一个 reject 状态的 promise 对象
	   *
	   * @member Amnhh.fn.Promise
	   *
	   * @param obj
	   * @returns new Promise => reject 状态
	   */
	  Promise.reject = function (obj) {
	    if (Promise.isPromise(obj)) {
	      return obj;
	    }
	    return new Promise(function (resolve, reject) {
	      reject();
	    });
	  };

	  Promise.all = function (arr) {
	    return new Promise(function (resolve, reject) {
	      var len = arr.length;
	      // 起始遍历 idx
	      var i = -1;
	      // 标示是否是最后一个的 idx
	      var count = 0;
	      var results = [];

	      while (++ i < len) {
	        (function (i) {
	          arr[i].then(function (val) {
	            results[i] = val;
	            // 如果 ++ count === leng => true
	            // 则说明已经进行到了 arr 的最后一个
	            // 这时候还木有转 reject 的时候
	            // 说明需要 resolve 了
	            if (++ count === len) {
	              resolve(results);
	            }
	          }, function (val) {
	            // 如果 reject 了
	            // 则返回 arr 里面第一个 reject 的 Promise 实例
	            reject(val);
	          });
	        })(i)
	      }
	    });
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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

	var Amnhh = __webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(6);

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/13
	 * Mail : amnhhlod@gmail.com
	 */

	var Amnhh = __webpack_require__(1);

	__webpack_require__(4);
	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(11);


	/**
	 * 现在生成的其实只是 Amnhh.fn.init 的实例, 而不是 Amnhh 的实例
	 * 所以我们需要的就是, 把当前的构造函数的 prototype 指向 Amnhh 的 protoype
	 */
	Amnhh.fn.init.prototype = Amnhh.fn;
	// console.log(Amnhh.mix)

	module.exports = Amnhh;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author : anning
	 * Date : 17/1/16
	 * Mail : amnhhlod@gmail.com
	 */

	/**
	 * 对 url 的一些方法的封装
	 */

	var Amnhh = __webpack_require__(1);


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

/***/ }
/******/ ]);