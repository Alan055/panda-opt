<template>
  <!--这里一定要加上这个class  ql-editor -->
  <div class="Scan_view ql-editor" v-html="html">
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  export default {
    data() {
      return {
        html: '',
        titleSave: '', // 保存一下原来的title
      }
    },
    computed: {},
    watch: {},
    methods: {


      init() {
        if(!this.$route.query.id) return
        this.Api.loGetLinkContentById({id: this.$route.query.id}).then((result) => {
          let res = result.data
          if (res.code === 200) {
            console.log(res.data)
            this.html = res.data.icontext
            document.getElementsByTagName("title")[0].innerText = res.data.title
          } else {
            this.$message({type: 'error', message: res.msg});
          }
        }).catch((err) => {
          this.$message({type: 'error', message: err});
        })
      }
    },

    created() {
      this.titleSave = document.getElementsByTagName("title")[0].innerText
      this.init()
    },
    mounted() {
    },
    destroyed() {
      document.getElementsByTagName("title")[0].innerText = this.titleSave
    }
  }
</script>

<style lang='scss'>
  .Scan_view {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    /*overflow: auto !important;*/
  }
</style>
