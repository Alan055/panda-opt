webpackJsonp([48],{"/wAz":function(t,e){},Gs9r:function(t,e,n){"use strict";n.d(e,"a",function(){return b});var a=n("//Fk"),o=n.n(a),r=n("Dd8w"),i=n.n(r),s=n("fZjL"),u=n.n(s),l=n("BO1k"),c=n.n(l),p=n("mtWM"),d=n.n(p),m=n("mw3O"),h=n.n(m),f=n("HObJ"),g=n("YaEn");n.d(e,"b",function(){return d.a});var v=(new Date).getTime();"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(t){return this.slice(0,t.length)===t});var b=function(t,e){t=t.toLowerCase();var n=!0,a=!1,o=void 0;try{for(var r,i=c()(u()(e));!(n=(r=i.next()).done);n=!0){var s=r.value.toLowerCase();if(!s.startsWith(t))throw"API模块:"+t+"，接口变量:"+s+"不符合规范,正确命名应为:"+t+s}}catch(t){a=!0,o=t}finally{try{!n&&i.return&&i.return()}finally{if(a)throw o}}return e};d.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8",d.a.defaults.withCredentials=!0,d.a.interceptors.request.use(function(t){if("post"===t.method){var e=h.a.parse(t.data);if("[object FormData]"==t.data.toString())return t.data.append("m",v),t;t.data=h.a.stringify(i()({},e))}else"get"===t.method&&(t.params=i()({},t.params));return t},function(t){return o.a.reject(t)}),d.a.interceptors.response.use(function(t){var e="";switch(t.data.code){case 400:case 1003:case 1004:case 5001:case 5002:case 5003:case 5004:case 5005:case 5006:case 1000006:e=t.data.msg}return e?1000006!=t.data.code||g.a.currentRoute.fullPath.includes("/login")?(g.a.currentRoute.fullPath.includes("/login")||f.a.errorMessage(e),o.a.reject(e)):(f.a.errorMessage(e),g.a.push("/login"),o.a.reject(e)):t},function(t){return t.message=t&&t.response?"对不起，服务器出现错误，状态码:"+t.response.status:"连接服务器失败",f.a.errorMessage(t.message),o.a.reject(t)})},HObJ:function(t,e,n){"use strict";var a=new(n("7+uW").default)({methods:{warningMessage:function(t){this.$message.warning({showClose:!0,message:t})},successMessage:function(t){this.$message.success({showClose:!0,message:t})},errorMessage:function(t){this.$message.error({showClose:!0,message:t})},loading:function(t){var e=this.$loading({lock:!0,text:"正在获取数据...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});return e},notify:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";this.$notify({title:"",message:t,type:e})}}});e.a=a},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("BO1k"),o=n.n(a),r=n("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")(null,i,!1,function(t){n("WYMg")},null,null).exports,u=n("YaEn"),l=n("zL8q"),c=n.n(l),p=n("NYxO"),d=n("vjgg"),m=n("HObJ"),h=n("fMLZ");r.default.use(p.a);var f=new p.a.Store({state:{product:{productId:"",productName:""},menuList:[],showMenuList:[],roleList:[],roleTableList:[],userGroupList:[],userGroupTableList:[],userList:[],startFigureList:[],userStatusList:[],dialogMaterialList:[],dialogMaterialListAll:[],bannerMaterialList:[],bannerMaterialListAll:[],iconMaterialList:[],iconMaterialListAll:[],optionsOpen:[{value:1,label:"内部打开H5链接"},{value:2,label:"外部打开H5链接"},{value:3,label:"仅展示不跳转"}],startOptionDeviceType:[{value:1,label:"Android"},{value:2,label:"IOS"}],optionDeviceType:[{value:0,label:"全部"},{value:1,label:"Android"},{value:2,label:"IOS"}],optionDefault:[{value:1,label:"是"},{value:0,label:"否"}],optionFrequency:[{value:1,label:"每次启动提示"},{value:2,label:"一天提示一次"},{value:3,label:"只提示一次"}],optionLinkList:[{value:1,label:"part1"},{value:2,label:"part2"},{value:3,label:"part3"},{value:4,label:"part4"},{value:5,label:"part5"}],optionMessageType:[{value:1,label:"运营性"},{value:2,label:"用户包（移动）"},{value:3,label:"用户包（联通）"},{value:4,label:"手机号码包"}],optionSupplier:[{value:1,label:"云融正通"},{value:2,label:"阿里大鱼"},{value:3,label:"大橙"}],optionVoiceList:[{value:1,label:"001"},{value:2,label:"002"},{value:3,label:"003"}],optionJumpType:[{value:0,label:"无"},{value:1,label:"外链"},{value:2,label:"内链"}],optionShielding:[{value:"1",label:"贷超"},{value:"2",label:"贷超信用卡"}],optionChannelId:[],optionAuditStatus:[{label:"待审核",value:"0"},{label:"审核拒绝",value:"1"},{label:"审核通过",value:"2"},{label:"准备生成记录",value:"3"},{label:"待发送",value:"4"},{label:"已发送",value:"5"},{label:"发送失败",value:"6"},{value:"已过期",label:"7"}],actionUrl:h.a+"/opt/file/upload",saveUrl:h.a+"/opt/file/uploadUserPag"},mutations:{changeMenuList:function(t,e){t.menuList=e},changeShowMenuList:function(t,e){t.showMenuList=e},changeRoleList:function(t,e){t.roleList=e},changeRoleTableList:function(t,e){t.roleTableList=e},changeUserGroupList:function(t,e){t.userGroupList=e},changeUserGroupTableList:function(t,e){t.userGroupTableList=e},changeUserList:function(t,e){t.userList=e},changeStartFigureList:function(t,e){t.startFigureList=e},changeUserStatusList:function(t,e){t.userStatusList=e},changeDialogMaterialList:function(t,e){t.dialogMaterialList=e},changeDialogMaterialListAll:function(t,e){t.dialogMaterialListAll=e},changeBannerMaterialList:function(t,e){t.bannerMaterialList=e},changeBannerMaterialListAll:function(t,e){t.bannerMaterialListAll=e},changeIconMaterialList:function(t,e){t.iconMaterialList=e},changeIconMaterialListAll:function(t,e){t.iconMaterialListAll=e},changeChannelId:function(t,e){t.optionChannelId=e},changeProductId:function(t,e){t.product.productId=e.productId,t.product.productName=e.productName}},actions:{changeShowMenuList:function(t){var e=[];d.a.userGetMenuList({}).then(function(t){if(t.data&&200==t.data.code)for(var n=t.data.data,a=0;a<n.length;a++)if("-1"==n[a].pid)e.push(n[a]);else for(var o=0;o<e.length;o++)e[o].menuId==n[a].pid&&(e[o].children?e[o].children.push(n[a]):(e[o].children=new Array,e[o].children.push(n[a])))}),console.log(e),t.commit("changeShowMenuList",e)},changeMenuList:function(t){var e=[];d.a.perGetMenuList({roleId:""}).then(function(t){if(200==t.data.code)for(var n=t.data.data,a=0;a<n.length;a++)if("-1"==n[a].pid)e.push(n[a]);else for(var o=0;o<e.length;o++)e[o].menuId==n[a].pid&&(e[o].children?e[o].children.push(n[a]):(e[o].children=new Array,e[o].children.push(n[a])))}),t.commit("changeMenuList",e),console.log(e)},changeRoleList:function(t){d.a.perRoleList({pageSize:1e3,pageNum:1}).then(function(e){200==e.data.code?t.commit("changeRoleList",e.data.data.list):m.a.errorMessage(e.data.msg)})},changeRoleTableList:function(t,e){console.log(e),d.a.perRoleList({pageSize:e.pageSize,pageNum:e.pageNum}).then(function(e){200==e.data.code?t.commit("changeRoleTableList",e.data.data):m.a.errorMessage(e.data.msg)})},changeUserGroupList:function(t){d.a.perUserGroupList({pageSize:1e3,pageNum:1}).then(function(e){200==e.data.code?t.commit("changeUserGroupList",e.data.data.list):m.a.errorMessage(e.data.msg)})},changeUserGroupTableList:function(t,e){console.log(e),d.a.perUserGroupList({pageSize:e.pageSize,pageNum:e.pageNum}).then(function(e){200==e.data.code?t.commit("changeUserGroupTableList",e.data.data):m.a.errorMessage(e.data.msg)})},changeUserList:function(t,e){d.a.perUserList({pageNum:e.pageNum,pageSize:e.pageSize}).then(function(e){200==e.data.code?t.commit("changeUserList",e.data.data):m.a.errorMessage(e.data.msg)})},changeStartFigureList:function(t,e){d.a.maAdverList({positionId:e}).then(function(e){200==e.data.code?t.commit("changeStartFigureList",e.data.data):m.a.errorMessage(e.data.msg)})},changeGetUserStatusList:function(t){d.a.maGetUserStatusList({}).then(function(e){200==e.data.code?t.commit("changeUserStatusList",e.data.data):m.a.errorMessage(e.data.msg)})},changeDialogMaterialList:function(t,e){d.a.maGetMaterialList({materialType:3,pageSize:e.pageSize,pageNum:e.pageNum}).then(function(e){200==e.data.code?t.commit("changeDialogMaterialList",e.data.data):m.a.errorMessage(e.data.msg)}),d.a.maGetMaterialList({materialType:3,pageSize:1e4,pageNum:1}).then(function(e){200==e.data.code?t.commit("changeDialogMaterialListAll",e.data.data):m.a.errorMessage(e.data.msg)})},changeBannerMaterialList:function(t,e){d.a.maGetMaterialList({materialType:1,pageSize:e.pageSize,pageNum:e.pageNum}).then(function(e){200==e.data.code?t.commit("changeBannerMaterialList",e.data.data):m.a.errorMessage(e.data.msg)}),d.a.maGetMaterialList({materialType:1,pageSize:1e4,pageNum:1}).then(function(e){200==e.data.code?t.commit("changeBannerMaterialListAll",e.data.data):m.a.errorMessage(e.data.msg)})},changeIconMaterialList:function(t,e){d.a.maGetMaterialList({materialType:2,pageSize:e.pageSize,pageNum:e.pageNum}).then(function(e){200==e.data.code?t.commit("changeIconMaterialList",e.data.data):m.a.errorMessage(e.data.msg)}),d.a.maGetMaterialList({materialType:2,pageSize:1e4,pageNum:1}).then(function(e){200==e.data.code?t.commit("changeIconMaterialListAll",e.data.data):m.a.errorMessage(e.data.msg)})},changeChannelId:function(t,e){}}}),g=n("fZjL"),v=n.n(g),b=n("mtWM"),L=n.n(b);var y={install:function(t){t.prototype.$axios=L.a,t.prototype.Api=d.a,t.prototype.DownFile=function(t,e){},t.prototype.Down=function(t,e){console.log(t),t.keyword&&(t.keyword=encodeURIComponent(t.keyword));var n="?";v()(t).map(function(e){return n+=e+"="+t[e]+"&"}),console.log(e+n.substr(0,n.length-1)),window.open(e+n.substr(0,n.length-1))}}};n("tvR6"),n("/wAz"),n("ympj"),n("j1ja");r.default.use(y),r.default.use(p.a),r.default.use(p.a),r.default.use(c.a,{size:"small"});window.location.href.includes("/scan")?(document.getElementsByTagName("title")[0].innerText="",document.querySelectorAll('link[rel="Shortcut Icon"]')[0].href="static/img/1favicon.png"):document.getElementsByTagName("title")[0].innerText="运营管理系统",u.a.beforeEach(function(t,e,n){var a=localStorage.getItem("ms_username");if(t.path.includes("/scan"))n();else if(a||"/login"===t.path)if(a&&"/login"!==t.path&&t.meta.permission){var i=[];d.a.userGetMenuList({}).then(function(e){200==e.data.code&&((i=e.data.data)&&function(t,e){var n=!0,a=!1,r=void 0;try{for(var i,s=o()(t);!(n=(i=s.next()).done);n=!0){var u=i.value;if(e.meta.title==u.menuName)return!0}}catch(t){a=!0,r=t}finally{try{!n&&s.return&&s.return()}finally{if(a)throw r}}return!1}(i,t)?n():n("/403"))})}else navigator.userAgent.indexOf("MSIE")>-1&&"/editor"===t.path?r.default.prototype.$alert("vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看","浏览器不兼容通知",{confirmButtonText:"确定"}):n();else n("/login")}),new r.default({router:u.a,store:f,render:function(t){return t(s)}}).$mount("#app")},WYMg:function(t,e){},YaEn:function(t,e,n){"use strict";var a=n("7+uW"),o=n("/ocq");a.default.use(o.a),e.a=new o.a({mode:"hash",routes:[{path:"/",redirect:"/Startfigure"},{path:"/",component:function(t){return n.e(6).then(function(){var e=[n("MpTN")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"素材管理"},children:[{path:"/Material",component:function(t){return Promise.all([n.e(0),n.e(3)]).then(function(){var e=[n("zWKp")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"素材管理",permission:!0}},{path:"/Startfigure",component:function(t){return Promise.all([n.e(0),n.e(12)]).then(function(){var e=[n("5BH6")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"启动图管理",permission:!0}},{path:"/HomeDialog",component:function(t){return Promise.all([n.e(0),n.e(15)]).then(function(){var e=[n("4n48")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"首页弹窗",permission:!0}},{path:"/HomeSuspension",component:function(t){return Promise.all([n.e(0),n.e(18)]).then(function(){var e=[n("SY5z")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"首页悬浮窗",permission:!0}},{path:"/BannerManager",component:function(t){return Promise.all([n.e(0),n.e(17)]).then(function(){var e=[n("9ow3")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"Banner管理",permission:!0}},{path:"/IconManager",component:function(t){return Promise.all([n.e(0),n.e(24)]).then(function(){var e=[n("FxIA")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"Icon管理",permission:!0}},{path:"/OperationalEvents",component:function(t){return Promise.all([n.e(0),n.e(8)]).then(function(){var e=[n("7oS/")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"运营性",permission:!0}},{path:"/SystemEvents",component:function(t){return Promise.all([n.e(0),n.e(22)]).then(function(){var e=[n("4Qya")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"系统性",permission:!0}},{path:"/MessageConfig",component:function(t){return Promise.all([n.e(1),n.e(0)]).then(function(){var e=[n("0wbg")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"消息配置",permission:!0}},{path:"/BlockChannels",component:function(t){return Promise.all([n.e(0),n.e(35)]).then(function(){var e=[n("ec4i")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"渠道号屏蔽",permission:!0}},{path:"/BlockUsers",component:function(t){return Promise.all([n.e(0),n.e(26)]).then(function(){var e=[n("Ycec")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"手机号屏蔽",permission:!0}},{path:"/BlockMerchants",component:function(t){return n.e(43).then(function(){var e=[n("kb4S")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"商户黑名单",permission:!0}},{path:"/UserFeedback",component:function(t){return n.e(42).then(function(){var e=[n("a8O7")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"用户反馈",permission:!0}},{path:"/SetPermission",component:function(t){return Promise.all([n.e(0),n.e(4)]).then(function(){var e=[n("jrMx")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"权限管理",permission:!0}},{path:"/PushGroupsent",component:function(t){return Promise.all([n.e(0),n.e(14)]).then(function(){var e=[n("H62J")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"Push群发",permission:!0}},{path:"/SmgGroupsent",component:function(t){return Promise.all([n.e(0),n.e(23)]).then(function(){var e=[n("NhoH")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"短信群发",permission:!0}},{path:"/StandGroupsent",component:function(t){return Promise.all([n.e(0),n.e(16)]).then(function(){var e=[n("h2zI")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"站内信群发",permission:!0}},{path:"/TelGroupsent",component:function(t){return Promise.all([n.e(0),n.e(11)]).then(function(){var e=[n("eVfI")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"自动电话群发",permission:!0}},{path:"/PushAudit",component:function(t){return n.e(21).then(function(){var e=[n("EnY3")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"Push群发审核",permission:!0}},{path:"/SmgAudit",component:function(t){return n.e(20).then(function(){var e=[n("evXs")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"短信群发审核",permission:!0}},{path:"/StandAudit",component:function(t){return n.e(25).then(function(){var e=[n("yXb4")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"站内信群发审核",permission:!0}},{path:"/TelAudit",component:function(t){return n.e(13).then(function(){var e=[n("hP3r")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"自动电话群发审核",permission:!0}},{path:"/dashboard",component:function(t){return n.e(7).then(function(){var e=[n("a52u")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"系统首页"}},{path:"/LoanSupermarketManage",component:function(t){return Promise.all([n.e(0),n.e(5)]).then(function(){var e=[n("T7cf")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"贷款超市管理"}},{path:"/Contract",component:function(t){return Promise.all([n.e(0),n.e(38)]).then(function(){var e=[n("jbUB")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"合同协议"}},{path:"/ActivityList",component:function(t){return Promise.all([n.e(0),n.e(34)]).then(function(){var e=[n("EgOx")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"活动管理"}},{path:"/RedEnvelopeList",component:function(t){return Promise.all([n.e(2),n.e(0)]).then(function(){var e=[n("urlh")];t.apply(null,e)}.bind(this)).catch(n.oe)},name:"RedEnvelopeList",meta:{title:"红包管理"}},{path:"/icon",component:function(t){return n.e(28).then(function(){var e=[n("KLmO")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"自定义图标"}},{path:"/table",component:function(t){return n.e(45).then(function(){var e=[n("8C4o")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"基础表格"}},{path:"/tabs",component:function(t){return n.e(30).then(function(){var e=[n("kgBe")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"tab选项卡"}},{path:"/form",component:function(t){return n.e(46).then(function(){var e=[n("uuQS")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"基本表单"}},{path:"/charts",component:function(t){return n.e(10).then(function(){var e=[n("Z1dZ")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"schart图表"}},{path:"/drag",component:function(t){return n.e(9).then(function(){var e=[n("2KuU")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"拖拽列表"}},{path:"/permission",component:function(t){return n.e(44).then(function(){var e=[n("5jj7")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"权限测试",permission:!0}},{path:"/MediaReport",component:function(t){return Promise.all([n.e(0),n.e(33)]).then(function(){var e=[n("7oz/")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"媒体报道"}},{path:"/AnnouncementManagement",component:function(t){return Promise.all([n.e(0),n.e(36)]).then(function(){var e=[n("3S4z")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"公告管理"}},{path:"/FriendshipLink",component:function(t){return Promise.all([n.e(0),n.e(41)]).then(function(){var e=[n("JHo6")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"友情链接"}},{path:"/DailyDownConfig",component:function(t){return Promise.all([n.e(0),n.e(39)]).then(function(){var e=[n("Ikpc")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"日常调落配置"}},{path:"/SpecialDownConfig",component:function(t){return Promise.all([n.e(0),n.e(37)]).then(function(){var e=[n("jcXh")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"存量调落配置"}},{path:"/NavbarConfig",component:function(t){return Promise.all([n.e(0),n.e(31)]).then(function(){var e=[n("awrq")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"底部标签栏管理"}},{path:"/PageManagement",component:function(t){return Promise.all([n.e(0),n.e(40)]).then(function(){var e=[n("d0nI")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"页面管理"}},{path:"/404",component:function(t){return n.e(27).then(function(){var e=[n("3bH0")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"404"}},{path:"/403",component:function(t){return n.e(32).then(function(){var e=[n("KfZE")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{title:"403"}}]},{path:"/login",component:function(t){return n.e(19).then(function(){var e=[n("GF4k")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/scan",component:function(t){return Promise.all([n.e(0),n.e(29)]).then(function(){var e=[n("mmv+")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"*",redirect:"/404"}]})},fMLZ:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a=""},tvR6:function(t,e){},vjgg:function(t,e,n){"use strict";var a=n("woOf"),o=n.n(a),r=n("fMLZ"),i=n("Gs9r"),s=Object(i.a)("user",{userLogin:function(t){return i.b.post(r.a+"/opt/login/submitLogin",t)},userLoginOut:function(t){return i.b.post(r.a+"/opt/login/logout",t)},userGetMenuList:function(t){return i.b.post(r.a+"/opt/authority/getMenuListByUserId",t)},userGetProductList:function(t){return i.b.post(r.a+"/opt/login/getProductList",t)}}),u=Object(i.a)("per",{perUserList:function(t){return i.b.post(r.a+"/opt/authority/getUserList",t)},perUserGroupList:function(t){return i.b.post(r.a+"/opt/authority/getUserGroupList",t)},perAddUser:function(t){return i.b.post(r.a+"/opt/authority/saveUser",t)},perUserGroupRel:function(t){return i.b.post(r.a+"/opt/authority/saveUserGroupRel",t)},perModUserStatus:function(t){return i.b.post(r.a+"/opt/authority/modUserStatus",t)},perModUserPwd:function(t){return i.b.post(r.a+"/opt/authority/modUserPwd",t)},perDelUser:function(t){return i.b.post(r.a+"/opt/authority/delUser",t)},perRoleList:function(t){return i.b.post(r.a+"/opt/authority/getRoleList",t)},perSaveUserGroup:function(t){return i.b.post(r.a+"/opt/authority/saveUserGroup",t)},perSaveUserGroupName:function(t){return i.b.post(r.a+"/opt/authority/updateUserGroupName",t)},perDelUserGroup:function(t){return i.b.post(r.a+"/opt/authority/delUserGroup",t)},perGetMenuList:function(t){return i.b.post(r.a+"/opt/authority/getMenuList",t)},perSaveRole:function(t){return i.b.post(r.a+"/opt/authority/saveRole",t)},perSaveMenuRoleRel:function(t){return i.b.post(r.a+"/opt/authority/saveMenuRoleRel",t)},perDelRole:function(t){return i.b.post(r.a+"/opt/authority/delRole",t)},perSaveMenu:function(t){return i.b.post(r.a+"/opt/authority/saveMenu",t)},perDelMenu:function(t){return i.b.post(r.a+"/opt/authority/delMenu",t)}}),l=Object(i.a)("ma",{maAdverList:function(t){return i.b.post(r.a+"/opt/advert/getAdvertList",t)},maGetAdvertListBatch:function(t){return i.b.post(r.a+"/opt/advert/getAdvertListBatch",t)},maSaveAdvert:function(t){return i.b.post(r.a+"/opt/advert/saveAdvert",t)},maSaveAdvertBatch:function(t){return i.b.post(r.a+"/opt/advert/saveAdvertBatch",t)},maDelAdvert:function(t){return i.b.post(r.a+"/opt/advert/delAdvert",t)},maDelMaterial:function(t){return i.b.post(r.a+"/opt/advert/delMaterial",t)},maGetBannerList:function(t){return i.b.post(r.a+"/opt/advert/getBannerList",t)},maGetUserStatusList:function(t){return i.b.post(r.a+"/opt/advert/getUserStatusList",t)},maGetMaterialList:function(t){return i.b.post(r.a+"/opt/advert/getMaterialList",t)},maSaveMaterial:function(t){return i.b.post(r.a+"/opt/advert/saveMaterial",t)},maSaveBannerAndIcon:function(t){return i.b.post(r.a+"/opt/advert/saveBannerAndIcon",t)},maDelBannerAndIcon:function(t){return i.b.post(r.a+"/opt/advert/delBannerAndIcon",t)},maGetAllBannerTypeList:function(t){return i.b.post(r.a+"/opt/advert/getAllBannerTypeList",t)},maGetAllIconTypeList:function(t){return i.b.post(r.a+"/opt/advert/getAllIconTypeList",t)},maUpdateStatus:function(t){return i.b.post(r.a+"/opt/advert/updateStatus",t)}}),c=Object(i.a)("feed",{feedGetSuggestionList:function(t){return i.b.post(r.a+"/opt/suggestion/getSuggestionList",t)},feedExportSuggestionList:function(t){return i.b.post(r.a+"/opt/suggestion/exportSuggestionList",t)}}),p=Object(i.a)("ms",{msGetSmsListById:function(t){return i.b.post(r.a+"/opt/message/getSmsListById",t)},msGetAutoCallListById:function(t){return i.b.post(r.a+"/opt/message/getAutoCallListById",t)},msGetPushListById:function(t){return i.b.post(r.a+"/opt/message/getPushListById",t)},msGetUserMsgListById:function(t){return i.b.post(r.a+"/opt/message/getUserMsgListById",t)},msInsertSmsList:function(t){return i.b.post(r.a+"/opt/message/insertSmsList",t)},msInsertAutoCallList:function(t){return i.b.post(r.a+"/opt/message/insertAutoCallList",t)},msInsertPushList:function(t){return i.b.post(r.a+"/opt/message/insertPushList",t)},msInsertUserMsgList:function(t){return i.b.post(r.a+"/opt/message/insertUserMsgList",t)},msDeleteMessageById:function(t){return i.b.post(r.a+"/opt/message/deleteMessageById",t)},msGetSysEventlListById:function(t){return i.b.post(r.a+"/opt/sysEvent/getSysEventlListById",t)},msGetOptEventlListById:function(t){return i.b.post(r.a+"/opt/sysEvent/getOptEventlListById",t)},msUpdateIsProhibit:function(t){return i.b.post(r.a+"/opt/sysEvent/updateIsProhibit",t)},msUpdateAbtestById:function(t){return i.b.post(r.a+"/opt/sysEvent/updateAbtestById",t)},msDeleteEventById:function(t){return i.b.post(r.a+"/opt/sysEvent/deleteEventById",t)},msGetSysEventlUserStatus:function(t){return i.b.post(r.a+"/opt/sysEvent/getSysEventlUserStatus",t)},msGetOptEventlUserStatus:function(t){return i.b.post(r.a+"/opt/sysEvent/getOptEventlUserStatus",t)},msGetSysEventDetailById:function(t){return i.b.post(r.a+"/opt/sysEvent/getSysEventDetailById",t)},msSaveSysEvent:function(t){return i.b.post(r.a+"/opt/sysEvent/saveSysEvent",t)},msGetPushSelectOption:function(t){return i.b.post(r.a+"/opt/tag/apiTagSearch",t)},msGetPushTabDes:function(t){return i.b.post(r.a+"/opt/tag/apiTagDesc",t)}}),d=Object(i.a)("lo",{loGetLoanmarketListById:function(t){return i.b.post(r.a+"/opt/loanmarket/getLoanmarketListById",t)},loGetMerchantListById:function(t){return i.b.post(r.a+"/opt/merchant/getMerchantListById",t)},loGetUserLoanmarketListById:function(t){return i.b.post(r.a+"/opt/loanmarket/getUserLoanmarketListById",t)},loSureSaveChannel:function(t){return i.b.post(r.a+"/opt/loanmarket/insertLoanmarketList",t)},loDeleteLoanmarketByIdl:function(t){return i.b.post(r.a+"/opt/loanmarket/deleteLoanmarketById",t)},loDeleteMerchantListById:function(t){return i.b.post(r.a+"/opt/merchant/deleteMerchantListById",t)},loSaveLoanmarketList:function(t){return i.b.post(r.a+"/opt/loanmarket/saveLoanmarketList",t)},loSaveUserLoanmarketList:function(t){return i.b.post(r.a+"/opt/loanmarket/saveUserLoanmarketList",t)},loQueryProductInfo:function(t){return i.b.post(r.a+"/opt/merchant/queryProductInfo",t)},loInsertMerchantListById:function(t){return i.b.post(r.a+"/opt/merchant/insertMerchantListById",t)},loInsertUserLoanmarketList:function(t){return i.b.post(r.a+"/opt/loanmarket/insertUserLoanmarketList",t)},loDeleteUserLoanmarketById:function(t){return i.b.post(r.a+"/opt/loanmarket/deleteUserLoanmarketById",t)},loGetMarketListById:function(t){return i.b.post(r.a+"/opt/loanmarket/getMarketLinkListById",t)},loGetLinkListById:function(t){return i.b.post(r.a+"/opt/advert/getLinkListById",t)},loGetContractData:function(t){return i.b.post(r.a+"/opt/advert/getLinkListById",t)},loGetMarketPositionList:function(t){return i.b.post(r.a+"/opt/advert/getMarketPositionList",t)},loGetMarketUserStatusList:function(t){return i.b.post(r.a+"/opt/advert/getMarketUserStatusList",t)},loGetLinkComboBoxById:function(t){return i.b.post(r.a+"/opt/advert/getLinkComboBoxById",t)},loDeleteLinkListById:function(t){return i.b.post(r.a+"/opt/advert/deleteLinkListById",t)},loSaveLinkListById:function(t){return i.b.post(r.a+"/opt/advert/saveMarketLinkListById",t)},loSaveMarketListById:function(t){return i.b.post(r.a+"/opt/loanmarket/saveMarketLinkById",t)},loDeleteMarketLinkById:function(t){return i.b.post(r.a+"/opt/loanmarket/deleteMarketLinkById",t)},loSaveContractLinkListById:function(t){return i.b.post(r.a+"/opt/advert/saveLinkListById",t)},loCreateQRCode:function(t){return i.b.post(r.a+"/opt/advert/createQRCode",t)},loGetLinkContentById:function(t){return i.b.post(r.a+"/opt/advert/getLinkContentById",t)}}),m=Object(i.a)("sent",{sentQueryMassMessageMassList:function(t){return i.b.post(r.a+"/opt/smsmass/queryMassMessageMassList",t)},sentQueryUpdatelogByid:function(t){return i.b.post(r.a+"/opt/smsmass/queryUpdatelogByid",t)},sentSaveBatchInfo:function(t){return i.b.post(r.a+"/opt/smsmass/saveBatchInfo",t)},sentSavePushBatchInfo:function(t){return i.b.post(r.a+"/opt/smsmass/savePushBatchInfo",t)},sentSaveAppMessageBatchInfo:function(t){return i.b.post(r.a+"/opt/smsmass/saveAppMessageBatchInfo",t)},sentSaveAutotelBatchInfo:function(t){return i.b.post(r.a+"/opt/smsmass/saveAutotelBatchInfo",t)},sentExportSmsMessageList:function(t){return i.b.post(r.a+"/opt/smsmass/exportSmsMessageList",t)}}),h=Object(i.a)("au",{auUpdateAuditStatusById:function(t){return i.b.post(r.a+"/opt/smsmass/updateAuditStatusById",t)},auSendSmsTest:function(t){return i.b.post(r.a+"/opt/smsmass/sendSmsTest",t)},auSendPushTest:function(t){return i.b.post(r.a+"/opt/smsmass/sendPushTest",t)},auSendAppMessageTest:function(t){return i.b.post(r.a+"/opt/smsmass/sendAppMessageTest",t)},auSendAutotelTest:function(t){return i.b.post(r.a+"/opt/smsmass/sendAutotelTest",t)}}),f=Object(i.a)("ope",{opeQueryActList:function(t){return i.b.post(r.a+"/opt/activity/manage/queryActList",t)},opeQueryRedpacketList:function(t){return i.b.post(r.a+"/opt/activity/welfare/manage/redpacket/queryRedpacketList",t)},opeModifyAct:function(t){return i.b.post(r.a+"/opt/activity/manage/modifyAct",t)},opeQueryStrategyList:function(t){return i.b.post(r.a+"/opt/activity/welfare/manage/strategy/queryStrategyList",t)},opeSaveStrategy:function(t){return i.b.post(r.a+"/opt/activity/welfare/manage/strategy/saveStrategy",t)}});e.a=o()(s,u,l,c,p,d,m,h,f)},ympj:function(t,e){}},["NHnr"]);