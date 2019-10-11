webpackJsonp([37],{eTuI:function(e,a){},jcXh:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=t("T0gc"),n=t("KvOm"),i=t("7MUq"),o={components:{myTable:l.a},mixins:[n.c],data:function(){return{selectData_strategy:[{label:"授信未首贷",value:"1"},{label:"已首贷有额度未动用",value:"2"},{label:"结清未复贷",value:"3"},{label:"首登未提交资料",value:"4"},{label:"分流未申请",value:"5"},{label:"还款日提醒",value:"6"}],searchData:{date:[],strategy:""},tableData:[{}],showModal:!1,Modal_isNew:!0,modalData:{},modalDataRule:{name:[{required:!0,message:"请输入公告名称",trigger:"change"},{max:10,message:"最多输入10个字符",trigger:"change"}],content:[{required:!0,message:"请输入公告内容",trigger:"change"}],location:[{required:!0,message:"请选择展示位置",trigger:"change"}]},selectData_merchant:[{label:"首页",value:"1"},{label:"媒体报道",value:"2"},{label:"全局",value:"3"}],data2:function(e){var a=[],t=["shanghai","beijing","guangzhou","shenzhen","nanjing","xian","chengdu"];return["上海","北京","广州","深圳","南京","西安","成都"].forEach(function(e,l){a.push({label:e,key:l,pinyin:t[l]})}),a}(),value2:[],filterMethod:function(e,a){return a.pinyin.indexOf(e)>-1}}},computed:{},watch:{},methods:{deleteRow:function(e){var a=this;this.$confirm("确定要删除此条记录吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){a.Api.loDeleteLinkListById({advertid:e}).then(function(e){var t=e.data;200===t.code?(a.$message({type:"success",message:"删除成功！"}),a.init()):a.$message({type:"error",message:t.msg})}).catch(function(e){a.$message({type:"error",message:e})})}).catch(function(){a.$message({type:"info",message:"已取消删除！"})})},online_offline:function(){var e=this;this.$confirm("确定上线吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.Api.loDeleteLinkListById({advertid:id}).then(function(a){var t=a.data;200===t.code?(e.$message({type:"success",message:"删除成功！"}),e.init()):e.$message({type:"error",message:t.msg})}).catch(function(a){e.$message({type:"error",message:a})})}).catch(function(){e.$message({type:"info",message:"已取消删除！"})})},openModal:function(e){this.Modal_isNew=void 0==e,this.modalData=e||{name:"",content:"",location:""},this.showModal=!0},search:i.a.throttle(function(){console.log(this.searchData)}),init:function(){}},created:function(){this.init()},mounted:function(){}},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"SpecialDownConfig_view"},[t("div",{staticClass:"container"},[t("div",{staticClass:"plugins-tips"},[t("div",{staticClass:"plugins-search"},[t("el-form",{staticClass:"formTop",attrs:{inline:!0}},[t("div",[t("el-form-item",{attrs:{label:"调落策略："}},[t("el-select",{attrs:{placeholder:"请选择调落策略"},model:{value:e.searchData.strategy,callback:function(a){e.$set(e.searchData,"strategy",a)},expression:"searchData.strategy"}},e._l(e.selectData_strategy,function(e,a){return t("el-option",{key:a,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"操作时间："}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.searchData.date,callback:function(a){e.$set(e.searchData,"date",a)},expression:"searchData.date"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.pagination.pageNumber=1,e.search()}}},[e._v("搜索")])],1)],1),e._v(" "),t("div",[t("el-form-item",{staticClass:"add-btn",nativeOn:{click:function(a){e.modalData={},e.openModal()}}},[t("i",{staticClass:"el-icon-lx-roundadd"}),e._v("新增链接\n            ")])],1)])],1)]),e._v(" "),t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.exportLoading,expression:"exportLoading"}]},[t("myTable",{attrs:{tableData:e.tableData,pagination:e.pagination,ajax:e.init},on:{"update:pagination":function(a){e.pagination=a}}},[t("el-table-column",{attrs:{fixed:"",prop:"index",label:"序号",type:"index",index:e.indexMethod}}),e._v(" "),t("el-table-column",{attrs:{fixed:"",prop:"a",label:"调落策略"}}),e._v(" "),t("el-table-column",{attrs:{fixed:"",prop:"b",label:"调落商户"}}),e._v(" "),t("el-table-column",{attrs:{fixed:"",prop:"w",label:"每日调落人数上限"}}),e._v(" "),t("el-table-column",{attrs:{fixed:"",prop:"e",label:"调落时间范围"}}),e._v(" "),t("el-table-column",{attrs:{fixed:"",prop:"t",label:"对照组比例"}}),e._v(" "),t("el-table-column",{attrs:{fixed:"",prop:"y",label:"调落推送进度"}}),e._v(" "),t("el-table-column",{attrs:{fixed:"",prop:"y",label:"操作时间"}})],1)],1)]),e._v(" "),t("el-dialog",{attrs:{title:(e.Modal_isNew?"新增":"编辑")+"日常调落配置",visible:e.showModal,width:"710px",center:""},on:{"update:visible":function(a){e.showModal=a}}},[t("div",[t("el-form",{ref:"modalData",staticClass:"formTop1",attrs:{inline:!0,"label-position":"right","label-width":"150px",align:"center",model:e.modalData,rules:e.modalDataRule}},[t("el-form-item",{attrs:{label:"调落策略："}},[t("el-select",{attrs:{placeholder:"请选择调落策略"},model:{value:e.searchData.strategy,callback:function(a){e.$set(e.searchData,"strategy",a)},expression:"searchData.strategy"}},e._l(e.selectData_strategy,function(e,a){return t("el-option",{key:a,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"调落商户："}},[t("el-transfer",{attrs:{filterable:"","filter-method":e.filterMethod,"filter-placeholder":"请输入城市拼音",data:e.data2},model:{value:e.value2,callback:function(a){e.value2=a},expression:"value2"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"每日调落人数上限：",prop:"maxNum"}},[t("el-input",{staticClass:"input-with-select",staticStyle:{width:"215px"},attrs:{placeholder:"请输入每日调落人数上限"},model:{value:e.modalData.maxNum,callback:function(a){e.$set(e.modalData,"maxNum",a)},expression:"modalData.maxNum"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"调取时间范围：",prop:"maxNum"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.modalData.date,callback:function(a){e.$set(e.modalData,"date",a)},expression:"modalData.date"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"对照组比例：",prop:"rate"}},[t("el-input",{staticClass:"input-with-select",staticStyle:{width:"202px"},attrs:{placeholder:"请输入对照组比例"},model:{value:e.modalData.rate,callback:function(a){e.$set(e.modalData,"rate",a)},expression:"modalData.rate"}}),e._v("%\n        ")],1)],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.showModal=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.submit("modalData")}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var r=t("VU/8")(o,s,!1,function(e){t("eTuI")},null,null);a.default=r.exports}});