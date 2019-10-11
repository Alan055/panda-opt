<!--用户组管理-->
<template>
    <div>
        <div class="plugins-tips">
            用户组列表
            <div  class="add-btn" @click="addUserDialog">
                <i class="el-icon-lx-roundadd"></i>添加用户组
            </div>
        </div>
        <el-table
            :data="userRoleTableList.list"
            stripe
            style="width: 100%">
            <el-table-column
                prop="date"
                type="index"
                label="序号"
            >
            </el-table-column>
            <el-table-column
                prop="groupName"
                label="用户组名称"
            >
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称">
            </el-table-column>
            <el-table-column
                label="操作"
                width="400"
            >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleUserListName(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleUserListRole(scope.$index, scope.row)">修改角色</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            :total="userRoleTableList.total">
        </el-pagination>
        <el-dialog title="添加用户组"  width="40%" center :visible.sync="addUserDialogFormVisible" @closed="closeDialog">
            <el-form :model="addUserListForm" :rules="userListRules" ref="addUserListForm" label-width="100px" size="mini">
                <el-form-item label="名称" prop="listName">
                    <el-input v-model="addUserListForm.listName" placeholder="请填写用户组名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleList">
                    <el-checkbox-group v-model="addUserListForm.roleList">
                        <el-checkbox v-for="item  in roleList" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddUserList('addUserListForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户组名称" :visible.sync="editListNameDialogVisible">
            <el-form :model="editUserListNameForm" :rules="editUserListNameRules" ref="editUserListNameForm" label-width="100px" size="mini">
                <el-form-item label="名称" prop="groupName">
                    <el-input v-model="editUserListNameForm.groupName" placeholder="请填写用户组名称" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editListNameDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditUserListName('editUserListNameForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改角色" :visible.sync="editListGroupDialogVisible">
            <el-form :model="editListGroupFrom" :rules="editListGroupRules" ref="editListGroupForm" label-width="100px" size="mini">
                <el-form-item label="名称">
                    <el-input v-model="editListGroupFrom.groupName" disabled placeholder="请填写用户组名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleList">
                    <el-checkbox-group v-model="editListGroupFrom.roleList">
                        <el-checkbox v-for="item  in roleList" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editListGroupDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditRoleGroup('editListGroupForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserListManager",
        data(){
            return{
                currentPage: 1,
                addUserDialogFormVisible: false,
                editListNameDialogVisible: false,
                editListGroupDialogVisible: false,
                addUserListForm:{
                    listName: '',
                    roleList: []
                },
                editUserListNameForm:{
                    groupName: '',
                    groupId: ''
                },
                editListGroupFrom: {
                    roleList: [],
                    groupId: '',
                    groupName: ''
                },
                userGroupParams:{
                    pageNum: 1,
                    pageSize: 10
                },
                userListRules:{
                    listName: [
                        { required: true, message: '请填写用户组名称', trigger: 'blur' }
                    ],
                    roleList: [
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ]
                },
                editUserListNameRules: {
                    groupName: [
                        { required: true, message: '请填写用户组名称', trigger: 'blur' }
                    ]
                },
                editListGroupRules:{
                    roleList: [
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ]
                },

        }
        },
        computed: {
            userRoleTableList : function(){
                return this.$store.state.userGroupTableList;
            },
            roleList(){
                return this.$store.state.roleList;
            },
        },
        methods: {
            init(){
              // this.getUserGroupList(1,10,'table');
              // this.getRoleList(1,10,'list');

            },
            closeDialog(){
                Object.keys(this.addUserListForm).forEach((key)=>{
                    if(key == 'roleList'){
                        this.addUserListForm[key] = [];
                    }else{
                        this.addUserListForm[key] = '';
                    }
                });
            },
            addUserDialog(){
                this.addUserDialogFormVisible = true;
            },
            handleSizeChange(val) {
                this.userGroupParams.pageSize = val;
                console.log(`每页 ${val} 条`);
                this.$store.dispatch('changeUserGroupTableList',this.userGroupParams);
            },
            handleCurrentChange(val) {
                this.userGroupParams.pageNum = val;
                this.$store.dispatch('changeUserGroupTableList',this.userGroupParams);
            },
            handleUserListName(index,row){
                this.editUserListNameForm.groupName = row.groupName;
                this.editUserListNameForm.groupId = row.groupId;
                this.editListNameDialogVisible = true;
            },
            handleUserListRole(index,row){
                if(row.roleId){
                    this.editListGroupFrom.roleList = row.roleId.split(",");
                }else{
                    this.editListGroupFrom.roleList = [];
                }
                this.editListGroupFrom.groupName = row.groupName;
                this.editListGroupFrom.groupId = row.groupId;
                this.editListGroupDialogVisible = true;
            },
            handleDelete(index,row){
                this.$confirm('此操作将永久删除用户组 "'+row.groupName+'" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {
                    this.Api.perDelUserGroup({
                        groupId: row.groupId
                    }).then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$store.dispatch('changeUserGroupTableList',this.userGroupParams);
                            this.$store.dispatch('changeUserGroupList');
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
            //添加修改用户组
            saveUserGroup(params){
                this.Api.perSaveUserGroup(params).then((res) =>{
                    if(res.data.code == 200){
                        // this.getUserGroupList(this.userListPageNum,this.userListPageSize,'table');
                        this.$store.dispatch('changeUserGroupTableList',this.userGroupParams);
                        this.$store.dispatch('changeUserGroupList');
                        if (this.addUserDialogFormVisible) this.addUserDialogFormVisible = false;
                        if (this.editListGroupDialogVisible) this.editListGroupDialogVisible = false;
                        this.$message.success('添加成功');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //修改用户组名称
            saveUserGroupName(params){
                this.Api.perSaveUserGroupName(params).then((res) =>{
                    if(res.data.code == 200){
                        this.$store.dispatch('changeUserGroupTableList',this.userGroupParams);
                        this.$store.dispatch('changeUserGroupList');
                        if (this.editListNameDialogVisible) this.editListNameDialogVisible = false;
                        this.$message.success('修改成功');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //确认添加用户组
            submitAddUserList(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let groupIdList =  '';
                        for(let i=0;i<this.addUserListForm.roleList.length;i++){
                                if(groupIdList){
                                    groupIdList+= ','+ this.addUserListForm.roleList[i];
                                }else{
                                    groupIdList = this.addUserListForm.roleList[i];
                                }
                        }
                        let params = {
                            groupName : this.addUserListForm.listName,
                            roleId : groupIdList
                        };
                        this.saveUserGroup(params);
                    } else {
                        return false;
                    }
                });
            },
            //确认修改用户组名称
            submitEditUserListName(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            groupName : this.editUserListNameForm.groupName,
                            groupId: this.editUserListNameForm.groupId
                        };
                        this.saveUserGroupName(params);
                    } else {
                        return false;
                    }
                });
            },
            //确认修改用户角色组
            submitEditRoleGroup(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let groupIdList =  '';
                        for(let i=0;i<this.editListGroupFrom.roleList.length;i++){
                            if(groupIdList){
                                groupIdList+= ','+ this.editListGroupFrom.roleList[i];
                            }else{
                                groupIdList = this.editListGroupFrom.roleList[i];
                            }
                        }
                        let params = {
                            groupName : this.editListGroupFrom.groupName,
                            groupId: this.editListGroupFrom.groupId,
                            roleId: groupIdList,
                        };
                        this.saveUserGroup(params);
                    } else {
                        return false;
                    }
                });
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
    .el-checkbox{
        margin-left: 0!important;
        padding-right: 30px;
    }
</style>
