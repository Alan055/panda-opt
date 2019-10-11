<!--二次封装表格插件-->
<template>
  <div class="">
    <div>{{cc}}</div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%">
      <slot></slot>
    </el-table>
    <!--分页器-->
    <el-pagination @size-change="changeSize" @current-change="pageChange" :current-page="pagination.pageNumber"
                   :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize" :total="pagination.total"
                   layout="total, sizes, prev, pager, next, jumper" >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'myTable',
    props: ['tableData','pagination','ajax','cc'],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      // 改变一页显示的条数时    这里是直接去修改父组件的数据
      changeSize(val){
        this.$emit('update:pagination',Object.assign(this.pagination,{
          pageNumber: 1,  // 页数初始化为1
          pageSize: val,
        }))
        this.ajax()
      },
      // 切换第几页时   这里是直接去修改父组件的数据
      pageChange(val){
        this.$emit('update:pagination',Object.assign(this.pagination,{
          pageNumber: val
        }))
        this.ajax()
      },


    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang='scss' scoped>

</style>
