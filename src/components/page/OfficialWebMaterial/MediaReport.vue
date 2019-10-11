<template>
  <div class="MediaReport_view">
    <!--新增按钮-->
    <div class="newAdd">
      <span class="add-btn" @click="openModal()">
        <i class="el-icon-lx-roundadd"></i>新增报道
      </span>
    </div>
    <div class="container">
      <!--表格插件-->
      <div v-loading="exportLoading">
        <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
          <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
          <el-table-column fixed prop="title" label="标题"></el-table-column>
          <el-table-column fixed prop="imgurl" label="摘要图片">
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
    <el-dialog :title="`${Modal_isNew?'新增':'编辑'}报道`" :visible.sync="showModal" width="30%" center>
      <div>
        <el-form :inline="true" class="formTop1" label-position="left" label-width="100px" align="center"
                 :model="modalData" ref="modalData" :rules="modalDataRule">
          <el-form-item label="标题：" prop="title">
            <el-input placeholder="请输入标题" v-model="modalData.title" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
          <el-form-item label="摘要：" prop="summary">
            <el-input placeholder="请输入摘要" v-model="modalData.summary" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
          <el-form-item label="上传图片：" prop="img">
            <el-upload class="avatar-uploader" drag :action="actionUrl" multiple
                        :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只支持上传jpg/png文件，尺寸****，且文件大小不超过</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="跳转链接：" prop="jumpURL">
            <el-input placeholder="请输入跳转链接" v-model="modalData.jumpURL" class="input-with-select"
                      style="width: 215px"></el-input>
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


  export default {
    components: {myTable},
    mixins: [tableMixin],
    data() {
      return {
        tableData: [{}], // 表格数据

        // 弹框数据
        showModal: false, // 控制弹框是否打开
        Modal_isNew: true, // 是否是新增
        modalData: { // 弹框的数据
          // title: '',
          // summary: '',
          // jumpURL: '',
          // img: null,
        },
        modalDataRule: { // 弹框的校验规则
          title: [
            {required: true, message: '请输入标题', trigger: 'change'},
            {max: 30, message: '最多输入30个字符', trigger: 'change'},
          ],
          summary: [{required: true, message: '请输入摘要', trigger: 'change'}],
          img: [{required: true, message: '请上传图片', trigger: 'change'}],
          jumpURL: [{required: true, message: '请输入跳转链接', trigger: 'change'}],
        },
        loaded: false, // 上传图片中...


      }
    },
    computed: {
      actionUrl() {
        return this.$store.state.actionUrl;
      }
    },
    watch: {},
    methods: {
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
          title: '',
          summary: '',
          jumpURL: '',
          img: null,
        }
        this.showModal = true // 打开弹框
      },
      // 校验图片的格式和大小
      beforeAvatarUpload1(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传启动图只能是PNG或JPG 格式!');
          this.loaded = false;
          return;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过1MB!');
          this.loaded = false;
          return;
        }
        this.loaded = true;
        return isJPG && isLt2M;
      },
      // 上传图片成功的回调
      handleAvatarSuccess1(file){
        if(file.code === 200){
          this.imageUrl1 = URL.createObjectURL(file.raw);
          let img = new Image();
          img.src = this.imageUrl1;
          img.onload = () => {
            this.modalData.img = {}
            this.modalData.img.imgmeasure = img.width + '*' + img.height;
            this.modalData.img.imgsize = (file.size / 1024).toFixed(2) + 'KB';
            this.modalData.img.imgurl = this.imageUrl1;
            this.modalData.img.fileid = res.data.id;
            this.modalData.img.filename = file.name;
            console.log(this.modalData);
          };
        }else{
          this.$message.warning(file.msg);
        }
        this.loaded = false;

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



      init() {

      },
    },
    created() {
      this.init()
    },
    mounted() {
    },
  }
</script>

<style lang='scss' >
  .MediaReport_view {
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
    .el-up-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      padding-top: 30px;
      color: #ffffff;

      i {
        color: #ffffff;
        font-size: 24px;
      }
    }
    .el-upload__tip{
      text-align: left;
    }
  }
</style>
