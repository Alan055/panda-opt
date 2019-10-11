// 公共 mixin
import common from "./../../assets/common/common";
import {axios} from "../../assets/base/axiosConfig";

export const commonMixin = {
  data() {
    return {
      tableData: {}, // 用户列表
      userRoleList: [], // 用户组列表
      userRoleTableList: [], // 用户组表格列表
      roleList: [], // 角色列表
      roleTableList: [], // 角色表格列表
      menu: [],
    }
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.Api.perUserList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 获取用户组列表
    getUserGroupList(pageNum = 1, pageSize = 10, type = 'list') {
      // this.Api.perUserGroupList({
      //     pageSize: pageSize,
      //     pageNum: pageNum
      // }).then((res)=>{
      //     if(res.data.code == 200){
      //         if(type=='table'){//表格用
      //             this.userRoleTableList = res.data.data;
      //         }else{//列表用
      //             this.userRoleList = res.data.data.list;
      //         }
      //     }else{
      //         this.$message.error(res.data.msg);
      //     }
      //
      // })
    },
    // 获取角色列表
    getRoleList(pageNum = 1, pageSize = 10, type = 'list') {
      this.Api.perRoleList({
        pageSize: pageSize,
        pageNum: pageNum
      }).then((res) => {
        if (res.data.code == 200) {
          if (type == 'table') { //表格用
            this.roleTableList = res.data.data;
          } else { //列表用
            this.roleList = res.data.data.list;
          }
        } else {
          this.$message.error(res.data.msg);
        }

      })
    },
    // 获取全部菜单列表
    getMenuList() {
      this.menu = [];
      this.Api.perGetMenuList({
        roleId: ''
      }).then((res) => {
        if (res.data.code == 200) {
          let menuAllList = res.data.data;
          for (let i = 0; i < menuAllList.length; i++) {
            if (menuAllList[i].pid == '-1') {
              this.menu.push(menuAllList[i]);
            } else {
              let _this = this;
              for (let j = 0; j < this.menu.length; j++) {
                if (_this.menu[j].menuId == menuAllList[i].pid) {
                  _this.menu[j].children = new Array();
                  _this.menu[j].children.push(menuAllList[i]);
                }
              }
            }
          }
          this.$store.dispatch('changeMenuList', this.menu);
          console.log("state")
          console.log(this.$store.state.menuList);
        }
      })
    },
  },
  init() {

  },
}

// 表格 mixin
export const tableMixin = {
  data() {
    return {
      exportLoading: false, // loading图
      tableData: [], // 表格数据
      pagination: { // 分页数据
        pageNumber: 1, // 当前是第几页
        pageSize: 10, // 一页显示多少条数据
        total: 0, // 表格中数据在后台的总条数
      },
    }
  },
  methods: {
    // 序号过滤器
    indexMethod(i) {
      return i + 1 + (this.pagination.pageNumber - 1) * this.pagination.pageSize
    },



  }
}


// 消息群发 （push拳法、短信群发、站内信群发、自动电话群发）中群发对象到业务类型的数据和表单验证   相关mixins
// 这里面联动效果比较多  比较复杂
export const bulkDataMixin = {
  data() {
    // 验证操作内容列表是否有数据
    let bigDataRule_checkList = (rule, value, callback) => {
      if (this.bulkData.pushObject == 3) { // 当群发对象是标签平台的时候  才校验
        if (value.length) {
          return callback();
        }
        return callback(new Error(rule.message));
      }
      return callback();
    };
    var checkObject = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择群发对象'));
      } else {
        // this.$refs.bulkData.resetFields();
        if (value == 1) {
          this.$refs.bulkData.validateField('fileList');
        } else {
          this.$refs.bulkData.validateField('pushObjectList');
        }
        return callback();
      }
    };
    var checkList = (rule, value, callback) => {
      if (this.bulkData.pushObject == 2) { // 只有当群发对象是指定用户的时候  才校验
        if (!value) {
          this.inputNumber = 0;
          return callback(new Error('请填写指定用户'));
        } else {

          let valArray = value.split(",");
          this.inputNumber = valArray.length;
          if (this.inputNumber > 20) {
            return callback(new Error('最多填写20个用户'));
          } else {
            return callback();
          }
        }
      }
      return callback();
    };
    var checkFile = (rule, value, callback) => {
      if (this.bulkData.pushObject == 1) { // 只有当群发对象是用户包的时候  才校验
        if (value.length < 1) {
          return callback(new Error('请上传用户包'));
        } else if (this.userNumber < 1) {
          return callback(new Error('号码包手机号码数量不能为空'));
        } else {
          callback();
        }

      }
      return callback();
    };
    return {
      objectOption: [ // 群发对象的下拉数据
        {
          label: '用户包',
          value: '1'
        },
        {
          label: '指定用户',
          value: '2'
        },
        {
          label: '标签平台',
          value: '3'
        },
      ],
      actionWidth: true, // 用户包上传文件相关
      fileNumber: 1, // 用户包最大允许上传个数
      loaded: false, // 用户包上传文件时的load图
      formLoading: false, // 发送申请时 整个表单的loading
      userNumber: '0', // 用户数量
      inputNumber: '0', // 指定用户数量

      // 新迭代的数据  大数据标签相关 标签平台相关
      labelNameOption: [], // 标签名称 后台获取
      labelName_loading: false, // 标签名称的下拉数据搜索时的loading图
      operatingNameOption: [], // 操作名称 通过标签名称 后台获取
      operatingOption: [], // 操作
      operatingContentOption: [], // 操作内容的下拉选项

      bulkData: { // 大数据form数据
        pushObject: '', // 群发对象选中的选项
        fileList: [], // 用户包上传的文件列表
        pushObjectList: '', // 推送指定用户列表

        labelName: '', // 标签名称   str
        operatingName: null, //  操作名称 这个应该是操作分类  obj
        operating: null, //  操作 这个应该是实际操作类型  obj
        operatingContent: '', // 操作内容  str
        operatingContentList: [], // 生成的操作内容列表

        sendTime: '', // 群发时间
        businessType: '', // 业务类型
      },
      bulkDataRules: { // 验证规则
        pushObject: [{
          required: true,
          validator: checkObject,
          trigger: 'change'
        }],
        fileList: [{
          validator: checkFile
        }],
        pushObjectList: [{
          validator: checkList,
          trigger: 'blur'
        }],
        labelName: [{
          required: true,
          message: '请选择标签名称',
          trigger: 'change'
        }],
        operatingContentList: [{
          validator: bigDataRule_checkList,
          message: '请生成操作列表',
          trigger: 'change'
        }],
        sendTime: [{
          required: true,
          message: '请选择群发时间',
          trigger: 'change'
        }],
        businessType: [{
          required: true,
          message: '请选择业务类型',
          trigger: 'change'
        }],
      },

      // 禁止选择之前时间 --选择群发时间
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      businessTypeOption: [ // 群发业务类型下拉选项
        {
          label: '营销',
          value: '1'
        },
        {
          label: '通知',
          value: '2'
        },
        {
          label: '手机号码包',
          value: '3'
        }
      ],
    }
  },
  computed: {
    saveUrl() { // 上传文件的路径
      return this.$store.state.saveUrl + '?type=0';
    },
    // 是否可以点击生成操作
    canBuildOperate() {
      let arr = [ // 4个条件
        this.bulkData.labelName,
        this.operatingNameOption.length ? (this.bulkData.operatingName ? true : false) : 1,
        this.operatingOption.length ? (this.bulkData.operating ? true : false) : 1,
        this.bulkData.operatingContent
      ]
      return arr.every(e => (e))
    }
  },
  watch: {
    'bulkData.operatingContentList'() { // 监听生成操作内容列表 变化时就校验一下
      this.$refs.bulkData.validateField('operatingContentList'); // 手动校验一下生成操作内容列表
    }
  },
  methods: {
    // 群发对象标签修改时
    changePushObject(value) {
      if (this.bulkData.pushObject == 3) {
        this.findTabName()
      }
      // this.$set(this.bulkData, 'pushObject', value) // 这里需要强制修改一下  不然试图不更新
    },
    // 文件数量超限
    fileExceed() {
      this.$message({
        type: 'error',
        message: '已有上传文件，若需替换，请先删除!'
      });
    },
    // 文件修改时
    fileChange(file, fileList) {
      this.$refs.bulkData.validateField('fileList');
    },
    //上传校验
    beforeAvatarUpload1(file) {
      const isJPG = file.type == 'text/plain';
      const isLt2M = file.size / 1024 / 1024 < 100;

      if (!isJPG) {
        this.$message.error('上传文件只能是 txt 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 100MB!');
      }
      return isJPG && isLt2M;
    },
    // 上传文件成功  群发对象是用户包时需要上传文件
    handleAvatarSuccess1(res, file, fileList) {
      this.bulkData.fileList = fileList;
      this.userNumber = res.data;
      this.$message.success('上传成功');
      this.loaded = false;
    },
    // 文件移除钩子
    removeFile() {
      this.userNumber = 0;
      this.bulkData.fileList = [];
      this.$refs.bulkData.validateField('fileList');
    },

    // 查找标签名称的下拉数据 增加防抖
    findTabName: common.debounce(function (keyword) { // 默认查第一页20条
      this.operatingNameOption = [] // 操作名称下拉数据清空 隐藏
      this.operatingOption = [] // 操作下拉数据也清空
      this.operatingContentOption = []
      this.$set(this.bulkData, 'operatingContent', '') // 数据初始化 必须这么写  this.bulkData.xxx = '' 会出现试图不更新的情况
      this.labelName_loading = true // 打开loading
      this.$set(this.bulkData, 'labelName', '') // 标签名称数据清空
      this.Api.msGetPushSelectOption({
        start_time: '2019-01-01',
        page_no: 1,
        page_size: 20,
        keyword: keyword || ''
      }).then((result) => {
        let res = result.data
        if (res.code == 200) {
          this.labelNameOption = res.data.infos.map((v, i) => ({
            label: v.tag_name,
            value: v.tid
          }))
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
        this.labelName_loading = false // 关闭loading
      }).catch((err) => {
        this.labelName_loading = false // 关闭loading
        this.$message({
          type: 'error',
          message: err
        });
      })
    }),
    // 查询标签所对应的描述
    findTabNameDes() {
      this.bulkData.operatingContentList = [] // 切换标签名称时  需要将操作内容列表清空
      this.operatingContentOption = []
      this.$set(this.bulkData, 'operatingName', '') // 数据初始化 必须这么写  this.bulkData.xxx = '' 会出现试图不更新的情况
      this.$set(this.bulkData, 'operatingContent', '') // 数据初始化 必须这么写  this.bulkData.xxx = '' 会出现试图不更新的情况
      this.operatingOption = [] // 操作下拉数据也清空
      if (!this.bulkData.labelName) { // 如果是清空数据的情况下 就初始化操作名称的下拉数据
        this.operatingNameOption = []
        return
      }
      this.Api.msGetPushTabDes({
        tid: this.bulkData.labelName
      }).then((result) => {
        let res = result.data
        if (res.code == 200) {
          this.operatingNameOption = res.data.config.map((v) => ({
            label: v.name,
            value: v.arg,
            operate: v.operate,
            enums: v.enums
          }))
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        });
      })
    },
    // 选择操作名称后 要联动出操作下拉选项
    changeOperatingName(v) {
      this.$nextTick(() => {
        this.$set(this.bulkData, 'operating', '') // 数据初始化 必须这么写  this.bulkData.xxx = '' 会出现试图不更新的情况
        this.$set(this.bulkData, 'operatingContent', '') // 数据初始化 必须这么写  this.bulkData.xxx = '' 会出现试图不更新的情况
        let obj = this.operatingNameOption.find(e => (e.value == v.value))
        this.operatingOption = obj.operate.map(item => ({
          label: item.name,
          value: item.type
        }))
        this.operatingContentOption = !obj.enums ? [] : obj.enums.map(item => ({
          label: item.name,
          value: item.value
        }))
      })
    },
    // 生成操作
    buildOperation() {
      this.bulkData.operatingContentList.push({
        label: (this.bulkData.operatingName && this.bulkData.operatingName.label ? `<span>#</span>${this.bulkData.operatingName.label}<span>#</span>` : '') +
          (this.bulkData.operating && this.bulkData.operating.label ? ` <span>#</span>${this.bulkData.operating.label}<span>#</span>` : '') +
          ` <span>#</span>${this.operatingContentOption.length>0 ? this.operatingContentOption.find(e=>(e.value == this.bulkData.operatingContent)).label: this.bulkData.operatingContent}<span>#</span>`,
        arg: this.bulkData.operatingName ? this.bulkData.operatingName.value : '',
        operate: this.bulkData.operating ? this.bulkData.operating.value : '',
        value: this.bulkData.operatingContent ? this.bulkData.operatingContent : '',
      })
      this.bulkData.operatingContent = ''
    },
    // 删除一条生成操作内容的数据
    removeOperate(i) {
      this.$delete(this.bulkData.operatingContentList, i)
    },
    // 整理数据格式
    organizeData(params) {
      params.tid = this.bulkData.labelName; // 标签名称
      params.tagname = this.labelNameOption.find(e => (e.value == params.tid)).label; // 标签名称
      let arr = this.bulkData.operatingContentList.map((val) => ({
        arg: val.arg, // 操作名称的id
        operate: val.operate, // 操作的id
        value: val.value, // 操作内容
      }));
      params.tagconf = JSON.stringify(arr)
    },
    // 表格数据 -状态的映射表
    filterStatus(row, column) {
      switch (row.status) {

        case -1:
          return '标签数据拉取中';
        case 0:
          return '待审核';
        case 1:
          return '审核拒绝';
        case 2:
          return '审核通过';
        case 3:
          return '准备生成记录';
        case 4:
          return '待发送';
        case 5:
          return '已发送';
        case 6:
          return '发送失败';
        case 7:
          return '已过期';
        case 8:
          return '标签数据错误';
        case 9:
          return '标签数据为空';

      }
    },
  }
}


//活动策略相关mixins
export const activityMinxin = {
  data() {
    let numberValidator = (rule, value, callback) => {
      let _data1 = this.strategyForm.findexmin,
         _data2 = this.strategyForm.findexmax,
        _reg = new RegExp("^[0-9]*$");
      if (!_data1 || !_data2) {
        return callback(new Error('请输入累积借款次数范围'));
      } else {
        if (!_reg.test(_data1) || !_reg.test(_data2)) {
          return callback(new Error('请输入正确的次数'));
        } else {
          if (_data1 > _data2) {
            return callback(new Error('前面次数不能大于后面次数'));
          } else {
            return callback();
          }
        }
      }
    };
    let recentlyValidator = (rule, value, callback) => {
      let _data1 = this.strategyForm.mindexmin,
        _data2 = this.strategyForm.mindexmax,
        _reg = new RegExp("^[0-9]*$");
      if (!_data1 || !_data2) {
        return callback(new Error('请输入最近一笔授信额度范围'));
      } else {
        if (!_reg.test(_data1) || !_reg.test(_data2)) {
          return callback(new Error('请输入正确的数字'));
        } else {
          if (_data1 > _data2) {
            return callback(new Error('前面额度不能大于后面额度'));
          } else {
            return callback();
          }
        }

      }
    };
    let rateValidator =(rule, value, callback) =>{
      let _reg = new RegExp("^[0-9]*$");
      if (value) {
        //获取对应timelist 中的项
        if(!_reg.test(value) || value> 100){
          return callback(new Error('请输入0-100的数字'));
        }else{
          return  callback();
        }
      } else {
        return callback(new Error('请选择凋落时间段'));
      }
    };
    let falltimeValidator = (rule, value, callback) => {
      if (value) {
        //获取对应timelist 中的项
        return callback();
      } else {
        return callback(new Error('请选择凋落时间段'));
      }
    };
      //通过红包id 获取红包名字
    let redBagValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入红包id'));
      } else if(value.length< 18){
        return callback(new Error('请输入正确的红包id'));
      }else {
        //若有红包id 获取红包信息
        let n = this.strategyForm.timelist.findIndex((item)=> item.redpacketTemplateId === value);
        axios.post('/opt/activity/welfare/manage/redpacket/queryRedpacket',{id: value}).then((res) => {
            if(res.data.code == 200){
              this.strategyForm.timelist[n].redbagName  = res.data.data.name;
              callback();
            }else{
              return callback(new Error(res.data.msg));
            }
        }).catch((err)=>{
          return callback(new Error(err));
        })
      }
    };
    return {
      leftDefault: [],
      rightDefault: [],
      //抽屉 编辑策略表单
      strategyForm: {
        strategyname: '', //策略名称
        merchants: [], //策略商户
        type: '', //用户状态
        findexmin: '', //累积借款次数1
        findexmax: '', //累积借款次数2
        mindexmin: '', //最近一笔授信额度1
        mindexmax: '', //最近一笔授信额度2
        validity: [], //有效期
        timelist: [{
          falltime: '',
          redbagId: '',
          redbagName: '',
          rate: ''
        }]
      },
      strategyFormRules: {
        title: [{
          required: true,
          message: '请输入策略名称',
          trigger: 'blur'
        }],
        merchants: [{
          required: true,
          message: '请至少选择一个策略商户',
          type: 'array',
          trigger: 'change'
        }],
        userStatus: [{
          required: true,
          message: '请选择用户状态',
          trigger: 'change'
        }],
        number: [{
          required: true,
          validator: numberValidator,
          trigger: 'blur'
        }],
        recently: [{
          required: true,
          validator: recentlyValidator,
          trigger: 'blur'
        }],
        validity: [{
          required: true,
          type: 'array',
          message: '请选择生效时间',
          trigger: 'change'
        }],
        openAbtest: [{
          required: true,
          message: '请选择是否开启ABtest',
          trigger: 'change'
        }],
        rate: [{
          required: true,
          validator: rateValidator,
          trigger: 'blur'
        }],
        rindex: [{
          required: true,
          trigger: 'change',
          validator: falltimeValidator
        }],
        redbagId: [{

          required: true,
          trigger: 'blur',
          validator: redBagValidator

        }]

      },
      timePart: [{
          value: '-10',
          label: 'T-10'
        },
        {
          value: '-9',
          label: 'T-9'
        },
        {
          value: '-8',
          label: 'T-8'
        },
        {
          value: '-7',
          label: 'T-7'
        },
        {
          value: '-6',
          label: 'T-6'
        },
        {
          value: '-5',
          label: 'T-5'
        }, {
          value: '-4',
          label: 'T-4'
        }, {
          value: '-3',
          label: 'T-3'
        }, {
          value: '-2',
          label: 'T-2'
        },
        {
          value: '-1',
          label: 'T-1'
        },
        {
          value: '0',
          label: 'T'
        },
        {
          value: '1',
          label: 'T+1'
        },
        {
          value: '2',
          label: 'T+2'
        },
        {
          value: '3',
          label: 'T+3'
        },
        {
          value: '4',
          label: 'T+4'
        },
        {
          value: '5',
          label: 'T+5'
        },
        {
          value: '7',
          label: 'T+7'
        },
        {
          value: '14',
          label: 'T+14'
        },
        {
          value: '60',
          label: 'T+60'
        }


      ],
      allTime: [{
          value: '00:00:00',
          label: '00:00:00'
        },
        {
          value: '00:30:00',
          label: '00:30:00'
        },
        {
          value: '00:59:59',
          label: '00:59:59'
        },
        {
          value: '01:30:00',
          label: '01:30:00'
        },
        {
          value: '01:59:59',
          label: '01:59:59'
        },
        {
          value: '02:30:00',
          label: '02:30:00'
        },
        {
          value: '02:59:59',
          label: '02:59:59'
        },
        {
          value: '03:30:00',
          label: '03:30:00'
        },
        {
          value: '03:59:59',
          label: '03:59:59'
        },
        {
          value: '04:30:00',
          label: '04:30:00'
        },
        {
          value: '04:59:59',
          label: '04:59:59'
        },
        {
          value: '05:30:00',
          label: '05:30:00'
        },
        {
          value: '05:59:59',
          label: '05:59:59'
        },
        {
          value: '06:30:00',
          label: '06:30:00'
        },
        {
          value: '06:59:59',
          label: '06:59:59'
        },
        {
          value: '07:30:00',
          label: '07:30:00'
        },
        {
          value: '07:59:59',
          label: '07:59:59'
        },
        {
          value: '08:30:00',
          label: '08:30:00'
        },
        {
          value: '08:59:59',
          label: '08:59:59'
        },
        {
          value: '09:30:00',
          label: '09:30:00'
        },
        {
          value: '09:59:59',
          label: '09:59:59'
        },
        {
          value: '10:30:00',
          label: '10:30:00'
        },
        {
          value: '10:59:59',
          label: '10:59:59'
        },
        {
          value: '11:30:00',
          label: '11:30:00'
        },
        {
          value: '11:59:59',
          label: '11:59:59'
        },
        {
          value: '12:30:00',
          label: '12:30:00'
        },
        {
          value: '12:59:59',
          label: '12:59:59'
        },
        {
          value: '13:30:00',
          label: '13:30:00'
        },
        {
          value: '13:59:59',
          label: '13:59:59'
        },
        {
          value: '14:30:00',
          label: '14:30:00'
        },
        {
          value: '14:59:59',
          label: '14:59:59'
        },
        {
          value: '15:30:00',
          label: '15:30:00'
        },
        {
          value: '15:59:59',
          label: '15:59:59'
        },
        {
          value: '16:30:00',
          label: '16:30:00'
        },
        {
          value: '16:59:59',
          label: '16:59:59'
        },
        {
          value: '17:30:00',
          label: '17:30:00'
        },
        {
          value: '17:59:59',
          label: '17:59:59'
        },
        {
          value: '18:30:00',
          label: '18:30:00'
        },
        {
          value: '18:59:59',
          label: '18:59:59'
        },
        {
          value: '19:30:00',
          label: '19:30:00'
        },
        {
          value: '19:59:59',
          label: '19:59:59'
        },
        {
          value: '20:30:00',
          label: '20:30:00'
        },
        {
          value: '20:59:59',
          label: '20:59:59'
        },
        {
          value: '21:30:00',
          label: '21:30:00'
        },
        {
          value: '21:59:59',
          label: '21:59:59'
        },
        {
          value: '22:30:00',
          label: '22:30:00'
        },
        {
          value: '22:59:59',
          label: '22:59:59'
        },
        {
          value: '23:30:00',
          label: '23:30:00'
        },
        {
          value: '23:59:59',
          label: '23:59:59'
        }
      ]
    }
  },
  methods: {

  }
}
