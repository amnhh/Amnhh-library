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

var Amnhh = require('./core');

var proto = Amnhh.fn;

var constant = require('./constant').promise;


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