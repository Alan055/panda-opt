<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(v,i) in data" :key="i">
        <i class="el-icon-location" v-if="i===0"></i>
        {{v}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    props:['data'],
    data() {
      return {}
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
