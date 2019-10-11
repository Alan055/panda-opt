<!-- 活动管理 -->
<template>
  <div class="Activity_view">
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
                        <el-input placeholder="请输入内容" clearable v-model="searchText" class="input-with-select">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="类型：">
                        <el-select v-model="currentSelect" placeholder="请选择类型" clearable>
                          <el-option v-for="(item,index) in selectData" :label="item.label" :value="item.value"
                                     :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="pagination.pageNumber=1,search()">搜索</el-button>
                        <el-button type="warning" @click="Down({content:searchText,status:currentSelect,productid:'2001'},'/opt/activity/manage/exportDat')">导出</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </div>

              </div>

              <!--表格插件-->
              <div v-loading="exportLoading">
                <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
                  <el-table-column prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
                  <el-table-column prop="name" label="活动名称" width='260'></el-table-column>
                  <el-table-column prop="status" label="状态" :formatter='filterStatus' width='80'></el-table-column>
                  <el-table-column  label="最后修改时间">
                    <template slot-scope="scope">{{scope.row.updatetime||scope.row.createtime}}</template>
                  </el-table-column>
                  <el-table-column  label="最后修改人">
                    <template slot-scope="scope">{{scope.row.updateby||scope.row.createby}}</template>
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" :formatter='filterEmpty'></el-table-column>
                  <el-table-column fixed="right" label="操作" width="220" align="center">
                    <template slot-scope="scope">
                      <!-- 目前只有福利红包活动能看到 策略 -->
                      <el-button v-if='scope.row.id == "2019003061045000003"' size="mini" type="primary"
                                 @click="addTab(editableTabsValue,scope.row,scope.$index)">
                        查看活动
                      </el-button>
                      <el-button size="mini" :type="scope.row.status==1?'danger':'warning'"
                                 @click="changeStatus(scope.row)">
                        {{scope.row.status==1? '禁用': '启用'}}
                      </el-button>
                    </template>
                  </el-table-column>
                </myTable>
              </div>
            </div>

            <!--新增和编辑  -->
            <div class="container" v-if="editableTabsValue>1&&editableTabsValue==itemT.name">
              <div class="plugins-tips">
                <div class="plugins-search">
                  <el-form :inline="true" class="formTop">
                    <div>
                      <el-form-item label="搜索：">
                        <el-input placeholder="请输入内容" clearable v-model="itemT.searchForm.searchText"
                                  class="input-with-select">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="类型：">
                        <el-select v-model="itemT.searchForm.currentSelect" placeholder="请选择类型" clearable>
                          <el-option v-for="(item,index) in selectData" :label="item.label" :value="item.value"
                                     :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="pagination.pageNumber=1,searchStrategy(indexT)">搜索</el-button>
                        <el-button type="warning" @click="Down({content:itemT.searchForm.searchText,status:itemT.searchForm.currentSelect,productid:'2001'},'/opt/activity/welfare/manage/strategy/exportData')">导出</el-button>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item class="add-btn" @click.native="editActivity()">
                        <i class="el-icon-lx-roundadd"></i>新增策略
                      </el-form-item>
                    </div>
                  </el-form>
                </div>

              </div>

              <div v-loading="itemT.searchForm.exportLoading">
                <!-- 策略表单 -->
                <myTable :tableData="itemT.tableData" :pagination.sync="itemT.pagination"
                         :ajax="searchStrategy">
                  <el-table-column prop="index" label="序号" type="index" :index="indexMethod1"></el-table-column>
                  <el-table-column prop="strategyname" label="活动名称" width='200'></el-table-column>
                  <el-table-column prop="productname" label="活动商户" :formatter='filterEmpty'></el-table-column>
                  <el-table-column prop="type" label="用户状态" :formatter='filterType'></el-table-column>
                  <el-table-column prop="rate" label="是否开启ABtest" :formatter='filterRate' width='120'></el-table-column>
                  <el-table-column prop="startdate" label="策略有效期" width='290' :formatter='filterDate'></el-table-column>
                  <el-table-column prop="enabled" label="状态" :formatter='filterEnabled'></el-table-column>
                  <el-table-column label="最后修改时间" >
                    <template slot-scope="scope">{{scope.row.updatetime||scope.row.createtime}}</template>
                  </el-table-column>
                  <el-table-column label="最后修改人">
                    <template slot-scope="scope">{{scope.row.updater||scope.row.creater}}</template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="220" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary"
                                 @click="editActivity(scope.row)">
                        编辑
                      </el-button>
                      <el-button size="mini" :type="scope.row.enabled=='1'?'warning':'primary'"
                                 @click="handleStop(scope.row)">{{scope.row.enabled=='1'?'禁用': '启用'}}
                      </el-button>
                      <el-button size="mini" type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </myTable>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>


        <!-- 编辑策略表单 -->
        <el-drawer title="策略" @closed="handleClose('strategyForm')" :wrapperClosable='false' size='60%'
                   :visible.sync="strategyDialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
          <div class="demo-drawer__content">
            <el-form :model="strategyForm" label-width="160px" ref='strategyForm' :rules='strategyFormRules'>
              <el-form-item label="策略名称" prop='strategyname'>
                <el-input maxLength='20' v-model="strategyForm.strategyname" :disabled="isEdit" placeholder="请输入策略名称"
                          clearable
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="策略商户" prop='merchants'>
                <el-transfer :disabled="isEdit" :left-default-checked='leftDefault' filterable
                             :right-default-checked='rightDefault'
                             v-model="strategyForm.merchants" :titles="['可选商户', '已选商户']" :data="optionSearchShielding">
                </el-transfer>
              </el-form-item>
              <el-form-item label="用户状态" prop='type'>
                <el-select :disabled="isEdit" v-model="strategyForm.type" placeholder="请选择用户状态" >
                  <el-option label="结清未复贷(R1)" value="1"></el-option>
                  <el-option label="授信未动用(R2)" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :disabled="isEdit" label="累计借款次数(F)" prop='number' v-if="strategyForm.type=='1'">
                <el-input type='tel' maxLength='4' style='width:50px;' v-model="strategyForm.findexmin"
                          :disabled="isEdit" autocomplete="off"></el-input>
                <span>至</span>
                <el-input type='tel' maxLength='4' style='width:50px;' v-model="strategyForm.findexmax"
                          :disabled="isEdit" autocomplete="off"></el-input>
                <span>次</span>
              </el-form-item>
              <el-form-item label="最近一笔授信额度(M)" prop='recently'>
                <el-input type='tel' maxLength='8' style='width:100px;' v-model="strategyForm.mindexmin"
                          :disabled="isEdit"
                          autocomplete="off"></el-input>
                <span>至</span>
                <el-input type='tel' maxLength='8' style='width:100px;' v-model="strategyForm.mindexmax"
                          :disabled="isEdit"
                          autocomplete="off"></el-input>
                <span>元</span>
              </el-form-item>
              <el-form-item label="策略有效期" prop='validity'>
                <el-date-picker v-model="strategyForm.validity" type="daterange" value-format='yyyy-MM-dd'
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="是否开启ABtest" prop='openAbtest'>
                <el-radio v-model="strategyForm.openAbtest" label="1" :disabled="isEdit">开启</el-radio>
                <el-radio v-model="strategyForm.openAbtest" label="2" :disabled="isEdit">不开启</el-radio>
              </el-form-item>
              <el-form-item label="红包详情">
                <el-button type="primary" @click='addTimeAllocation' plain :disabled="isEdit">新增时间配置</el-button>
                <!-- 时间配置 -->
                <div class='time-list' v-for='(v,i) in strategyForm.timelist' :key='i'>
                  <el-form-item v-if='strategyForm.openAbtest==="1"' label='执行比例' label-width="80px"
                                :prop='`timelist.${i}.rate`' :rules='strategyFormRules.rate'>
                    <el-input type='tel' maxlength='5' size='mini' style='width: 140px;' v-model='v.rate'
                              :disabled="isEdit"
                              placeholder="0~100">
                    </el-input>
                    %
                  </el-form-item>
                  <el-form-item label='掉落时间' label-width="80px" :prop='`timelist.${i}.rindex`'
                                :rules='strategyFormRules.rindex' style='display: inline-block;' >
                    <el-select size='mini' v-model="v.rindex" placeholder="请选择时间段" :disabled="isEdit">
                      <el-option v-for="(item,index) in timePart" :label="item.label" :value="item.value" :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label='红包' label-width="80px" :prop='`timelist.${i}.redpacketTemplateId`'
                                :rules='strategyFormRules.redbagId'>
                    <el-input size='mini' v-model='v.redpacketTemplateId' placeholder="请输入红包id"
                              :readonly="isEdit"></el-input>
                    <el-input size='mini' v-model='v.redbagName' readOnly placeholder="请输入红包id传入红包名称"
                              :disabled="isEdit">
                    </el-input>
                    <el-button size='mini' v-if="v.redbagName" @click="$router.push({path:'/RedEnvelopeList',query:{keyword:v.redbagId||v.redpacketTemplateId}})" type="primary">查看红包</el-button>
                  </el-form-item>
                  <!-- 删除按钮  超过一条才可以删除 -->
                  <div class="event-header-right" v-if='strategyForm.timelist && strategyForm.timelist.length>1'>
                    <el-button @click='deletTimeAllocation(i)' type="danger" icon="el-icon-delete" circle></el-button>
                  </div>
                </div>

              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="strategyDialog = false">取 消</el-button>
              <el-button type="primary" @click="submitEditStrategy('strategyForm')" :loading="btnloading">
                {{ btnloading ? '提交中 ...' : '确 定' }}
              </el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </transition>

  </div>
</template>
`
<script>
  import common from "./../../../assets/common/common";
  import myTable from "./../../common/myTable";
  import {
    tableMixin,
    activityMinxin
  } from "./../../common/commonMixin";
  import {axios} from "../../../assets/base/axiosConfig"; // 混入表格组件所需的数据

  export default {
    components: {
      myTable
    },
    mixins: [tableMixin, activityMinxin],
    data() {
      return {
        searchText: '', // 输入框内容
        selectData: [ // 类型下拉选项
          {label: '全部', value: ''},
          {label: '禁用', value: '0'},
        ],
        selectData_newAdd: [], // 新增和编辑时的下拉框选项
        map_select: { // 映射表
          '1': '正常',
          '2': '已过期'
        },
        currentSelect: '', // 当前选中的下拉数据
        // 新增策略  表单数据  验证规则
        ruleData: {
          name: [{
            required: true,
            message: '请输入策略名称',
            trigger: 'change'
          },
            {
              max: 50,
              message: '最大输入50字符',
              trigger: 'change'
            },
          ], // 策略名称
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'change'
          },
            {
              max: 50,
              message: '最大输入50字符',
              trigger: 'change'
            },
          ], // 标题
          adverttype: [{
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }], // 类型
          icontext: [{
            required: true,
            message: '请输入策略内容',
            trigger: 'change'
          }], // 策略内容
          remark: [{
            required: false,
            message: '请输入策略内容',
            trigger: 'change'
          }],
        },
        // 分页器数据
        editableTabsValue: '1',
        editableTabs: [{
          title: '活动列表',
          name: '1',
        }],
        currentAddData: {
          name: '',
          title: '',
          adverttype: '',
          icontext: '',
          remark: '',
        }, // 当前的添加或者编辑页面的数据 浅复制 可以联动
        tabIndex: 1,
        optionSearchShielding: [], //商户列表
        strategyDialog: false, //策略抽屉弹窗
        btnloading: false, //保存按钮

        isEdit: false, // 策略新增、编辑框  是否是编辑

      }
    },
    computed: {
      actionUrl: function () {
        return this.$store.state.actionUrl;
      },
    },
    watch: {},
    methods: {
      // 序号过滤器
      indexMethod1(i) {
        let pagination = this.editableTabs[this.tabIndex - 1].pagination
        return i + 1 + (pagination.pageNumber - 1) * pagination.pageSize
      },
      //表单空校验
      filterEmpty(row, column, cellValue) {
        return cellValue ? cellValue : '--';
      },
      //状态校验
      filterStatus(row, column, cellValue) {
        return cellValue == 1 ? '正常' : cellValue == 2 ? '已过期' : '禁用'
      },
      //策略用户状态
      filterType(row, column, cellValue) {
        return cellValue == 1 ? '结清未复贷（R1）' : '授信未动用(R2)'
      },
      //有效期
      filterDate(row, column, cellValue) {
        if (row.startdate && row.enddate) {
          return row.startdate + ' - ' + row.enddate;
        } else {
          return '--'
        }
      },
      //是否开启AB test
      filterRate(row, column, cellValue) {
        if (row.rate == 1) {
          return '否';
        } else {
          return '是(' + Number(row.rate) * 100 + '%)';
        }
      },
      //状态
      filterEnabled(row, column, cellValue) {
        return cellValue == 1 ? '启用' : '禁用'
      },
      // 查询策略列表
      searchStrategy() {
        //拿当前tab的数据
        let params = {
          pageSize: this.currentAddData.pagination.pageSize,
          pageNumber: this.currentAddData.pagination.pageNumber,
          content: this.currentAddData.searchForm.searchText,
          status: this.currentAddData.searchForm.currentSelect,
        }
          // params.content = this.currentAddData.searchForm.searchText;
          // params.status = this.currentAddData.searchForm.currentSelect;
        this.Api.opeQueryStrategyList(params).then((res) => {
          if (res.data.code == 200) {
            this.currentAddData.tableData = res.data.data.list;
            this.currentAddData.pagination.total = res.data.data.total;
            this
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch((err) => {

          this.$message.error(err.msg);
        })
      },
      //修改策略状态
      handleStop(item) {
        let text = item.enabled == 1 ? '禁用' : '启用';
        this.$confirm('是否' + text + '该策略？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.Api.opeSaveStrategy({
            id: item.id,
            enabled: item.enabled == 1 ? '0' : '1'
          }).then((result) => {
            let res = result.data
            if (res.code === 200) {
              this.$message({type: 'success', message: '修改成功'});
              this.searchStrategy() // 刷新表格数据
            } else {
              this.$message({type: 'error', message: res.msg});
            }
          }).catch((err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消修改！'});
        });
      },
      //关闭之前
      handleClose(formName) {
        this.leftDefault = [];
        this.rightDefault = [];
        this.$refs[formName].resetFields();
      },
      //新增、编辑策略
      async editActivity(item) {
        if (item) { // 是编辑
          this.isEdit = true
          let result = await axios.post('/opt/activity/welfare/manage/redpacket/queryRedpacket', {id: item.redpacketid})
          let res = result.data
          if (res.code == 200) {
            item.redbagName = res.data.name
          } else {
            console.log(res.msg)
          }
        } else {
          this.isEdit = false
        }
        this.optionSearchShielding.map(e => (e.disabled = this.isEdit))
        console.log(item)
        this.strategyForm = {
          strategyname: '', //策略名称
          merchants: [], //策略商户
          type: '', //用户状态
          findexmin: '', //累积借款次数1
          findexmax: '', //累积借款次数2
          mindexmin: '', //最近一笔授信额度1
          mindexmax: '', //最近一笔授信额度2
          openAbtest: '2', // 是否开启abtest 默认不开启
          validity: [], //有效期
          timelist: [ // 时间配置
            {rindex: '', redpacketTemplateId: '', redbagName: '', rate: ''},
          ]
        }
        if (item) {
          this.strategyForm.id = item.id
          this.strategyForm.strategyname = item.strategyname
          this.strategyForm.type = item.type+''
          this.strategyForm.findexmin = item.findexmin
          this.strategyForm.findexmax = item.findexmax
          this.strategyForm.mindexmin = item.mindexmin
          this.strategyForm.mindexmax = item.mindexmax
          this.strategyForm.openAbtest = item.rate == 0 ? '2' : '1'
          this.strategyForm.merchants = item.productid.split(',')
          this.strategyForm.validity = [item.startdate, item.enddate]
          this.strategyForm.timelist[0].rate = item.rate * 100
          this.strategyForm.timelist[0].rindex = item.rindexmax + ''
          this.strategyForm.timelist[0].redpacketTemplateId = item.redpacketid
          this.strategyForm.timelist[0].redbagName = item.redbagName
        }

        this.redbagName = ''
        this.strategyDialog = true; // 打开侧边弹框

      },
      //新增时间配置
      addTimeAllocation() {
        this.strategyForm.timelist.push({rindex: '', redpacketTemplateId: '', redbagName: '', rate: ''})
      },
      //删除时间配置
      deletTimeAllocation(index) {
        console.log(index);
        this.strategyForm.timelist.splice(index, 1);
      },
      //保存策略编辑
      submitEditStrategy(formName) {

        this.$refs[formName].validate(async (valid) => {
          if (valid) { // 验证成功 发送请求
            this.btnloading = true; // 显示提交中
            console.log(this.strategyForm)
            let obj = JSON.parse(JSON.stringify(this.strategyForm)) // 深复制一份
            obj.productids = obj.merchants.join(',')
            obj.startdate = obj.validity[0]
            obj.enddate = obj.validity[1]
            obj.timeConfigStr = JSON.stringify(obj.timelist)
            obj.type == '2' && this.$delete(obj, 'findexmin') // 授信未动用就不传 累计次数
            this.$delete(obj, 'timelist')
            this.$delete(obj, 'validity')
            this.$delete(obj, 'merchants')
            let result = await axios.post('/opt/activity/welfare/manage/strategy/saveStrategy',obj)
            let res = result.data
            if (res.code == 200) {
              this.$message.success('提交成功');
              // 关闭框框
              this.searchStrategy() // 刷新策略列表
            }else{
              this.$message.error(res.data.msg);
            }
            this.btnloading = false; // 关闭提交中
            this.strategyDialog = false; // 关闭侧边弹框

          }
        })
      },
      // 查看活动
      addTab(targetName, v, i) { // v  无数据是新增 有数据是编辑
        let newTabName = ++this.tabIndex + '';

        let obj = { // 初始化数据
          name: v ? v.name : '',
          title: v ? v.title : '',
          adverttype: v ? v.adverttype : '',
          icontext: v ? v.icontext : '',
          remark: v ? v.remark : '',
        }
        v && (obj.id = v.id) // 是编辑的时候就带上id
        let params = {
          pageNumber: 1,
          pageSize: 10
        }; //查询策略条件
        this.Api.opeQueryStrategyList(params).then((res) => {
          if (res.data.code == 200) {
            obj.tableData = res.data.data;
            this.editableTabs.push({
              title: '"' + v.name + '"策略列表',
              name: newTabName,
              searchForm: { //每个活动策略对应的表格搜索条件
                searchText: '',
                currentSelect: '',
                exportLoading: false
              },
              pagination: {
                pageSize: 10,
                pageNumber: 1,
                total: obj.tableData.total
              },
              tableData: obj.tableData.list,
              data: obj,
            });
            this.editableTabsValue = newTabName;
            this.currentAddData = this.editableTabs[this.editableTabsValue - 1];
          } else {
            this.$message.error(res.data.msg);
          }
        })
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
        let i = this.editableTabs.findIndex((e) => (e.name === this
          .editableTabsValue)) // 找到当前页签对应的数组数据  因为editableTabsValue并不是数组的下标
        this.currentAddData = this.editableTabs[i] // 传递当前选中的页签的数据
        // i === 0 && this.init() // 切换到第一个页签时  刷新表格的数据
      },


      // 查询表格数据
      search: common.throttle(function () {
        this.tableData = []
        let obj = {
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize,
          productId: localStorage.getItem('productId')
        } // 传参
        if (this.searchText) {
          obj.content = this.searchText
        }
        if (this.currentSelect != '') {
          obj.status = this.currentSelect
        }
        this.exportLoading = true // 打开加载层
        this.Api.opeQueryActList(obj).then((result) => {
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
      //修改活动状态
      changeStatus(item) {
        let text = item.status == 1 ? '禁用' : '启用';
        this.$confirm('是否' + text + '该活动？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.Api.opeModifyAct({
            id: item.id,
            status: item.status == 1 ? '0' : '1'
          }).then((result) => {
            let res = result.data
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.init() // 刷新表格数据
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          });
        });
      },
      // 删除一条数据
      async deleteRow(id) {
        let confim = await this.$confirm('是否删除该数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        if (!confim) return
        let result = await axios.post('/opt/activity/welfare/manage/strategy/deleteStrategy',{id: id})
        let res = result.data
        if (res.code === 200) {
          this.$message({type: 'success', message: '删除成功！'});
          this.searchStrategy() // 刷新表格数据
        } else {
          this.$message({type: 'error', message: res.msg});
        }


        // this.$confirm('是否删除该数据？', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
        //   this.Api.loDeleteLinkListById({
        //     advertid: id
        //   }).then((result) => {
        //     let res = result.data
        //     if (res.code === 200) {
        //       this.$message({
        //         type: 'success',
        //         message: '删除成功！'
        //       });
        //       this.init() // 刷新表格数据
        //     } else {
        //       this.$message({
        //         type: 'error',
        //         message: res.msg
        //       });
        //     }
        //   }).catch((err) => {
        //     this.$message({
        //       type: 'error',
        //       message: err
        //     });
        //   })
        // }).catch(() => {
        //   this.$message({type: 'info', message: '已取消删除！'});
        // });
      },

      //获取商户列表
      queryProductInfo: function () {
        this.Api.loQueryProductInfo({}).then((res) => {
          if (res.data.code == 200) {
            let options = res.data.data;
            options.forEach((item, index) => {
              this.optionSearchShielding.push({
                label: item.productname,
                key: item.id,
                value: item.id
              });
            });
          }
        }).catch((err) => {

        })
      },
      init() {
        this.search()
      }
    },
    created() {
      this.queryProductInfo();

      for (let k of Object.keys(this.map_select)) {
        this.selectData.push({
          label: this.map_select[k],
          value: k
        })
        this.selectData_newAdd.push({
          label: this.map_select[k],
          value: k
        })
      }
      this.init()
    },
    mounted() {
    },
  }

</script>

<style lang='scss'>
  .Activity_view {
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

    .ql-align-center {
      text-align: center;
    }
  }

  .time-list {
    font-size: 12px;
    margin-top: 10px;
    background: #eef1f6;
    min-height: 60px;
    padding: 5px 10px 5px 5px;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;

    .event-header-right {
      position: absolute;
      right: 10px;
      top: 5px;
    }

    .el-input {
      width: 220px;
    }

    .el-select {
      width: 140px;

      .el-input {
        width: 140px;
      }
    }
  }

  .demo-drawer__footer {
    text-align: center;
    margin: 0 0 50px;
  }

</style>
