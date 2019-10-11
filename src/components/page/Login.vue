<!--登录视图-->
<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">SINAIF运营后台</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input type='text' tabindex="1" v-model="ruleForm.username" placeholder="账号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" tabindex="2" placeholder="密码" v-model="ruleForm.password"
                        @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="product">
                    <el-select  tabindex="3" v-model="ruleForm.product" placeholder="请选择产品" value-key="productId" @change='setProduct'>
                      <el-option v-for="(v,i) in productOption" :key="i" :label="v.productName" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-checkbox  v-model="ruleForm.type">记住我的密码</el-checkbox>
                    <a @click="openDialog">忘记密码</a>
                </el-form-item>
                <div class="login-btn">
                    <el-button tabindex="4" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>

            </el-form>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>如忘记密码，请联系管理员重置密码即可</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: function () {
            var checkProduct= (rule, value, callback) => {
                if (!value.productId) {
                    return callback(new Error('请选择产品'));
                } else {
                    return callback();
                }
            };
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    type: false,
                    product: {
                        productId: "",
                        productName: ""
                    }
                },
                productOption: [],
                dialogVisible: false,
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    product: [{
                        required: true,
                        validator: checkProduct,
                        trigger: 'change'
                    }]
                }
            }
        },
        methods: {
            //选择产品
            setProduct(value){
                console.log(value)
            },
            //提交登录
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //验证通过后 调登录接口
                        this.Api.userLogin({
                            userName: this.ruleForm.username,
                            password: this.ruleForm.password,
                            productId: this.ruleForm.product.productId
                        }).then((res) => {
                            if (res.data.code == 200) {
                                this.$message.success("登录成功");
                                this.$store.commit('changeProductId',this.ruleForm.product);
                                localStorage.setItem('ms_username', this.ruleForm.username);
                                localStorage.setItem('productId', this.ruleForm.product.productId);
                                localStorage.setItem('productName', this.ruleForm.product.productName);
                                if (this.ruleForm.type == true) {
                                    //是否选择了记住密码
                                    //若是  保存密码和账号至localstorage;
                                    localStorage.setItem('username', this.ruleForm.username);
                                    localStorage.setItem('password', this.ruleForm.password);
                                    localStorage.setItem('checkRem', '1');
                                } else {
                                    //若否 清空localstorage中账号密码;
                                    localStorage.setItem('username', '');
                                    localStorage.setItem('password', '');
                                    localStorage.setItem('checkRem', '0');
                                }
                                this.Api.userGetMenuList({}).then((res) => {
                                    //获取用户权限菜单
                                    let menu = [];
                                    if (res.data.code == 200) {
                                        let menuAllList = res.data.data;
                                        for (let i = 0; i < menuAllList.length; i++) {
                                            if (menuAllList[i].pid == '-1') {
                                                menu.push(menuAllList[i]);
                                            } else {
                                                for (let j = 0; j < menu.length; j++) {
                                                    if (menu[j].menuId == menuAllList[i].pid) {
                                                        if (menu[j].children) {
                                                            menu[j].children.push(menuAllList[
                                                                i]);
                                                        } else {
                                                            menu[j].children = new Array;
                                                            menu[j].children.push(menuAllList[
                                                                i]);
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                        if (menu[0].children && menu[0].children.length > 0) {
                                            //若第一个菜单包含子菜单，默认路由为子菜单
                                            this.$router.push(menu[0].children[0].menuUrl);
                                        } else {
                                            //若第一个菜单不含子菜单，默认路由为该菜单
                                            this.$router.push(menu[0].menuUrl);
                                        }
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }).catch((err) => {
                            this.$message.error(err);
                        })
                    } else {
                        return false;
                    }
                });
            },
            openDialog() {
                this.dialogVisible = true;
            },
            //获取产品列表
            getProductItem(){
                this.Api.userGetProductList({}).then((res)=>{
                    if(res.data.code == 200){
                        this.productOption = res.data.data;
                        this.ruleForm.product = res.data.data[0]
                    }
                }).catch((err)=>{
                    this.$message.error(err.msg);
                })
            }
        },
        created() {
            this.getProductItem();
            let checkRem = localStorage.getItem('checkRem');
            //初始化是否有记住密码 如果有 就从localstorage里面取
            setTimeout(() => {
                if (checkRem == 1) {
                    this.ruleForm.username = localStorage.getItem('username') || '';
                    this.ruleForm.password = localStorage.getItem('password') || '';
                    this.ruleForm.type = true;

                } else {
                    this.ruleForm.username = '';
                    this.ruleForm.password = '';
                    this.ruleForm.type = false;

                }
            });
        }
    }

</script>

<style lang="scss">
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../../assets/login-bg.jpg) no-repeat center center;
        background-size: cover;
        -webkit-animation: 2s scaleIn cubic-bezier(0.215, 0.61, 0.355, 1) 1;
        animation: 2s scaleIn cubic-bezier(0.215, 0.61, 0.355, 1) 1;

        .el-checkbox__label {
            color: #f5f5f5;
        }
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .el-form-item a {
        font-size: 14px;
        display: block;
        float: right;
        cursor: pointer;
        color: #409EFF;
        margin-right: 2px;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }

    @-webkit-keyframes scaleIn {
        0% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }

        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes scaleIn {
        0% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }

        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

</style>
<style>
    .el-checkbox__input {
        line-height: normal;
    }

</style>
