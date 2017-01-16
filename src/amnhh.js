/**
 * Author : anning
 * Date : 17/1/13
 * Mail : amnhhlod@gmail.com
 */

var Amnhh = require('./core');

require('./util');
require('./dom');
require('./array');
require('./object');
require('./json');
require('./promise');
require('./data');
require('./url');


/**
 * 现在生成的其实只是 Amnhh.fn.init 的实例, 而不是 Amnhh 的实例
 * 所以我们需要的就是, 把当前的构造函数的 prototype 指向 Amnhh 的 protoype
 */
Amnhh.fn.init.prototype = Amnhh.fn;
// console.log(Amnhh.mix)

module.exports = Amnhh;