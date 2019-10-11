import Vue from 'vue'
import Vuex from 'vuex'
import api from '../assets/api/index';
import bus from '../assets/base/bus.js';
import {
  apiUrl
} from "../assets/base/env";

Vue.use(Vuex);


const store = new Vuex.Store({
  // 定义状态
  state: {
    product: {
      productId: '',
      productName: ''
    }, //当前选择的产品ID
    menuList: [],
    showMenuList: [], //账户权限菜单
    roleList: [], //角色列表
    roleTableList: [], //角色表格
    userGroupList: [], //用户组列表
    userGroupTableList: [], //用户组表格用
    userList: [], //用户列表
    startFigureList: [], //启动图列表
    userStatusList: [], //用户状态列表
    dialogMaterialList: [], //首页弹窗素材列表
    dialogMaterialListAll: [], //所有首页弹窗素材
    bannerMaterialList: [], //banner素材列表
    bannerMaterialListAll: [], //banner所有弹窗素材
    iconMaterialList: [], //icon素材列表
    iconMaterialListAll: [], //所有icon弹窗素材
    optionsOpen: [{
      value: 1,
      label: '内部打开H5链接'
    },
      {
        value: 2,
        label: '外部打开H5链接'
      },
      {
        value: 3,
        label: '仅展示不跳转'
      }
    ],
    //启动图平台分类
    startOptionDeviceType: [{
      value: 1,
      label: 'Android'
    },
      {
        value: 2,
        label: 'IOS'
      }
    ],
    //平台分类
    optionDeviceType: [{
      value: 0,
      label: '全部'
    },
      {
        value: 1,
        label: 'Android'
      },
      {
        value: 2,
        label: 'IOS'
      }
    ], //设备分类
    optionDefault: [{
      value: 1,
      label: '是'
    },
      {
        value: 0,
        label: '否'
      },

    ], //是否默认
    optionFrequency: [{
      value: 1,
      label: '每次启动提示'
    },
      {
        value: 2,
        label: '一天提示一次'
      },
      {
        value: 3,
        label: '只提示一次'
      }
    ], //弹窗频率
    optionLinkList: [{
      value: 1,
      label: 'part1'
    },
      {
        value: 2,
        label: 'part2'
      },
      {
        value: 3,
        label: 'part3'
      },
      {
        value: 4,
        label: 'part4'
      },
      {
        value: 5,
        label: 'part5'
      }

    ], //环节选项
    optionMessageType: [{
      value: 1,
      label: '运营性'
    },
      {
        value: 2,
        label: '用户包（移动）'
      },
      {
        value: 3,
        label: '用户包（联通）'
      },
      {
        value: 4,
        label: '手机号码包'
      }
    ], //短信类型
    optionSupplier: [{
      value: 1,
      label: '云融正通'
    },
      {
        value: 2,
        label: '阿里大鱼'
      },
      {
        value: 3,
        label: '大橙'
      }
    ], //短信供应商
    optionVoiceList: [{
      value: 1,
      label: '001'
    },
      {
        value: 2,
        label: '002'
      },
      {
        value: 3,
        label: '003'
      }
    ], //语音ID
    optionJumpType: [{
      value: 0,
      label: '无'
    },
      {
        value: 1,
        label: '外链'
      },
      {
        value: 2,
        label: '内链'
      }
    ], //push跳转方式
    optionShielding: [{
      value: '1',
      label: '贷超'
    },
      {
        value: '2',
        label: '贷超信用卡'
      }
    ], //屏蔽模块
    optionChannelId: [], //渠道号

    optionAuditStatus: [{
      label: '待审核',
      value: '0'
    },
      {
        label: '审核拒绝',
        value: '1'
      },
      {
        label: '审核通过',
        value: '2'
      },
      {
        label: '准备生成记录',
        value: '3'
      },
      {
        label: '待发送',
        value: '4'
      },
      {
        label: '已发送',
        value: '5'
      },
      {
        label: '发送失败',
        value: '6'
      },
      {
        value: '已过期',
        label: '7'
      }
    ], //消息审核状态
    actionUrl: apiUrl + '/opt/file/upload', //上传文件地址
    saveUrl: apiUrl + '/opt/file/uploadUserPag', //上传用户包地址
  },
  mutations: {
    changeMenuList(state, menuList) {
      state.menuList = menuList;
    },
    changeShowMenuList(state, showMenuList) {
      state.showMenuList = showMenuList;
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList;
    },
    changeRoleTableList(state, roleTableList) {
      state.roleTableList = roleTableList;
    },
    changeUserGroupList(state, userGroupList) {
      state.userGroupList = userGroupList;
    },
    changeUserGroupTableList(state, userGroupTableList) {
      state.userGroupTableList = userGroupTableList;
    },
    changeUserList(state, userList) {
      state.userList = userList;
    },
    changeStartFigureList(state, startFigureList) {
      state.startFigureList = startFigureList;
    },
    changeUserStatusList(state, userStatusList) {
      state.userStatusList = userStatusList;
    },
    changeDialogMaterialList(state, dialogMaterialList) {
      state.dialogMaterialList = dialogMaterialList;
    },
    changeDialogMaterialListAll(state, dialogMaterialListAll) {
      state.dialogMaterialListAll = dialogMaterialListAll;
    },
    changeBannerMaterialList(state, bannerMaterialList) {
      state.bannerMaterialList = bannerMaterialList;
    },
    changeBannerMaterialListAll(state, bannerMaterialListAll) {
      state.bannerMaterialListAll = bannerMaterialListAll;
    },
    changeIconMaterialList(state, iconMaterialList) {
      state.iconMaterialList = iconMaterialList;
    },
    changeIconMaterialListAll(state, iconMaterialListAll) {
      state.iconMaterialListAll = iconMaterialListAll;
    },
    changeChannelId(state, optionChannelId) {
      state.optionChannelId = optionChannelId;
    },
    changeProductId(state, product) {
      state.product.productId = product.productId;
      state.product.productName = product.productName;
    }


  },
  actions: {
    changeShowMenuList(ctx) {
      let menu = [];
      api.userGetMenuList({}).then((res) => {
        if (res.data && res.data.code == 200) {
          let menuAllList = res.data.data;

          // localStorage.setItem('menu', menuAllList); 这个根本没用啊  menuAllList这个是对象 取出来是字符串根本无法使用！！！
          for (let i = 0; i < menuAllList.length; i++) {
            if (menuAllList[i].pid == '-1') {
              menu.push(menuAllList[i]);
            } else {
              for (let j = 0; j < menu.length; j++) {
                if (menu[j].menuId == menuAllList[i].pid) {
                  if (menu[j].children) {
                    menu[j].children.push(menuAllList[i]);
                  } else {
                    menu[j].children = new Array;
                    menu[j].children.push(menuAllList[i]);
                  }

                }
              }
            }
          }

        }
      })
      console.log(menu);
      ctx.commit('changeShowMenuList', menu);
    },
    changeMenuList(ctx) {
      let menu = [];
      api.perGetMenuList({
        roleId: ''
      }).then((res) => {
        if (res.data.code == 200) {
          let menuAllList = res.data.data;
          for (let i = 0; i < menuAllList.length; i++) {
            if (menuAllList[i].pid == '-1') {
              menu.push(menuAllList[i]);
            } else {
              for (let j = 0; j < menu.length; j++) {
                if (menu[j].menuId == menuAllList[i].pid) {
                  if (menu[j].children) {
                    menu[j].children.push(menuAllList[i]);
                  } else {
                    menu[j].children = new Array;
                    menu[j].children.push(menuAllList[i]);
                  }

                }
              }
            }
          }

        }
      });

      ctx.commit('changeMenuList', menu);
      console.log(menu);
    },
    changeRoleList: function (ctx) {
      api.perRoleList({
        pageSize: 1000,
        pageNum: 1
      }).then((res) => {
        if (res.data.code == 200) {
          // ctx.commit('changeRoleTableList',res.data.data);
          ctx.commit('changeRoleList', res.data.data.list);
        } else {
          bus.errorMessage(res.data.msg);
        }

      })

    },
    changeRoleTableList: function (ctx, params) {
      console.log(params);
      api.perRoleList({
        pageSize: params.pageSize,
        pageNum: params.pageNum
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeRoleTableList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }

      })

    },
    changeUserGroupList: function (ctx) {
      api.perUserGroupList({
        pageSize: 1000,
        pageNum: 1
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeUserGroupList', res.data.data.list);
        } else {
          bus.errorMessage(res.data.msg);
        }

      })
    },
    changeUserGroupTableList: function (ctx, params) {
      console.log(params);
      api.perUserGroupList({
        pageSize: params.pageSize,
        pageNum: params.pageNum
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeUserGroupTableList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }

      })
    },
    changeUserList: function (ctx, params) {
      api.perUserList({
        pageNum: params.pageNum,
        pageSize: params.pageSize
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeUserList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      })
    },
    changeStartFigureList: function (ctx, positionId) {
      api.maAdverList({
        positionId: positionId
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeStartFigureList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      })
    },
    changeGetUserStatusList: function (ctx) {
      api.maGetUserStatusList({}).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeUserStatusList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      })
    },
    changeDialogMaterialList: function (ctx, params) {
      api.maGetMaterialList({
        materialType: 3,
        pageSize: params.pageSize,
        pageNum: params.pageNum
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeDialogMaterialList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      });
      api.maGetMaterialList({
        materialType: 3,
        pageSize: 10000,
        pageNum: 1
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeDialogMaterialListAll', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      })
    },
    changeBannerMaterialList: function (ctx, params) {
      api.maGetMaterialList({
        materialType: 1,
        pageSize: params.pageSize,
        pageNum: params.pageNum
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeBannerMaterialList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      });
      api.maGetMaterialList({
        materialType: 1,
        pageSize: 10000,
        pageNum: 1
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeBannerMaterialListAll', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      })
    },
    changeIconMaterialList: function (ctx, params) {
      api.maGetMaterialList({
        materialType: 2,
        pageSize: params.pageSize,
        pageNum: params.pageNum
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeIconMaterialList', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      });
      api.maGetMaterialList({
        materialType: 2,
        pageSize: 10000,
        pageNum: 1
      }).then((res) => {
        if (res.data.code == 200) {
          ctx.commit('changeIconMaterialListAll', res.data.data);
        } else {
          bus.errorMessage(res.data.msg);
        }
      })
    },
    //获取所有渠道号
    changeChannelId: function (ctx, params) {

    }
  }
});

export default store
