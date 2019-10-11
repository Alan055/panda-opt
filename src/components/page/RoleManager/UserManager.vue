<!--用户管理-->
<template>
    <div>
        <div class="plugins-tips">
            用户列表
            <div  class="add-btn" @click="addUserDialog">
                <i class="el-icon-lx-roundadd"></i>添加用户
            </div>
        </div>
        <el-table
            :data="userList.list"
            stripe
            style="width: 100%">
            <el-table-column
                prop="date"
                type="index"
                label="序号"
             >
            </el-table-column>
            <el-table-column
                prop="userName"
                label="用户名称"
               >
            </el-table-column>
            <el-table-column
                width="300"
                prop="groupName"
                label="用户组名称">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="formatStatus"
                label="状态">
            </el-table-column>
            <el-table-column
                label="操作"
                width="400"
            >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        :disabled = "scope.row.userName=='admin'"
                        @click="handleUserList(scope.$index, scope.row)">修改用户组</el-button>
                    <el-button
                        size="mini"
                        type="success"
                        :disabled = "scope.row.userName=='admin'"
                        @click="handlePsw(scope.$index, scope.row)">修改密码</el-button>
                    <el-button
                        size="mini"
                        type="warning"
                        :disabled = "scope.row.userName=='admin'"
                        @click="handleStop(scope.$index, scope.row)">{{scope.row.status==1?'停用': '启用'}}</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        :disabled = "scope.row.userName=='admin'"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userList.total">
        </el-pagination>
        <el-dialog title="添加用户"  width="40%" center :visible.sync="addUserDialogFormVisible" @closed="closeDialog">
            <el-form :model="addUserForm" :rules="userRules" ref="addUserForm" label-width="100px" size="mini">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addUserForm.userName" placeholder="请填写用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addUserForm.password" placeholder="请填写密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="surePassword">
                    <el-input type="password" v-model="addUserForm.surePassword" placeholder="请确认密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="userList">
                    <el-checkbox-group v-model="addUserForm.userList">
                        <el-checkbox v-for="item  in userGroupList" :label="item.groupId" :key="item.groupId" >{{item.groupName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAdd('addUserForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户组"  width="40%" center :visible.sync="editUserVisible">
            <el-form :model="editUserForm" :rules="editRules" ref="editUserForm" label-width="100px" size="mini">
                <el-form-item label="用户名">
                    <el-input disabled v-model="editUserForm.userName" placeholder="请填写用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="userList">
                    <el-checkbox-group v-model="editUserForm.userList" @change="editChange">
                            <el-checkbox v-for="item in userGroupList" :label="item.groupId" :key="item.groupId" >{{item.groupName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit('editUserForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改密码"  width="40%" center :visible.sync="changePswVisible">
            <el-form :model="pswForm" :rules="pswRules" ref="pswForm" label-width="100px" size="mini">
                <el-form-item label="用户名">
                    <el-input disabled v-model="pswForm.userName" placeholder="请填写用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="pswForm.password" placeholder="请输入新密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="surePassword">
                    <el-input type="password" v-model="pswForm.surePassword" placeholder="请确认新密码" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePswVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditPsw('pswForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserManager",
        data(){
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.addUserForm.surePassword !== '') {
                        this.$refs.addUserForm.validateField('surePassword');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addUserForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const changeValidatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.pswForm.surePassword !== '') {
                        this.$refs.pswForm.validateField('surePassword');
                    }
                    callback();
                }
            };
            const changeValidatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pswForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                currentPage: 1,
                addUserDialogFormVisible: false,//添加用户
                editUserVisible: false,//修改用户组
                changePswVisible: false,//修改用户密码
                //用户列表
                addUserForm:{
                    userName: '',
                    password: '',
                    surePassword: '',
                    userList: []
                },
                editUserForm:{
                    userName: '',
                    userId: '',
                    userList: []
                },
                pswForm:{//修改密码表单
                    id: '',
                    surePassword: '',
                    password: '',
                    userName: ''
                },
                userRules:{
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码不能小于6个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    surePassword: [
                        {required: true, message: '请确认密码', trigger: 'blur' },
                        { min: 6, message: '确认密码不能小于6个字符', trigger: 'blur' },
                        {validator: validatePass2,trigger: 'blur'}
                    ],
                    userList: [
                        { type: 'array', required: true, message: '请至少选择一个用户组', trigger: 'change' }
                    ]
                },
                editRules:{
                    userList: [
                        { type: 'array', required: true, message: '请至少选择一个用户组', trigger: 'change' }
                    ]
                },
                pswRules: {
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码不能小于6个字符', trigger: 'blur' },
                        { validator: changeValidatePass, trigger: 'blur' }
                    ],
                    surePassword: [
                        {required: true, message: '请确认密码', trigger: 'blur' },
                        { min: 6, message: '确认密码不能小于6个字符', trigger: 'blur' },
                        {validator: changeValidatePass2,trigger: 'blur'}
                    ],
                },
                selectId: [],
                userListParams: {
                    pageSize: 10,//当前每页显示数量
                    pageNum: 1,//当前页数
                }

          }
        },
        computed: {
            userGroupList : function(){
                return this.$store.state.userGroupList;
            },
            userList: function(){
                return this.$store.state.userList;
            }
        },
        methods: {
            init(){
              // this.getUserGroupList(1,10,'list');
              // this.getUserList();
            },
            closeDialog(){
                Object.keys(this.addUserForm).forEach((key)=>{
                    if(key== 'userList'){
                        this.addUserForm[key] = [];
                    }else{
                        this.addUserForm[key] = '';
                    }

                });
            },
            addUserDialog(){
                this.addUserDialogFormVisible = true;
            },
            editChange(val){
              console.log(val);
            },
            //修改每页展示数量
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.userListParams.pageSize = val;
                this.$store.dispatch('changeUserList',this.userListParams);

            },
            //跳转页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.userListParams.pageNum = val;
                this.$store.dispatch('changeUserList',this.userListParams);
            },
            //打开修改用户组弹窗
            handleUserList(index,row){
                this.editUserForm.userName = row.userName;
                this.editUserForm.userId = row.userId;
                if(row.groupId){
                    this.editUserForm.userList =  row.groupId.split(",");
                }else{
                    this.editUserForm.userList = [];
                }
                console.log(this.editUserForm.userList );
                setTimeout(()=>{
                    this.editUserVisible = true;
                })
            },
            //打开修改用户密码弹窗
            handlePsw(index,row){
                console.log(index, row);
                this.pswForm.userName = row.userName;
                this.pswForm.password = '';
                this.pswForm.surePassword = '';
                this.pswForm.id = row.userId;
                this.changePswVisible = true;
            },
            //打开停用用户对话
            handleStop(index,row){
                let text = row.status == 1? '停用' : '启用';
                this.$confirm('此操作将'+ text +'用户 "'+row.userName+'" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.Api.perModUserStatus({
                        userId: row.userId,
                        status: row.status ==1? '0':'1'
                    }).then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: text+'成功!'
                            });
                            this.$store.dispatch('changeUserList',this.userListParams);
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + text
                    });
                });

            },
            //删除用户
            handleDelete(index,row){
                this.$confirm('此操作将永久删除用户 "'+row.userName+'" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {
                    this.Api.perDelUser({
                        userId: row.userId
                    }).then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$store.dispatch('changeUserList',this.userListParams);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加用户
            addUser(){
                let groupList = '';
                for(let i=0;i<this.addUserForm.userList.length;i++){
                    if(groupList){
                        groupList+= ','+ this.addUserForm.userList[i];
                    }else{
                        groupList = this.addUserForm.userList[i];
                    }
                }
              this.Api.perAddUser({
                  userName: this.addUserForm.userName,
                  password: this.addUserForm.password,
                  groupId :  groupList
              }).then((res)=>{
                    if(res.data.code == 200){
                        this.$message.success("添加用户成功");
                        this.addUserDialogFormVisible = false;
                        this.$store.dispatch('changeUserList',this.userListParams);
                    }else{
                        this.$message.error(res.data.msg);
                    }
              })
            },
            //修改用户组
            editUserList(){
                let groupList = '';
                for(let i=0;i<this.editUserForm.userList.length;i++){
                    if(groupList){
                        groupList+= ','+ this.editUserForm.userList[i];
                    }else{
                        groupList = this.editUserForm.userList[i];
                    }
                }
                let params = {
                    userId: this.editUserForm.userId,
                    groupId: groupList
                };
                this.Api.perUserGroupRel(params).then((res)=>{
                    if(res.data.code==200){
                        this.$message.success("修改成功");
                        this.editUserVisible = false;
                        this.$store.dispatch('changeUserList',this.userListParams);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //修改用户密码
            editUserPsw(){
                this.Api.perModUserPwd({
                    userId: this.pswForm.id,
                    password: this.pswForm.password
                }).then((res)=>{
                    if(res.data.code == 200){
                        this.$message.success("修改成功");
                        this.$store.dispatch('changeUserList',this.userListParams);
                        this.changePswVisible = false;
                    }else{
                        this.$message.success(res.data.msg);
                    }
                })
            },
            //添加用户确认按钮
            submitAdd(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addUser();
                    } else {
                        return false;
                    }
                });
            },
            //确认修改用户
            submitEdit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editUserList();
                    } else {
                        return false;
                    }
                });
            },
            //确认修改用户密码
            submitEditPsw(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editUserPsw();
                    } else {
                        return false;
                    }
                });
            },
            formatStatus: function (row, column) {
                return row.status == 0 ? '停用' : '正常';
            },
        },
        created(){
            this.init();
        },

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

    .el-checkbox{
        margin-left: 0!important;
        padding-right: 30px;
    }
</style>
