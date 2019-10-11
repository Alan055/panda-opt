<template>
  <div class="SpecialDownConfig_view">

    <div class="container">
      <div class="plugins-tips">
        <div class="plugins-search">
          <el-form :inline="true" class="formTop">
            <div>
              <el-form-item label="调落策略：">
                <el-select v-model="searchData.strategy" placeholder="请选择调落策略">
                  <el-option v-for="(item,index) in selectData_strategy" :label="item.label" :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="操作时间：">
                  <el-date-picker v-model="searchData.date" type="daterange" range-separator="至"
                                  start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pagination.pageNumber=1,search()">搜索</el-button>
              </el-form-item>
            </div>

            <div>
              <el-form-item class="add-btn"  @click.native="modalData={},openModal()">
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
          <el-table-column fixed prop="a" label="调落策略"></el-table-column>
          <el-table-column fixed prop="b" label="调落商户">
            <!--<template slot-scope="scope"><img :src="scope.row.imgurl" alt=""></template>-->
          </el-table-column>
          <el-table-column fixed prop="w" label="每日调落人数上限"></el-table-column>
          <el-table-column fixed prop="e" label="调落时间范围"></el-table-column>
          <el-table-column fixed prop="t" label="对照组比例"></el-table-column>
          <el-table-column fixed prop="y" label="调落推送进度"></el-table-column>
          <el-table-column fixed prop="y" label="操作时间"></el-table-column>

        </myTable>
      </div>
    </div>

    <!--新增和弹框  弹框-->
    <el-dialog :title="`${Modal_isNew?'新增':'编辑'}日常调落配置`" :visible.sync="showModal" width="710px" center>
      <div>
        <el-form :inline="true" class="formTop1" label-position="right" label-width="150px" align="center"
                 :model="modalData" ref="modalData" :rules="modalDataRule">
          <el-form-item label="调落策略：">
            <el-select v-model="searchData.strategy" placeholder="请选择调落策略">
              <el-option v-for="(item,index) in selectData_strategy" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="调落商户：">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入城市拼音"
              v-model="value2"
              :data="data2">
            </el-transfer>
          </el-form-item>
          <el-form-item label="每日调落人数上限：" prop="maxNum">
            <el-input placeholder="请输入每日调落人数上限" v-model="modalData.maxNum" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
          <el-form-item label="调取时间范围：" prop="maxNum">
            <el-date-picker v-model="modalData.date" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="对照组比例：" prop="rate">
            <el-input placeholder="请输入对照组比例" v-model="modalData.rate" class="input-with-select"
                      style="width: 202px"></el-input>%
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
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({label: city, key: index, pinyin: pinyin[index]});
        });
        return data;
      };
      return {
        // 搜索
        selectData_strategy: [
          {label: '授信未首贷', value: '1'},
          {label: '已首贷有额度未动用', value: '2'},
          {label: '结清未复贷', value: '3'},
          {label: '首登未提交资料', value: '4'},
          {label: '分流未申请', value: '5'},
          {label: '还款日提醒', value: '6'},
        ],
        searchData: {
          date: [],
          strategy: '',
        },
        // 表格
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
        selectData_merchant: [ // 展示位置的弹框
          {label: '首页', value: '1'},
          {label: '媒体报道', value: '2'},
          {label: '全局', value: '3'},
        ],

        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      }
    },
    computed: {},
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

      // 查询表格的接口
      search:common.throttle(function () {
        console.log(this.searchData)
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
  .SpecialDownConfig_view{
    .formTop{
      display: flex;
      justify-content: space-between;
      .el-form-item{
        margin-bottom: 0;
      }
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
    .el-transfer-panel__header{
      padding-left: 30px;
    }
    .el-transfer-panel__body{
      .el-checkbox__input{
        left: 30px;
      }
      .el-checkbox__label{
        text-align: center;
      }
      .el-checkbox:last-child{
        margin-right: 30px;
      }
    }
    .formTop1{
      .el-form-item__content{
        width: 496px;
        text-align: left;
      }
    }

  }
</style>
