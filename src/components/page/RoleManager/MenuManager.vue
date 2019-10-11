<!-- 菜单管理 -->
<template>
    <div>
        <div class="plugins-tips">
            菜单列表
            <div  class="add-btn" @click="addMenuDialog">
                <i class="el-icon-lx-roundadd"></i>添加菜单
            </div>
        </div>
        <el-tree
            :data="menuList"
            :class="'menuTree'"
            node-key="menuId"
            default-expand-all
            :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{data.menuName}}</span>
                <span>
                  <el-button
                      v-if="data.pid == -1"
                      type="primary"
                      size="mini"
                      @click="() => append(data)">
                    添加
                  </el-button>
                  <el-button
                      type="success"
                      size="mini"
                      @click="() => edit(node, data)">
                    修改
                  </el-button>
                     <el-button
                         type="danger"
                         size="mini"
                         @click="() => remove(node, data)">
                    删除
                  </el-button>
                </span>
              </span>
        </el-tree>
        <el-dialog title="添加菜单"  width="40%" center :visible.sync="addMenuDialogFormVisible">
            <el-form ref="addMenuForm" :model="addMenuForm" :rules="addMenuRules" label-width="100px" size="mini">
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input placeholder="请输入菜单名称" v-model="addMenuForm.menuName"></el-input>
                </el-form-item>
                <el-form-item label="菜单地址"  prop="menuUrl">
                    <el-input placeholder="请输入菜单地址" v-model="addMenuForm.menuUrl"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMenuDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAddMenu('addMenuForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    export default {
        name: "MenuManager",
        data(){
            return{
                currentPage: 1,
                addMenuDialogFormVisible: false,
                addMenuForm:{
                    menuName: '',
                    menuUrl: '',
                    pid: '-1',
                    menuId: ''
                },
                addMenuRules:{
                    menuName: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                    menuUrl: [
                        { required: true, message: '请输入菜单地址', trigger: 'blur' }
                    ]
                },

            }
        },
        computed: {
            menuList : function(){
                return this.$store.state.menuList;
            }
        },
        methods: {
            init(){
              // this.getMenuList();
            },
            addMenuDialog(){
                this.addMenuForm.menuName= '';
                this.addMenuForm.menuUrl= '';
                this.addMenuDialogFormVisible = true;
            },
            handleUserList(index,row){
                console.log(index, row);
            },
            append(node){

               this.addMenuForm.pid = node.menuId;
               this.addMenuDialogFormVisible = true;
            },
            edit(node,data){
                console.log("+<@@@");
                console.log(data);
                this.addMenuForm.pid = data.pid;
                this.addMenuForm.menuId = data.menuId;
                this.addMenuForm.menuName = data.menuName;
                this.addMenuForm.menuUrl = data.menuUrl;
                this.addMenuDialogFormVisible = true;
            },
            remove(node,data){
                this.$confirm('此操作将永久删除菜单 "'+data.menuName+'" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {
                    this.Api.perDelMenu({
                        menuId: data.menuId
                    }).then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$store.dispatch('changeMenuList');
                            this.$store.dispatch('changeShowMenuList');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加或修改菜单
            saveMenuInfo(params){
                 this.Api.perSaveMenu(params).then((res)=>{
                        if(res.data.code == 200){
                            if(this.addMenuDialogFormVisible){this.addMenuDialogFormVisible = false;}
                            this.$message.success('提交成功');
                            this.$store.dispatch('changeMenuList');
                        }else{
                            this.$message.error(res.data.msg);
                        }
                 })
            },

            //确认添加菜单
            sureAddMenu(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            menuName : this.addMenuForm.menuName,
                            url: this.addMenuForm.menuUrl,
                            pid: this.addMenuForm.pid,
                            menuId: this.addMenuForm.menuId
                        };
                        this.saveMenuInfo(params);

                    } else {
                        return false;
                    }
                });
            }

        },
        watch:{
            addMenuDialogFormVisible: function(newVal,oldVal){
                console.log(newVal);
                if(!newVal){
                    this.addMenuForm = {
                        menuName: '',
                        menuUrl: '',
                        pid: '-1',
                        menuId: ''
                    }
                }
            }
        },
        created(){
            this.init();
        }

    }
</script>
<style scoped lang="scss">
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
    .el-pagination{
        text-align: right;
        margin-top: 20px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
<style lang="scss">
    .menuTree {

        .el-tree-node__content{
            height: 40px;
            line-height: 40px;
        }
    }
</style>
