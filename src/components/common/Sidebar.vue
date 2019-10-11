<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="!item.children">
          <el-menu-item :index="item.menuUrl" :key="item.menuId">
            <i class="el-icon-printer" v-if=" item.menuName == '素材管理'"></i>
            <i class="el-icon-menu" v-if="item.menuName == '权限管理'"></i>
            <i class="el-icon-service" v-if="item.menuName == '用户反馈'"></i>
            <i class="el-icon-lx-favor" v-if="item.menuName == '用户周期管理'"></i>
            <i class="iconfont el-icon-pingbi icon-pingbi" v-if="item.menuName == '屏蔽商业化'"></i>
            <i class="iconfont el-icon-send icon-send" v-if="item.menuName == '消息群发'"></i>
            <i class="iconfont el-icon-shenhe  icon-shenhe" v-if="item.menuName == '消息群发审核'"></i>
            <i class="el-icon-edit-outline " v-if="item.menuName == '链接资源管理'"></i>
            <i class="el-icon-tickets  " v-if="item.menuName == '官网素材'"></i>
            <i class="el-icon-news  " v-if="item.menuName == '调落管理'"></i>
            <i class="iconfont el-icon-huodong icon-huodong" v-if="item.menuName == '运营活动管理'"></i>
            <span slot="title">{{ item.menuName }}</span>
          </el-menu-item>
        </template>

        <template v-else>
          <el-submenu :index="item.menuUrl" :key="item.menuId">
            <template slot="title">
              <i class="el-icon-printer" v-if=" item.menuName == '素材管理'"></i>
              <i class="el-icon-menu" v-if="item.menuName == '权限管理'"></i>
              <i class="el-icon-service" v-if="item.menuName == '用户反馈'"></i>
              <i class="el-icon-lx-favor" v-if="item.menuName == '用户周期管理'"></i>
              <i class="iconfont el-icon-pingbi icon-pingbi" v-if="item.menuName == '屏蔽商业化'"></i>
              <i class="iconfont el-icon-send icon-send" v-if="item.menuName == '消息群发'"></i>
              <i class="iconfont el-icon-shenhe  icon-shenhe" v-if="item.menuName == '消息群发审核'"></i>
              <i class="el-icon-edit-outline " v-if="item.menuName == '链接资源管理'"></i>
              <i class="el-icon-tickets  " v-if="item.menuName == '官网素材'"></i>
              <i class="el-icon-news  " v-if="item.menuName == '调落管理'"></i>
              <i class="iconfont el-icon-huodong  icon-huodong" v-if="item.menuName == '运营活动管理'"></i>

              <span slot="title">{{ item.menuName }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-menu-item :index="subItem.menuUrl" :key="subItem.menuId">
                {{ subItem.menuName }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>

      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '../common/bus';

  export default {
    data() {
      return {
        collapse: false
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      },
      items() {
        return this.$store.state.showMenuList;
      }
    },
    created() {
      this.$store.dispatch('changeShowMenuList');
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }

  .el-submenu__title i {
    color: #909399;
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }
</style>
