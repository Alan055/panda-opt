import axios from 'axios';
import qs from 'qs';
import bus from './bus.js';
// import env from './env.js'; // 这个根本没有用到呀
// import Cookies from 'js-cookie'
// import {baseUrl} from "./env"; // 这个根本没有用到呀
import router from '../../router';


const time = new Date().getTime()

/**
 * 获取用户token
 * @returns {*}
 */
// const appToken = () => {return localStorage.getItem('token') || ''}; // 这个根本没有用到鸭。。


// 兼容startsWith 方法
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix;
  };
}


/**
 * 检查接口模块导出的变量是否符合规范，防止接口名称重复
 * @param moduleName 模块名称
 * @param obj  要检验的导出对象
 * @returns {*}
 */
const apiVerify = (moduleName, obj) => {
  moduleName = moduleName.toLowerCase()
  for(let item of Object.keys(obj)){
    let tempKey = item.toLowerCase()
    if (!tempKey.startsWith(moduleName)) {
      throw 'API模块:' + moduleName + '，接口变量:' + tempKey + '不符合规范,正确命名应为:' + moduleName + tempKey
      return
    }
  }
  return obj
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.withCredentials = true; // 解决 前后端分离 跨域 sessionid每次都变化
// 请求的拦截器
axios.interceptors.request.use(function (config) {

  // 判断请求的类型
  // 如果是post请求就把默认参数拼到data里面
  // 如果是get请求就拼到params里面
  // if(appToken()) {
  //
  //     config.headers.common['token']=appToken();
  // }
  //config.headers.app_token2 = 324234;
  // console.log(config);
  if (config.method === 'post') {
    let data = qs.parse(config.data);

    //如果为FormData 类型
    if (config.data.toString() == '[object FormData]') { // 这里判断什么时候才能进来哦
      config.data.append('m', time); // 不知道这里加time干嘛  应该只有get请求才会被ie缓存   而且这个time还是写死的 不是动态的。。
      return config
    }
    config.data = qs.stringify({...data}) // 格式转换  其他对象格式转换成一般对象格式  并最后转换成字符串 不知道为啥这里要转换成字符串

  } else if (config.method === 'get') {
    config.params = {...config.params}
  }

  return config
}, function (error) {
  return Promise.reject(error)
})


/**
 *响应数据拦截
 */
axios.interceptors.response.use(function (response) {
  let message = '';

  switch (response.data.code) {

    case 400: //请求成功，但服务器返回逻辑错误
    case 1003:
    case 1004:
    case 5001:
    case 5002:
    case 5003:
    case 5004:
    case 5005:
    case 5006:
    case 1000006:
      message = response.data.msg;
      break;
  }
  if (message) {
    //token 验证失败
    if (response.data.code == 1000006 && !router.currentRoute.fullPath.includes('/login')) {
      // localStorage.removeItem('appToken'); // 这个也没有鸭 前面读的是token  这里却删除appToken 。。。
      // localStorage.removeItem('user_id'); // 这里本来就没有user_id
      // setTimeout(() => {router.push('/login')}, 300);
      bus.errorMessage(message); //全局的错误提示
      router.push('/login')
      return Promise.reject(message);
    }else if(!router.currentRoute.fullPath.includes('/login')){
      bus.errorMessage(message); //全局的错误提示
    }
    return Promise.reject(message);
  }

  return response

}, function (err) {
  err.message = err && err.response ? ('对不起，服务器出现错误，状态码:' + err.response.status) : '连接服务器失败'
  bus.errorMessage(err.message); //全局的错误提示
  return Promise.reject(err);
});


export {
  axios,
  // time,
  // appToken,
  apiVerify,
}
