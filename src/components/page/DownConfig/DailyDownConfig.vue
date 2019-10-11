<template>
  <div class="DailyDownConfig_view">

    <!--新增按钮-->
    <!--<div class="newAdd">-->
      <!--<span class="add-btn" @click="openModal()">-->
        <!--<i class="el-icon-lx-roundadd"></i>新增公告-->
      <!--</span>-->
    <!--</div>-->
    <div class="container">
      <!--表格插件-->
      <div v-loading="exportLoading">
        <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
          <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
          <el-table-column fixed prop="a" label="调落策略"></el-table-column>
          <el-table-column fixed prop="b" label="调落商户">
            <!--<template slot-scope="scope"><img :src="scope.row.imgurl" alt=""></template>-->
          </el-table-column>
          <el-table-column fixed prop="q" label="分类"></el-table-column>
          <el-table-column fixed prop="w" label="每日调落人数上限"></el-table-column>
          <el-table-column fixed prop="e" label="调落时间"></el-table-column>
          <el-table-column fixed prop="r" label="屏蔽时间"></el-table-column>
          <el-table-column fixed prop="t" label="对照组比例"></el-table-column>
          <el-table-column fixed prop="u" label="状态"></el-table-column>
          <el-table-column fixed prop="y" label="调落推送进度"></el-table-column>

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
    <el-dialog :title="`${Modal_isNew?'新增':'编辑'}日常调落配置`" :visible.sync="showModal" width="710px" center>
      <div>
        <el-form :inline="true" class="formTop1" label-position="right" label-width="150px" align="center"
                 :model="modalData" ref="modalData" :rules="modalDataRule">
          <el-form-item label="调落策略：">
            <span style="width: 215px;text-align: left;display: inline-block">授信未首贷</span>
          </el-form-item>

          <el-form-item label="调落商户：" prop="location">
            <el-select v-model="modalData.location" placeholder="请选择展示位置">
              <el-option v-for="(item,index) in selectData_merchant" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每日调落人数上限：" prop="maxNum">
            <el-input placeholder="请输入每日调落人数上限" v-model="modalData.maxNum" class="input-with-select"
                      style="width: 215px"></el-input>
          </el-form-item>
          <el-form-item label="调落商户：">
            <el-transfer filterable :titles="['可屏蔽商户','已选商户']"
              filter-placeholder="请输入商户搜索" v-model="value2" :data="data2">
            </el-transfer>
          </el-form-item>


          <el-form-item label="调落方式：" prop="type">
            <el-select v-model="modalData.type" placeholder="请选择调落方式" @change="modalData.date=[]">
              <el-option v-for="(item,index) in selectData_type" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <!--按天调落时-->
          <el-form-item label="调落时间：" v-if="modalData.type==1">
            T <el-input v-model="modalData.date[0]" class="input-with-select" style="width: 60px"></el-input> -
            T <el-input v-model="modalData.date[1]" class="input-with-select" style="width: 60px"></el-input>
          </el-form-item>
          <!--实时调落-->
          <el-form-item label="调落时间：" v-if="modalData.type==2">
            <el-date-picker v-model="modalData.date" type="datetimerange"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="调落频率：" v-if="modalData.type==2">
            <el-input placeholder="请输入调落频率" v-model="modalData.frequency" class="input-with-select"
                      style="width: 150px"></el-input> min

          </el-form-item>
          <!---->


          <el-form-item label="对照组比例：" prop="rate">
            <el-input placeholder="请输入对照组比例" v-model="modalData.rate" class="input-with-select"
                      style="width: 202px"></el-input> %
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
        tableData: [{date: ['','']}], // 表格数据

        // 弹框数据
        showModal: false, // 控制弹框是否打开
        Modal_isNew: true, // 是否是新增
        modalData: {
          date: ['','']
        },// 弹框的数据
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

        selectData_type: [ // 调落方式
          {label: '按天调落', value: '1'},
          {label: '实时调落', value: '2'},
        ],


        data2: generateData2(),
        value2: [],
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


      submit:common.throttle(function (ref) {
        console.log(this.modalData)
        return
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
  .DailyDownConfig_view{
    .el-form-item__content{
      width: 496px;
      text-align: left;
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
    }

  }
</style>
