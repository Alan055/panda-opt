<!-- 商户黑名单-->
<template>
    <div class="blockMerchants-view">
        <div class="container">
            <div class="plugins-tips">
                <div class="plugins-search">
                    <el-form>
                        <el-row :gutter="40">
                            <el-col :span="10">
                                <el-form-item label="手机号" labelWidth="60px">
                                    <el-input v-model="searchForm.mobile" placeholder="请输入手机号">

                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="屏蔽商户" labelWidth="80px">
                                    <el-select clearable  v-model="searchForm.financeid" filterable placeholder="请选择">
                                        <el-option v-for="item in optionSearchShielding" :key="item.value"
                                            :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" labelWidth="1px">
                                    <el-button type="primary" @click="searchChannel" plain>搜索</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>
                </div>
                <div class="add-btn" @click="addChannel">
                    <i class="el-icon-lx-roundadd"></i>新增商户黑名单
                </div>
            </div>
            <el-table :data="channelList.list" v-loading="channelListLoading" border style="width: 100%">
                <el-table-column label="序号" type="index">
                </el-table-column>
                <el-table-column prop="createtime" label="上线日期" width="150">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="120" :formatter="formatPhoneNumber">
                </el-table-column>
                <el-table-column prop="financename" label="商户名称" width="260">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="updatetime" label="最后修改时间">
                </el-table-column>
                <el-table-column prop="updateby" label="最后修改人">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="editChannel(scope.row)" type="primary" size="mini">编辑</el-button>
                        <el-button @click="deleteChannel(scope.row)" type="warning" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="defaultParams.pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="channelList.total">
            </el-pagination>
        </div>
        <el-dialog v-loading='addLoading' title="新增商户黑名单" width="50%" center class="addChannelDialog" :visible.sync="addChannelDialog"
            @closed="closeAddChannel('addChannelForm')">
            <el-form ref="addChannelForm" :model="addChannelForm" :rules="addChannelRules" label-width="100px">
                <el-form-item label="手机号" prop='mobile'>
                    <el-input v-model="addChannelForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop='remark'>
                    <el-input type='textarea' v-model="addChannelForm.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item label="屏蔽商户" prop='merchantsList'>
                    <template>
                        <el-transfer filterable filter-placeholder="请输入商户搜索" :titles='titles'
                            :left-default-checked = 'leftChecked'
                            v-model="addChannelForm.merchantsList" :data="optionSearchShielding">
                        </el-transfer>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addChannelDialog = false">取消</el-button>
                <el-button type="primary" @click="sureSaveChannel('addChannelForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog v-loading='editLoading' title="编辑商户黑名单" width="50%" center :visible.sync="editChannelDialog" @closed="closeDialog('editChannelForm')">
            <el-form ref="editChannelForm" :model="editChannelForm" :rules="editChannelRules" label-width="100px">
                <el-form-item label="手机号" prop='mobile'>
                    <el-input :value="formatPhoneNumber(editChannelForm)" readonly placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input type='textarea' v-model="editChannelForm.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item label="屏蔽商户" prop='merchantsList'>
                    <template>
                        <el-transfer filterable filter-placeholder="请输入商户搜索" :titles='titles'
                            :left-default-checked = 'leftChecked'
                            v-model="editChannelForm.merchantsList" :data="optionSearchShielding">
                        </el-transfer>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editChannelDialog = false">取消</el-button>
                <el-button type="primary" @click="sureSaveEditChannel('editChannelForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "BlockMerchants",
        data() {
            var validatePhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入手机号码'));
                };
                let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                setTimeout(() => {
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入正确的手机号码'));
                    }
                }, 100);
            }
            return {
                titles: ['可屏蔽商户', '已选商户'],
                channelListLoading: false,
                searchForm: {
                    mobile: '',
                    financeid: '',
                },
                addLoading: false,
                editLoading: false,
                defaultParams: {
                    pageSize: 10,
                    pageNumber: 1
                },
                addChannelList: [{
                    channelname: '',
                    channelid: '',
                    model: '',
                    remark: '',
                }],
                channelList: [],
                addChannelDialog: false,
                addChannelForm: {
                    mobile: '',
                    remark: '',
                    merchantsList: []
                },
                addChannelFormRules: {

                },
                editChannelDialog: false,
                editChannelForm: {
                    mobile: '',
                    remark: '',
                    merchantsList: []
                },
                addChannelRules: {
                    mobile: [{
                        validator: validatePhone,
                        trigger: 'blur',
                        required: true
                    }],
                    merchantsList: [{
                        trigger: 'change',
                        required: true,
                        type: 'array',
                        message: '请至少选择一个商户'
                    }],
                    remark: [{

                    }]
                },
                editChannelRules: {
                    mobile: [{
                        validator: validatePhone,
                        trigger: 'blur',
                        required: true
                    }],
                    merchantsList: [{
                        trigger: 'change',
                        required: true,
                        type: 'array',
                        message: '请至少选择一个商户'
                    }]
                },
                optionSearchShielding: [],
                leftChecked: []


            }
        },
        computed: {
            optionShielding: function () {
                return this.$store.state.optionShielding;
            },
            optionChannelId: function () {
                return this.$store.state.optionChannelId;
            }
        },
        methods: {
            init: function () {
                this.queryProductInfo();
                this.getLoanmarketListById();
            },
            closeAddChannel: function (formName) {
                this.$refs[formName].resetFields();
            },
            formatModel: function (row, column) {
                switch (row.model) {
                    case '1':
                        return '贷超';
                    case '2':
                        return '贷超信用卡'
                }
            },
          formatPhoneNumber(row){
            return row.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
          },
            //获取商户列表
            queryProductInfo: function () {
                this.Api.loQueryProductInfo({}).then((res) => {
                    if (res.data.code == 200) {
                        let options = res.data.data;
                        options.forEach((item, index) => {
                            this.optionSearchShielding.push({
                                label: item.productname,
                                key: item.id,
                                value: item.id
                            });
                        });
                    }
                }).catch((err) => {

                })
            },
            //获取商户黑名单列表
            getLoanmarketListById: function () {
                this.channelListLoading = true;
                this.Api.loGetMerchantListById({
                    financeid: this.searchForm.financeid || '',
                    mobile: this.searchForm.mobile,
                    pageSize: this.defaultParams.pageSize,
                    pageNumber: this.defaultParams.pageNumber
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.channelList = res.data.data;
                        this.channelListLoading = false;
                    }
                })

            },
            //添加渠道
            handleAdd: function (index, row) {
                console.log(index);
                console.log(this.addChannelList.length);
                this.addChannelList.push({
                    channelname: '',
                    channelid: '',
                    model: '',
                    remark: '',
                    err: false
                })
            },
            //减少渠道
            handleMinus: function (index, row) {
                for (let i = 0; i < this.addChannelList.length; i++) {
                    if (i == index) {
                        this.addChannelList.splice(index, 1);
                    }
                }
            },
            //搜索
            searchChannel: function () {
                this.defaultParams.pageNumber = 1;
                this.getLoanmarketListById();
            },
            //翻页
            handleCurrentChange: function (val) {
                this.defaultParams.pageNumber = val;
                this.getLoanmarketListById();
            },
            //选择每页显示数量
            handleSizeChange: function (val) {
                this.defaultParams.pageSize = val;
                this.getLoanmarketListById();
            },
            //删除商户黑名单
            deleteChannel: function (row) {
                this.$confirm('此操作将永久删除该黑名单，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {

                    this.Api.loDeleteMerchantListById({
                        id: row.id,
                        userid: row.userid
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getLoanmarketListById();
                        } else {
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
            //打开添加渠道弹窗
            addChannel: function () {
                this.addChannelDialog = true;
            },
            tableRowClassName({
                row,
                rowIndex
            }) {
                if (row.err == true) {
                    return 'warning-row';
                }
                return '';
            },
            //保存添加渠道
            sureSaveChannel: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addLoading = true;
                        let idList = this.addChannelForm.merchantsList ;
                        let idString  = '';
                        let nameList = '';
                        for(let i=0;i<idList.length;i++){
                            if(idString.length == 0){
                                idString  = idList[i];
                            }else{
                                idString+= ',' + idList[i];
                            }
                            for(let j=0;j<this.optionSearchShielding.length;j++){
                                if(idList[i]==this.optionSearchShielding[j].key ){
                                    if(nameList.length == 0){
                                        nameList = this.optionSearchShielding[j].label;
                                    }else{
                                        nameList =nameList + ',' + this.optionSearchShielding[j].label;
                                    }
                                }
                            }
                        }
                        this.Api.loInsertMerchantListById({
                            mobile: this.addChannelForm.mobile,
                            financeid: idString,
                            financename: nameList,
                            remark: this.addChannelForm.remark
                        }).then((res) => {
                            if (res.data.code == 200) {
                                this.$message.success("保存成功");
                                this.getLoanmarketListById();
                                this.addChannelDialog = false;
                            } else {
                                this.$message.error(res.data.msg);
                            }
                             this.addLoading = false;
                        }).catch((err)=>{
                            this.addLoading = false;
                        })
                    } else {

                        return false;
                    }
                });
            },
            editChannel: function (row) {
                 this.editChannelFrom = Object.assign(this.editChannelForm, row);
                this.editChannelFrom.merchantsList = this.editChannelFrom.financeid.split(",");
                console.log( this.editChannelFrom);
                this.editChannelDialog = true;
            },
            closeDialog(formName) {
                this.$refs[formName].resetFields();
            },
            sureSaveEditChannel: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        let idList = this.editChannelFrom.merchantsList ;
                        let idString  = '';
                        let nameList = '';
                        for(let i=0;i<idList.length;i++){
                            if(idString.length == 0){
                                idString  = idList[i];
                            }else{
                                idString+= ',' + idList[i];
                            }
                            for(let j=0;j<this.optionSearchShielding.length;j++){
                                if(idList[i]==this.optionSearchShielding[j].key ){
                                    if(nameList.length == 0){
                                        nameList = this.optionSearchShielding[j].label;
                                    }else{
                                        nameList =nameList + ',' + this.optionSearchShielding[j].label;
                                    }
                                }
                            }
                        }
                        this.Api.loInsertMerchantListById({
                            mobile: this.editChannelFrom.mobile,
                            financeid: idString,
                            financename: nameList,
                            id:  this.editChannelFrom.id,
                            remark: this.editChannelFrom.remark
                        }).then((res) => {
                            this.editLoading = false;
                            if (res.data.code == 200) {
                                this.$message.success("保存成功");
                                this.getLoanmarketListById();
                                this.editChannelDialog = false;
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }).catch((err)=>{
                            this.editLoading = false;
                        })
                    } else {

                        return false;
                    }
                });
            }
        },
        created() {
            this.init();
        }
    }

</script>

<style lang="scss">
    .blockMerchants-view {
        .el-table .warning-row {
            input {
                border: 1px solid #f56c6c;
            }
        }

        .el-dialog {
            min-width: 670px;
        }

        .el-form-item.is-error .el-transfer .el-input__inner {
            border-color: #DCDFE6 !important;
        }

        .el-form-item.is-success .el-transfer .el-input__inner {
            border-color: #DCDFE6 !important;
        }

        .plugins-tips {
            height: 70px;
            line-height: 70px;
            padding: 0 20px;

            .plugins-search {
                display: inline-block;
                vertical-align: middle;

                .el-form-item {
                    margin-bottom: 0;
                }
            }

            .add-btn {
                display: inline-block;
                font-size: 16px;
                cursor: pointer;
                color: #409EFF;

                &:hover {
                    text-decoration: underline;
                }

                i {
                    margin-right: 5px;
                    font-size: 18px;
                    top: 1px;
                    position: relative;
                }
            }



        }

        .has-gutter {
            th {
                text-align: center;
            }
        }
    }

</style>
