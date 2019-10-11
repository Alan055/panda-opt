<!--运营事件管理-->
<template>
  <div class="operation-view">
    <transition name="el-zoom-in-bottom">
      <div>
        <div v-if="showAddBtn" class="add-btn" @click="addEvents(eventsTabIndex,'add')">
          <i class="el-icon-lx-roundadd"></i>新增运营模块
        </div>
        <el-tabs v-model="eventsTabIndex" type="card" @tab-remove="removeTab" closable>
          <el-tab-pane v-for="(item, serial) in eventTab" :key="item.name" :label="item.title"
                       :name="item.name">
            <div class="events-item">


              <div v-if="item.type=='list'">
                <!--搜索-->
                <div class="plugins-search">
                  <el-form :inline="true" class="formTop">
                    <div>
                      <el-form-item label="搜索：">
                        <el-input placeholder="请输入内容" v-model="searchText"  class="input-with-select"></el-input>
                      </el-form-item>
                      <el-form-item label="配置渠道：">
                        <el-select v-model="channelSelect" placeholder="请选择">
                          <el-option v-for="(item,index) in [{label:'全部',value:''}].concat(channelOption)" :label="item.label" :value="item.value"
                                     :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="配置时间段：">
                        <el-select v-model="timePartSelect" placeholder="请选择">
                          <el-option v-for="(item,index) in [{label:'全部',value:''}].concat(timePart)" :label="item.label" :value="item.value"
                                     :key="index"></el-option>
                        </el-select>
                        <div v-if="timePartSelect&&timePartSelect!='0'" style="display: inline-block">
                          <el-select v-model="allTimePre" placeholder="请选择开始时间">
                            <el-option v-for="(item,index) in allTime" :label="item.label" :value="item.value"
                                       :key="index"></el-option>
                          </el-select>
                          <el-select v-model="allTimeNext" placeholder="请选择结束时间">
                            <el-option v-for="(item,index) in allTime" :label="item.label" :value="item.value"
                                       :key="index"></el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <br>
                      <el-form-item label="跑批时间：">
                        <el-select v-model="runingTimePre" placeholder="请选择开始时间">
                          <el-option v-for="(item,index) in allTime" :label="item.label" :value="item.value"
                                     :key="index"></el-option>
                        </el-select>
                        <el-select v-model="runingTimeNext" placeholder="请选择结束时间">
                          <el-option v-for="(item,index) in allTime" :label="item.label" :value="item.value"
                                     :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="defaultSize.pageNumber=1,getSysEventlListById()">搜索
                        </el-button>
                        <el-button type="warning" @click="download()">导出</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
                <!--表格-->
                <el-table :data="eventsList.list" style="width: 100%">
                  <el-table-column prop="events" type="expand">
                    <template slot-scope="scope">
                      <div class="solt-channel">
                        <div v-for="(item,index) in scope.row.messageEventsBeanList"
                             class="slot-channel" :key="index">

                          <el-form label-position="right" inlineclass="demo-table-expand">
                            <div class="inline-div" style="width: 63%;">
                              <el-form-item label="配置时间段：" :label-width="labelWidth">
                                                                <span
                                                                  class="border">{{item.triggerday | filterTriggerDay(item.timedirection)}}</span>
                                <span class="border">{{item.starttime || '无' }} 至
                                                                    {{item.endtime || '无'}}</span>
                              </el-form-item>
                            </div>
                            <div class="inline-div inline-small">
                              <el-form-item label="跑批时间：" :label-width="labelWidth">
                                <span class="border">{{item.triggertime || '无'}}</span>
                              </el-form-item>
                            </div>
                            <div :class="['item-material',key.status==0?'disabled':'']"
                                 v-for="(key,serial) in item.messageEventsBeanList"
                                 :key="serial">
                              <div class="inline-div inline-small">
                                <el-form-item label="配置渠道：" :label-width="labelWidth">
                                                                    <span
                                                                      class="border">{{key.messagetype |filterMessage }}</span>
                                </el-form-item>
                              </div>
                              <div class="inline-div ">
                                <el-form-item label="渠道ID：" :label-width="labelWidth">
                                                                    <span
                                                                      class="border">{{key.messageid || '无' }}</span>
                                </el-form-item>
                              </div>
                              <el-form-item label="内容：" :label-width="labelWidth">
                                <span
                                  class="border">{{key.content || key.templateid || '无' }}
                                </span>
                              </el-form-item>
                              <div class="slot-operation">
                                <el-button
                                  @click="setDisabled(key,index,serial,scope.$index)"
                                  type="primary" size="mini" :plain="key.status==1">
                                  {{key.status | filterStatus}}
                                </el-button>
                                <el-button
                                  @click="setABtest(key,index,serial,scope.$index)"
                                  type="warning" size="mini" :plain="key.abtest==1">
                                  {{key.abtest | filterABtest}}
                                </el-button>
                                <el-button
                                  @click="deleteChannel(key,index,serial,scope.$index)"
                                  type="danger" size="mini">删除
                                </el-button>
                              </div>
                            </div>
                          </el-form>
                          <!--<div class="slot-operation">-->
                          <!--<el-button @click="setDisabled(item)" type="primary" plain>{{item.status | filterStatus}}</el-button>-->
                          <!--</div>-->
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="序号" type="index">
                  </el-table-column>
                  <el-table-column prop="eventstep" label="环节">
                  </el-table-column>
                  <el-table-column prop="eventname" label="用户状态" width="300">
                  </el-table-column>
                  <el-table-column prop="status" label="状态" :formatter="formatStatus">
                  </el-table-column>
                  <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                      <el-button @click="addEvents(eventsTabIndex,'edit',scope)" type="primary"
                                 size="mini">编辑
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                               layout="total, sizes, prev, pager, next, jumper" :total="eventsList.total">
                </el-pagination>
              </div>
              <div v-else class="addEvents_ct">
                <el-form label-position="left" label-width="100px" :model="item.addEventsForm"
                         :ref="'addEventsFormRef'+serial" :rules="addEventsFormRules" size="mini">
                  <el-form-item label="环节：" prop="eventstep">
                    <el-select v-model="item.addEventsForm.eventstep"
                               @change="item.addEventsForm.eventtype= ''" placeholder="请选择">
                      <el-option v-for="item in linkList" :key="item.value" :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="用户状态：" prop="eventtype">
                    <el-select v-model="item.addEventsForm.eventtype" autocomplete="off"
                               style="width: 400px;" placeholder="选择用户状态">
                      <el-option v-for="item in selectLoanstep(item.addEventsForm.eventstep)"
                                 :key="item.eventtype" :label="item.eventname" :value="item.eventtype">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="运营事件：">
                    <el-button type="primary" @click="addAllocation(serial)" plain>新增时间配置
                    </el-button>
                  </el-form-item>
                  <div class="event-item"
                       v-for="(key,index) in  item.addEventsForm.messageEventsBeanList" :key="index">
                    <div class="event-header">
                      <div class="event-header-left">
                        配置{{index+1}}
                      </div>
                      <div class="event-header-right"
                           v-if="item.addEventsForm.messageEventsBeanList.length>1">
                        <el-button @click="deleteAllocation(serial,index)" type="danger"
                                   icon="el-icon-delete" circle></el-button>
                      </div>
                    </div>
                    <div :class="['event-contain',key.isError?'event-error':'']">
                      <el-form-item label="配置时间段">
                        <el-select v-model="key.triggerday" placeholder="选择时间段">
                          <el-option v-for="item in timePart" :key="item.value"
                                     :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                        <el-select v-model="key.starttime" placeholder="选择开始时间">
                          <el-option v-for="item in allTime" :key="item.value"
                                     :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                        <el-select v-model="key.endtime" placeholder="选择结束时间">
                          <el-option v-for="item in allTime" :key="item.value"
                                     :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="发送时间">
                        <el-select v-model="key.triggertime" placeholder="选择发送时间">
                          <el-option v-for="item in allTime" :key="item.value"
                                     :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                        <div class="el-form-item__error" v-if="key.isError">{{key.errorText}}
                        </div>
                      </el-form-item>
                      <el-form-item :class="[channel.isError?'event-error':'']" label="配置渠道"
                                    v-for="(channel,number) in key.messageEventsBeanList" :key="number"
                                    class="event-setChannel">
                        <el-select v-model='channel.messagetype'
                                   @change="channel.messageid= '';channel.content= '';channel.templateid=''"
                                   placeholder="选择渠道">
                          <el-option v-for="item in channelOption" :key="item.value"
                                     :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input
                          @blur="getSysEventDetailById(channel.messageid,index,serial,number)"
                          v-model='channel.messageid' placeholder="渠道ID"
                          style="width: 199.72px;">

                        </el-input>
                        <el-button @click="deleteBeanList(index,serial,number)" type="danger"
                                   v-if=" key.messageEventsBeanList.length>1" icon="el-icon-minus"
                                   circle style="margin-left: 15px;"></el-button>
                        <el-button @click="addBeanList(index,serial)" type="primary"
                                   v-if=" number == key.messageEventsBeanList.length-1"
                                   icon="el-icon-plus" circle></el-button>
                        <div class="event-content">{{channel.content || channel.templateid}}
                        </div>
                        <div class="el-form-item__error" v-if="channel.isError">
                          {{channel.errorText}}
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
                <el-footer>
                  <el-button @click="removeTab(eventsTabIndex)" plain size="medium">取消</el-button>
                  <el-button @click="saveSysEvent(serial,'addEventsFormRef'+serial)" type="primary"
                             size="medium" plain>确定
                  </el-button>

                </el-footer>
              </div>
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
  </div>

</template>

<script>
  import Vue from 'vue';
  import axios from "axios";




  export default {
    name: "OperationalEvents",
    data() {
      return {
        addEventsFormRules: {
          eventstep: [{
            required: true,
            message: '请选环节',
            trigger: 'change'
          },],
          eventtype: [{
            required: true,
            message: '请选择用户状态',
            trigger: 'change'
          },],
        },
        eventTab: [{
          title: '运营事件列表',
          name: '1',
          type: 'list'
        }],
        labelWidth: '120px',
        showAddBtn: true,
        eventsTabIndex: '1',
        tabIndex: 1,
        eventsList: {},
        defaultSize: {
          pageSize: 10,
          pageNumber: 1
        },
        timePart: [
          {
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
            value: '15',
            label: 'T+15'
          },
          {
            value: '30',
            label: 'T+30'
          },
          {
            value: '50',
            label: 'T+50'
          },
          {
            value: '120',
            label: 'T+120'
          }


        ],
        allTime: [
          {
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
        ],
        channelOption: [
          {
            value: '1',
            label: '短信'
          },
          {
            value: '2',
            label: 'App push'
          },
          {
            value: '3',
            label: 'APP站内消息'
          },
          {
            value: '4',
            label: '自动电话'
          }
        ],
        getDisabled: true,
        userStatusList: [], //用户状态

        // 新增搜索和导出功能
        searchText: '', // 搜索框
        // channelList: [ // 配置渠道下拉
        //   {label: '短信', value:'1'},
        //   {label: '自动电话', value:'2'},
        //   {label: 'App Push', value:'3'},
        //   {label: 'App 站内消息', value:'4'},
        // ],
        channelSelect: '', // 配置渠道下拉选中的
        timePartSelect: '', // 配置时间段 选中的T-x
        allTimePre: '', // 配置时间段 开始时间
        allTimeNext: '', // 配置时间段 结束时间
        runingTimePre: '', // 跑批时间-开始
        runingTimeNext: '', // 跑批时间-结束
      }
    },
    computed: {
      linkList: function () {
        return [{
          value: 'PART1',
          label: 'PART1'
        },
          {
            value: 'PART2',
            label: 'PART2'
          },
          {
            value: 'PART3',
            label: 'PART3'
          },
          {
            value: 'PART4',
            label: 'PART4'
          },
          {
            value: 'PART5',
            label: 'PART5'
          },
          {
            value: 'PART6',
            label: 'PART6'
          }
        ]
      },
      selectLoanstep: function () {
        return function (val) {
          let userStatusListLoan = [];
          for (let i = 0; i < this.userStatusList.length; i++) {
            if (val == this.userStatusList[i].eventstep) {
              userStatusListLoan.push(this.userStatusList[i]);
            }
          }
          return userStatusListLoan
        }
      }
    },
    methods: {
      formatStatus: function (row, column) {
        return row.status == 0 ? '停用' : '正常';
      },
      handleSizeChange(val) {
        this.defaultSize.pageSize = val;
        this.getSysEventlListById();
      },
      handleCurrentChange(val) {
        this.defaultSize.pageNumber = val;
        this.getSysEventlListById();
      },
      //打开停用用户对话
      handleStop(index, row) {
        let text = row.status == 1 ? '停用' : '启用';
        this.$confirm('此操作将' + text + '运营事件 "' + index + '" 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.Api.perModUserStatus({
            id: row.id,
            status: row.status == 1 ? '0' : '1'
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: text + '成功!'
              });
              this.$store.dispatch('changeUserList', this.userListParams);
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消' + text
          });
        });

      },
      init: function () {
        this.getSysEventlListById();
        this.getSysEventlUserStatus();
      },
      getSysEventlListById() {
        let obj = {
          pageSize: this.defaultSize.pageSize,
          pageNumber: this.defaultSize.pageNumber,
          configtype: 0,
          keyword: this.searchText,
          messagetype: this.channelSelect,
          triggerstarttime: this.runingTimePre,
          triggerendtime: this.runingTimeNext,
        }
        if(this.timePartSelect != ''){
          obj.timedirection = this.timePartSelect < 0 ? 1 : 0
          obj.triggerday = Math.abs(this.timePartSelect)
        }
        if (this.timePartSelect && this.timePartSelect != '0') {
          obj.starttime = this.allTimePre
          obj.endtime = this.allTimeNext
        }
        console.log(obj)
        this.Api.msGetSysEventlListById(obj).then((res) => {
          if (res.data.code == 200) {
            this.eventsList = res.data.data || {};

          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      // 导出数据接口
      async download(){
        let obj = {
          pageSize: this.defaultSize.pageSize,
          pageNumber: this.defaultSize.pageNumber,
          configtype: 0,
          keyword: this.searchText,
          messagetype: this.channelSelect,
          triggerstarttime: this.runingTimePre,
          triggerendtime: this.runingTimeNext,
        }
        if(this.timePartSelect != ''){
          obj.timedirection = this.timePartSelect < 0 ? 1 : 0
          obj.triggerday = Math.abs(this.timePartSelect)
        }
        if (this.timePartSelect && this.timePartSelect != '0') {
          obj.starttime = this.allTimePre
          obj.endtime = this.allTimeNext
        }
       this.Down(obj,'/opt/sysEvent/exportOptEventMessageList')
      },
      // 表格搜索接口
      getSysEventlUserStatus() {

        this.Api.msGetSysEventlUserStatus({}).then((res) => {
          if (res.data.code == 200) {
            this.userStatusList = res.data.data
          }
        })
      },
      addEvents(targetName, openType, item) {
        let newTabName = ++this.tabIndex + '';
        if (openType == 'add') {
          this.eventTab.push({
            title: '新增运营事件',
            name: newTabName,
            type: 'add',
            addEventsForm: {
              eventtype: '',
              messageEventsBeanList: [

                {
                  messageEventsBeanList: [{
                    messagetype: '',
                    messageid: '',
                    content: ''
                  }]
                }
              ]
            }
          });
          this.showAddBtn = false;
        } else {
          if (item) {
            let items = JSON.parse(JSON.stringify(item.row));
            console.log("324324");
            console.log(items);
            for (let i = 0; i < items.length; i++) {

            }
            this.eventTab.push({
              title: '编辑运营事件' + (item.$index + 1),
              name: newTabName,
              type: 'edit',
              addEventsForm: items
            });
          }
        }
        this.eventsTabIndex = newTabName;
      },
      removeTab(targetName) {

        let tabs = this.eventTab;
        let activeName = this.eventsTabIndex;
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            if (tab.type == 'add') {

              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
              this.showAddBtn = true;
            } else {

              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          }
        });

        this.eventsTabIndex = activeName;
        this.eventTab = tabs.filter(tab => tab.name !== targetName);
      },
      setDisabled(row, index, serial, number) {
        if (this.getDisabled) {
          this.getDisabled = false;
          let text = row.status == 1 ? '禁用' : '启用';
          this.$confirm('此操作将' + text + '该渠道 ， 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.Api.msUpdateIsProhibit({
              id: row.id,
              status: row.status == 1 ? '0' : '1'
            }).then((res) => {
              if (res.data.code == 200) {
                this.eventsList.list[number].messageEventsBeanList[index]
                  .messageEventsBeanList[serial].status = row.status == 1 ? '0' : '1';
                this.getDisabled = true;
              } else {
                this.getDisabled = true;
                this.$message.error(res.data.msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消' + text
            });
            this.getDisabled = true;
          });
        }

      },
      setABtest(row, index, serial, number) {
        let text = row.abtest == 1 ? '停用' : '开启';
        this.$confirm('此操作将' + text + '该渠道ABtest， 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.Api.msUpdateAbtestById({
            id: row.id,
            abtest: row.abtest == 1 ? '0' : '1'
          }).then((res) => {
            if (res.data.code == 200) {
              this.eventsList.list[number].messageEventsBeanList[index]
                .messageEventsBeanList[serial].abtest = row.abtest == 1 ? '0' : '1';
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消' + text
          });
        });
      },
      deleteChannel(row, index, serial, number) {
        this.$confirm('此操作将删除该渠道， 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
        }).then(() => {
          this.Api.msDeleteEventById({
            id: row.id,
          }).then((res) => {
            if (res.data.code == 200) {
              this.eventsList.list[number].messageEventsBeanList[index]
                .messageEventsBeanList.splice(serial, 1);
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //新增时间配置
      addAllocation(serial) {
        this.eventTab[serial].addEventsForm.messageEventsBeanList.push({
          messageEventsBeanList: [{
            messagetype: '',
            messageid: '',
            content: ''
          }]
        })
      },
      //删除时间配置
      deleteAllocation(serial, index) {
        this.eventTab[serial].addEventsForm.messageEventsBeanList.splice(index, 1);
      },
      //添加渠道配置
      addBeanList(index, serial) {
        console.log(serial);
        this.eventTab[serial].addEventsForm.messageEventsBeanList[index].messageEventsBeanList.push({
          messagetype: '',
          messageid: '',
          content: ''
        })
      },
      //删除渠道配置
      deleteBeanList(index, serial, number) {
        this.eventTab[serial].addEventsForm.messageEventsBeanList[index].messageEventsBeanList.splice(number, 1)
      },
      //根据Id 获取物料内容
      getSysEventDetailById(id, index, serial, number) {
        if (id && id.length >= 18) {
          this.Api.msGetSysEventDetailById({
            id: id
          }).then((res) => {
            if (res.data.code == 200) {
              if (res.data.data) {
                if (this.eventTab[serial].addEventsForm.messageEventsBeanList[index]
                  .messageEventsBeanList[number].messagetype == res.data.data.messagetype) {
                  this.eventTab[serial].addEventsForm.messageEventsBeanList[index]
                    .messageEventsBeanList[number].content = res.data.data.content ? res
                    .data.data.content : res.data.data.templateid;
                  this.eventTab[serial].addEventsForm.messageEventsBeanList[index]
                    .messageEventsBeanList[number].messagetypeNew = res.data.data
                    .messagetype

                } else {
                  this.$message.error("渠道id不正确或者消息类型不匹配");
                }
              } else {
                this.$message.error("渠道id不正确或者消息类型不匹配");
              }


            } else {
              this.$message.error(res.data.msg);
            }
          })
        } else {

          return false;
        }

      },
      saveSysEvent(serial, formName) {

        this.$refs[formName][0].validate((valid) => {
          if (valid) {
            var count = 0;
            var n = 0;
            var errMsg = '';
            if (this.eventTab[serial].type == 'add') {
              this.eventTab[serial].addEventsForm.type = '2';
            } else {
              this.eventTab[serial].addEventsForm.type = '1';
            }
            let eventDetail = this.eventTab[serial].addEventsForm;
            for (var i = 0; i < this.eventTab[serial].addEventsForm.messageEventsBeanList
              .length; i++) {
              for (var j = 0; j < this.eventTab[serial].addEventsForm.messageEventsBeanList[i]
                .messageEventsBeanList.length; j++) {
                //endtime starttimetriggerday
                n++;
                if (!eventDetail.messageEventsBeanList[i].triggerday) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i], 'errorText', '请选择配置时间段');
                  errMsg = '请选择配置时间段';
                } else if (!eventDetail.messageEventsBeanList[i].starttime) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i], 'errorText', '请选择开始时间');
                  errMsg = '请选择开始时间';
                } else if (!eventDetail.messageEventsBeanList[i].endtime) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i], 'errorText', '请选择结束时间');
                  errMsg = '请选择结束时间';
                } else if (eventDetail.messageEventsBeanList[i].starttime.split(":")[0] >
                  eventDetail.messageEventsBeanList[i].endtime.split(":")[0]) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i], 'errorText', '开始时间不能大于结束时间');
                  errMsg = '开始时间不能大于结束时间';

                } else if (eventDetail.messageEventsBeanList[i].starttime.split(":")[0] ==
                  eventDetail.messageEventsBeanList[i].endtime.split(":")[0] && eventDetail
                    .messageEventsBeanList[i].starttime.split(":")[1] >=
                  eventDetail.messageEventsBeanList[i].endtime.split(":")[1]) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i], 'errorText', '开始时间不能大于结束时间');
                  errMsg = '开始时间不能大于结束时间';

                } else if (!eventDetail.messageEventsBeanList[i].triggertime) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i], 'errorText', '请选择跑批时间段');
                  errMsg = '请选择跑批时间段';
                } else if (!eventDetail.messageEventsBeanList[i].messageEventsBeanList[j]
                  .messagetype) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', false);
                  Vue.set(eventDetail.messageEventsBeanList[i], 'errorText', '');
                  Vue.set(eventDetail.messageEventsBeanList[i].messageEventsBeanList[j],
                    'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i].messageEventsBeanList[j],
                    'errorText', '请选择配置渠道');
                  errMsg = '请选择配置渠道';
                } else if (!eventDetail.messageEventsBeanList[i].messageEventsBeanList[j]
                  .messageid || eventDetail.messageEventsBeanList[i].messageEventsBeanList[j]
                  .messageid.length < 18) {
                  Vue.set(eventDetail.messageEventsBeanList[i], 'isError', false);
                  Vue.set(eventDetail.messageEventsBeanList[i].messageEventsBeanList[j],
                    'isError', true);
                  Vue.set(eventDetail.messageEventsBeanList[i].messageEventsBeanList[j],
                    'errorText', '请输入正确的渠道id');
                  errMsg = '请输入正确的渠道id';
                } else {
                  Vue.set(eventDetail.messageEventsBeanList[i].messageEventsBeanList[j],
                    'isError', false);
                  Vue.set(eventDetail.messageEventsBeanList[i].messageEventsBeanList[j],
                    'errorText', '');
                  errMsg = '';
                  count++;
                }
              }
            }
            if (count != n) {
              this.$message.error(errMsg);
              return false;
            }
            for (let i = 0; i < eventDetail.messageEventsBeanList.length; i++) {
              if (Number(eventDetail.messageEventsBeanList[i].triggerday) >= 0) {
                eventDetail.messageEventsBeanList[i].timedirection = '0'
              } else {
                eventDetail.messageEventsBeanList[i].timedirection = '1'
              }
            }
            let params = {
              id: eventDetail.id,
              configtype: 0,
              eventstep: eventDetail.eventstep,
              eventtype: eventDetail.eventtype,
              messageEventsBeanList: eventDetail.messageEventsBeanList,
            };
            this.Api.msSaveSysEvent({
              data: JSON.stringify(JSON.stringify(params)),
              type: eventDetail.type
            }).then((res) => {
              if (res.data.code == 200) {
                this.removeTab(this.eventsTabIndex);
                this.$message.success("保存成功");
                this.getSysEventlListById();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    created() {
      this.init();
    },
    filters: {
      filterABtest: function (val) {
        if (val == 1) {
          return "关闭ABtest"
        } else {
          return "开启ABtest"
        }
      },
      filterStatus: function (val) {
        if (val == 0) {
          return "启用"
        } else {
          return "禁用"
        }
      },
      filterMessage: function (val) {
        switch (val) {
          case '1':
            return "短信";
            break
          case '2':
            return "App push";
            break
          case '3':
            return "APP站内消息";
            break
          case '4':
            return "自动电话";
            break

        }
      },
      filterTriggerDay: function (val, timedirection) {
        if (val < 0) {
          return 'T' + val;
        } else {
          return 'T+' + val
        }


      }
    }
  }

</script>

<style lang="scss">
  .operation-view {
    & > div {
      position: relative;
    }

    .el-tabs__header {
      margin-bottom: 0;
    }

    .plugins-tips {
      height: 20px;
      background: transparent;
    }

    .add-btn {
      position: absolute;
      right: 0;
      top: 9px;
      z-index: 10;
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

    .el-footer {
      text-align: center;
      margin-top: 20px;
    }
  }

</style>
<style lang="scss">
  .operation-view {

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

    .el-tabs__content {
      padding-bottom: 20px;
    }
  }

  .addEvents_ct {

    background: #ffffff;
  }

  .solt-channel {
    max-height: 750px;
    overflow: auto;

    .item-left,
    .item-right {
      display: inline-block;
      vertical-align: middle;
      height: 35px;
      line-height: 36px;
    }

    .item-left {
      text-align: right;
      font-size: 12px;
      color: #333333;
      letter-spacing: 0.1px;
    }

    .item-right {
      font-size: 12px;
      color: #666666;

    }

    .slot-channel {
      padding: 10px;
      margin-bottom: 20px;
      background: #F9F9FA;
      position: relative;

      .border {
        border: 1px solid #e6e6e6;
        display: inline-block;
        padding: 0 15px;
        background: #ffffff;
        box-sizing: border-box;
        min-width: 80px;
        margin-right: 25px;
        vertical-align: middle;
      }

      .slot-operation {
        position: absolute;
        top: 14px;
        right: 14px;
      }

      .item-content {
        background: #FFFFFF;
        vertical-align: middle;
        padding: 12px 15px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
        display: inline-block;
        height: 30px;
        line-height: 30px;
      }
    }

    .item-material {
      &.disabled {
        color: #999999;

        .el-form-item__label {
          color: #999999;
        }
      }

      background: #eef1f6;
      color: #514353;
      margin-top: 20px;
      padding: 10px 0;
      position: relative;

      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }

  .inline-div {
    display: inline-block;
    vertical-align: middle;
    width: 49%;
  }

  .inline-div.inline-small {
    width: 35%;
  }

</style>
<style lang="scss" scoped>
  .plugins-search{
    /deep/ input.el-input__inner{
      width: 150px;
    }
  }
</style>
