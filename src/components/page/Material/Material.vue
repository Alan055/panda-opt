<!--启动图管理-->
<template>
    <div>
        <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="启动图管理" name="first" >
                    <v-start></v-start>
                </el-tab-pane>
                <el-tab-pane label="首页弹窗" name="second">
                    <v-homeDialog></v-homeDialog>
                </el-tab-pane>
                <el-tab-pane label="首页悬浮窗" name="third">
                    <v-homeSuspension></v-homeSuspension>
                </el-tab-pane>
                <el-tab-pane label="banner图管理" name="fourth"></el-tab-pane>
                <el-tab-pane label="icon管理" name="fiveth"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    import vStart from './Startfigure.vue' //启动图管理
    import vHomeDialog from './HomeDialog.vue' //启动图管理
    import vHomeSuspension from './HomeSuspension.vue' //首页悬浮窗管理
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    export default {
        name: 'Material',
        data: function(){
            return {
                content: '',
                editorOption: {
                    placeholder: 'Hello World'
                },
                activeName: 'first',
                subTab: [
                    {
                        index: 'StartFigure',
                        title: '启动图管理'
                    },
                    {
                        index: 'markdown',
                        title: '首页弹窗'
                    },
                    {
                        index: 'upload',
                        title: '首页悬浮窗'
                    },
                    {
                        index: 'charts',
                        title: 'banner图管理'
                    },
                    {
                        index: 'table',
                        title: 'icon管理'
                    }
                ],
        
                options: [
                    {
                        value: 1,
                        label: '全部用户'
                    },
                    {
                        value: 2,
                        label: '未提交申请'
                    },
                    {
                        value: 3,
                        label: '已提交，等待审核'
                    },
                    {
                        value: 4,
                        label: '开户未动用'
                    },
                    {
                        value: 5,
                        label: '首贷成功用户'
                    },
                    {
                        value: 6,
                        label: '还款未复贷'
                    },
                    {
                        value: 7,
                        label: '复贷成功用户'
                    }
                ],
                optionsOpen: [
                    {
                        value: 1,
                        label: '默认'
                    },
                    {
                        value: 2,
                        label: '内部打开'
                    },
                    {
                        value: 3,
                        label: '外部打开'
                    },
                    {
                        value: 4,
                        label: '打开App伪协议'
                    },
                ],
                selectTab: '启动图管理',
                startfigureList: []
            }
        },
        components: {
            quillEditor,vStart,vHomeDialog,vHomeSuspension
        },
        methods: {
            handleClick(tab,event){
                this.selectTab = tab.label;
            },
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            },
            handleAvatarSuccess(file) {
                console.log(file);
                // item.form.imageUrl = URL.createObjectURL(file.raw);
            },
            editDetail(item){
                item.editing = false;
            },
            publish(item){
                item.editing = true;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png';
                const isLt2M = file.size / 1024  < 500;
                console.log(file)
                if (!isJPG) {
                    this.$message.error('上传启动图图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传启动图图片大小不能超过 500KB!');
                }
                return isJPG && isLt2M;
            },

            init(){
                this.$store.dispatch('changeStartFigureList','1003001');
            }
        },
        mounted(){

        },
        created(){
            this.init();
        }

    }
</script>
<style lang="scss">
    .figure-img{
        cursor: pointer;
        .avatar-uploader{
            width: 100%!important;
            transition: all 0.5s;
            height: 100%;
            .el-upload-dragger{
                width: 100%;
                height: 100%;
                background: transparent;
            }

            .el-upload{
                width: 100%;
                height: 100%;
                background: transparent;
                position: absolute;
                top: 0;
                left:0 ;
                .el-upload__text{
                    color: #ffffff;
                }
                .el-icon-upload{
                    color: #ffffff;
                }
            }
        }
    }
</style>
<style lang="scss"  scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .add-btn{
        float:right;
        font-size: 16px;
        margin-right: 20px;
        cursor: pointer;
        color: #409EFF;
        &:hover{
            text-decoration: underline;
        }
        i{
            margin-right: 5px;
            font-size: 18px;
            top: 1px;
            position: relative;
        }
    }
    .figure-title{
        &:before{
            content: "";
            width: 4px;
            height: 16px;
            background: #409EFF;
            display: inline-block;
            top: -1px;
            position: relative;
            margin-right: 5px;
            vertical-align: middle;
        }
    }

    .figure-item{
        width: 400px;
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        margin-top: 28px;
        margin-right: 40px;
        border: 1px solid #e6e6e6;
        .figure-item-header{
            padding: 0 10px;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #e6e6e6;
            span.left{
                font-size: 20px;
                font-weight:normal;
                float: left;

            }
            span.right{
                font-size: 14px;
                font-weight: normal;
                float: right;
                cursor: pointer;
                color: #409EFF;
                a{
                    cursor: pointer;
                    opacity: 0.8;
                    transition: all 0.5s;
                }
                a:hover{
                    opacity: 1.0;
                    transition: all 0.5s;
                }
            }
        }
        .figure-detail{
            padding: 10px 10px;
            .el-form-item{
                span{
                    padding-left: 15px;
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                }
            }
            .figure-img{
                width: 375px;
                height: 640px;
                margin: 0 auto;
                border-radius: 6px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .figure-upload{
                height: 640px;
                width: 375px;
                margin: 0 auto;
                border-radius: 6px;
                position: relative;
                &:hover{
                    .upload-demo{
                        display: block;
                    }
                }
            }
            .upload-trigger{
                width: 100%;
                height: 100%;
                position: absolute;
                padding-top: 30%;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                top: 0;
                left:0;
                display: block;
                background: rgba(0,0,0,0.4);
            }
        }
        .line{
            text-align: center;
        }
    }
</style>
