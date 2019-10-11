<!-- push 群发 -->
<template>
  <div class="pushGroup">
    <transition name="el-zoom-in-bottom">
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="新建群发">
            <!-- push群发tips -->
            <div class="plugins-tips">
              为保障用户体验，PUSH消息群发请务必严谨，下发前请先内部测试，确认无误后再对用户进行批量下发。晚上10:00至早上8:00禁止对用户下发。
            </div>
            <div v-loading="formLoading">
              <!-- 新建push群发表单 -->

              <div class="content-form ">

                <!--上面是公共的-->
                <el-form ref="bulkData" :model="bulkData" :rules="bulkDataRules" label-width="100px">
                  <!-- 选择群发对象 有三个联动的效果 -->
                  <el-form-item label="群发对象：" prop="pushObject">
                    <el-select v-model="bulkData.pushObject" placeholder="请选择群发对象" @change="changePushObject">
                      <el-option v-for="(item,index) in objectOption" :label="item.label"
                                 :value="item.value" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-show="bulkData.pushObject == 1" prop='fileList'>
                    <el-upload :action="saveUrl" ref="upload" :with-credentials="actionWidth"
                               :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1"
                               :on-remove="removeFile" :on-change="fileChange"
                               :file-list="bulkData.fileList" :limit="fileNumber"
                               :on-exceed="fileExceed">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传txt文件，且用户数量不超过5万条</div>
                    </el-upload>
                  </el-form-item>
                  <!-- 若选择指定用户  show-->
                  <el-form-item v-show="bulkData.pushObject == 2" prop="pushObjectList">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="用户ID，限20个，请用逗号隔开" v-model="bulkData.pushObjectList">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="已选择用户：" v-if="bulkData.pushObject==1||bulkData.pushObject==2">
                    <div v-if="bulkData.pushObject == 1">{{userNumber}}</div>
                    <div v-else>{{inputNumber}}</div>
                  </el-form-item>

                  <!--新迭代选项-->
                  <el-form-item label="标签名称：" prop="labelName" v-if="bulkData.pushObject==3">
                    <el-select v-model="bulkData.labelName" clearable filterable remote reserve-keyword
                               placeholder="请输入标签名称"
                               :remote-method="findTabName" :loading="labelName_loading" @change="findTabNameDes"
                               @clear="findTabName">
                      <el-option v-for="(item,index) in labelNameOption" :label="item.label" :value="item.value"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="操作名称：" v-show="operatingNameOption.length" v-if="bulkData.pushObject==3">
                    <el-select v-model="bulkData.operatingName" placeholder="请选择操作名称" @change="changeOperatingName">
                      <el-option v-for="(item,index) in operatingNameOption" :label="item.label"
                                 :value="item" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="操作：" v-show="operatingOption.length" v-if="bulkData.pushObject==3">
                    <el-select v-model="bulkData.operating" placeholder="请选择操作">
                      <el-option v-for="(item,index) in operatingOption" :label="item.label"
                                 :value="item" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="操作内容：" v-if="bulkData.pushObject==3">
                    <el-select v-model="bulkData.operatingContent" placeholder="请选择操作" v-if="operatingContentOption.length">
                      <el-option v-for="(item,index) in operatingContentOption" :label="item.label"
                                 :value="item.value" :key="index"></el-option>
                    </el-select>
                    <el-input type="text" placeholder="请输入操作内容" v-model.trim="bulkData.operatingContent" v-else
                              style="width: 300px;">
                    </el-input>
                    <el-button type="primary" style="margin-left: 15px" :disabled="!canBuildOperate"
                               @click="buildOperation()">生成操作
                    </el-button>
                  </el-form-item>
                  <!--生成操作内容的列表-->
                  <el-form-item class="operatingContentList" prop="operatingContentList" v-if="bulkData.pushObject==3">
                    <div v-for="(v,i) in bulkData.operatingContentList" :key="i" class="item">
                      <p v-html="v.label" :title="v.label"></p> <em class="el-icon-circle-close"
                                                                    @click="removeOperate(i)"></em>
                    </div>
                  </el-form-item>
                  <!-- 选择群发时间 -->
                  <el-form-item label="群发时间：" prop="sendTime">
                    <el-date-picker v-model="bulkData.sendTime"
                                    value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                                    :picker-options="pickerOptions1" placeholder="选择群发时间">
                    </el-date-picker>
                  </el-form-item>

                  <!-- 选择业务类型 -->
                  <el-form-item label="业务类型：" prop="businessType">
                    <el-select v-model="bulkData.businessType" placeholder="请选业务类型">
                      <el-option v-for="(item,index) in businessTypeOption" :label="item.label"
                                 :value="item.value" :key="index"></el-option>
                    </el-select>
                  </el-form-item>

                </el-form>

                <!--每个页面特殊的地方-->
                <el-form ref="formData" :model="formData" :rules="formDataRules"
                         label-width="100px">
                  <!--  输入Push ID-->
                  <el-form-item label="Push ID：" prop="pushId">
                    <el-input type="text" placeholder="请输入Push ID" v-model="formData.pushId">
                    </el-input>
                  </el-form-item>

                  <!-- Push内容 -->
                  <el-form-item label="Push内容：">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled
                              placeholder="输入Push ID后自动填充Push内容" v-model="formData.content">
                    </el-input>
                    <div :class='["contentLength",codeLength>=200?"redText":""]'>{{codeLength}}/200
                    </div>
                  </el-form-item>


                  <!-- 跳转方式 -->
                  <el-form-item label="跳转方式：">
                    <el-select disabled v-model="formData.jumpType" placeholder="跳转方式">
                      <el-option v-for="(item,index) in optionJumpType" :label="item.label"
                                 :value="item.value" :key="index"></el-option>
                    </el-select>
                  </el-form-item>

                  <!-- 跳转链接 -->
                  <el-form-item label="跳转链接："
                                v-if="formData.jumpType == 0 || formData.jumpType == 1">
                    <el-input type="text" disabled placeholder="跳转链接"
                              v-model="formData.jumpLink">
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>

              <!-- 点击提交按钮 -->
              <div class="content-submit-btn">
                <el-button type="primary" @click="sendApply('formData')">发送申请</el-button>
                <el-button type="primary" @click="testApply('formData')">测试发送</el-button>
              </div>
            </div>
          </el-tab-pane>


          <!-- 群发列表 -->
          <el-tab-pane label="群发列表" v-loading="exportLoading">
            <div class="plugins-tips">
              <el-form :inline="true">
                <el-form-item label="状态：">
                  <el-radio-group v-model="checkStatus" @change="getCheckStatus">
                    <el-radio-button v-for="item in statusOption" :label="item.value"
                                     :value='item.value' :key="item.value">
                      {{item.label}}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="群发对象：">
                  <el-select v-model="listPushObject" placeholder="请选择群发对象" @change="listPushObjectChange">
                    <el-option v-for="(item,index) in [{label:'全部',value:'0'}].concat(objectOption)" :label="item.label"
                               :value="item.value" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="搜索：">
                  <el-input placeholder="请输入内容" v-model="searchList" class="input-with-select">
                    <el-button slot="append" type="primary" @click="keyWordSearch">搜索</el-button>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="exportList">导出</el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="false">
                <el-form-item label="请选择表格显示项">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                               @change="handleCheckAllChange">全选
                  </el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedTables" @change="handleCheckedChange">
                    <el-checkbox v-for="(item,index) in tableOptions" checked :label="item"
                                 :key="index">{{item.label}}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </div>
            <el-table stripe v-loading="loading" :data="queryMassMessageMassList.list || []" border
                      style="width: 100%">


              <!-- 中间可屏蔽项 -->
              <template v-for="col in checkedTables">
                <el-table-column :prop="col.prop" :label="col.label" :key="col.label"
                                 :type="col.type=='index'? 'index':''" v-if="col.type == 'popover'"
                                 :width="widthTh(col.type)" :formatter="col.formatters">
                  <template slot-scope="scope">
                    <el-popover placement="top-start" trigger="click" :content="scope.row.url">
                      <el-button slot="reference">{{col.popoverTitle}}</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column :prop="col.prop" :label="col.label" :key="col.label"
                                 :type="col.type=='index'? 'index':''" v-else :width="widthTh(col.type)"
                                 :formatter="col.formatters">
                </el-table-column>
              </template>

              <!-- 操作项不能屏蔽 -->

              <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary"
                             @click="changeRecord(scope.$index, scope.row)">变更记录
                  </el-button>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :current-page="pageNumber" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="queryMassMessageMassList.total">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>

        <!-- 变更记录弹窗 -->
        <el-dialog title="变更记录" :visible.sync="dialogTableVisible" width="60%">
          <el-table :data="changeRecordList">
            <el-table-column property="type" label="类型" :formatter="filterType"></el-table-column>
            <el-table-column property="time" label="时间"></el-table-column>
            <el-table-column property="reason" label="原因"></el-table-column>
            <el-table-column property="dealman" label="处理人"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </transition>

  </div>
</template>

<script>
  import api from '@/assets/api/index';
  import {apiUrl} from "../../../assets/base/env";
  import {Loading} from 'element-ui';
  import {bulkDataMixin} from "./../../common/commonMixin";


  export default {
    name: "PushGroupsent",
    mixins: [bulkDataMixin],
    data() {
      var checkPushId = (rule, value, callback) => {
        let _this = this;
        if (!value) {
          return callback(new Error('Push Id不能为空'));
        }

        if (value.length < 18) {
          callback(new Error('请输入正确长度的Push ID'));
        } else {
          this.formLoading = true;
          api.msGetSysEventDetailById({
            id: value
          }).then((res) => {
            this.formLoading = false;
            if (res.data.code == 200) {
              if (res.data.data) {
                if (res.data.data.messagetype == '2') {
                  this.Api.msGetSysEventDetailById({
                    id: this.formData.pushId
                  }).then((res) => {
                    if (res.data.code == 200) {
                      if (res.data.data) {
                        if (res.data.data.messagetype == '2') {
                          this.formData.content = res.data.data
                            .content;
                          this.formData.jumpType = res.data.data
                            .jumpinner == null ? 2 : res.data.data
                            .jumpinner;

                          this.formData.jumpLink = res.data.data
                            .gotourl || '';
                          this.formData.title = res.data.data.title ||
                            '';
                        } else {
                          callback(new Error('请输入Push类型的id'));
                        }
                      } else {
                        callback(new Error("渠道id不正确或者消息类型不匹配"));
                      }


                    } else {
                      this.formData.content = '';
                      callback(new Error(res.data.msg));
                    }
                  });
                  callback();
                } else {
                  callback(new Error('请输入Push类型的id'));
                }
              } else {
                callback(new Error("渠道id不正确或者消息类型不匹配"));
              }

            } else {
              _this.formData.content = '';
              callback(new Error(res.data.msg));
            }
          }).catch((err) => {
            this.formLoading = false;
            callback(new Error(err.msg));
          });
        }
      };
      return {
        dialogTableVisible: false, // 变更记录弹窗
        changeRecordList: [], // 变更记录列表


        loading: true, // 表格loading

        exportLoading: false, // 列表页面顶部搜索相关的loading

        // fileList: [], //文件列表 -- 这个好像没有用到


        pageNumber: 1, // 表格分页相关
        pageSize: 10, // 表格分页相关


        statusOption: [ // 列表页面  状态下拉数据
          {label: "已发送", value: 3},
          {label: "未发送", value: 0}
        ],
        // jumpType: [  // --这里好像没有用到呀
        //   {label: '无', value: '1'},
        //   {label: '外链', value: '2'},
        //   {label: '内链', value: '3'}
        // ],

        formDataRules: {
          pushId: [{required: true, validator: checkPushId, trigger: 'blur'}]
        },
        formData: {
          pushId: '', //push Id
          content: '', //push内容
          jumpLink: '', //跳转地址
          jumpType: '', //跳转方式
        },


        checkStatus: 3, //列表状态  默认已发送
        queryMassMessageMassList: [], //列表
        listPushObject: "0", //列表群发对象  默认全部
        searchList: '', //搜索关键字
        isIndeterminate: false,
        checkedTables: [], //选择的表头
        checkAll: true,
        tableOptions: [
          {
            label: '序号',
            prop: '',
            type: 'index'
          },
          {
            label: '群发Id',
            prop: 'id',
            type: 'normal'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            type: 'time',
          },
          {
            label: '群发时间',
            prop: 'expectTime',
            type: 'time',
          },
          {
            label: '群发对象',
            prop: 'sendType',
            type: 'filter',
            formatters: this.filterObj
          },
          {
            label: 'push消息内容',
            prop: 'content',
            type: 'content'
          },
          {
            label: '链接',
            prop: 'url',
            type: 'popover',
            popoverTitle: '查看'
          },
          {
            label: '群发数量',
            prop: 'sendTotal',
            type: 'normal'
          },
          {
            label: '下发成功数',
            prop: 'successTotal',
            type: 'normal'
          },
          {
            label: '下发失败数',
            prop: 'failTotal',
            type: 'normal'
          },
          {
            label: '状态',
            prop: 'status',
            type: 'filter',
            formatters: this.filterStatus
          }
        ], //所有表头


      }
    },
    computed: {

      // canUpload: function () {
      //   return this.fileList.length > 0
      // },
      optionJumpType: function () {
        return [{
          value: 0,
          label: '跳转外链'
        },
          {
            value: 1,
            label: '跳转内链'
          },
          {
            value: 2,
            label: '只显示不跳转'
          }
        ];
      },
      // 获取内容字符长度
      codeLength: function () {
        let length = 0;
        let str = this.formData.content;
        for (let i = 0; i < str.length; i++) {
          let iCode = str.charCodeAt(i);
          if ((iCode >= 0 && iCode <= 255) || (iCode >= 0xff61 && iCode <= 0xff9f)) {
            length += 1;
          } else {
            length += 2;
          }
        }
        if (length >= 200) {
          this.formData.content = str.substr(0, length);
        }
        return length;

      },
      // 特殊表头宽度
      widthTh() {
        return function (val) {
          if (val == 'content') {
            return '300'
          } else if (val == 'time') {
            return '150'
          } else {
            return ''
          }
        }
      },
    },
    methods: {
      //导出列表
      exportList() {
        this.exportLoading = true;
        let url = apiUrl + '/opt/smsmass/exportPushMessageList?status=' + this.checkStatus + '&sendType=' + this
          .listPushObject + '&keyword=' + this.searchList;
        window.location.href = url;
        setTimeout(() => {
          this.exportLoading = false;
        }, 1000)

      },
      //发送申请
      sendApply(formName) {
        let valid_common, valid_special
        this.$refs['bulkData'].validate((valid) => {
          valid_common = valid
        })
        this.$refs['formData'].validate((valid) => {
          valid_special = valid
        })

        if (valid_common && valid_common) {
          this.formLoading = true;
          let params = {
            id: this.formData.pushId, // pushID
            sendType: this.bulkData.pushObject, // 群发对象
            expectTime: String(new Date(this.bulkData.sendTime)), // 群发时间
            type: this.bulkData.businessType, // 业务类型
          }
          switch (this.bulkData.pushObject) {
            case '1':
              // 若选择的用户包
              params.sendTotal = this.userNumber; // 用户数量
              params.fileId = this.bulkData.fileList[0].uid; // 用户包id
              break;
            case '2':
              // 若选择的指定用户
              params.inputUser = this.bulkData.pushObjectList; // 输入的用户列表
              params.sendTotal = this.inputNumber; //用户数量
              break;
            case '3':
              this.organizeData(params)
              break;
          }
          api.sentSavePushBatchInfo(params).then((res) => {
            if (res.data.code == 200) {
              this.$refs.upload.clearFiles();
              this.userNumber = 0;
              this.inputNumber = 0;
              this.$refs['bulkData'].resetFields();
              this.$refs['formData'].resetFields();
              this.formData.content = '';
              this.formData.jumpType = '';
              this.formData.jumpLink = '';
              this.formData.title = '';
              this.$message({
                type: 'success',
                message: '提交成功'
              });
              this.getQueryMassMessageMassLi();
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              });
            }
            this.formLoading = false;
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err.msg
            });
            this.formLoading = false;
          })
        }
        return false

      },
      //测试发送
      testApply(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$prompt('请输入测试手机号码', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
              inputPattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              inputErrorMessage: '请输入正确的手机号码'
            }).then(({
                       value
                     }) => {
              this.formLoading = true;
              api.auSendPushTest({
                messageid: this.formData.pushId,
                mobile: value
              }).then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '发送成功'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  });
                }
                this.formLoading = false;
              }).catch((err) => {
                this.formLoading = false;
                this.$message({
                  type: 'error',
                  message: err.msg
                });
              });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消测试'
              });
            });
          } else {

            return false;
          }
        });
      },
      //选择页
      handleCurrentChange(val) {
        this.pageNumber = val;
        this.getQueryMassMessageMassLi();
      },
      //选择每页显示数量
      handleSizeChange(val) {
        this.pageSize = val;
        this.getQueryMassMessageMassLi();
      },
      //输入关键字搜索
      keyWordSearch() {
        //先重置页
        this.pageSize = 10;
        this.pageNumber = 1;
        this.getQueryMassMessageMassLi();
      },
      //选择筛选群发对象
      listPushObjectChange() {
        //先重置页
        this.pageSize = 10;
        this.pageNumber = 1;
        this.getQueryMassMessageMassLi();
      },
      //选择 是否发送 列表筛选
      getCheckStatus(val) {
        //先重置页
        this.pageSize = 10;
        this.pageNumber = 1;
        if (val == '未发送') {
          this.getQueryMassMessageMassLi('0');
        } else {
          this.getQueryMassMessageMassLi('1');
        }
      },
      // 获取群发消息列表
      getQueryMassMessageMassLi() {
        this.loading = true;
        api.sentQueryMassMessageMassList({
          messagetype: 2,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          status: this.checkStatus,
          sendType: this.listPushObject,
          keyword: this.searchList
        }).then((res) => {
          if (res.data.code == 200) {
            this.queryMassMessageMassList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
          }
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
        })
      },
      //根据Id 获取物料内容
      getSysEventDetailById() {
        this.formData.content = '';
        this.formData.jumpType = '';
        this.formData.jumpLink = '';
        if (this.formData.pushId && this.formData.pushId.length >= 18) {
          this.Api.msGetSysEventDetailById({
            id: this.formData.pushId
          }).then((res) => {
            if (res.data.code == 200) {
              if (res.data.data) {
                if (res.data.data.messagetype == '2') {
                  this.formData.content = res.data.data.content;
                  this.formData.jumpType = res.data.data.jumpinner || 0;
                  this.formData.jumpLink = res.data.data.gotourl || '';
                } else {
                  this.$message.error("请输入Push类型的id");
                }
              } else {
                this.$message.error("渠道id不正确或者消息类型不匹配");
              }


            } else {
              this.formData.content = '';
              this.$message.error(res.data.msg);
            }
          })
        }

      },


      //查看变更记录
      changeRecord(index, row) {
        api.sentQueryUpdatelogByid({
          id: row.id,
          messagetype: 2
        }).then((res) => {
          if (res.data.code == 200) {
            this.changeRecordList = res.data.data;
            this.dialogTableVisible = true;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
          }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: "服务器繁忙，请稍后再试"
          });
        })
      },
      //全选表头
      handleCheckAllChange(val) {
        this.checkedTables = val ? this.tableOptions : [];
        this.isIndeterminate = false;
      },
      //选择表头变更
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.tableOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableOptions.length;
      },

      //跳转方式过滤
      filterJumptype(row, column) {
        switch (row.jumptype) {
          case 1:
            return '内部打开h5链接';
          case 2:
            return '外部打开h5链接';
          case 3:
            return '仅展示不跳转';
        }
      },
      //群发对象过滤
      filterObj(row, column) {
        switch (row.sendType) {
          case 0:
            return '全部';
          case 1:
            return '用户包';
          case 2:
            return '指定用户';
        }
      },
      //变更类型
      filterType(row, column) {
        switch (row.type) {
          case 1:
            return '新增';
          case 2:
            return '审核通过';
          case 3:
            return '审核拒绝';
        }
      },

    },
    created() {
      this.$nextTick(() => {
        this.getQueryMassMessageMassLi();
      })
    }
  }

</script>
<style lang="scss">
  .content-form {
    .el-upload--text {
      background-color: #fff;
      border: none;
      border-radius: 0;
      box-sizing: border-box;
      width: auto;
      height: auto;
      text-align: left;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .el-upload__tip {
      display: inline-block;
      margin-top: 0;
      vertical-align: top;
      margin-left: 20px;
    }

    ul.el-upload-list {
      width: 50%;
    }

    .el-form-item a {
      float: left !important;
    }
    .operatingContentList {
      .item {
        width: 280px;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 0 10px;
        margin-top: 0 !important;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        p {
          color: #606266;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          color: #999;
        }
        em {
          cursor: pointer;
        }
        &:first-child {
          border-top: 1px solid #ccc;

        }
      }
    }
  }


</style>
<style scoped lang="scss">
  .content-form {
    border: 1px solid #e4e4e4;
    padding: 20px 20px 20px 0;
    height: 500px;
    overflow: auto;

    .el-form-item__content {
      position: relative;

      & > div:nth-child(2) {
        margin-top: 10px;
      }

      .contentLength {
        position: absolute;
        right: -85px;
        bottom: 0px;
        width: 80px;
        line-height: 20px;
        text-align: left;
        font-weight: normal;

        &.redText {
          color: #f56c6c;
        }
      }
    }

    .el-form {
      width: 50%;
      min-width: 600px;
      margin: 0 auto;
    }

    .userNumber {
      font-size: 12px;
      color: #606266;
      margin-top: 0px !important;
      display: block;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      -webkit-transition: color .3s;
      -o-transition: color .3s;
      transition: color .3s;
      white-space: nowrap;
    }
  }

  .content-submit-btn {
    text-align: center;
    margin-top: 20px;

    button {
      margin-right: 20px;
    }
  }

  .plugins-tips {
    .el-form-item {
      margin-right: 40px;
    }
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

</style>
