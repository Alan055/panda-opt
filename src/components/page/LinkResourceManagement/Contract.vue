<template>
  <div class="Contract_view">
    <transition name="el-zoom-in-bottom">
      <div>
        <!--页签头-->
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeTab">
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
                      <el-form-item label="类型：">
                        <el-select v-model="currentSelect" placeholder="请选择类型">
                          <el-option v-for="(item,index) in selectData" :label="item.label" :value="item.value"
                                     :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="pagination.pageNumber=1,search()">搜索</el-button>
                      </el-form-item>
                    </div>

                    <div>
                      <el-form-item class="add-btn" v-if="showAddBtn" @click.native="addTab(editableTabsValue)">
                        <i class="el-icon-lx-roundadd"></i>新增链接
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
              </div>
              <!--表格插件-->
              <div v-loading="exportLoading">
                <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
                  <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
                  <el-table-column fixed prop="name" label="链接名称"></el-table-column>
                  <el-table-column fixed prop="title" label="标题"></el-table-column>
                  <el-table-column fixed label="类型">
                    <template slot-scope="scope">{{map_select[scope.row.adverttype]}}</template>
                  </el-table-column>
                  <el-table-column fixed prop="jumplink" label="链接地址">
                    <template slot-scope="scope">{{ buildUrl(scope.row.imgurl,scope.row.advertid)}}</template>
                  </el-table-column>
                  <el-table-column fixed prop="updatetime" label="最近修改时间"></el-table-column>
                  <el-table-column fixed prop="updateby" label="最后修改人"></el-table-column>
                  <el-table-column fixed prop="remark" label="备注"></el-table-column>

                  <el-table-column fixed="right" label="操作" width="220" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" type="success" @click="openPreviewModal(scope.row)">预览</el-button>
                      <el-button size="mini" type="primary" @click="addTab(editableTabsValue,scope.row,scope.$index)">
                        编辑
                      </el-button>
                      <el-button size="mini" type="danger" @click="deleteRow(scope.row.advertid)">删除</el-button>
                    </template>
                  </el-table-column>
                </myTable>
              </div>
            </div>

            <!--新增和编辑  -->
            <div class="container" v-if="editableTabsValue>1&&editableTabsValue==itemT.name">
              <div class="plugins-tips">
                <div class="plugins-search">
                  <el-form :inline="true" label-position="left" class="formTop newLink" :model="currentAddData"
                           :ref="'currentAddData'+indexT" :rules="ruleData">
                    <el-form-item label-width="100px" label="链接名称：" prop="name">
                      <el-input placeholder="请输入链接名称" v-model="currentAddData.name" class="input-with-select"
                                style="width: 215px"></el-input>
                    </el-form-item>
                    <el-form-item label-width="100px" label="标题：" prop="title">
                      <el-input placeholder="请输入标题" v-model="currentAddData.title" class="input-with-select"
                                style="width: 215px"></el-input>
                    </el-form-item>
                    <el-form-item label-width="100px" label="类型：" prop="adverttype">
                      <el-select v-model="currentAddData.adverttype" placeholder="请选择类型">
                        <el-option v-for="(v,i) in selectData_newAdd" :label="v.label" :value="v.value"
                                   :key="i"></el-option>
                      </el-select>
                    </el-form-item>
                    <!--富文本编辑器-->
                    <el-form-item label-width="100px" label="链接内容：" prop="icontext">

                      <el-upload id="iviewUp" style="display:none;" class="avatar-uploader" :action="actionUrl"
                                 :with-credentials="actionWidth"
                                 :show-file-list="false" :on-success="handleAvatarSuccess"
                                 :before-upload="beforeAvatarUpload">
                        <i class="el-icon-upload"></i>
                      </el-upload>

                      <quill-editor v-model="currentAddData.icontext" ref="myQuillEditor_contract"
                                    :options="editorOption">
                      </quill-editor>

                    </el-form-item>

                    <el-form-item label-width="100px" label="备注：" prop="remark">
                      <el-input type="textarea" v-model="currentAddData.remark" style="width: 400px;"></el-input>
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

    <el-dialog title="预览" :visible.sync="previewModal" width="800px" center class="contract_preview">

      <div class="left">
        <VueQrcode :value="buildUrl(previewModalData.imgurl,previewModalData.advertid)" :options="{ width: 200 }"></VueQrcode>
      </div>
      <div class="right">
        <!--这里一定要加上这个class  ql-editor -->
        <div class="dom ql-editor" v-html="previewModalData.icontext">{{previewModalData.icontext}}</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="previewModal = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import {quillEditor} from 'vue-quill-editor';
  import common from "./../../../assets/common/common";
  import VueQrcode from '@chenfengyuan/vue-qrcode';
  import myTable from "./../../common/myTable";
  import {tableMixin} from "./../../common/commonMixin"; // 混入表格组件所需的数据



  const toolbarOption = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['formula'],
    ['clean'],
    ['link', 'image', 'video'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}]
  ]


  export default {
    components: {
      quillEditor, VueQrcode, myTable
    },
    mixins: [tableMixin],
    data() {
      return {
        searchText: '', // 输入框内容
        selectData: [ // 类型下拉选项
          {label: '全部', value: ''},
        ],
        selectData_newAdd: [], // 新增和编辑时的下拉框选项
        map_select: { // 映射表
          '3': '合同',
          '4': '警示',
        },
        currentSelect: '', // 当前选中的下拉数据








        // 新增链接  表单数据  验证规则
        ruleData: {
          name: [
            {required: true, message: '请输入链接名称', trigger: 'change'},
            {max: 50, message: '最大输入50字符', trigger: 'change'},
          ], // 链接名称
          title: [
            {required: true, message: '请输入标题', trigger: 'change'},
            {max: 50, message: '最大输入50字符', trigger: 'change'},
          ], // 标题
          adverttype: [{required: true, message: '请选择类型', trigger: 'change'}], // 类型
          icontext: [{required: true, message: '请输入链接内容', trigger: 'change'}], // 链接内容
          remark: [{required: false, message: '请输入链接内容', trigger: 'change'}], // 链接内容
        },
        // 分页器数据
        editableTabsValue: '1',
        editableTabs: [
          {title: '合同协议', name: '1',},
        ],
        currentAddData: {
          name: '',
          title: '',
          adverttype: '',
          icontext: '',
          remark: '',
        }, // 当前的添加或者编辑页面的数据 浅复制 可以联动
        tabIndex: 1,
        // 富文本编辑器
        actionWidth: true,
        editorOption: {
          placeholder: '请输入链接内容',
          modules: {
            toolbar: {
              container: toolbarOption,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('#iviewUp input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },

        // 弹框
        previewModal: false, // 预览弹框
        previewModalData: {}, // 预览弹框的数据

      }
    },
    computed: {
      // 是否展示添加按钮
      showAddBtn() {
        return !this.editableTabs.find(e => (e.title === '新增链接'))
      },
      actionUrl: function () {
        return this.$store.state.actionUrl;
      },
    },
    watch: {},
    methods: {
      buildUrl(origin, id){
        return  origin + `/#/scan?id=${id}`
      },
      // 新增链接
      addTab(targetName, v, i) { // v  无数据是新增 有数据是编辑
        let newTabName = ++this.tabIndex + '';
        let obj = { // 初始化数据
          name: v ? v.name : '',
          title: v ? v.title : '',
          adverttype: v ? v.adverttype : '',
          icontext: v ? v.icontext : '',
          remark: v ? v.remark : '',
        }
        v && (obj.advertid = v.advertid) // 是编辑的时候就带上id
        this.editableTabs.push({
          title: !v ? '新增链接' : '编辑链接' + (i + 1 + (this.pagination.pageNumber - 1) * this.pagination.pageSize),
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
        i === 0 && this.init() // 切换到第一个页签时  刷新表格的数据
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
        this.$refs[ref][0].validate((valid) => {
          if (valid) {
            let userName = localStorage.getItem('ms_username');
            let obj = { // 因为这个接口是另外一个服务器  所有后台无法拿到userId对应的名称  所有要手动传值
              updateby: userName, // 修改人
              productid: localStorage.getItem('productId') // 传产品id
            }
            !this.currentAddData.advertid && (obj.createby = userName) // 新增的时候要增加创建人
            // this.currentAddData.jumplink = `${this.myUrl}#/scan/${}/${this.currentAddData.title}`
            // this.currentAddData.jumplink = `/Scan?id=${this.currentAddData.advertid}`

            this.Api.loSaveContractLinkListById(Object.assign({
              materialtype: 4,
            }, this.currentAddData,obj)).then((result) => {
              let res = result.data
              if (res.code === 200) {
                this.$message({type: 'success', message: this.currentAddData.advertid ? '编辑成功！' : '添加成功！'});
                this.removeTab(this.editableTabsValue) // 关闭页签
              } else {
                this.$message({type: 'error', message: res.msg});
              }
            }).catch((err) => {
              this.$message({type: 'error', message: err});
            })
          } else {
            return false
          }
        })

      }),

      // 查询表格数据
      search: common.throttle(function () {
        this.tableData = []
        let obj = {
          materialtype: 4,
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize,
          keyword: this.searchText
        } // 传参  materialtype这个是后台规定传4
        this.currentSelect && (obj.adverttype = this.currentSelect) // 如果选择的是全部  就不传这个参数
        this.exportLoading = true // 打开加载层
        this.Api.loGetContractData(obj).then((result) => {
          let res = result.data
          if (res.code === 200) {
            this.tableData = res.data.list
            this.pagination.total = res.data.total
          } else {
            this.$message({type: 'error', message: res.msg});
          }
          this.exportLoading = false // 关闭加载层
        }).catch((err) => {
          this.$message({type: 'error', message: err});
          this.exportLoading = false // 关闭加载层
        })
      }),

      // 删除一条数据
      deleteRow(id) {
        this.$confirm('是否删除该数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.Api.loDeleteLinkListById({advertid: id}).then((result) => {
            let res = result.data
            if (res.code === 200) {
              this.$message({type: 'success', message: '删除成功！'});
              this.init() // 刷新表格数据
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
      // 点击预览事件
      openPreviewModal: common.throttle(function (v) {
        this.previewModal = true
        this.previewModalData = v
        // this.Api.loCreateQRCode({url: url}).then((result) => {
        //   let res = result.data
        //   if (res.code === 200) {
        //     console.log(res.data)
        //   } else {
        //     this.$message({type: 'error', message: res.msg});
        //   }
        // }).catch((err) => {
        //   this.$message({type: 'error', message: err});
        // })
      }),


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
    },
    mounted() {
    },
  }
</script>

<style lang='scss'>
  .Contract_view {
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
        width: calc(100% - 100px);
      }
      textarea {
        height: 100px;
      }
    }
    .plugins-tips {
      background: #fff;
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
    .ql-align-center{
      text-align: center;
    }
  }

</style>
