<template>
  <div class="SpecialConfig_view">

    <div class="container">
      <!--表格插件-->
      <div v-loading="exportLoading">
        <myTable :tableData="tableData" :pagination.sync="pagination" :ajax="init">
          <el-table-column fixed prop="index" label="序号" type="index" :index="indexMethod"></el-table-column>
          <el-table-column fixed prop="a" label="策略类型"></el-table-column>
          <el-table-column fixed prop="b" label="成功导入用户">
            <!--<template slot-scope="scope"><img :src="scope.row.imgurl" alt=""></template>-->
          </el-table-column>
          <el-table-column fixed prop="q" label="上传时间"></el-table-column>
        </myTable>
      </div>
    </div>
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
      }
    },
    computed: {},
    watch: {},
    methods: {

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

<style lang='scss' scoped>
  .SpecialConfig_view{

  }
</style>
