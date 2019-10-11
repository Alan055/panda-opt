/*
* 这里是公共函数
 */

// 节流函数 一般用于点击事件
const throttle = function (fn, delay) {
  delay = delay || 300
  let timer = null
  return function () {
    let that = this; // 保存当前作用域  以免被定时器污染
    var args = arguments; // 保存一下参数
    if (!timer) { // 浏览器缓存中没有定时器的时候 才会执行  有就不执行 这就可以节省浏览了 防止多次点击
      timer = setTimeout(function() {
        fn.apply(that, args); // 执行apply 会立即执行fn
        timer = null;
      }, delay);
    }
  }
}


// 防抖函数 用于输入框等
const debounce = function (fn, delay) {
  delay = delay || 300
  var timeout = null;
  return function() {
    let that = this; // 保存当前作用域  以免被定时器污染
    var args = arguments; // 保存一下参数
    if(timeout !== null)   clearTimeout(timeout);
    timeout = setTimeout(fn.apply(that, args), delay);
  }
}


export default {
  throttle, // 节流函数
  debounce, // 防抖函数
}
