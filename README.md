# Amnhh

Javascript Library for learning


## 时间

### v1.0.0

start : 2016-01-13

end : 2016-1-31(第一版)

只是完成了基础功能

### v2.0.0

start : 2016-02-15

end : undefined

第二版预计不止是类库，更是一个工具函数库, 准备把学习到的 `lodash` 工具库里的方法封装一些到 `Amnhh` 中,

## 预计完成的功能 :

### v1.0.0

- 内核 `core` 的实现   `√` => 只实现了 `Amnhh` 的构造函数和 `Amnhh.fn` 的定义
- 内部选择器的实现   `√` => 大部分通过 `querySelectorAll`, 小部分自己处理的 `id`, `class`, `tag` 的匹配
- 常规的 `dom` 操作的封装   `√` => 实现了简单的对 `class` 和 `attribute` 的增删改查, 实现了简单的对一个节点是否包含另一节点的功能
- 对 `array`, `string`, `obj` 的扩展方法    `√` => 简单的对一些常用的方法进行封装, 后续遇到了还会继续完善, 暂时能想到的有用点的就只有这么几个了
- 对 `ajax` 的封装 => 暂停了...
- 对 `json` 的封装   `√` => 主要对 `JSON.stringify` 的两个参数进行了封装, 没有过多的去对 `parse` 函数进行封装, 后续会做配置项, 也就是传入 `options` 来做处理的兼容
- 加入一些类似二分查找、桶排序、冒泡排序之类的算法
- `promise` 的兼容版实现    `√` => 原生支持的话会使用原生的 `Promise`, 不支持的话会使用自己定义的 `Promise`
- 对 `data` 操作的封装    `√` => 实现了基本的存取 `data` 以及批量添加与删除
- 对 `events` 的封装    `√` => 对 `add` 和 `remove` 进行了封装, 没有对内部的 `event` 对象过多处理
- 对 `util` 的封装     `√` => `util` 里面也有一些 `is` 函数的处理
- 对 `url` 的处理函数的封装    `√` => 实现了在 `url` 上查找数据和遍历 `list` 的功能

新增功能 :

- 2017-01-28 新增, `filter.number` 方法, 用来处理数字, 包含了对千分位分隔符的处理, 对四舍五入的处理以及保留 `n` 位小数补零的处理

### v1.0.2

把平时遇到的一些算法相关的问题或者是平时遇到的很好玩的函数封装到这个库中。



## 目录结构

```

├── README.md                               项目介绍
├── build                                   构建脚本目录
│   └── webpack.config.js
├── dist                                    dist
│   └── Amnhh.js
├── node_modules                            依赖
├── src                                     项目源码
│   ├── amnhh.js
│   ├── core.js
│   └── fn.js
├── test                                    测试目录
│   └── test.html
├── xmind                                   xmind图目录
│   └── Amnhh.xmind
└── diary                                   开发过程中的心得和技术总结
    └── diary-core.md

```

## 声明

Amnhh 为一个学习型库, 因为是学习相关, 所以做的大而全, 不支持线上使用, 谢谢
