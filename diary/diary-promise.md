## 2017-01-16

在对 `Promise` 进行兼容实现的时候, 最僵的是构造函数的时候

```js
var resolve = function (val) {
  this.resolve(val);
};
```

提前没有把构造函数的上下文 `this` 取出来, 而是直接在 `resolve` 定义的时候使用 `this`, 结果报错, 查了半天才发现, 居然在这个里面的 `this` 是 `window` 而不是 `Promise`, 以后还是要多注意, `var self = this; xxxxx....`