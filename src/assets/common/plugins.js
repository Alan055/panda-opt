/*
* 这里是在Vue实例上扩展一些方法和属性
 */
import axios from 'axios';
import api from '../api/index';

function DownFile(blob, fileName) {
  // 非IE下载
  if ('download' in document.createElement('a')) {
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob); // 创建下载的链接
    link.download = fileName; // 下载后文件名
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click(); // 点击下载
    window.URL.revokeObjectURL(link.href); // 释放掉blob对象
    document.body.removeChild(link); // 下载完成移除元素
  } else {
    // IE10+下载
    window.navigator.msSaveBlob();
  }
}

export default{
  install(Vue) {
    // 扩展 axios方法
    Vue.prototype.$axios = axios;
    // 扩展接口api
    Vue.prototype.Api = api; // 个人不是很建议写成这样  这个api的数据会超大

    Vue.prototype.DownFile = (blob, fileName) =>{

    }
    /* 下载方法 */
    Vue.prototype.Down = (obj,url) => {
      console.log(obj)
      obj.keyword && (obj.keyword=encodeURIComponent(obj.keyword))
      let str = '?'
      Object.keys(obj).map(key=>(str += `${key}=${obj[key]}&`))
      console.log(url+str.substr(0,str.length-1))
      window.open(url+str.substr(0,str.length-1))

      // let headers = resp.headers;
      // let contentType = headers['content-type'];
      // if (!resp.data) {
      //   console.error('响应异常：', resp);
      //   return false;
      // } else {
      //   const blob = new Blob([resp.data], {type: contentType});
      //   const contentDisposition = resp.headers['content-disposition'];
      //   let fileName = 'unknown';
      //   if (contentDisposition) {
      //     fileName = (resp.headers['content-disposition'].split('=')[1]);
      //   }
      //   DownFile(blob, fileName);
      // }
    }

  }
}
