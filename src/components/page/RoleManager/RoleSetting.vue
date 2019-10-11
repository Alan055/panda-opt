<!--角色管理-->
<template>
    <div>
        <div class="plugins-tips">
            角色列表
            <div  class="add-btn" @click="addRoleDialog">
                <i class="el-icon-lx-roundadd"></i>添加角色
            </div>
        </div>
        <el-table
            :data="roleTableList.list"
            stripe
            style="width: 100%">
            <el-table-column
                prop="date"
                type="index"
                label="序号"
            >
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                width="400"
            >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleRoleName(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleRoleMenu(scope.$index, scope.row)">修改菜单</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleRoleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="roleTableList.total">
        </el-pagination>

        <el-dialog title="添加角色"  width="40%" center :visible.sync="addRoleDialogFormVisible">
            <el-form :model="addRoleForm" :rules="addRoleRules" ref="addRoleForm" label-width="100px" size="mini">
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="addRoleForm.roleName" placeholder="请填写用户名" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitRoleAdd('addRoleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑角色"  width="40%" center :visible.sync="editRoleNameDialogFormVisible">
            <el-form :model="editRoleNameForm" :rules="editRoleNameRules" ref="editRoleNameForm" label-width="100px" size="mini">
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="editRoleNameForm.roleName" placeholder="请填写角色名" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editRoleNameDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitRoleNameEdit('editRoleNameForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改菜单"  width="40%" center :visible.sync="editRoleMenuDialogFormVisible">
            <el-form :model="editRoleMenuForm" ref="editRoleMenuForm" label-width="100px" size="mini">
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="editRoleMenuForm.roleName" disabled placeholder="请填写角色名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单权限" v-if="menuList[0]"  required>
                    <input type="hidden"  v-model=" menuList[0].createTime">
                    <template>
                        <el-tree
                            :data="menuList"
                            ref="menu"
                            show-checkbox
                            node-key="menuId"
                            @check="clickNode"
                            default-expand-all
                            :check-strictly="checkAll"
                            :props="defaultProps">
                        </el-tree>
                        <el-row class="err-msg" v-show="isError">
                            请至少选择一个菜单
                        </el-row>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editRoleMenuDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitRoleMenuEdit('editRoleMenuForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "RoleSetting",
        data(){
            const checkedMenuList = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.pswForm.surePassword !== '') {
                        this.$refs.pswForm.validateField('surePassword');
                    }
                    callback();
                }
            };
            return{
                checkAll: true,
                isError: false,
                defaultProps: {
                    children: 'children',
                    label: 'menuName'
                },
                currentPage: 1,
                addRoleDialogFormVisible: false,
                editRoleNameDialogFormVisible: false,
                editRoleMenuDialogFormVisible: false,
                addRoleForm:{
                    roleName: ''
                },
                editRoleNameForm:{
                    roleName: '',
                    roleId: ''
                },
                editRoleMenuForm:{
                    menuList: [],
                    roleName: '',
                    roleId: ''
                },
                addRoleRules:{
                    roleName: [
                        { required: true, message: '请输入角色名', trigger: 'blur' }
                    ]
                },
                editRoleNameRules: {
                    roleName: [
                        { required: true, message: '请输入角色名', trigger: 'blur' }
                    ]
                },
                roleParams:{
                    pageSize: '10',
                    pageNum: '1'
                }

            }
        },
        computed: {
            menuList () {
                    return this.$store.state.menuList;
            },
            roleTableList(){
                return this.$store.state.roleTableList;
            }
        },
        methods: {
            init(){

            },
            clickNode(){
                 let checkedKeys =    this.$refs.menu.getCheckedKeys();
                 if(checkedKeys && checkedKeys.length<=0){
                    this.isError = true;
                 }else if(checkedKeys && checkedKeys.length>0){
                     this.isError = false;
                 }
            },
            addRoleDialog(){
                this.addRoleDialogFormVisible = true;
                this.addRoleForm.roleName = '';
            },
            handleSizeChange(val) {
                this.roleParams.pageSize = val;
                this.$store.dispatch('changeRoleTableList',this.roleParams);
            },
            handleCurrentChange(val) {
                this.roleParams.pageNum = val;
                this.$store.dispatch('changeRoleTableList',this.roleParams);
            },
            handleRoleName(index,row){
                this.editRoleNameDialogFormVisible = true;
                this.editRoleNameForm.roleName = row.roleName;
                this.editRoleNameForm.roleId = row.roleId;
            },
            handleRoleMenu(index,row){
                this.editRoleMenuDialogFormVisible = true;
                this.editRoleMenuForm.roleName = row.roleName;
                this.editRoleMenuForm.roleId = row.roleId;
                if(row.menuId){
                    this.editRoleMenuForm.menuList = row.menuId.split(",");
                }else{
                    this.editRoleMenuForm.menuList = [];
                }
                setTimeout(()=>{
                    this.$refs.menu.setCheckedKeys(this.editRoleMenuForm.menuList );
                });


            },

            handleRoleDelete(index,row){
                this.$confirm('此操作将永久删除角色 "'+row.roleName+'" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {
                    this.Api.perDelRole({
                        roleId: row.roleId
                    }).then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$store.dispatch('changeRoleTableList',this.roleParams);
                            this.$store.dispatch('changeRoleList');
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加角色
            addRole(params){
                this.Api.perSaveRole(params).then((res)=>{
                    if(res.data.code == 200){
                        this.$store.dispatch('changeRoleTableList',this.roleParams);
                        this.$store.dispatch('changeRoleList');
                        if (this.addRoleDialogFormVisible) this.addRoleDialogFormVisible = false;
                        if(this.editRoleNameDialogFormVisible) this.editRoleNameDialogFormVisible = false;
                        this.$message.success('提交成功');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //添加角色
            submitRoleAdd(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            roleName : this.addRoleForm.roleName
                        };
                        this.addRole(params);
                    } else {
                        return false;
                    }
                });
            },
            //修改角色名字
            submitRoleNameEdit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = this.editRoleNameForm;
                        this.addRole(params);
                    } else {
                        return false;
                    }
                });
            },
            //修改角色关系菜单
            submitRoleMenuEdit(){
                let params;
                let rowMenuList = this.$refs.menu.getCheckedKeys();
                let rowMenuStr;
                console.log(rowMenuList);
                for(let i=0;i<rowMenuList.length;i++){
                    if(rowMenuStr){
                        rowMenuStr+= ','+ rowMenuList[i];
                    }else{
                        rowMenuStr = rowMenuList[i];
                    }
                }
                params = {
                    roleId: this.editRoleMenuForm.roleId,
                    menuId: rowMenuStr
                };
                if(rowMenuList && rowMenuList.length!=0){
                    this.Api.perSaveMenuRoleRel(params).then((res)=>{
                        if(res.data.code == 200){
                            this.$store.dispatch('changeRoleTableList',this.roleParams);
                            this.$store.dispatch('changeRoleList');
                            this.editRoleMenuDialogFormVisible = false;
                            this.$message({
                                type: 'success',
                                message: '设置成功!'
                            });
                            this.$store.dispatch('changeShowMenuList');
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }else{
                    this.isError = true;
                }

            }

        },
        created(){
            this.init();
        },
        watch:{

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
    .err-msg{
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
    }
</style>
