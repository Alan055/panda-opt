/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 站点域名
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

// let baseUrl = ''; // 全局搜索根本没有找到其他文件有用到这个
// let routerMode = 'history'; // 这个是路由的模式  但是目前也没有有history模式。。。 直接在路由里面写吧
// let imgBaseUrl; // 全局搜索根本没有找到其他文件有用到这个
let apiUrl = '';
// let path = ''; // 这个是什么  也不知道哦


// 这个函数不就是  window.location.origin  吗？？
// let params = function () {
//   let url = window.location.href;
//   let httpType = url.split('//')[0];
//   let str = httpType + '//' + window.location.host;
//   return str;
// };



// 下面这些好多变量都是多余的  全局搜索都没有用到  而且为什么要用绝对路径啊  直接用相对路径啊   相对路径的域名就是当前的域名啊！！
// 如果要修改域名  直接proxy代理就可以了  这样可以保证开发环境和测试、生产环境一致！

// let NODE_ENV = process.env.NODE_ENV; // 下面的注释了 这里也不需要了

// if (NODE_ENV == 'development') {
//   apiUrl = '';
//
// // baseUrl = 'http://192.168.30.221:8080';
//   // apiUrl ='http://192.168.30.166:8504';
//   // imgBaseUrl = 'http://192.168.30.166:8504/';
//
//
//   //blake ip
//   // apiUrl = 'http://192.168.30.174:8504';
//   // imgBaseUrl = 'http://192.168.30.174:8504/';
//
// } else {
//
//   // baseUrl = '/sinaif-h5-king';
//   apiUrl = window.location.origin;
//
//   // imgBaseUrl = apiUrl + '/';
// }


export {
  apiUrl,
  // routerMode,
  // baseUrl,
  // imgBaseUrl,
  // path
}
