<!-- 红包管理列表 -->
<template>
  <div class="Redbag_view">
    <transition name="el-zoom-in-bottom">
      <div>
        <!--页签头-->
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane v-for="(itemT, indexT) in editableTabs" :key="itemT.name" :label="itemT.title"
                       :name="itemT.name">
            <!--内容 -->
            <!--表格-->
            <div class="container" v-if="editableTabsValue==1">
              <div class="plugins-tips">
                <div class="plugins-search">
                  <el-form :inline="true" class="formTop">
                    <div>
                      <el-form-item label="搜索：">
                        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="pagination.pageNumber=1,search()">搜索</el-button>
                        <el-button type="warning" @click="Down({content:searchText,productid:'2001'},'/opt/activity/welfare/manage/redpacket/exportData')">导出</el-button>
                      </el-form-item>
                    </div>

                    <div>
                      <el-form-item class="add-btn" v-if="showAddBtn" @click.native="addTab(editableTabsValue)">
                        <i class="el-icon-lx-roundadd"></i>新增红包
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
              </div>
              <!--表格插件-->
              <div v-loading="exportLoading">
                <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
                  <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
                  <el-table-column fixed prop="id" label="ID"></el-table-column>
                  <el-table-column fixed prop="remark" label="红包名称"></el-table-column>
                  <el-table-column fixed label="是否是模板">
                    <template slot-scope="scope">{{scope.row.type==2?'是':'否'}}</template>
                  </el-table-column>
                  <el-table-column fixed prop="name" label="红包标题"></el-table-column>
                  <el-table-column fixed label="红包金额(元)" prop="pricedesc"></el-table-column>
                  <el-table-column fixed prop="describe" label="红包说明">
                    <template slot-scope="scope"><span v-html="formatRule(scope.row.describe)"></span></template>
                  </el-table-column>
                  <el-table-column fixed prop="award_validateday" label="红包有效期(天)"></el-table-column>
                  <el-table-column fixed prop="active_actamount" label="激活金额门槛"></el-table-column>

                  <el-table-column fixed prop="updatetime" label="最近修改时间"></el-table-column>
                  <el-table-column fixed label="最后修改人">
                    <template slot-scope="scope">{{ scope.row.updateby || scope.row.createby}}</template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="220" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="addTab(editableTabsValue,scope.row,scope.$index)">
                        编辑
                      </el-button>
                      <el-button size="mini" type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </myTable>
              </div>
            </div>

            <!--新增和编辑  -->
            <div class="container" v-if="editableTabsValue>1&&editableTabsValue==itemT.name">
              <div class="plugins-tips">
                <div class="plugins-search">
                  <div class="cellBox">

                    <h2>iphone6/7/8样式</h2>
                    <div class="box">
                      <div class="top">
                        <div class="left"><span>{{currentAddData.amountType==1?currentAddData.price||'00':'XX'}}</span>元</div>
                        <div class="content">
                          <span class="title">{{currentAddData.name||'xxxx的红包'}}</span>
                          <span class="des" v-if="currentAddData.describe.length" v-for="(v,i) in currentAddData.describe.split('\n')" :key="i">{{v}}</span>
                          <span class="des" v-else :key="i">1、标题xxxxxxxx</span>
                        </div>
                        <div class="right"><span>去激活</span></div>
                      </div>
                      <div class="bottom"><span>有效时间：{{effectiveTime(currentAddData)}}</span></div>
                    </div>
                  </div>


                  <el-form label-width="150px" :inline="true" label-position="right" class="formTop newLink"
                           :model="currentAddData"
                           :ref="'currentAddData'+indexT" :rules="ruleData">
                    <el-form-item label="红包名称" prop="remark">
                      <el-input placeholder="请输入红包名称" v-model="currentAddData.remark" maxlength='100'
                                style="width: 265px"></el-input>
                    </el-form-item>
                    <el-form-item label="红包标题" prop="name">
                      <el-input placeholder="请输入标题" v-model="currentAddData.name" maxlength='100'
                                style="width: 265px"></el-input>
                      <span class='tips'> 商户通配符  &productInfo.productname&</span>
                    </el-form-item>
                    <el-form-item label="红包说明" prop="describe">
                      <el-input type='textarea' placeholder="请输入说明" v-model="currentAddData.describe" maxlength='200'
                                style="width: 350px"></el-input>
                    </el-form-item>
                    <el-form-item label="红包有效期" prop="award_validateday">
                      领取后
                      <el-input placeholder="0-365" v-model="currentAddData.award_validateday" maxlength='10'
                                style="width: 75px"></el-input>
                      天内有效
                    </el-form-item>
                    <el-form-item label="红包金额" prop="amountType">
                      <el-radio v-model="currentAddData.amountType" label="1">固定金额</el-radio>
                      <el-radio v-model="currentAddData.amountType" label="2">动态下发</el-radio>
                    </el-form-item>
                    <el-form-item label=" " v-if='currentAddData.amountType == 1' prop='price'>
                      <el-input placeholder="输入红包金额" v-model="currentAddData.price" maxlength='10'
                                style="width: 175px"></el-input>
                      元
                    </el-form-item>
                    <el-form-item label=" " v-if='currentAddData.amountType == 2' prop='award_calmoney_rule'>
                      <el-input placeholder="请参照右侧示例，输入公式" v-model="currentAddData.award_calmoney_rule" maxlength='100'
                                style="width: 195px"></el-input>
                      <span class='tips'>示例: Math.round(0.003 * #record.creditamount#)</span>
                    </el-form-item>
                    <el-form-item label="激活金额门槛" prop="active_actamount">
                      商户放款本金
                      <el-input placeholder="" v-model="currentAddData.active_actamount" maxlength='20'
                                style="width: 80px"></el-input>
                      元
                    </el-form-item>
                    <el-form-item label="是否开启下发通知" >
                      <el-radio v-model="currentAddData.notification" label="1">不通知</el-radio>
                      <el-radio v-model="currentAddData.notification" label="2">通知</el-radio>
                    </el-form-item>
                    <el-form-item label="运营性消息" prop="awardnotify_eventType" v-if="currentAddData.notification==2">
                      <el-select v-model="currentAddData.awardnotify_eventType" placeholder="请选择消息类型" clearable>
                        <el-option v-for="(item,index) in eventType" :label="item.label" :value="item.value"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item align="center" style="margin-top: 50px">
                      <el-button type="primary" @click="submit('currentAddData'+indexT)">确定</el-button>
                      <el-button type="defualt" @click="removeTab(editableTabsValue)">取消</el-button>
                    </el-form-item>
                  </el-form>

                </div>
              </div>
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor';
  import common from "./../../../assets/common/common";
  import myTable from "./../../common/myTable";
  import {tableMixin} from "./../../common/commonMixin";
  import {axios} from "../../../assets/base/axiosConfig"; // 混入表格组件所需的数据
  import moment from "moment";


  export default {
    components: {
      myTable
    },
    mixins: [tableMixin],
    data() {
      return {
        searchText: this.$route.query.keyword, // 输入框内容
        selectData: [ // 类型下拉选项
          {label: '全部', value: ''},
        ],
        selectData_newAdd: [], // 新增和编辑时的下拉框选项
        map_select: { // 映射表
          '3': '合同',
          '4': '警示',
        },
        currentSelect: '', // 当前选中的下拉数据

        // 新增红包  表单数据  验证规则
        ruleData: {
          remark: [
            {required: true, message: '请输入红包名称', trigger: 'blur'},
            {max: 100, message: '最大输入100字符', trigger: 'blur'},
          ], // 红包名称
          name: [
            {required: true, message: '请输入红包标题', trigger: 'blur'},
            {max: 100, message: '最大输入100字符', trigger: 'blur'},
          ], // 标题
          describe: [
            {required: true, message: '请输入红包说明', trigger: 'blur'}
          ], // 红包说明
          award_validateday: [{required: true, message: '请输入红包有效期', trigger: 'blur'}], // 红包有效期
          amountType: [{required: true, message: '请选择红包金额种类', trigger: 'change'}],//红包金额类型
          price: [{required: true, message: '请输入红包金额', trigger: 'blur'}], // 红包金额
          award_calmoney_rule: [{required: true, message: '请输入红包公式', trigger: 'blur'}], // 红包公式
          active_actamount: [{required: true, message: '请输入红包激活金额门槛', trigger: 'blur'}],
          awardnotify_eventType: [{required: true, message: '请选择消息类型', trigger: 'change'}]
        },
        // 分页器数据
        editableTabsValue: '1',
        editableTabs: [
          {title: '红包管理', name: '1',},
        ],
        currentAddData: {
          name: '',
          title: '',
          adverttype: '',
          icontext: '',
          remark: '',
        }, // 当前的添加或者编辑页面的数据 浅复制 可以联动
        tabIndex: 1,
        eventType: [], // 运营性类型

      }
    },
    computed: {
      // 是否展示添加按钮
      showAddBtn() {
        return !this.editableTabs.find(e => (e.title === '新增红包'))
      },
      actionUrl: function () {
        return this.$store.state.actionUrl;
      },
    },
    watch: {},
    methods: {
      // 获取运营性下拉列表
      async findEventType(){
        let result = await axios.post('/opt/activity/welfare/manage/redpacket/getEventList',{})
        console.log(result)
        let res = result.data
        if(res.code == 200){
          this.eventType = res.data.map(e=>({label: e.value ,value: e.key}))
        }else{
          this.$message.warning(res.msg)
        }
      },
      // 计算有效时间
      effectiveTime(v){
        return moment().add(v.award_validateday,'d').format('YYYY-MM-DD')
      },
      formatRule(v) {
        let arr = JSON.parse(v)
        if(Array.isArray(arr)){
          let str = arr.reduce((pre,next)=>(pre.rule + '<br>' + next.rule))
          return str
        }

      },
      // 新增红包
      addTab(targetName, v, i) { // v  无数据是新增 有数据是编辑
        console.log(v)
        let newTabName = ++this.tabIndex + '';
        let obj = {
          remark: '',
          name: '',
          describe: '',
          award_validateday: '',
          amountType: '1',
          price: '',
          award_calmoney_rule: '',
          active_actamount: '',
          notification: '1',
          awardnotify_eventType: '',
        }
        if (v) { // 编辑时
          for (let key of Object.keys(obj)) {
            v[key] && (obj[key] = v[key])
          }
          // 特殊处理
          obj.amountType = v.award_calmoney_rule ? '2' : '1' // 存在公式就是动态下发
          obj.notification = v.awardnotify_eventType ? '2' : '1' // 是否通知  有数据就是通知  否则不通知
          obj.id = v.id
          obj.describe = JSON.parse(v.describe).reduce((pre,next)=>(pre.rule+'\n'+next.rule))
        }

        v && (obj.advertid = v.advertid) // 是编辑的时候就带上id
        this.editableTabs.push({
          title: !v ? '新增首复贷红包' : '编辑红包' + (i + 1 + (this.pagination.pageNumber - 1) * this.pagination.pageSize),
          name: newTabName,
          data: obj,
        });
        this.editableTabsValue = newTabName;
        this.currentAddData = this.editableTabs[this.editableTabsValue - 1].data
      },
      // 删除页签的时候
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) { // 删除当前页 就自动跳到前面一页  这里不是自减  而是要找前面是多少号码
          let currentIndex = this.editableTabs.findIndex((e) => (e.name === this.editableTabsValue))
          this.editableTabsValue = this.editableTabs[currentIndex - 1].name
          // this.editableTabsValue = this.editableTabsValue - 1 + ''
        }
        this.tabIndex-- // 分页头数量--
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        this.changeTab(this.editableTabsValue)
      },
      // 切换页签的时候
      changeTab(targetName) {
        let i = this.editableTabs.findIndex((e) => (e.name === this.editableTabsValue)) // 找到当前页签对应的数组数据  因为editableTabsValue并不是数组的下标
        this.currentAddData = this.editableTabs[i].data // 传递当前选中的页签的数据
        // i === 0 && this.init() // 切换到第一个页签时  刷新表格的数据
      },

      handleAvatarSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let vm = this;
        let quill = this.$refs.myQuillEditor_contract[0].quill;
        // 如果上传成功
        if (res.code == '200') {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.data.url)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          vm.$message.error('图片插入失败')
        }

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        if (!isJPG) {
          this.$message.error('请选择png/jpg/gif 格式图片!');
          return;
        }
        return isJPG;
      },
      // 提交 新增或者编辑
      submit: common.throttle(function (ref) {
        // 验证表单数据   这里的表单验证有点问题  卧槽  放在el-tab-pane里面没有validate函数
        this.$refs[ref][0].validate(async (valid) => {
          if (valid) {
            let obj = JSON.parse(JSON.stringify(this.currentAddData))
            this.currentAddData.amountType == 1 && (obj.award_calmoney_rule = null)
            this.currentAddData.notification == 1 && (obj.awardnotify_eventType = '')

            let result = await axios.post('/opt/activity/welfare/manage/redpacket/saveRedpacket', obj)
            console.log(result)
            let res = result.data
            if (res.code == 200) {
              this.$message.success('提交成功！')
              this.removeTab(this.editableTabs[this.editableTabsValue - 1].name) // 关闭这个tab
              this.init() // 刷新列表的数据
            } else {
              this.$message.error(res.msg);
            }
          } else {
            return false
          }
        })

      }),

      // 查询表格数据
      search: common.throttle(function () {
        this.tableData = []
        let obj = {
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize,
          content: this.searchText
        } // 传参  materialtype这个是后台规定传4
        this.currentSelect && (obj.adverttype = this.currentSelect) // 如果选择的是全部  就不传这个参数
        this.exportLoading = true // 打开加载层
        this.Api.opeQueryRedpacketList(obj).then((result) => {
          let res = result.data
          if (res.code === 200) {
            this.tableData = res.data.list
            this.pagination.total = res.data.total
          } else {
            this.$message({type: 'error', message: res.msg});
          }
          this.exportLoading = false // 关闭加载层
        }).catch((err) => {
          console.log(err)
          this.exportLoading = false // 关闭加载层
        })
      }),

      // 删除一条数据
      async deleteRow(id) {
        let confirm = await this.$confirm('是否删除该数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        if (!confirm) return
        let result = await axios.post('/opt/activity/welfare/manage/redpacket/deleteRedpacket', {id: id})
        let res = result.data
        if (res.code === 200) {
          this.$message({type: 'success', message: '删除成功！'});
          this.init() // 刷新表格数据
        } else {
          this.$message({type: 'error', message: res.msg});
        }
      },


      init() {
        this.search()
      }
    },
    created() {
      for (let k of Object.keys(this.map_select)) {
        this.selectData.push({label: this.map_select[k], value: k})
        this.selectData_newAdd.push({label: this.map_select[k], value: k})
      }
      this.init()
      this.findEventType()
    },
    mounted() {
    },
  }
</script>

<style lang='scss'>
  .Redbag_view {
    .formTop {
      display: flex;
      justify-content: space-between;
      /*flex-direction: column;*/
      .add-btn {
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        color: #409EFF;

        &:hover {
          text-decoration: underline;
        }

        i {
          margin-right: 5px;
          font-size: 18px;
          top: 1px;
          position: relative;
        }
      }

      > div {
        > div {
          margin-bottom: 0;
        }
      }
    }

    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      background: #ffffff;

      .el-tabs__item {
        &:first-child {
          span {
            display: none;
          }
        }
      }
    }

    .el-tabs__header {
      margin-bottom: 0px;
      border: none;

      .el-tabs__nav {
        > div {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .events-item {
      padding: 20px 20px;
      background: #fff;
      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);

      .addEvents_ct {
        .event-item {
          border: 1px solid #e6e6e6;
          margin-left: 98px;
          margin-bottom: 20px;

          .event-header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            background: #F9F9FA;
            padding: 0 20px;

            & > div {
              display: inline-block;
              vertical-align: middle;
            }

            div.event-header-right {
              float: right;
            }
          }

          .event-contain {
            padding: 20px 0px;

            &.event-error {
              border: 1px solid #f56c6c;
            }

            .event-error {
              border: 1px solid #f56c6c;
            }

            & > div {
              padding: 0 20px;
            }

            .event-setChannel {
              background: #eef1f6;
              min-height: 60px;
              padding-top: 15px;
              padding-bottom: 15px;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;

              .el-button {
                float: right;
              }
            }

            .event-content {
              background: #ffffff;
              margin-top: 10px;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              font-size: 14px;
              color: #ADADAD;
              letter-spacing: 0.32px;
              font-weight: normal;
              height: 30px;
              line-height: 30px;
              padding-left: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap
            }
          }
        }
      }
    }

    .container {
      border-radius: 0;
    }

    .newLink {
      flex-direction: column;

      .avatar-uploader {
        width: 220px;
        height: 250px;

        .el-upload--text {
          width: 100%;
        }

        .el-upload-dragger {
          width: 100%;
          height: 100%;
        }

        .el-upload {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .el-form-item__content {
        width: calc(100% - 150px);
        font-size: 14px;
        color: #606266;

        .tips {
          font-size: 12px;
          color: #999999;
        }
      }

      textarea {
        height: 100px;
      }
    }

    .plugins-tips {
      background: #fff;
      .cellBox{
        width: 350px;
        padding:  16px;
        background: #f7f7f7;
        margin-bottom: 20px;
        margin-left: 50px;
        box-sizing: border-box;
        .box{
          width: 100%;
          background: #FFFFFF;
          box-shadow: 0 0 20px 0 rgba(0,0,0,0.08);
          border-radius: 6px;
          .top{
            display: flex;
            align-items: center;
            justify-content: left;
            min-height: 90px;
            .left{
              display: flex;
              justify-content: center;
              align-items: baseline;
              width: 90px;
              color: #E72427;
              font-size: 12px;
              span{
                font-size: 30px;
              }
            }
            .content{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              overflow: hidden;
              span{
                width: 100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .title{
                font-size: 16px;
                color: #333333;
              }
              .des{
                font-size: 12px;
                color: #666666;
              }
            }
            .right{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 70px;
              height: 32px;
              border-radius: 100px;
              margin: 0 16px;
              background-image: linear-gradient(-90deg, #E72427 0%, #FE4C35 100%);
              box-shadow: 0 2px 10px 0 rgba(236,44,42,0.30);
              color: #fff;
              font-size: 14px;
              cursor: pointer;
            }

          }
          .bottom{
            height: 36px;
            font-size: 12px;
            color: #666666;
            padding: 0 16px;
            span{
              display: flex;
              justify-content: left;
              align-items: center;
              border-top: 1px dashed #ccc;
              width: 100%;
              height: 100%;
            }
          }
        }

      }
    }

    .contract_preview {

      .el-dialog__body {
        height: 400px;
        display: flex;
        justify-content: space-between;

        > div {
          width: 50%;
          display: flex;
          justify-content: center;
        }
      }
    }

    .ql-align-center {
      text-align: center;
    }
  }

</style>
