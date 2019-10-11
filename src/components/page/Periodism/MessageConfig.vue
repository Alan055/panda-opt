<!--消息配置模板-->
<template>
  <div class="massage-view">
    <transition name="el-zoom-in-bottom">
      <div>
        <el-tabs type="border-card" @tab-click="init_search_params">
          <el-tab-pane :label="'短信'+'('+ SMSList.total + ')'">
            <!--搜索功能-->
            <search :parmas.sync="search_params" :list="optionSmstype" label-text="短信类型" downloadUrl="/opt/message/exportSmsMessageList"
                    :search="getSmsListById"></search>
            <div class="add-btn" @click="addSMS()">
              <i class="el-icon-lx-roundadd"></i>新增短信
            </div>
            <el-table
              :data="SMSList.list"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="thirdid"
                label="文案ID"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="title"
                label="短信标题"
              >
              </el-table-column>
              <el-table-column
                prop="content"
                width="300"
                label="短信内容"
              >
              </el-table-column>
              <el-table-column
                prop="smstype"
                label="短信类型"
                :formatter="formatSmstype"
              >
              </el-table-column>
              <el-table-column
                prop="wordtotal"
                label="字符数"
              >
              </el-table-column>
              <el-table-column
                prop="usedflag"
                label="有无被使用"
                :formatter="formatStatus"
              >
              </el-table-column>
              <el-table-column
                prop="updatetime"
                label="最后修改时间">
              </el-table-column>
              <el-table-column
                prop="updateby"
                label="最后修改人">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="editSms(scope.row)" type="primary" size="mini">编辑</el-button>
                  <el-button @click="deleteMessageById(scope.row,'1')" type="warning" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="smshandleSizeChange"
              @current-change="smshandleCurrentChange"
              :current-page="smsDefault.pageNumber"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="SMSList.total">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane :label="'自动电话'+'('+ telList.total + ')'">
            <!--搜索功能-->
            <search :parmas.sync="search_params" :search="getAutoCallListById" downloadUrl="/opt/message/exportAutotelMessageList"></search>
            <div class="add-btn" @click="addTel">
              <i class="el-icon-lx-roundadd"></i>新增自动电话
            </div>
            <el-table
              :data="telList.list"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
              >
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题"
              >
              </el-table-column>
              <el-table-column
                prop="templateid"
                label="语音ID"
              >
              </el-table-column>
              <el-table-column
                prop="usedflag"
                label="有无被使用"
                :formatter="formatStatus"
              >
              </el-table-column>
              <el-table-column
                prop="updatetime"
                label="最后修改时间">
              </el-table-column>
              <el-table-column
                prop="updateby"
                label="最后修改人">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="editTel(scope.row)" type="primary" size="mini">编辑</el-button>
                  <el-button @click="deleteMessageById(scope.row,'2')" type="warning" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="telhandleSizeChange"
              @current-change="telhandleCurrentChange"
              :current-page="telDefault.pageNumber"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="telList.total">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane :label="'App Push'+'('+ pushList.total + ')'">
            <!--搜索功能-->
            <search :parmas.sync="search_params" :list="optionJumpType" label-text="跳转方式" downloadUrl="/opt/message/exportPushMessageList"
                    :search="getPushListById"></search>
            <div class="add-btn" @click="addPush()">
              <i class="el-icon-lx-roundadd"></i>新增App Push
            </div>
            <el-table
              :data="pushList.list"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
              >

              </el-table-column>
              <el-table-column
                prop="title"
                label="推送标题">
              </el-table-column>
              <el-table-column
                prop="content"
                label="推送内容"
              >
              </el-table-column>
              <el-table-column
                prop="wordtotal"
                label="字符数"
              >
              </el-table-column>
              <el-table-column
                prop="gotourl"
                label="跳转链接"
              >
              </el-table-column>
              <el-table-column
                prop="jumpinner"
                label="跳转方式"
                :formatter="formatJumptype"
              >
              </el-table-column>
              <el-table-column
                prop="usedflag"
                label="有无被使用"
                :formatter="formatStatus"
              >
              </el-table-column>

              <el-table-column
                prop="updatetime"
                label="最后修改时间">
              </el-table-column>
              <el-table-column
                prop="updateby"
                label="最后修改人">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="editPush(scope.row)" type="primary" size="mini">编辑</el-button>
                  <el-button @click="deleteMessageById(scope.row,'3')" type="warning" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="pushhandleSizeChange"
              @current-change="pushhandleCurrentChange"
              :current-page="pushDefault.pageNumber"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pushList.total">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane :label="'App 站内消息'+'('+ siteList.total + ')'">
            <!--搜索功能-->
            <search :parmas.sync="search_params" :list="optionJumpType" label-text="跳转方式" downloadUrl="/opt/message/exportAppMessageList"
                    :search="getUserMsgListById"></search>
            <div class="add-btn" @click="addSite()">
              <i class="el-icon-lx-roundadd"></i>新增App 站内消息
            </div>
            <el-table
              :data="siteList.list"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                width="160"
              >
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题"
                width="200"
              >
              </el-table-column>
              <el-table-column
                prop="summary"
                label="摘要"
                width="300"
              >
              </el-table-column>
              <el-table-column
                label="摘要图片"
                prop="advertList"
                header-align="center"
                align="center"
                width="100px"
              >
                <template slot-scope="scope">
                  <div class="left_imgContent">
                    <el-popover
                      placement="right"
                      title=""
                      trigger="click">
                      <img :src="scope.row.imgurl" style="max-width:700px;max-height: 700px"/>
                      <img slot="reference" :src="scope.row.imgurl" :alt="scope.row.imgurl"
                           style="width: 80px;height: 80px">
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="内容"
                width="300"
              >
              </el-table-column>
              <el-table-column
                prop="wordtotal"
                label="字数">
              </el-table-column>
              <el-table-column
                prop="gotourl"
                label="跳转链接"
                width="200"
              >
              </el-table-column>
              <el-table-column
                prop="jumpinner"
                label="跳转方式"
                :formatter="formatJumptype"
              >
              </el-table-column>

              <el-table-column
                prop="usedflag"
                label="有无被使用"
                :formatter="formatStatus"
              >
              </el-table-column>
              <el-table-column
                prop="updatetime"
                label="最后修改时间">
              </el-table-column>
              <el-table-column
                prop="updateby"
                label="最后修改人">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="editSite(scope.row)" type="primary" size="mini">编辑</el-button>
                  <el-button @click="deleteMessageById(scope.row,'4')" type="warning" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="sitehandleSizeChange"
              @current-change="sitehandleCurrentChange"
              :current-page="siteDefault.pageNumber"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="siteList.total">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
    <el-dialog title="编辑短信" width="40%" center :visible.sync="addSMSDialog" @closed="closeAddSMSDialog">
      <el-form :model="addSMSForm" :rules="addSMSFormRules" ref="addSMSForm" label-width="100px" size="mini">
        <el-form-item label="文案ID" prop="thirdid">
          <el-input v-model="addSMSForm.thirdid" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="短信名称" prop="title">
          <el-input v-model="addSMSForm.title"></el-input>
        </el-form-item>
        <el-form-item label="短信内容" prop="content">
          <el-input
            type="textarea"
            style='width:350px;'
            resize="none"
            rows=4
            v-model="addSMSForm.content"></el-input>
        </el-form-item>
        <el-form-item label="短信类型" prop="smstype">
          <el-select v-model="addSMSForm.smstype" autocomplete="off" placeholder="选择短信类型">
            <el-option
              v-for="item in optionSmstype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSMSDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSaveSMS('addSMSForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑自动电话" width="40%" center :visible.sync="addTelDialog" @closed="closeAddTelDialog">
      <el-form :model="addTelForm" :rules="addTelFormRules" ref="addTelForm" label-width="100px" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addTelForm.title" autocomplete="off" placeholder="输入自动电话标题">

          </el-input>
        </el-form-item>
        <el-form-item label="语音ID" prop="templateid">
          <el-input v-model="addTelForm.templateid" autocomplete="off" placeholder="输入语音ID">

          </el-input>
        </el-form-item>
        <el-form-item label="熊猫语音ID" prop="addTelForm">
          <el-input v-model="addTelForm.thirdid" autocomplete="off" placeholder="输入熊猫语音ID">

          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTelDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSaveTel('addTelForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑App Push" width="40%" center :visible.sync="addPushDialog" @closed="closeAddPushDialog">
      <el-form :model="addPushForm" :rules="addPushFormRules" ref="addPushForm" label-width="100px" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addPushForm.title" autocomplete="off" placeholder="请输入标题">

          </el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            style='width:350px;'
            autocomplete="off"
            resize="none"
            rows=4
            v-model="addPushForm.content"></el-input>
        </el-form-item>
        <el-form-item label="跳转方式" prop="jumpinner">
          <el-select v-model="addPushForm.jumpinner" autocomplete="off" placeholder="选择跳转方式">
            <el-option
              v-for="item in optionJumpType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PUSH链接" prop="gotourl" v-if="addPushForm.jumpinner==0 || addPushForm.jumpinner == 1">
          <el-input v-model="addPushForm.gotourl" autocomplete="off" placeholder="选输入PUSH链接">

          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPushDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSavePush('addPushForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑站内信" width="70%" center :visible.sync="addSiteDialog" @closed="closeAddSiteDialog">
      <el-form :model="addSiteForm" :rules="addSiteFormRules" ref="addSiteForm" label-width="100px" size="mini">
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="addSiteForm.title" placeholder="请输入消息标题" autocomplete="off">

          </el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="addSiteForm.summary" placeholder="请输入摘要" autocomplete="off">

          </el-input>
        </el-form-item>
        <el-form-item label="摘要图片">
          <el-upload
            class="avatar-uploader"
            :action="actionUrl"
            :drag="canDrag"
            :disabled="loaded"
            :with-credentials="actionWidth"
            :show-file-list="false"
            :on-success="handleAvatarSuccessTitle"
            :before-upload="beforeAvatarUploadTitle">
            <img v-if="addSiteForm.imgurl" :src="addSiteForm.imgurl || ''" class="avatar">
            <i class="el-icon-upload"></i>
            <div v-if="loaded" class="el-up-loading"><i class="el-icon-loading"></i><br/>拼命上传中</div>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
          <el-upload
            id="iviewUp"
            style="display:none;"
            class="avatar-uploader"
            :action="actionUrl"
            :with-credentials="actionWidth"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
          </el-upload>

          <quill-editor
            v-model="addSiteForm.content"
            ref="myQuillEditor"
            :options="editorOption"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="跳转方式" prop="jumpinner">
          <el-select v-model="addSiteForm.jumpinner" autocomplete="off" placeholder="选择跳转方式">
            <el-option
              v-for="item in optionJumpType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接" prop="gotourl" v-if="addSiteForm.jumpinner==0 ||  addSiteForm.jumpinner==1 ">
          <el-input v-model="addSiteForm.gotourl" placeholder="请输入跳转链接" autocomplete="off">

          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSiteDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSaveSite('addSiteForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import moment from "moment";
  import search from "./searchComponents";
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
    name: "MessageConfig",
    components: {
      quillEditor, search
    },
    data() {
      return {
        editorOption: {
          placeholder: '请输入站内信内容',
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
        imageUrl: '',
        testError: false,
        actionWidth: true,
        loaded: false,
        canDrag: true,
        smsDefault: {
          pageSize: 10,
          pageNumber: 1
        },
        telDefault: {
          pageSize: 10,
          pageNumber: 1
        },
        pushDefault: {
          pageSize: 10,
          pageNumber: 1
        },
        siteDefault: {
          pageSize: 10,
          pageNumber: 1
        },
        smstestTel: '',//短信测试手机号
        SMSList: {},
        telList: {},
        pushList: {},
        siteList: {},
        addSMSDialog: false,//添加短信弹窗
        addSMSForm: {  //短信表单
          thirdid: '',
          id: '',
          content: '',
          title: '',
          smstype: ''
        },
        addSMSFormRules: {
          thirdid: [
            {required: true, message: '请输入文案ID', trigger: 'blur',},
          ],
          title: [
            {required: true, message: '请输入短信名称', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入短信内容', trigger: 'blur'}
          ],
          smstype: [
            {required: true, message: '请选择短信类型', trigger: 'change'}
          ]
        },
        addTelDialog: false,//自动电话
        addTelForm: {//自动电话表单
          id: '',
          title: '',
          templateid: '',
          thirdid: ''
        },
        addTelFormRules: {
          title: [{
            message: '请输入标题', trigger: 'blur'
          }],
          templateid: [{
            required: true, message: '请输入语音Id', trigger: 'blur'
          }],
          thirdid: []
        },
        addPushDialog: false,//Push消息
        addPushForm: {
          id: '',
          title: '',
          content: '',
          gotourl: '',
          jumpinner: ''
        },
        addPushFormRules: {
          gotourl: [
            {required: true, message: '请输入PUSH链接', trigger: 'blur'}
          ],
          telTitle: [{required: true, message: '请输入PUSH标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入PUSH内容', trigger: 'blur'}],
          jumpinner: [{required: true, message: '请选择跳转方式', trigger: 'change'}],
        },
        addSiteDialog: false,
        addSiteForm: {
          id: '',
          title: '',
          content: '',
          gotourl: '',
          jumpinner: '',
          summary: '',
          imgurl: '',
          filename: ''
        },
        addSiteFormRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入消息内容', trigger: 'blur'}
          ],
          summary: [
            {required: true, message: '请输入消息摘要', trigger: 'blur'}
          ],
          gotourl: [{
            required: true, message: '请输入跳转链接', trigger: 'blur'
          }],
          jumpinner: [{required: true, message: '请选择跳转方式', trigger: 'change'}],
        },
        optionSmstype: [
          {
            value: "1",
            label: '验证码'
          },
          {
            value: "2",
            label: '通知'
          },
          {
            value: "3",
            label: '营销'
          },
          {
            value: "4",
            label: '催收'
          }
        ],
        search_params: {
          searchText: '', // 搜索输入框
          modifyDate: [, ], // 最近修改时间,
          select: '', // 类型下拉
        },
      }
    },
    computed: {
      actionUrl: function () {
        return this.$store.state.actionUrl;
      },
      optionMessageType: function () {
        return this.$store.state.optionMessageType;
      },
      optionSupplier: function () {
        return this.$store.state.optionSupplier;
      },
      optionJumpType: function () {
        return [
          {
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
      actionUrl: function () {
        return this.$store.state.actionUrl;
      },
    },
    methods: {
      init() {
        this.getSmsListById();
        this.getAutoCallListById();
        this.getPushListById();
        this.getUserMsgListById();
      },
      init_search_params(v) {
        this.search_params.searchText = '' // 搜索输入框
        this.search_params.select = '' // 类型下拉
        // 刷新一下表格数据
        let obj = {
          '0': this.getSmsListById,
          '1': this.getAutoCallListById,
          '2': this.getPushListById,
          '3': this.getUserMsgListById,
        }
        obj[v.index]()
      },
      formatStatus: function (row, column) {
        return row.usedflag == 0 ? '尚未使用' : '已经使用';
      },
      formatThirdid: function (row, column) {
        return row.thirdid ? row.thirdid : '无';
      },
      formatJumptype: function (row, column) {
        if (row.jumpinner == 1) {
          return "内链";
        } else if (row.jumpinner == 0) {
          return "外链";
        } else {
          return "只显示不跳转";
        }
      },
      formatSmstype: function (row, column) {
        switch (row.smstype) {
          case "1":
            return "验证码";
          case "2":
            return "通知";
          case "3":
            return "营销";
          case "4":
            return "催收";
        }
      },
      handleAvatarSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let vm = this;
        let quill = this.$refs.myQuillEditor.quill;
        console.log('res---', vm.$refs.myQuillEditor.quill.getSelection());
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
      handleAvatarSuccessTitle(res, file) {
        this.$message.success('上传成功');
        this.imageUrl = URL.createObjectURL(file.raw);
        let img = new Image();
        img.src = this.imageUrl;
        img.onload = () => {
          this.addSiteForm.imgurl = this.imageUrl;
          this.addSiteForm.filename = res.data.id;
        };
        this.loaded = false;
      },
      beforeAvatarUploadTitle(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传启动图只能是PNG 格式!');
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
      //获取短信列表
      getSmsListById: function (bol) {
        bol && (this.smsDefault.pageNumber = 1)
        let obj = {
          pageSize: this.smsDefault.pageSize,
          pageNumber: this.smsDefault.pageNumber,
          messagetype: '1',
          smstype: this.search_params.select || '',
          keyword: this.search_params.searchText || '',
        }
        if(this.search_params.modifyDate&&this.search_params.modifyDate[0]){
          obj.starttime = moment(this.search_params.modifyDate[0]).format("YYYY-MM-DD") + ' 00:00:00'
          obj.endtime = moment(this.search_params.modifyDate[1]).format("YYYY-MM-DD") + ' 23:59:59'
        }
        this.Api.msGetSmsListById(obj).then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.SMSList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      //获取自动电话
      getAutoCallListById: function (bol) {
        bol && (this.telDefault.pageNumber = 1)
        let obj = {
          pageSize: this.telDefault.pageSize,
          pageNumber: this.telDefault.pageNumber,
          messagetype: '4',
          keyword: this.search_params.searchText || '',
        }
        if(this.search_params.modifyDate&&this.search_params.modifyDate[0]){
          obj.starttime = moment(this.search_params.modifyDate[0]).format("YYYY-MM-DD") + ' 00:00:00'
          obj.endtime = moment(this.search_params.modifyDate[1]).format("YYYY-MM-DD") + ' 23:59:59'
        }
        this.Api.msGetAutoCallListById(obj).then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.telList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      //获取app push
      getPushListById: function (bol) {
        bol && (this.pushDefault.pageNumber = 1)
        let obj = {
          pageSize: this.pushDefault.pageSize,
          pageNumber: this.pushDefault.pageNumber,
          messagetype: '2',
          keyword: this.search_params.searchText || '',
          jumpinner: this.search_params.select,
        }
        if(this.search_params.modifyDate&&this.search_params.modifyDate[0]){
          obj.starttime = moment(this.search_params.modifyDate[0]).format("YYYY-MM-DD") + ' 00:00:00'
          obj.endtime = moment(this.search_params.modifyDate[1]).format("YYYY-MM-DD") + ' 23:59:59'
        }
        this.Api.msGetPushListById(obj).then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.pushList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      //获取站内信
      getUserMsgListById: function (bol) {
        bol && (this.siteDefault.pageNumber = 1)
        let obj = {
          pageSize: this.siteDefault.pageSize,
          pageNumber: this.siteDefault.pageNumber,
          messagetype: '3',
          keyword: this.search_params.searchText || '',
          jumpinner: this.search_params.select,
        }
        if(this.search_params.modifyDate&&this.search_params.modifyDate[0]){
          obj.starttime = moment(this.search_params.modifyDate[0]).format("YYYY-MM-DD") + ' 00:00:00'
          obj.endtime = moment(this.search_params.modifyDate[1]).format("YYYY-MM-DD") + ' 23:59:59'
        }
        this.Api.msGetUserMsgListById(obj).then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.siteList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },

      //添加短信弹窗
      addSMS: function () {
        this.addSMSDialog = true;
      },
      //编辑短信弹窗
      editSms: function (row) {
        console.log(row);
        this.addSMSForm = JSON.parse(JSON.stringify(row));
        this.addSMSDialog = true;
      },
      //添加电话弹窗
      addTel: function () {
        this.addTelDialog = true;
      },
      //编辑电话弹窗
      editTel: function (row) {
        this.addTelForm = JSON.parse(JSON.stringify(row));
        this.addTelDialog = true;
      },
      //添加推送弹窗
      addPush: function () {
        this.addPushDialog = true;
      },
      //编辑推送
      editPush: function (row) {
        this.addPushForm = JSON.parse(JSON.stringify(row));
        this.addPushDialog = true;
      },
      //添加站内弹窗
      addSite: function () {
        this.addSiteDialog = true;
      },
      //编辑站内信
      editSite: function (row) {
        this.addSiteForm = JSON.parse(JSON.stringify(row));
        this.addSiteDialog = true;
      },
      smshandleSizeChange: function (val) {
        this.smsDefault.pageSize = val;
        this.getSmsListById();
      },
      smshandleCurrentChange: function (val) {
        this.smsDefault.pageNumber = val;
        this.getSmsListById();
      },
      telhandleSizeChange: function (val) {
        this.telDefault.pageSize = val;
        this.getAutoCallListById();
      },
      telhandleCurrentChange: function (val) {
        this.telDefault.pageNumber = val;
        this.getAutoCallListById();
      },
      pushhandleSizeChange: function (val) {
        this.pushDefault.pageSize = val;
        this.getPushListById();
      },
      pushhandleCurrentChange: function (val) {
        this.pushDefault.pageNumber = val;
        this.getPushListById();
      },
      sitehandleSizeChange: function (val) {
        this.siteDefault.pageSize = val;
        this.getUserMsgListById();
      },
      sitehandleCurrentChange: function (val) {
        this.siteDefault.pageNumber = val;
        this.getUserMsgListById();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //关闭短信弹窗
      closeAddSMSDialog: function () {
        this.resetForm('addSMSForm');
        Object.keys(this.addSMSForm).forEach((key) => {
          this.addSMSForm[key] = '';
        });
      },
      //关闭自动电话弹窗
      closeAddTelDialog: function () {
        this.resetForm('addTelForm');
        Object.keys(this.addTelForm).forEach((key) => {
          this.addTelForm[key] = '';
        });
      },
      //关闭PUSH弹窗
      closeAddPushDialog: function () {
        this.resetForm('addPushForm');
        Object.keys(this.addPushForm).forEach((key) => {
          this.addPushForm[key] = '';
        });
      },
      //关闭站内信弹窗
      closeAddSiteDialog: function () {

        this.resetForm('addSiteForm');
        Object.keys(this.addSiteForm).forEach((key) => {
          this.addSiteForm[key] = '';
        });
      },
      //保存短信
      sureSaveSMS: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.Api.msInsertSmsList({
              thirdid: this.addSMSForm.thirdid,
              id: this.addSMSForm.id,
              title: this.addSMSForm.title,
              content: this.addSMSForm.content,
              smstype: this.addSMSForm.smstype,
              messagetype: '1'
            }).then((res) => {
              if (res.data.code == 200) {
                this.getSmsListById();
                this.addSMSDialog = false;
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            return false;
          }
        });
      },
      //保存tel
      sureSaveTel: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.Api.msInsertAutoCallList({
              id: this.addTelForm.id,
              title: this.addTelForm.title,
              templateid: this.addTelForm.templateid,
              thirdid: this.addTelForm.thirdid,
              messagetype: '4'
            }).then((res) => {
              if (res.data.code == 200) {
                this.getAutoCallListById();
                this.addTelDialog = false;
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            return false;
          }
        });
      },
      //保存PUSh
      sureSavePush: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.Api.msInsertPushList({
              id: this.addPushForm.id,
              title: this.addPushForm.title,
              content: this.addPushForm.content,
              gotourl: this.addPushForm.jumpinner == 2 ? '' : this.addPushForm.gotourl,
              jumpinner: this.addPushForm.jumpinner,
              messagetype: '2'
            }).then((res) => {
              if (res.data.code == 200) {
                this.getPushListById();
                this.addPushDialog = false;
              } else {
                this.$message.error(res.data.msg)
              }
            });

          } else {
            return false;
          }
        });
      },
      //保存站内信
      sureSaveSite: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.Api.msInsertUserMsgList({
              id: this.addSiteForm.id,
              title: this.addSiteForm.title,
              summary: this.addSiteForm.summary,
              gotourl: this.addSiteForm.jumpinner == 2 ? '' : this.addSiteForm.gotourl,
              jumpinner: this.addSiteForm.jumpinner,
              content: this.addSiteForm.content,
              messagetype: '3',
              filename: this.addSiteForm.filename
            }).then((res) => {
              if (res.data.code == 200) {
                this.getUserMsgListById();
                this.addSiteDialog = false;
              } else {
                this.$message.error(res.data.msg)
              }
            });

          } else {
            return false;
          }
        });
      },
      //删除消息
      deleteMessageById: function (row, type) {
        this.$confirm('此操作将永久删除消息 "' + row.title + '" 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
        }).then(() => {
          this.Api.msDeleteMessageById({
            id: row.id
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              if (type == '1') {
                this.getSmsListById();
              } else if (type == '2') {
                this.getAutoCallListById();
              } else if (type == '3') {
                this.getPushListById();
              } else if (type == '4') {
                this.getUserMsgListById();
              }
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      this.init();
    },
    mounted() {

    }

  }
</script>

<style lang="scss">
  .massage-view {
    .add-btn {
      float: right;
      font-size: 16px;
      margin-right: 20px;
      cursor: pointer;
      color: #409EFF;
      margin-bottom: 20px;
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
    .startFigure {
      .el-dialog {
        min-width: 600px;
      }
    }

  }

</style>
