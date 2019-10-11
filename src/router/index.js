import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/Startfigure'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: {
        title: '素材管理'
      },
      children: [
        {
          path: '/Material',
          component: resolve => require(['../components/page/Material/Material.vue'], resolve),
          meta: {
            title: '素材管理',
            permission: true
          }
        },
        {
          path: '/Startfigure',
          component: resolve => require(['../components/page/Material/Startfigure.vue'], resolve),
          meta: {
            title: '启动图管理',
            permission: true
          }
        },
        {
          path: '/HomeDialog',
          component: resolve => require(['../components/page/Material/HomeDialog.vue'], resolve),
          meta: {
            title: '首页弹窗',
            permission: true
          }
        },
        {
          path: '/HomeSuspension',
          component: resolve => require(['../components/page/Material/HomeSuspension.vue'], resolve),
          meta: {
            title: '首页悬浮窗',
            permission: true
          }
        },
        {
          path: '/BannerManager',
          component: resolve => require(['../components/page/Material/BannerManager.vue'], resolve),
          meta: {
            title: 'Banner管理',
            permission: true
          }
        },
        {
          path: '/IconManager',
          component: resolve => require(['../components/page/Material/IconManager.vue'], resolve),
          meta: {
            title: 'Icon管理',
            permission: true
          }
        },
        {
          path: '/OperationalEvents',
          component: resolve => require(['../components/page/Periodism/OperationalEvents.vue'], resolve),
          meta: {
            title: '运营性',
            permission: true
          }
        },
        {
          path: '/SystemEvents',
          component: resolve => require(['../components/page/Periodism/SystemEvents.vue'], resolve),
          meta: {
            title: '系统性',
            permission: true
          }
        },
        {
          path: '/MessageConfig',
          component: resolve => require(['../components/page/Periodism/MessageConfig.vue'], resolve),
          meta: {
            title: '消息配置',
            permission: true
          }
        },
        {
          path: '/BlockChannels',
          component: resolve => require(['../components/page/BlockChannels/BlockChannels.vue'], resolve),
          meta: {
            title: '渠道号屏蔽',
            permission: true
          }
        },
        {
          path: '/BlockUsers',
          component: resolve => require(['../components/page/BlockChannels/BlockUsers.vue'], resolve),
          meta: {
            title: '手机号屏蔽',
            permission: true
          }
        },
        {
          path: '/BlockMerchants',
          component: resolve => require(['../components/page/BlockChannels/BlockMerchants.vue'], resolve),
          meta: {
            title: '商户黑名单',
            permission: true
          }
        },
        {
          path: '/UserFeedback',
          component: resolve => require(['../components/page/UserFeedback/UserFeedback.vue'], resolve),
          meta: {
            title: '用户反馈',
            permission: true
          }
        },
        {
          //权限管理页面
          path: '/SetPermission',
          component: resolve => require(['../components/page/RoleManager/SetPermission.vue'], resolve),
          meta: {
            title: '权限管理',
            permission: true
          }
        },
        {
          //push群发管理页面
          path: '/PushGroupsent',
          component: resolve => require(['../components/page/GroupsentMsg/PushGroupsent.vue'], resolve),
          meta: {
            title: 'Push群发',
            permission: true
          }
        },
        {
          //短信群发管理页面
          path: '/SmgGroupsent',
          component: resolve => require(['../components/page/GroupsentMsg/SmgGroupsent.vue'], resolve),
          meta: {
            title: '短信群发',
            permission: true
          }
        },
        {
          //站内信群发管理页面
          path: '/StandGroupsent',
          component: resolve => require(['../components/page/GroupsentMsg/StandGroupsent.vue'], resolve),
          meta: {
            title: '站内信群发',
            permission: true
          }
        },
        {
          //自动电话群发管理页面
          path: '/TelGroupsent',
          component: resolve => require(['../components/page/GroupsentMsg/TelGroupsent.vue'], resolve),
          meta: {
            title: '自动电话群发',
            permission: true
          }
        },
        {
          //push群发审核页面
          path: '/PushAudit',
          component: resolve => require(['../components/page/MassAudit/PushAudit.vue'], resolve),
          meta: {
            title: 'Push群发审核',
            permission: true
          }
        },
        {
          //短信群发审核页面
          path: '/SmgAudit',
          component: resolve => require(['../components/page/MassAudit/SmgAudit.vue'], resolve),
          meta: {
            title: '短信群发审核',
            permission: true
          }
        },
        {
          //站内信群发审核页面
          path: '/StandAudit',
          component: resolve => require(['../components/page/MassAudit/StandAudit.vue'], resolve),
          meta: {
            title: '站内信群发审核',
            permission: true
          }
        },
        {
          //自动电话群发审核页面
          path: '/TelAudit',
          component: resolve => require(['../components/page/MassAudit/TelAudit.vue'], resolve),
          meta: {
            title: '自动电话群发审核',
            permission: true
          }
        },
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: {
            title: '系统首页'
          }
        },
        {
          // 贷款超市管理
          path: '/LoanSupermarketManage',
          component: resolve => require(['../components/page/BlockChannels/LoanSupermarketManage.vue'], resolve),
          meta: {
            title: '贷款超市管理'
          }
        },
        {
          // 合同协议
          path: '/Contract',
          component: resolve => require(['../components/page/LinkResourceManagement/Contract.vue'], resolve),
          meta: {
            title: '合同协议'
          }
        },
        {
          // 活动管理
          path: '/ActivityList',
          component: resolve => require(['../components/page/OperatingActivities/ActivityList.vue'], resolve),
          meta: {
            title: '活动管理'
          }
        },
        {
          // 红包管理
          path: '/RedEnvelopeList',
          component: resolve => require(['../components/page/OperatingActivities/RedEnvelopeList.vue'], resolve),
          name:'RedEnvelopeList',
          meta: {
            title: '红包管理'
          }
        },
        {
          path: '/icon',
          component: resolve => require(['../components/page/Icon.vue'], resolve),
          meta: {
            title: '自定义图标'
          }
        },
        {
          path: '/table',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve),
          meta: {
            title: '基础表格'
          }
        },
        {
          path: '/tabs',
          component: resolve => require(['../components/page/Tabs.vue'], resolve),
          meta: {
            title: 'tab选项卡'
          }
        },
        {
          path: '/form',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve),
          meta: {
            title: '基本表单'
          }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
          meta: {
            title: 'schart图表'
          }
        },
        {
          // 拖拽列表组件
          path: '/drag',
          component: resolve => require(['../components/page/DragList.vue'], resolve),
          meta: {
            title: '拖拽列表'
          }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['../components/page/Permission.vue'], resolve),
          meta: {
            title: '权限测试',
            permission: true
          }
        },
        {
          // 官网素材 - 媒体报道
          path: '/MediaReport',
          component: resolve => require(['../components/page/OfficialWebMaterial/MediaReport.vue'], resolve),
          meta: {
            title: '媒体报道',
          }
        },
        {
          // 官网素材 - 媒体报道
          path: '/AnnouncementManagement',
          component: resolve => require(['../components/page/OfficialWebMaterial/AnnouncementManagement.vue'], resolve),
          meta: {
            title: '公告管理',
          }
        },
        {
          // 官网素材 - 友情链接
          path: '/FriendshipLink',
          component: resolve => require(['../components/page/OfficialWebMaterial/FriendshipLink.vue'], resolve),
          meta: {
            title: '友情链接',
          }
        },
        {
          // 调落管理 - 日常调落配置
          path: '/DailyDownConfig',
          component: resolve => require(['../components/page/DownConfig/DailyDownConfig.vue'], resolve),
          meta: {
            title: '日常调落配置',
          }
        },
        {
          // 调落管理 - 存量调落配置
          path: '/SpecialDownConfig',
          component: resolve => require(['../components/page/DownConfig/SpecialDownConfig.vue'], resolve),
          meta: {
            title: '存量调落配置',
          }
        },
        {
          // 素材管理 - 底部标签栏管理
          path: '/NavbarConfig',
          component: resolve => require(['../components/page/Material/NavbarConfig.vue'], resolve),
          meta: {
            title: '底部标签栏管理',
          }
        },
        {
          // 素材管理 - 页面管理
          path: '/PageManagement',
          component: resolve => require(['../components/page/Material/PageManagement.vue'], resolve),
          meta: {
            title: '页面管理',
          }
        },
        {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: {
            title: '404'
          }
        },
        {
          path: '/403',
          component: resolve => require(['../components/page/403.vue'], resolve),
          meta: {
            title: '403'
          }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/scan',
      component: resolve => require(['../components/page/Scan.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    },
  ]
})
