webpackJsonp([29],{N5PZ:function(t,e){},"mmv+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("3f40"),n("4qOc"),n("+cgv");var i={data:function(){return{html:"",titleSave:""}},computed:{},watch:{},methods:{init:function(){var t=this;this.$route.query.id&&this.Api.loGetLinkContentById({id:this.$route.query.id}).then(function(e){var n=e.data;200===n.code?(console.log(n.data),t.html=n.data.icontext,document.getElementsByTagName("title")[0].innerText=n.data.title):t.$message({type:"error",message:n.msg})}).catch(function(e){t.$message({type:"error",message:e})})}},created:function(){this.titleSave=document.getElementsByTagName("title")[0].innerText,this.init()},mounted:function(){},destroyed:function(){document.getElementsByTagName("title")[0].innerText=this.titleSave}},a={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"Scan_view ql-editor",domProps:{innerHTML:this._s(this.html)}})},staticRenderFns:[]};var s=n("VU/8")(i,a,!1,function(t){n("N5PZ")},null,null);e.default=s.exports}});