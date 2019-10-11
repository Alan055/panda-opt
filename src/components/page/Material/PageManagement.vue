<template>
  <div class="PageManagement_view">
    <el-tabs v-model="currentTab" type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(v,i) in tabPane" :key="i" :label="v.label" :name="i+''">
        <div class="container" v-if="currentTab == '0'">
          <div class="item">
            <div class="add-btn" v-if="showAddBtn" @click="addTab()">
              <i class="el-icon-lx-roundadd"></i>新增链接
            </div>
          </div>
          <div v-loading="exportLoading">
            <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
              <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column fixed prop="name" label="标签栏名称"></el-table-column>
              <el-table-column fixed prop="title" label="标签"></el-table-column>
              <el-table-column fixed prop="title" label="状态"></el-table-column>
              <el-table-column fixed prop="title" label="最近修改时间"></el-table-column>
              <el-table-column fixed prop="title" label="最近修改人"></el-table-column>

              <el-table-column fixed="right" label="操作" width="220" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="addTab(scope.row,scope.$index)">编辑</el-button>
                  <el-button size="mini" type="warning" @click="addTab(scope.row,scope.$index)">启动</el-button>
                  <el-button size="mini" type="danger" @click="addTab(scope.row.advertid)">删除</el-button>
                </template>
              </el-table-column>
            </myTable>
          </div>
        </div>

        <div class="container" v-if="currentTab != '0'">

        </div>
      </el-tab-pane>
    </el-tabs>


    <!--<el-tabs type="border-card" v-model="currentTab">-->
    <!--<el-tab-pane v-for="(v,i) in tabPane" :key="i" :label="v.label">-->
    <!--&lt;!&ndash;表格&ndash;&gt;-->
    <!---->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
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
        tableData: [{}, {}],
        // tab标签里面的所有数据 第一个是表格   从第二个开始 data存放数据
        tabPane: [{label: '页面管理', value: '1'}],
        currentTab: '0',
        showAddBtn: true, // 是否可以新增 最多只可以有一个新增页面

      }
    },
    computed: {},
    watch: {},
    methods: {
      // 新增或者编辑时  会添加一个tab标签
      addTab(v, i) { // i从0开始
        if (v) { // 说明是编辑
          let index = this.tabPane.findIndex((e) => (e.label == '编辑页面管理' + (i + 1))) // 是否已存在  保持位置index
          if (index > -1) { // 如果tab存在当前数据的编辑就跳转到相应的tab去
            this.currentTab = index + ''
          } else { // tab中不存在 就新增一个
            this.tabPane.push({label: '编辑页面管理' + (i + 1), data: {}})
            this.currentTab = this.tabPane.length - 1 + '' // 跳到最后tab
          }
        } else { // 说明是添加
          this.tabPane.push({label: '新增页面管理' + (this.tabPane.length + 1), data: {}})
          this.currentTab = this.tabPane.length - 1 + '' // 跳到最后tab
        }
      },
      // 删除一个tab
      removeTab(i) {
        // 如果是删除的当前页  就回到第一页
        if (this.currentTab >= i) { // 如何不是当前页且当前页大于被删页  就当前页位置-1
          this.currentTab = this.currentTab - 1 + ''
        }
        this.$delete(this.tabPane, i) // 删除一条数据
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
  .PageManagement_view {
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
    .item{
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 46px;
      width: 100%;
      margin-bottom: 20px;
      background: #EEF1F6;
      padding: 0 10px;
      .add-btn {
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

  }
</style>
