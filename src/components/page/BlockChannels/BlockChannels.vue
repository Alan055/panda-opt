<!--屏蔽渠道号-->
<template>
    <div class="blockChannels-view">
        <div class="container">
            <div class="plugins-tips">
                <div class="plugins-search">
                    <el-form>
                        <el-row :gutter="40">
                            <el-col :span="10">
                                <el-form-item label="渠道名" labelWidth="60px" >
                                    <el-input v-model="searchForm.channelname"  placeholder="请输入渠道名">

                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="屏蔽模块" labelWidth="80px">
                                    <el-select v-model="searchForm.model" filterable placeholder="请选择">
                                        <el-option
                                            v-for="item in optionSearchShielding"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
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
                <div  class="add-btn" @click="addChannel">
                    <i class="el-icon-lx-roundadd"></i>新增渠道
                </div>
            </div>
            <el-table
                :data="channelList.list"
                border
                style="width: 100%">
                <el-table-column
                    label="序号"
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="createtime"
                    label="屏蔽执行时间"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="channelname"
                    label="渠道名"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="channelid"
                    label="渠道号"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="model"
                    label="屏蔽模块"
                    :formatter="formatModel"
                >
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                >
                </el-table-column>
                <el-table-column
                    prop="updatetime"
                    label="最后修改时间"
                >
                </el-table-column>
                <el-table-column
                    prop="updateby"
                    label="最后修改人"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150" >
                    <template slot-scope="scope">
                        <el-button @click="editChannel(scope.row)" type="primary" size="mini">编辑</el-button>
                        <el-button @click="deleteChannel(scope.row)" type="warning" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="defaultParams.pageNumber"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="channelList.total">
            </el-pagination>
        </div>
        <el-dialog title="新增屏蔽商业渠道" width="40%" center  class="addChannelDialog" :visible.sync="addChannelDialog"  @closed="closeAddChannel">
            <el-row :gutter="40">
                        <el-form>
                            <el-table
                                :row-class-name="tableRowClassName"
                                :data="addChannelList"
                                style="width: 100%">
                                <el-table-column
                                    prop="channelId"
                                    label="渠道号"
                                    width="100">
                                    <template slot-scope="scope">
                                        <el-form-item  >
                                            <el-input v-model="scope.row.channelid" placeholder="渠道号">

                                            </el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="channelName"
                                    label="渠道名"
                                    width="100">
                                    <template slot-scope="scope">
                                        <el-form-item>
                                            <el-input v-model="scope.row.channelname" placeholder="渠道名">

                                            </el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="shielding"
                                    label="屏蔽模块">
                                    <template slot-scope="scope">
                                        <el-form-item>
                                            <el-select v-model="scope.row.model" filterable placeholder="请选择">
                                                <el-option
                                                    v-for="item in optionShielding"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="mark"
                                    label="备注">
                                    <template slot-scope="scope">
                                        <el-form-item>
                                            <el-input v-model="scope.row.remark" placeholder="备注">

                                            </el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            v-if="scope.$index == addChannelList.length-1"
                                            icon="el-icon-plus"
                                            @click="handleAdd(scope.$index, scope.row)"></el-button>
                                        <el-button
                                            size="mini"
                                            v-if=" addChannelList.length>1"
                                            icon="el-icon-minus"
                                            @click="handleMinus(scope.$index, scope.row)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="addChannelDialog = false">取消</el-button>
                <el-button type="primary" @click="sureSaveChannel('addChannelForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑屏蔽商业渠道" width="40%" center  :visible.sync="editChannelDialog"  @closed="closeDialog">
            <el-form ref="editChannelForm" :model="editChannelForm" :rules="editChannelRules" label-width="100px" size="mini">
                <el-form-item label="渠道号" >
                    <el-input  readOnly v-model="editChannelForm.channelid"></el-input>
                </el-form-item>
                <el-form-item label="渠道名" >
                    <el-input  readOnly v-model="editChannelForm.channelname"></el-input>
                </el-form-item>
                <el-form-item label="屏蔽模块" prop="model">
                    <el-select v-model="editChannelForm.model" filterable placeholder="请选择">
                        <el-option
                            v-for="item in optionShielding"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="editChannelDialog = false">取消</el-button>
                <el-button type="primary" @click="sureSaveEditChannel('editChannelForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "BlockChannels",
        data(){
            return{
                searchForm:{
                    channelid: '',
                    model: '',
                },
                defaultParams: {
                    pageSize: 10,
                    pageNumber: 1
                },
                addChannelList: [
                    {
                        channelname: '',
                        channelid: '',
                        model: '',
                        remark: '',
                    }
                ],
                channelList: [],
                addChannelDialog: false,
                addChannelForm: {
                    telTitle: ""
                },
                addChannelFormRules: {

                },
                editChannelDialog: false,
                editChannelForm: {
                    id: '',
                    channelid: '',
                    channelname: '',
                    model: ''
                },
                editChannelRules: {
                    model: [
                        { required: true, message: '请选择屏蔽模块', trigger: 'change'}
                    ],
                },
                optionSearchShielding: [
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '贷超'
                    },
                    {
                        value: '2',
                        label: '贷超信用卡'
                    }
                ]



            }
        },
        computed: {
            optionShielding: function(){
                return this.$store.state.optionShielding;
            },
            optionChannelId: function(){
                return this.$store.state.optionChannelId;
            }
        },
        methods: {
            init: function(){
              this.getLoanmarketListById();
            },
            closeAddChannel: function(){
               this.addChannelList =  [
                    {
                        channelname: '',
                        channelid: '',
                        model: '',
                        remark: '',
                        err: false
                    }
                ]
            },
            formatModel: function(row, column){
              switch (row.model){
                  case '1':
                      return '贷超';
                  case '2':
                      return '贷超信用卡'
              }
            },
            //获取渠道列表
            getLoanmarketListById: function(){
              this.Api.loGetLoanmarketListById({
                  channelname: this.searchForm.channelname  || '',
                  model: this.searchForm.model == '0'? '': this.searchForm.model || '',
                  pageSize: this.defaultParams.pageSize,
                  pageNumber: this.defaultParams.pageNumber
              }).then((res)=>{
                    if(res.data.code == 200){
                        this.channelList = res.data.data;
                    }
              })

            },
            //添加渠道
            handleAdd: function(index,row){
                console.log(index);
                console.log( this.addChannelList.length);
                this.addChannelList.push( {
                    channelname: '',
                    channelid: '',
                    model: '',
                    remark: '',
                    err: false
                })
            },
            //减少渠道
            handleMinus: function(index,row){
                for(let i=0 ;i<this.addChannelList.length;i++){
                    if(i==index){
                        this.addChannelList.splice(index,1);
                    }
                }
            },
            //搜索
            searchChannel: function(){
                this.defaultParams.pageNumber = 1;
                this.getLoanmarketListById();
            },
            //翻页
            handleCurrentChange: function(val){
                this.defaultParams.pageNumber = val;
                this.getLoanmarketListById();
            },
            //选择每页显示数量
            handleSizeChange: function(val){
                this.defaultParams.pageSize = val;
                this.getLoanmarketListById();
            },
            //删除渠道
            deleteChannel: function(row){
                this.$confirm('此操作将永久删除渠道 "'+row.channelname+'" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {

                    this.Api.loDeleteLoanmarketByIdl({
                        channelid: row.channelid,
                        id: row.id
                    }).then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getLoanmarketListById();
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
            //打开添加渠道弹窗
            addChannel: function(){
                this.addChannelDialog = true;
            },
            tableRowClassName({row, rowIndex}) {
                if (row.err == true) {
                    return 'warning-row';
                }
                return '';
            },
            //保存添加渠道
            sureSaveChannel: function(){
                console.log(this.addChannelList);
                let count = 0;
                for(let i=0 ;i<this.addChannelList.length;i++){
                    if(
                        this.addChannelList[i].channelname
                        && this.addChannelList[i].channelid
                        && this.addChannelList[i].model){
                        this.addChannelList[i].err = false;
                        count++ ;
                    }else{
                        this.addChannelList[i].err = true;
                    }
                }
                if(count == this.addChannelList.length){
                    this.Api.loSureSaveChannel({
                        data: JSON.stringify(JSON.stringify(this.addChannelList))
                    }).then((res)=>{
                        if(res.data.code == 200){
                            this.$message.success("保存成功");
                            this.addChannelDialog = false;
                            this.getLoanmarketListById();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })

                }else{
                    this.$message.error("请填写完整信息");
                }
            },
            editChannel: function(row){
                this.editChannelForm =  Object.assign(this.editChannelForm, row);
                this.editChannelDialog = true;
            },
            closeDialog(){
                Object.keys(this.editChannelForm).forEach((key)=>{
                        this.editChannelForm[key] = '';
                });
            },
            sureSaveEditChannel: function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.Api.loSaveLoanmarketList({
                            id: this.editChannelForm.id,
                            model: this.editChannelForm.model,
                            channelid: this.editChannelForm.channelid
                        }).then((res)=>{
                            if(res.data.code == 200){
                                this.$message.success("保存成功");
                                this.getLoanmarketListById();
                                this.editChannelDialog = false;
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        })
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

<style lang="scss" >
    .blockChannels-view{
        .el-table .warning-row {
            input{
                border:1px solid  #f56c6c;
            }
        }

        .plugins-tips{
            height: 70px;
            line-height: 70px;
            padding:0 20px;
            .plugins-search{
                display: inline-block;
                vertical-align: middle;
                .el-form-item{
                    margin-bottom: 0;
                }
            }
            .add-btn{
                display: inline-block;
                font-size: 16px;
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



        }
        .addChannelDialog{
            .el-form-item{
                margin-bottom: 0;
            }
        }
        .has-gutter{
            th{
                text-align: center;
            }
        }
    }
</style>
