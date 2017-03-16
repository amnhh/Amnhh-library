/**
 * filter 模块, 放一些过滤函数
 */

var Amnhh = require('./core');

var proto = Amnhh.fn;

var filter = {};

/**
 * 对数字的过滤, 包含千分位分隔符, 四舍五入, 保留任意位小数
 * @Author   amnhh
 * @DateTime 2017-01-28T17:20:36+0800
 * @param    {Number | String}                 number    需要处理的数字
 * @param    {Number}                 decimals  需要保留的小数位数
 * @param    {String}                 point     小数点符号, 默认为 '.'
 * @param    {String}                 thousands 千分位分隔符符号, 默认为 ','
 * @return   {String}                           返回处理好的数字
 */
filter.number = function (number, decimals, point, thousands) {

  //form http://phpjs.org/functions/number_format/

  //form avalon -> filters -> number

  // 把开头不是 0-9, E, e, +, - 和 . 的字符过滤掉
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

  // 如果不是无穷大的话, 就把 number 转成数字, 是的话不能处理, 就置为 0
  var n = !isFinite(number) ? 0 : +number;

  // 保留的小数位数校准, 默认 3 位
  var prec = !isFinite(decimals) ? 3 : Math.abs(decimals);

  // 规定千分位分隔符的符号, 默认为 ','
  var sep = thousands || ',';

  // 规定小数点的符号, 默认为 '.'
  var dec = point || '.';

  var s = '';

  // 定义处理小数点及四舍五入的方法
  var toFixedFix = function (n, prec) {
    // 有多少位就乘 10 的多少次方
    var k = Math.pow(10, prec);
    // Math.round 会返回一个四舍五入的值
    // 这里假设 prec 为 3, 那么这里会先乘以 1000, 如果这个时候有小数位的话, 则使用 Math.round 进行四舍五入, 而后再除 1000 就 ok 了
    return '' + (Math.round(n * k) / k).toFixed(prec)
  };


  // 先对小数点及四舍五入进行处理
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

  // > 3 的话说明需要千分位分隔符
  if (s[0].length > 3) {
    // 加上逗号好吧...
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  // 如果都没有小数位, 或者小于需要保留的小数位数, 就需要在后面补 0
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};


/**
 * 给定数字, 给定位数, 不够的前面补齐数字
 */
filter.updateNumberWithZeroBefore = function (num, n) {
  return (Array(n).join('0') + num).slice(-n);
};

proto.filter = filter;
