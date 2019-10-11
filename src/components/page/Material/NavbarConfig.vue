<template>
  <div class="NavbarConfig_view">
    <el-tabs type="border-card" v-model="currentTab">
      <el-tab-pane v-for="(v,i) in tabPane" :key="i" :label="v.label">
        <!--表格上方提示语-->
        <div class="plugins-tips">
          为保障用户体验，icon图统一为PNG格式，尺寸：80*80px，大小不超过1M
          <div class="add-btn" @click="openModal()">
            <i class="el-icon-lx-roundadd"></i>新增底部标签{{i<2?'':'素材'}}管理
          </div>
        </div>
        <!--表格  前面两个标签-->
        <div v-loading="exportLoading" v-show="currentTab!=2">
          <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
            <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
            <el-table-column fixed prop="name" label="应用"></el-table-column>
            <el-table-column fixed prop="title" label="用户状态"></el-table-column>
            <el-table-column fixed prop="title" label="生效时间"></el-table-column>
            <el-table-column fixed prop="title" label="图片内容"></el-table-column>
            <el-table-column fixed prop="title" label="链接地址"></el-table-column>
            <el-table-column fixed prop="title" label="状态"></el-table-column>
            <el-table-column fixed prop="title" label="最近修改时间"></el-table-column>
            <el-table-column fixed prop="title" label="最近修改人"></el-table-column>

            <el-table-column fixed="right" label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="openModal(scope.row,scope.$index)">编辑</el-button>
                <el-button size="mini" type="warning" @click="openPreviewModal(scope.row)">停用</el-button>
                <el-button size="mini" type="danger" @click="deleteRow(scope.row.advertid)">删除</el-button>
              </template>
            </el-table-column>
          </myTable>
        </div>
        <!--表格  第三个标签-->
        <div v-loading="exportLoading" v-show="currentTab == 2">
          <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
            <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
            <el-table-column fixed prop="name" label="标签名称"></el-table-column>
            <el-table-column fixed prop="title" label="底部标签配文"></el-table-column>
            <el-table-column fixed prop="title" label="图片预览"></el-table-column>

            <el-table-column fixed="right" label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="openModal(scope.row,scope.$index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteRow(scope.row.advertid)">删除</el-button>
              </template>
            </el-table-column>
          </myTable>
        </div>

      </el-tab-pane>
    </el-tabs>

    <!--ios和Android的新增编辑弹框-->
    <el-dialog :title="`${modalPre_isAdd?'新增':'编辑'}底部标签`" :visible.sync="modalPre" width="800px" center
               class="contract_preview">
      <el-form :inline="true" class="formTop1" label-position="left" label-width="120px" align="center"
               :model="modalPre_data" ref="modalPre_data" :rules="modalPre_dataRule">
        <el-form-item label="名称：" prop="name">
          <el-input placeholder="请输入名称" v-model="modalPre_data.name" class="input-with-select"
                    style="width: 215px"></el-input>
        </el-form-item>
        <el-form-item label="用户状态：" prop="status">
          <el-select v-model="modalPre_data.status" placeholder="请选择用户状态">
            <el-option v-for="(item,index) in statusOption" :label="item.label" :value="item.value"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startDate">
          <el-date-picker v-model="modalPre_data.startDate" type="date" placeholder="请选择开始时间"
                          style="width: 215px"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker v-model="modalPre_data.endDate" type="date" placeholder="请选择结束时间"
                          style="width: 215px"></el-date-picker>
        </el-form-item>
        <el-form-item label="链接地址：" prop="link">
          <el-input placeholder="请输入链接地址" v-model="modalPre_data.link" class="input-with-select"
                    style="width: 215px"></el-input>
        </el-form-item>
        <el-form-item label="配置图片内容：" prop="photoList">
        </el-form-item>
        <el-form-item labelWidth="0px">
          <el-row v-for="(v,i) in modalPre_data.photoList" :key="i" :gutter="20" class="dialog-advertItem">
            <el-col :span="18" class="dialog-advertItem-left">
              <el-col :span="8">
                <el-select size="mini" v-model="v.advertid" filterable @change="changeMertial">
                  <el-option v-for="item in photoOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6" class="dialog-advertItem-img">
                <img :src="getAdvertImgurl(v.advertid)"/>
              </el-col>
              <el-col :span="10">
                <el-input size="mini" :value="getAdvertJumplink(v.advertid)" readonly>

                </el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" v-if="i==modalPre_data.photoList.length-1" icon="el-icon-plus"
                         circle @click="addMaterialItem"></el-button>
              <el-button type="danger" v-if="modalPre_data.photoList.length>1"
                         @click="removeMaterialItem(i)" icon="el-icon-minus" circle></el-button>
              <el-button v-if="i>0 && modalPre_data.photoList.length>1" @click="upMaterialItem(i)"
                         type="warning" icon="el-icon-upload2" circle></el-button>
              <el-button
                v-if="modalPre_data.photoList.length>1 && i!=modalPre_data.photoList.length-1"
                @click="downMaterialItem(i)" type="warning" icon="el-icon-download" circle>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="modalPre=false">取 消</el-button>
        <el-button type="primary" @click="modalPre=false">确 定</el-button>
      </span>
    </el-dialog>

    <!--底部标签栏管理的新增编辑弹框-->
    <el-dialog :title="`${modalThird_isAdd?'新增':'编辑'}底部标签素材`" :visible.sync="modalThird" width="800px" center
               class="contract_preview">
      <div style="padding-left: 50px;margin-bottom: 20px"><em class="el-icon-info"></em> 为保障用户体验，icon图统一为PNG格式，尺寸：80*80px，大小不超过1M</div>
      <el-form :inline="true" class="formTop1" label-position="left" label-width="120px" align="center"
               :model="modalThird_data" ref="modalThird_data" :rules="modalThird_dataRule">
        <el-form-item label="名称：" prop="name">
          <el-input placeholder="请输入名称" v-model="modalThird_data.name" class="input-with-select"
                    style="width: 215px"></el-input>
        </el-form-item>
        <el-form-item label="底部标签配文：" prop="label">
          <el-input placeholder="请输入底部标签配文" v-model="modalThird_data.label" class="input-with-select"
                    style="width: 215px"></el-input>
        </el-form-item>
        <el-form-item label="颜色：" prop="color">
          <el-input placeholder="rgba(0,0,0,0)" v-model="modalThird_data.color" class="input-with-select"
                    style="width: 215px"></el-input>
        </el-form-item>
        <el-form-item label="上传图片：" prop="photo" class="photoUpload">
          <div>
            <el-upload class="avatar-uploader" drag :action="actionUrl" multiple
                       :on-success="photoUpload" :before-upload="photoBeforeUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
            <p>选中状态</p>
          </div>
          <div>
            <el-upload class="avatar-uploader" drag :action="actionUrl" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
            <p>默认状态</p>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="modalThird=false">取 消</el-button>
        <el-button type="primary" @click="modalThird=false">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import myTable from "./../../common/myTable";
  import {tableMixin} from "./../../common/commonMixin";


  export default {
    components: {myTable},
    mixins: [tableMixin],
    data() {
      return {
        tableData: [{}],
        tabPane: [ // 导航标签的数据
          {label: 'ios_底部标签栏管理',},
          {label: 'android_底部标签栏管理',},
          {label: '底部标签栏素材管理',},
        ],
        currentTab: '0', // 当前是第几个导航标签

        // 前面两个标签的弹框
        modalPre: false, // 弹框是否打开
        modalPre_isAdd: false, // 弹框是否是新增
        modalPre_data: {
          photoList: [{}],
        }, // 弹框中的数据
        modalPre_dataRule: { // 弹框的验证规则
          name: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {max: 10, message: '最多输入10个字符', trigger: 'change'},
          ],
          status: [{required: true, message: '请选择用户状态', trigger: 'change'}],
          startDate: [{required: true, message: '请选择开始时间', trigger: 'change'}],
          endDate: [{required: true, message: '请选择结束时间', trigger: 'change'}],
          link: [{required: true, message: '请输入链接地址', trigger: 'change'}],
          photoList: [{required: true, message: '请配置图片内容', trigger: 'change'}],
        },
        statusOption: [ // 用户状态下拉选项
          {label: '全部用户', value: '1'},
        ],
        photoOption: [
          {label: '首页', value: '1'},
          {label: '发现', value: '2'},
          {label: '操作', value: '3'},
          {label: '我的', value: '4'},
        ],

        // 第三个标题的弹框
        modalThird: false, // 弹框是否打开
        modalThird_isAdd: false, // 弹框是否是新增
        modalThird_data: { // 弹框的form数据

        },
        modalThird_dataRule: { // 验证规则
          name: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {max: 10, message: '最多输入10个字符', trigger: 'change'},
          ],
          label: [{required: true, message: '请输入底部标签配文', trigger: 'change'}],
          color: [{required: true, message: '请输入颜色', trigger: 'change'}],
        }


      }
    },
    computed: {
      actionUrl() { // 图片的上传url
        return this.$store.state.actionUrl;
      },
      getAdvertImgurl: function () {
        return function (id) {
          let list = this.$store.state.dialogMaterialListAll.list;
          if (list) {
            for (let i = 0; i < list.length; i++) {
              if (list[i].advertid == id) {
                return list[i].imgurl;
              }
            }
          }
        }
      },
      getAdvertJumplink() {
        return function (id) {
          let list = this.$store.state.dialogMaterialListAll.list;
          if (list) {
            for (let i = 0; i < list.length; i++) {
              if (list[i].advertid == id) {
                return list[i].jumplink;
              }
            }
          }

        }
      },
    },
    watch: {},
    methods: {


      // 打开新增或编辑弹框  --前面两个标签
      openModal(v) {
        if (this.currentTab < 2) { // 打开前两个标签的弹框
          this.modalPre_isAdd = v === undefined
          this.modalPre = true
        } else { // 打开第三个标签里面的弹框
          this.modalThird_isAdd = v === undefined
          this.modalThird = true
        }

      },
      // 删除一条数据
      deleteRow() {

      },
      // 内容配置的下拉框选择时
      changeMertial() {

      },
      // 增加一行
      addMaterialItem() {

      },
      // photo 上传成功
      photoUpload(file) {
        if (file.code === 200) {
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
        } else {
          this.$message.warning(file.msg);
        }
        this.loaded = false;
      },
      // photo 上传之前
      photoBeforeUpload(file) {
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


      init() {

      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang='scss'>
  .NavbarConfig_view {
    .plugins-tips {
      background: #eef1f6
    }
    .add-btn {
      float: right;
      font-size: 16px;
      margin-right: 20px;
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
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 50px;
    }

    .avatar-uploader {
      width: 220px;
      height: 230px;

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
    .el-upload__tip {
      text-align: left;
    }
    .photoUpload {
      display: flex;
      justify-content: left;
      .el-form-item__content {
        display: flex;
        justify-content: left;
        > div {
          margin-right: 20px;
          > p {
            color: #000;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
