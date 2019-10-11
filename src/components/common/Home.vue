<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <breadcrumb :data="breadcrumbData" v-if="breadcrumbData.length"></breadcrumb>
        <transition name="move" mode="out-in">

          <keep-alive :include="tagsList">

            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue';
  import vSidebar from './Sidebar.vue';
  import vTags from './Tags.vue';
  import bus from './bus';
  import breadcrumb from "./breadcrumb";


  export default {
    data() {
      return {
        tagsList: [],
        collapse: false,
        subTab: [
          {
            index: 'startFigure',
            title: '启动图管理'
          },
          {
            index: 'markdown',
            title: '首页弹窗'
          },
          {
            index: 'upload',
            title: '首页悬浮窗'
          },
          {
            index: 'charts',
            title: 'banner图管理'
          },
          {
            index: 'table',
            title: 'icon管理'
          }
        ]
      }
    },
    computed:{
      // 面包屑 自动根据菜单选中的数据
      breadcrumbData(){
        for(let val of this.$store.state.showMenuList){ // 遍历菜单数据
          if('/'+val.menuUrl == this.$route.path){
            return [val.menuName]
          }else if(val.children){
            for(let v of val.children){
              if('/'+v.menuUrl == this.$route.path){
                return [val.menuName,v.menuName]
              }
            }
          }
        }
        return []
      }
    },
    components: {
      vHead, vSidebar, vTags, breadcrumb
    },
    created() {
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on('tags', msg => {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;

      })
    }
  }
</script>
