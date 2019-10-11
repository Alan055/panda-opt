<!--权限管理入口-->
<template>
    <div>
        <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">
                    <v-userManager>

                    </v-userManager>
                </el-tab-pane>
                <el-tab-pane label="用户组管理" name="second">
                    <v-user-list-manager>

                    </v-user-list-manager>
                </el-tab-pane>
                <el-tab-pane label="角色管理" name="third">
                    <v-role-setting>

                    </v-role-setting>
                </el-tab-pane>
                <el-tab-pane label="菜单" name="fourth">
                    <v-menu-manager>

                    </v-menu-manager>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import vUserManager from './UserManager.vue' ;
    import vUserListManager from './UserListManager.vue' ;
    import vMenuManager from './MenuManager.vue' ;
    import vRoleSetting from './RoleSetting.vue' ;

    export default {
        name: 'SetPermission',
        data: function(){
            return {
                content: '',
                editorOption: {
                    placeholder: 'Hello World'
                },
                selectTab: '用户管理',
                activeName: 'first',
                tableData: {}, //用户列表
                userRoleList: [],//用户组列表
                userRoleTableList: [],//用户组表格列表
                menu: [],
            }
        },
        components: {
            quillEditor,vUserManager,vUserListManager,vMenuManager,vRoleSetting
        },
        methods: {
            handleClick(tab,event){
                console.log(tab.name);
                this.selectTab = tab.label;
                // if(tab.name == 'first'){
                //     this.$store.dispatch('changeUserList',userListParams);
                // }
            },
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },

            handleAvatarSuccess(file) {
                console.log(file);
                // item.form.imageUrl = URL.createObjectURL(file.raw);
            }


        },
        created(){
            this.$store.dispatch('changeMenuList');
            this.$store.dispatch('changeRoleList');
            let roleParams = {
                pageNum: 1,
                pageSize: 10
            };
            this.$store.dispatch('changeRoleTableList',roleParams);
            this.$store.dispatch('changeUserGroupList');
            let userGroupParams = {
                pageNum: 1,
                pageSize: 10
            };
            this.$store.dispatch('changeUserGroupTableList',userGroupParams);
            let userListParams ={
                pageNum: 1,
                pageSize: 10
            };
            this.$store.dispatch('changeUserList',userListParams);
            // this.getRoleList('1','10','table');
            // this.getRoleList('1','100000','list');
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
