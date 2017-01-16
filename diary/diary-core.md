## 2017-01-13

### 关于 new Amnhh.fn.init(selector) 里 this 的指向

在这里来说, 是因为在开发的时候, 一直觉得是先执行 `Amnhh.fn.init(selector)`, 执行结果再进行 `new` 的操作, 就发现怎么都说不通 `Amnhh.fn.init` 函数里面 `this` 的指向... 

后面钻到了死胡同, 只能去求助孙大胖, 得以解决。。

其实就可以看成是 => `return new Array()`, 然后就想起了 `new` 操作符中的一个步骤就是, 将 `this` 的指向由构造函数变为实例, 也就是 `this` 的绑定, 这样一来就都说得通了

### 关于 Amnhh.fn.init 原型一直挂不上的问题

在开发过程中, 我在 `Amnhh.fn` 上挂了一个 `test` 方法, 但是在 `Amnhh()` 生成的实例上一直都不可以正常的访问到, 也就是说我根本就没挂上

检查了问题, 发现原因是, `Amnhh()` 调用的是 `new Amnhh.fn.init()`, 也就是说这个时候构造函数是这个 `init`, 而浏览器中的 `__proto__` 会指向构造函数的 `prototype`, 而我的生成的实例也只能拿到他构造函数上面的东西, 所以就只得手动指定

```js
Amnhh.fn.init.prototype = Amnhh.fn
```

这样一来就可以在 `Amnhh()` 生成的实例中使用 `Amnhh.fn` 上定义的方法了