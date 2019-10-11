<template>
  <div class="AnnouncementManagement_view">
    <!--新增按钮-->
    <div class="newAdd">
      <span class="add-btn" @click="openModal()">
        <i class="el-icon-lx-roundadd"></i>新增公告
      </span>
    </div>
    <div class="container">
      <!--表格插件-->
      <div v-loading="exportLoading">
        <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
          <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
          <el-table-column fixed prop="title" label="公告名称"></el-table-column>
          <el-table-column fixed prop="imgurl" label="展示">
            <!--<template slot-scope="scope"><img :src="scope.row.imgurl" alt=""></template>-->
          </el-table-column>
          <el-table-column fixed prop="updatetime" label="最近修改时间"></el-table-column>
          <el-table-column fixed prop="updateby" label="最后修改人"></el-table-column>

          <el-table-column fixed="right" label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="openModal(scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger" @click="deleteRow(scope.row.advertid)">删除</el-button>
              <el-button size="mini" type="success" @click="online_offline(scope.row)">上线</el-button>
            </template>
          </el-table-column>
        </myTable>
      </div>
    </div>

    <!--新增和弹框  弹框-->
    <el-dialog :title="`${Modal_isNew?'新增':'编辑'}公告内容`" :visible.sync="showModal" width="60%" center>
      <div>
        <el-form :inline="true" class="formTop1" label-position="left" label-width="100px" align="center"
                 :model="modalData" ref="modalData" :rules="modalDataRule">
          <el-form-item label="公告名称：" prop="name">
            <el-input placeholder="请输入公告名称" v-model="modalData.name" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
          <el-form-item label="公告内容：" prop="content">
            <el-upload id="iviewUp" style="display:none;" class="avatar-uploader" :action="actionUrl"
                       :with-credentials="actionWidth"
                       :show-file-list="false" :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <i class="el-icon-upload"></i>
            </el-upload>
            <quill-editor v-model="modalData.content" ref="myQuillEditor_announcement"
                          :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="展示位置：" prop="location">
            <el-select v-model="modalData.location" placeholder="请选择展示位置">
              <el-option v-for="(item,index) in selectData" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal=false">取 消</el-button>
        <el-button type="primary" @click="submit('modalData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import myTable from "./../../common/myTable";
  import {tableMixin} from "./../../common/commonMixin"; // 混入表格组件所需的数据
  import common from "./../../../assets/common/common";
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import {quillEditor} from 'vue-quill-editor';

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
    components: {myTable,quillEditor},
    mixins: [tableMixin],
    data() {
      return {
        tableData: [{}], // 表格数据

        // 弹框数据
        showModal: false, // 控制弹框是否打开
        Modal_isNew: true, // 是否是新增
        modalData: {},// 弹框的数据
        modalDataRule: { // 弹框的校验规则
          name: [
            {required: true, message: '请输入公告名称', trigger: 'change'},
            {max: 10, message: '最多输入10个字符', trigger: 'change'},
          ],
          content: [{required: true, message: '请输入公告内容', trigger: 'change'}],
          location: [{required: true, message: '请选择展示位置', trigger: 'change'}],
        },
        selectData: [ // 展示位置的弹框
          {label: '首页', value: '1'},
          {label: '媒体报道', value: '2'},
          {label: '全局', value: '3'},
        ],
        // 富文本编辑器
        actionWidth: true,
        editorOption: {
          placeholder: '请输入公告内容',
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
      }
    },
    computed: {
      actionUrl: function () {
        return this.$store.state.actionUrl;
      },
    },
    watch: {},
    methods: {
      // 删除一条数据
      deleteRow(id) {
        this.$confirm('确定要删除此条记录吗？', '提示', {
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
      // 上线 或者 下线
      online_offline() {
        this.$confirm('确定上线吗？', '提示', {
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
      // 新增或编辑一条数据
      openModal(v){
        this.Modal_isNew = v == undefined
        this.modalData = v || { // 新增的时候就清空数据
          name: '',
          content: '',
          location: '',
        }
        this.showModal = true // 打开弹框
      },
      handleAvatarSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let vm = this;
        let quill = this.$refs.myQuillEditor_announcement[0].quill;
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

      // 提交新增和编辑
      submit: common.throttle(function (ref) {
        // 验证表单数据   这里的表单验证有点问题  卧槽  放在el-tab-pane里面没有validate函数
        this.$refs[ref].validate((valid) => {
          if (valid) {
            let userName = localStorage.getItem('ms_username');
            let obj = { // 因为这个接口是另外一个服务器  所有后台无法拿到userId对应的名称  所有要手动传值
              updateby: userName, // 修改人
              productid: localStorage.getItem('productId') // 传产品id
            }
            !this.currentAddData.advertid && (obj.createby = userName) // 新增的时候要增加创建人
            this.currentAddData.jumplink = `${this.myUrl}#/scan/${this.currentAddData.advertid}/${this.currentAddData.title}`
            this.Api.loSaveContractLinkListById(Object.assign({
              materialtype: 4,
              // filecontent: this.tran_htmlContent()
            }, this.currentAddData, obj)).then((result) => {
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

      init(){

      }
    },
    created() {
      this.init()
    },
    mounted() {
    },
  }
</script>

<style lang='scss'>
  .AnnouncementManagement_view{
    .newAdd{
      width: 100%;
      height: 36px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
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
    }
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
    .el-form-item__content{
      width: calc(100% - 100px);
    }
    .formTop1{
      display: flex;
      flex-direction: column;
      justify-content: left;
      align-items: end;
      .el-form-item{
        display: flex;
        justify-content: left;
      }
    }
  }

</style>
