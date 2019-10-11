<template>
    <div class="searhComponents plugins-search" style="display: inline-block;">
        <el-form :inline="true" class="formTop">
          <div>
            <el-form-item label="搜索：">
              <el-input placeholder="请输入内容" v-model="parmas.searchText"  class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item :label="`${labelText}：`" v-if="labelText">
              <el-select v-model="parmas.select" placeholder="请选择">
                <el-option v-for="(item,index) in [{label:'全部',value:''}].concat(list)" :label="item.label" :value="item.value"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最近修改时间：">
              <el-date-picker
                v-model="parmas.modifyDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search&&search(1)">搜索
              </el-button>
              <el-button type="warning" @click="Down({sendType:parmas.select,jumpinner: parmas.select,keyword:parmas.searchText},downloadUrl)">导出</el-button>

            </el-form-item>
          </div>
        </el-form>
    </div>
</template>

<script>
  import moment from "moment";


  export default {
	  props: ['parmas','list','labelText','search','downloadUrl'],
		data() {
			return {
        // 搜索和导出功能发


      }
		},
		computed: {},
		watch: {},
		methods: {},
		created() {
		},
		mounted() {
		},
	}
</script>

<style lang='scss' scoped>

</style>
