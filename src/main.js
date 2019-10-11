import Vue from 'vue';
import App from './App';
import router from './router';

import ElementUI from 'element-ui';
import Vuex from 'vuex';
import store from './vuex/store';
import plugin from "./assets/common/plugins";

Vue.use(plugin) // 在Vue实例上扩展一些全局的方法或者属性
Vue.use(Vuex);
import api from './assets/api/index';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/font/iconfont.css';
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill"; // 这个好像是兼容ie11浏览器的 但是这个应该只需要在webpack里面配置就可以了

Vue.use(Vuex);
Vue.use(ElementUI, {size: 'small'});

const checkMenu = function (menu, to) {
  for(let val of menu){
    if (to.meta.title == val.menuName) {
      return true;
    }
  }
  return false;
}
if(window.location.href.includes('/scan')){ // 如果是扫码的时候  就不展示title
  document.getElementsByTagName("title")[0].innerText = ''
  document.querySelectorAll('link[rel="Shortcut Icon"]')[0].href = 'static/img/1favicon.png' // 去掉favicon图标  设置一个没有的图
}else{
  document.getElementsByTagName("title")[0].innerText = '运营管理系统'

}
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username'); // 是否登录
  if (to.path.includes('/scan')) { // 如果是二维码的页面  就不需要登录
    next()
  } else if (!role && to.path !== '/login') {
    next('/login');
  } else if (role && to.path !== '/login' && to.meta.permission) {
    //权限判断
    let menu = [];
    api.userGetMenuList({}).then((res) => {
      if (res.data.code == 200) {
        menu = res.data.data;
        if (menu) {
          let flag = checkMenu(menu, to); //判断权限菜单是否包含
          if (flag) {
            next();
          } else {
            next('/403');
          }

        } else {
          next('/403');
        }

      }
    });


  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
