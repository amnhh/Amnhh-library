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

// 定义 expando -> 作为 Amnhh 的唯一标示
// 由 'Amnhh' + 时间戳 + 时间戳 * random 组成
proto.expando = 'Amnhh' + Date.now() + Math.floor(Math.random() * Date.now());


