<!--贷款超市管理-->
<template>
  <div class="LoanSupermarketManage_view">
    <transition name="el-zoom-in-bottom">
      <div>
        <div class="plugins-tips">
          <el-form :inline="true" class="formTop">
            <el-form-item label="搜索：">
              <el-input placeholder="请输入内容" v-model="searchText" @input="canEnter=true"
                        @keyup.enter.native="canEnter&&(pagination.pageNumber=1,search(),canEnter=false)" class="input-with-select">
                <el-button slot="append" type="primary" @click="pagination.pageNumber=1,search()">搜索</el-button>
              </el-input>
            </el-form-item>
            <el-form-item class="add-btn" @click.native="addModal">
              <i class="el-icon-lx-roundadd"></i>新增{{tabIndex?'链接':'贷款超市管理'}}
            </el-form-item>
          </el-form>
        </div>
        <el-tabs type="border-card" @tab-click="changeTab">

          <!--贷款超市-->
          <el-tab-pane label="贷款超市" v-loading="exportLoading">
            <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
              <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column fixed prop="positionname" label="模块"></el-table-column>
              <el-table-column fixed label="用户状态">
                <template slot-scope="scope">{{map_userStatus[scope.row.marketstatus]}}</template>
              </el-table-column>
              <el-table-column fixed prop="jumplink" label="极速"></el-table-column>
              <el-table-column fixed prop="thumbnailurl" label="普通"></el-table-column>

              <el-table-column fixed="right" label="操作" width="150" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="editModal(scope.row)">编辑</el-button>
                  <!--沟通后确认没有删除按钮-->
                  <!--<el-button type="danger" size="small" @click="deleteRow('manageid',scope.row.manageid, 'loDeleteMarketLinkById')">删除</el-button>-->
                </template>
              </el-table-column>
            </myTable>

            <!--<el-table :data="tableData" border style="width: 100%">-->
              <!--<el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>-->
              <!--<el-table-column fixed prop="positionname" label="模块"></el-table-column>-->
              <!--<el-table-column fixed label="用户状态">-->
                <!--<template slot-scope="scope">{{map_userStatus[scope.row.marketstatus]}}</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column fixed prop="jumplink" label="下发链接1"></el-table-column>-->
              <!--<el-table-column fixed prop="thumbnailurl" label="下发链接2"></el-table-column>-->

              <!--<el-table-column fixed="right" label="操作" width="150" align="center">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button type="primary" size="small" @click="editModal(scope.row)">编辑</el-button>-->
                  <!--&lt;!&ndash;沟通后确认没有删除按钮&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-button type="danger" size="small" @click="deleteRow('manageid',scope.row.manageid, 'loDeleteMarketLinkById')">删除</el-button>&ndash;&gt;-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          </el-tab-pane>

          <!--链接管理-->
          <el-tab-pane label="链接管理" v-loading="exportLoading">
            <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
              <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column fixed prop="name" label="贷超bi页面名称"></el-table-column>
              <el-table-column fixed prop="jumplink" label="极速"></el-table-column>
              <el-table-column fixed prop="thumbnailurl" label="普通"></el-table-column>

              <el-table-column fixed="right" label="操作" width="150" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="editModal(scope.row)">编辑</el-button>
                  <el-button type="danger" size="small"
                             @click="deleteRow('advertid',scope.row.advertid,'loDeleteLinkListById')">删除
                  </el-button>
                </template>
              </el-table-column>
            </myTable>
          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>

    <!--贷款超市管理 弹框 新增和编辑-->
    <el-dialog :title="`${Modal_isNew?'新增':'编辑'}贷款超市`" :visible.sync="supermarketModal" width="30%" center>
      <div>
        <el-form :inline="true" class="formTop1" label-position="left" label-width="120px" align="center"
                 :rules="addSupermarketFormRules" :model="supermarketModal_data" ref="supermarketModal_data">
          <el-form-item label="模块：" prop="positionid">
            <el-select v-model="supermarketModal_data.positionid" placeholder="请选择模块" :disabled="!Modal_isNew">
              <el-option v-for="(item,index) in moduleSelectData" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态：" prop="marketstatus">
            <el-select v-model="supermarketModal_data.marketstatus" placeholder="请选择用户状态" :disabled="!Modal_isNew">
              <el-option v-for="(item,index) in userStatusSelectData" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="贷超bi名称：" prop="advertid">
            <el-select v-model="supermarketModal_data.advertid" placeholder="请选择贷超bi名称">
              <el-option v-for="(item,index) in biNameSelectData" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="supermarketModal = false">取 消</el-button>
        <el-button type="primary" @click="formTest('supermarketModal_data','submitSupermarket')" >确 定</el-button>
      </span>
    </el-dialog>

    <!--链接管理  弹框-->
    <el-dialog :title="`${Modal_isNew?'新增':'编辑'}贷款超市链接`" :visible.sync="linkModal" width="30%" center>
      <div>
        <el-form :inline="true" class="formTop1" label-position="left" label-width="170px" align="center"
                 :model="linkModal_data" ref="linkModal_data" :rules="addLinkFormRules">
          <el-form-item label="贷款超市bi页面名称：" prop="name">
            <el-input placeholder="请输入贷款超市bi页面名称" v-model="linkModal_data.name" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
          <el-form-item label="极速：" prop="jumplink">
            <el-input placeholder="请输入极速" v-model="linkModal_data.jumplink" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
          <el-form-item label="普通：" prop="thumbnailurl">
            <el-input placeholder="请输入普通" v-model="linkModal_data.thumbnailurl" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="linkModal = false">取 消</el-button>
        <el-button type="primary" @click="formTest('linkModal_data','submitLink')" >确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import common from "./../../../assets/common/common";
  import myTable from "./../../common/myTable";
  import {tableMixin} from "./../../common/commonMixin";




  export default {
    components:{myTable},
    mixins:[tableMixin],
    data() {
      return {
        searchText: '', // 搜索输入框双向绑定
        canEnter: false, // 是否可以回车搜索
        tabIndex: 0, // 当前选中的页签

        map_userStatus: {}, // 用户状态的数据映射表 这个是从后台获取的

        // 校验
        addSupermarketFormRules: {
          positionid: [{required: true, message: '请选择模块', trigger: 'change'}],
          marketstatus: [{required: true, message: '请选择用户状态', trigger: 'change'}],
          advertid: [{required: true, message: '请选择贷超bi名称', trigger: 'change'}],
        },
        addLinkFormRules: {
          name: [
            {required: true, message: '请输入贷款超市bi页面名称', trigger: 'change'},
            {max: 20, message: '最大输入20个字符', trigger: 'change'},
            ],
          jumplink: [{required: true, message: '请输入普通', trigger: 'change'}],
          thumbnailurl: [{required: false, message: '请输入极速', trigger: 'blur'}],
        },

        // 弹框
        supermarketModal: false, // 贷款超市管理的弹框  控制是否打开
        Modal_isNew: true, // 是否是新增
        supermarketModal_data: { // 贷款超市管理的弹框 的数据
          positionid: '', // 当前选中的模块下拉选项code
          marketstatus: '', // 当前选中的用户状态下拉选项code
          advertid: '', // 贷超bi名称
        },
        moduleSelectData: [], // 模块 下拉选项数据
        userStatusSelectData: [], // 用户状态 下拉选项数据
        biNameSelectData: '', // 贷超bi名称 下拉选项数据


        linkModal: false, // 链接管理的新增编辑弹框  控制是否打开
        linkModal_data: { // 链接管理弹框里面提交数据
          name: '',
          jumplink: '',
          thumbnailurl: '',
        },
      }
    },
    computed: {
      // 当模块是[拒件详情页，等待期（未过）详情页面，贷中风控永久拒绝页，贷中风控有等待期页] 其中一个时   就不展示用户状态 -- 这个产品说不做了
      // isShow_markStatic(){
      //   return !(['1015001','1016001','1017001','1018001'].find(e=>(e == this.supermarketModal_data.positionid)))
      // }
    },
    watch: {},
    methods: {
      // form表单中搜索按钮
      search:common.throttle(function() {
        this.exportLoading = true // 打开加载层
        let obj = {
          keyword: this.searchText,
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize
        }
        this.tabIndex && (obj.materialtype = '5') // 链接管理这里需要加一个参数 后台规定是5
        let p = this.tabIndex ? this.Api.loGetLinkListById(obj) : this.Api.loGetMarketListById(obj) // 调用接口  链接管理/链接超市管理
        p.then((result) => { // 回调

          let res = result.data
          if (res.code === 200) {
            this.tableData = res.data.list
            this.pagination.total = res.data.total
          } else {
            this.$message({type: 'error', message: res.msg});
          }
          this.exportLoading = false // 关闭加载层
        }).catch((err) => {
          this.exportLoading = false // 关闭加载层
          this.$message({type: 'error', message: err});
        })
      }),
      // 页签的切换事件
      changeTab(tab) {
        if(this.tabIndex == tab.index) return // 点击当前页不做任何操作
        // 数据初始化
        this.tableData = [] // 清空表格数据
        this.pagination.pageNumber = 1 // 当前页设置第一页
        this.pagination.pageSize = 10 // 每页的长度初始化
        this.tabIndex = Number(tab.index) // 数据联动
        this.init()
      },
      // 点击新增按钮事件
      addModal:common.throttle(function() {
        this.Modal_isNew = true // 标记成新增的弹框
        if (this.tabIndex) { // 在链接管理页面
          for (let key in this.linkModal_data) {
            this.linkModal_data[key] = ''
          } // 将bi名称、链接1、链接2 全部初始化为'' // 新增时下拉框和输入框数据要清空
          this.$delete(this.linkModal_data, 'advertid') // 新增的时候  是没有id的
          this.linkModal = true // 打开弹框
        } else { // 在贷款超市管理页面
          !this.moduleSelectData.length && this.findModuleSelect() // 获取模块选项的数据 没有数据的时候才去获取
          !this.biNameSelectData.length && this.findBiNameSelect() // 获取贷超bi名称选项的数据 没有数据的时候才去获取 这个bi名称的下拉选项数据
          for (let key in this.supermarketModal_data) {
            this.supermarketModal_data[key] = ''
          } // 将bi名称、用户状态、模块 全部初始化为''  // 新增时下拉框和输入框数据要清空
          this.$delete(this.supermarketModal_data, 'manageid') // 新增的时候  是没有id的
          this.supermarketModal = true // 打开弹框
        }
      }),
      // 点击编辑事件
      editModal:common.throttle(function(v) {
        this.Modal_isNew = false // 标记成编辑的弹框
        if (this.tabIndex) { // 在链接管理页面
          this.linkModal_data.jumplink = v.jumplink // 链接1
          this.linkModal_data.thumbnailurl = v.thumbnailurl // 链接2
          this.linkModal_data.name = v.name // bi名称
          this.linkModal_data.advertid = v.advertid // 唯一标识
          this.linkModal = true // 打开弹框
        } else { // 在贷款超市管理页面
          !this.moduleSelectData.length && this.findModuleSelect() // 获取模块选项的数据 没有数据的时候才去获取
          !this.biNameSelectData.length && this.findBiNameSelect() // 获取贷超bi名称选项的数据 没有数据的时候才去获取

          this.supermarketModal_data.advertid = v.advertid // bi名称
          this.supermarketModal_data.marketstatus = v.marketstatus // 用户状态
          this.supermarketModal_data.positionid = v.positionid // 模块
          this.supermarketModal_data.manageid = v.manageid // 唯一标识
          this.supermarketModal = true // 打开弹框
        }
      }),

      // 获取模块选项的数据
      findModuleSelect() {
        this.Api.loGetMarketPositionList({}).then((result) => {
          let res = result.data
          if (res.code === 200) {
            this.moduleSelectData = res.data.map((v) => ({label: v.desc, value: v.code})) // 转换成我们需要的格式 label value
          } else {
            this.$message({type: 'error', message: res.msg});
          }
        }).catch((err) => {
          this.$message({type: 'error', message: err});
        })
      },
      // 获取用户状态选项的数据
      findUserStatusSelect() {
        this.Api.loGetMarketUserStatusList({}).then((result) => {
          let res = result.data
          if (res.code === 200) {
            // 转换成我们需要的格式 label value  并且拿到表格用户状态映射表
            this.userStatusSelectData = res.data.map((v) => {
              this.map_userStatus[v.code] = v.desc // 将数据塞到映射表中
              return {label: v.desc, value: v.code}
            })
          } else {
            this.$message({type: 'error', message: res.msg});
          }
        }).catch((err) => {
          this.$message({type: 'error', message: err});
        })
      },
      //  获取贷超bi名称选项的数据
      findBiNameSelect() {
        this.Api.loGetLinkComboBoxById({materialtype: 5}).then((result) => {
          let res = result.data
          if (res.code === 200) {
            // 转换成我们需要的格式 label value  并且拿到表格用户状态映射表
            this.biNameSelectData = res.data.list.map((v) => {
              return {label: v.name, value: v.advertid}
            })
          } else {
            this.$message({type: 'error', message: res.msg});
          }
        }).catch((err) => {
          this.$message({type: 'error', message: err});
        })
      },

      // 提交 贷超管理
      submitSupermarket:common.throttle(function() {
        // !this.isShow_markStatic && (this.$delete(this.supermarketModal_data, 'marketstatus'))// 当模块选中了后面4个的时候 就不用传用户状态到后台  -- 这个产品说不做了
        this.Api.loSaveMarketListById(this.supermarketModal_data).then((result) => {
          let res = result.data
          if (res.code === 200) {
            this.supermarketModal = false // 关闭弹框
            this.$message({type: 'success', message: this.Modal_isNew ? '添加成功！' : '修改成功'});
            this.init() // 刷新一下表格数据
          } else {
            this.$message({type: 'error', message: res.msg});
          }
        }).catch((err) => {
          this.$message({type: 'error', message: err});
        })
      }),
      // 表单验证函数
      formTest(formName,successFn){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this[successFn]()
          }else{
            return false
          }
        })
      },

      // 提交 链接管理弹框
      submitLink:common.throttle(function() {
        this.linkModal_data.materialtype = '5' // 后台规定  这个必须传4
        this.Api.loSaveLinkListById(this.linkModal_data).then((result) => {
          let res = result.data
          if (res.code === 200) {
            this.$message({type: 'success', message: this.Modal_isNew ? '添加成功！' : '修改成功'});
            this.linkModal = false // 关闭弹框
            this.init() // 刷新表格
            this.findBiNameSelect() // 这里需要刷新一下 bi名称的下拉选项数据 不然到另一个页签的时候 会出现数据未更新的情况
          } else {
            this.$message({type: 'error', message: res.msg});
          }
        }).catch((err) => {
          this.$message({type: 'error', message: err});
        })
      }),
      // 删除 链接管理或者贷超管理的一条数据  key是传到后台的key值  id是当前数据的唯一标识  api是选用哪个接口地址
      deleteRow(key, id, api) { //
        this.$confirm('是否删除该数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.Api[api]({[key]: id}).then((result) => {
            let res = result.data
            if (res.code === 200) {
              this.$message({type: 'success', message: '删除成功！'});
              this.init() // 刷新表格数据
              this.findBiNameSelect() // 这里需要刷新一下 bi名称的下拉选项数据 不然到另一个页签的时候 会出现数据未更新的情况
            } else {
              this.$message({type: 'error', message: res.msg});
            }
          }).catch((err) => {
            this.$message({type: 'error', message: err});
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除！'});
        });
      },


      init() {
        this.search()
      }
    },
    created() {
      this.findUserStatusSelect() // 获取用户状态选项的数据 这个数据可用于表格中映射用户状态 所以一开始就要拿到 不然表格数据无法展示
      this.init()
    },
    mounted() {
    },
  }
</script>

<style lang='scss' scoped>
  .LoanSupermarketManage_view {
    .plugins-tips {
      margin-bottom: 0;
    }

    .formTop {
      display: flex;
      justify-content: space-between;

      > div {
        margin-bottom: 0;
      }
    }

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

    .formTop1 {
      label {
        padding: 0;
      }
    }
  }

</style>
