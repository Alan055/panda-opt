<!-- push 审核 -->
<template>
    <div class="pushGroup">
        <transition name="el-zoom-in-bottom">
            <div>
                <el-tabs type="border-card">

                    <!-- 待审核列表 -->
                    <el-tab-pane :label="'待审核('+waitAuditList.total + ')'">
                        <div class="plugins-tips">
                            <el-form :inline="true">
                                <el-form-item label="搜索：">
                                    <el-input placeholder="请输入内容" v-model="searchList1" class="input-with-select">
                                        <el-button slot="append" type="primary" @click="keyWordSearch1">搜索</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <el-form :inline="false">
                                <el-form-item label="选择表格显示项">
                                    <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1"
                                        @change="handleCheckAllChange1">全选</el-checkbox>
                                    <div style="margin: 15px 0;"></div>
                                    <el-checkbox-group v-model="checkedTables1" @change="handleCheckedChange1">
                                        <el-checkbox v-for="(item,index) in tableOptions1" checked :label="item"
                                            :key="index">{{item.label}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-table stripe v-loading="loading1" :data="waitAuditList.list || []" border
                            style="width: 100%">



                            <!-- 中间可屏蔽项 -->
                            <template v-for="(col) in checkedTables1">
                                <el-table-column :prop="col.prop" :label="col.label" :key="col.label"
                                    :type="col.type=='index'? 'index':''" v-if="col.type == 'popover'"
                                    :width="widthTh(col.type)" :formatter="col.formatters">
                                    <template slot-scope="scope">
                                        <el-popover placement="top-start" trigger="click" :content="scope.row.url">
                                            <el-button slot="reference">{{col.popoverTitle}}</el-button>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column :prop="col.prop" :label="col.label" :key="col.label"
                                    :type="col.type=='index'? 'index':''" v-else :width="widthTh(col.type)"
                                    :formatter="col.formatters">
                                </el-table-column>
                            </template>

                            <!-- 操作项不能屏蔽 -->

                            <el-table-column label="操作" width="240" fixed="right">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" @click="sentTest(scope.$index, scope.row)">测试
                                    </el-button>
                                    <el-button size="mini" type="success"
                                        @click="changeThrough(scope.$index, scope.row)">通过</el-button>
                                    <el-button size="mini" type="warning"
                                        @click="changeRefused(scope.$index, scope.row)">拒绝</el-button>

                                </template>
                            </el-table-column>

                        </el-table>
                        <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                            :current-page="pageNumber1" :page-size="pageSize1" :page-sizes="[10, 20, 30, 40]"
                            layout="total, sizes, prev, pager, next, jumper" :total="waitAuditList.total">
                        </el-pagination>
                    </el-tab-pane>
                    <!-- 已审核列表 -->
                    <el-tab-pane :label="'已审核(' + approvedList.total + ')'">
                        <div class="plugins-tips">
                            <el-form :inline="true">
                                <el-form-item label="搜索：">
                                    <el-input placeholder="请输入内容" v-model="searchList2" class="input-with-select">
                                        <el-button slot="append" type="primary" @click="keyWordSearch2">搜索</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <el-form :inline="false">
                                <el-form-item label="选择表格显示项">
                                    <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2"
                                        @change="handleCheckAllChange2">全选</el-checkbox>
                                    <div style="margin: 15px 0;"></div>
                                    <el-checkbox-group v-model="checkedTables2" @change="handleCheckedChange2">
                                        <el-checkbox v-for="(item,index) in tableOptions2" checked :label="item"
                                            :key="index">{{item.label}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-table stripe v-loading="loading2" :data="approvedList.list || []" border
                            style="width: 100%">



                            <!-- 中间可屏蔽项 -->
                            <template v-for="(col) in checkedTables2">
                                <el-table-column :prop="col.prop" :label="col.label" :key="col.label"
                                    :type="col.type=='index'? 'index':''" v-if="col.type == 'popover'"
                                    :width="widthTh(col.type)" :formatter="col.formatters">
                                    <template slot-scope="scope">
                                        <el-popover placement="top-start" trigger="click" :content="scope.row.url">
                                            <el-button slot="reference">{{col.popoverTitle}}</el-button>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column :prop="col.prop" :label="col.label" :key="col.label"
                                    :type="col.type=='index'? 'index':''" v-else :width="widthTh(col.type)"
                                    :formatter="col.formatters">
                                </el-table-column>
                            </template>

                            <!-- 操作项不能屏蔽 -->

                            <el-table-column label="操作" width="140" fixed="right" prop="status">
                                <template slot-scope="scope">
                                    <el-popover placement="left-start" width="220" trigger="click"
                                        v-if="scope.row.status  == 1" :content="scope.row.remark">
                                        <el-button slot="reference" type="text" style="color:#f56c6c">审核未通过,查看原因
                                        </el-button>
                                    </el-popover>
                                    <el-button size="mini" v-else type="text" style="color:#67C23A">审核通过</el-button>

                                </template>
                            </el-table-column>

                        </el-table>
                        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
                            :current-page="pageNumber2" :page-size="pageSize2" :page-sizes="[10, 20, 30, 40]"
                            layout="total, sizes, prev, pager, next, jumper" :total="approvedList.total">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>

            </div>
        </transition>

    </div>
</template>

<script>
    import api from '@/assets/api/index';
    export default {

        name: "PushAudit",
        data() {
            return {
                dialogTableVisible: false, //变更记录弹窗
                changeRecordList: [], //变更记录列表
                loaded: false,
                actionWidth: true,
                loading1: false,
                loading2: false,
                fileNumber: 1, //最大允许上传个数
                fileList: [], //文件列表
                userNumber: '0', //用户数量
                objectOption: [{
                        label: '用户包',
                        value: '1'
                    },
                    {
                        label: '指定用户',
                        value: '2'
                    },
                    // {
                    //     label: '事件用户',
                    //     value: '3'
                    // }
                ],
                pageNumber1: 1,
                pageSize1: 10,
                pageNumber2: 1,
                pageSize2: 10,
                listPushObjectOption: [{
                        label: '全部',
                        value: '0'
                    },
                    {
                        label: '手机号码',
                        value: '1'
                    },
                    {
                        label: '文件',
                        value: '2'
                    }
                ], //列表群发
                statusOption: [{
                        label: "待审核",
                        value: 1
                    },
                    {
                        label: "已审核",
                        value: 0
                    }
                ],
                checkStatus: 3, //列表状态  默认已发送
                queryMassMessageMassList: [], //列表
                waitAuditList: [], //待审核列表
                approvedList: [], //已审核列表
                listPushObject: "0", //列表群发对象  默认全部
                searchList1: '', //待审核搜索关键字
                searchList2: '', //已搜索关键字
                isIndeterminate1: false,
                isIndeterminate2: false,
                checkedTables1: [], //待审核选择的表头
                checkedTables2: [], //已审核选择的表头
                checkAll1: true,
                checkAll2: true,
                tableOptions1: [{
                        label: '序号',
                        prop: '',
                        type: 'index'
                    },
                    {
                        label: '申请时间',
                        prop: 'createTime',
                        type: 'time'
                    },
                    {
                        label: '群发时间',
                        prop: 'expectTime',
                        type: 'time'
                    },
                    {
                        label: '申请人',
                        prop: 'creator',
                        type: 'normal'
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        type: 'filter',
                        formatters: this.filterSendType
                    },
                    {
                        label: '群发对象',
                        prop: 'sendType',
                        type: 'filter',
                        formatters: this.filterObj
                    },
                    {
                        label: '群发数量',
                        prop: 'sendTotal',
                        type: 'normal'
                    },
                    {
                        label: 'push消息内容',
                        prop: 'content',
                        type: 'content'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        type: 'filter',
                        formatters: this.filterStatus
                    }
                ], //所有表头
                tableOptions2: [{
                        label: '序号',
                        prop: '',
                        type: 'index'
                    },
                    {
                        label: '申请时间',
                        prop: 'createTime',
                        type: 'time'
                    },
                    {
                        label: '群发时间',
                        prop: 'expectTime',
                        type: 'time'
                    },
                    {
                        label: '申请人',
                        prop: 'creator',
                        type: 'normal'
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        type: 'filter',
                        formatters: this.filterSendType
                    },
                    {
                        label: '群发对象',
                        prop: 'sendType',
                        type: 'filter',
                        formatters: this.filterObj
                    },
                    {
                        label: '群发数量',
                        prop: 'sendTotal',
                        type: 'normal'
                    },
                    {
                        label: 'push消息内容',
                        prop: 'content',
                        type: 'content'
                    },
                ], //所有表头
            }
        },
        computed: {
            saveUrl: function () {
                return this.$store.state.saveUrl + '?type=0';
            },
            canUpload: function () {
                return this.fileList.length > 0
            },
            optionJumpType: function () {
                return this.$store.state.optionJumpType;
            },
            //获取内容字符长度
            codeLength: function () {
                let length = 0;
                let str = this.addPushForm.content;
                for (let i = 0; i < str.length; i++) {
                    let iCode = str.charCodeAt(i);
                    if ((iCode >= 0 && iCode <= 255) || (iCode >= 0xff61 && iCode <= 0xff9f)) {
                        length += 1;
                    } else {
                        length += 2;
                    }
                }
                if (length >= 200) {
                    this.addPushForm.content = str.substr(0, length);
                }
                return length;

            },
            //特殊表头宽度
            widthTh() {
                return function (val) {
                    if (val == 'content') {
                        return '300'
                    } else if (val == 'time') {
                        return '150'
                    } else {
                        return ''
                    }
                }
            }

        },
        methods: {
            //发送申请
            sendApply() {

            },
            //测试发送
            testApply() {

            },
            addPopupDialogOpen() {

            },
            //选择页
            handleCurrentChange1(val) {
                this.pageNumber1 = val;
                this.getQueryMassMessageMassLi(2);
            },
            //选择每页显示数量
            handleSizeChange1(val) {
                this.pageSize1 = val;
                this.getQueryMassMessageMassLi(2);
            },
            //选择页
            handleCurrentChange2(val) {
                this.pageNumber2 = val;
                this.getQueryMassMessageMassLi(1);
            },
            //选择每页显示数量
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.getQueryMassMessageMassLi(1);
            },
            //输入关键字搜索
            keyWordSearch1() {
                //先重置页
                this.pageSize1 = 10;
                this.pageNumber1 = 1;
                this.getQueryMassMessageMassLi(2);
            },
            keyWordSearch2() {
                //先重置页
                this.pageSize2 = 10;
                this.pageNumber2 = 1;
                this.getQueryMassMessageMassLi(1);
            },
            //获取群发消息审核列表
            getQueryMassMessageMassLi(val) {
                let params = {
                    messagetype: 2,
                    status: val || '',
                    sendType: this.listPushObject,
                };
                if (val == 2) {
                    this.loading1 = true;
                    params.keyword = this.searchList1;
                    params.pageSize = this.pageSize1;
                    params.pageNumber = this.pageNumber1;
                } else {
                    this.loading2 = true;
                    params.keyword = this.searchList2;
                    params.pageSize = this.pageSize2;
                    params.pageNumber = this.pageNumber2;
                }
                api.sentQueryMassMessageMassList(params).then((res) => {
                    console.log(res);
                    if (res.data.code == 200) {
                        if (val == 2) {
                            //待审核
                            this.waitAuditList = res.data.data;
                            this.loading1 = false;
                        } else if (val == 1) {
                            //已经审核
                            this.approvedList = res.data.data;
                            this.loading2 = false;
                        }

                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                        if (val == 2) {
                            //待审核
                            this.loading1 = false;
                        } else if (val == 1) {
                            //已经审核
                            this.loading2 = false;
                        }
                    }
                }).catch((err) => {
                    if (val == 2) {
                        //待审核
                        this.loading1 = false;
                    } else if (val == 1) {
                        //已经审核
                        this.loading2 = false;
                    }
                })
            },
            //根据Id 获取物料内容
            getSysEventDetailById() {
                this.addPushForm.content = '';
                this.addPushForm.jumpType = '';
                this.addPushForm.jumpLink = '';
                if (this.addPushForm.pushId && this.addPushForm.pushId.length >= 18) {
                    this.Api.msGetSysEventDetailById({
                        id: this.addPushForm.pushId
                    }).then((res) => {
                        if (res.data.code == 200) {
                            if (res.data.data) {
                                if (res.data.data.messagetype == '2') {
                                    this.addPushForm.content = res.data.data.content;
                                    this.addPushForm.jumpType = res.data.data.jumpinner || 0;
                                    this.addPushForm.jumpLink = res.data.data.gotourl || '';
                                } else {
                                    this.$message.error("请输入Push类型的id");
                                }
                            } else {
                                this.$message.error("渠道id不正确或者消息类型不匹配");
                            }


                        } else {
                            this.addPushForm.content = '';
                            this.$message.error(res.data.msg);
                        }
                    })
                }

            },
            //通过审核
            changeThrough(index, row) {
                this.$confirm('是否确认通过此群发？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let timeSend = new Date(Date.parse(row.expectTime.replace(/-/g, "/")));
                    let timeNow = new Date();
                    if (timeNow > timeSend) {
                        this.$confirm('当前时间已过群发时间，是否确认审核通过', '提示', {
                            confirmButtonText: '通过',
                            cancelButtonText: '作废',
                            type: 'warning',
                            center: true
                        }).then(() => {
                           this.apiThrough(row.id, 2);
                        }).catch(() => {
                            //选择作废
                           this.apiThrough(row.id, 7);
                        })
                    } else {
                        this.apiThrough(row.id, 2);
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },
            //通过审核
            apiThrough(id,status) {
                api.auUpdateAuditStatusById({
                    messagetype: 2,
                    status: status,
                    id: id,
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.getQueryMassMessageMassLi(2);
                        this.getQueryMassMessageMassLi(1);
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        type: 'error',
                        message: err.msg
                    });
                });
            },
            //审核拒绝
            changeRefused(index, row) {
                this.$prompt('请输入拒绝原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '拒绝原因不能为空',
                    inputPlaceholder: '请输入拒绝原因',
                    type: 'warning',
                    center: true,
                    inputType: 'textarea'
                }).then(({
                    value
                }) => {
                    api.auUpdateAuditStatusById({
                        messagetype: 2,
                        status: 1,
                        id: row.id,
                        remark: value
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.getQueryMassMessageMassLi(2);
                            this.getQueryMassMessageMassLi(1);
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                    }).catch((err) => {
                        this.$message({
                            type: 'error',
                            message: err.msg
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });

            },
            //发送测试
            sentTest(index, row) {
                this.$prompt('请输入测试手机号码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true,
                    inputPattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                    inputErrorMessage: '请输入正确的手机号码'
                }).then(({
                    value
                }) => {
                    api.auSendPushTest({
                        mobile: value,
                        messageid: row.templeteId
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '发送成功'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                    }).catch((err) => {
                        this.$message({
                            type: 'error',
                            message: err.msg
                        });
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消测试'
                    });
                });
            },
            //全选表头
            handleCheckAllChange1(val) {
                this.checkedTables1 = val ? this.tableOptions1 : [];
                this.isIndeterminate1 = false;
            },
            //选择表头变更
            handleCheckedChange1(value) {
                console.log(value);
                let checkedCount = value.length;
                this.checkAll1 = checkedCount === this.tableOptions1.length;
                this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.tableOptions1.length;
            },
            //全选表头
            handleCheckAllChange2(val) {
                this.checkedTables2 = val ? this.tableOptions2 : [];
                this.isIndeterminate2 = false;
            },
            //选择表头变更
            handleCheckedChange2(value) {
                console.log(value);
                let checkedCount = value.length;
                this.checkAll2 = checkedCount === this.tableOptions2.length;
                this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.tableOptions2.length;
            },
            //跳转方式过滤
            filterJumptype(row, column) {
                switch (row.jumptype) {
                    case 1:
                        return '内部打开h5链接';
                    case 2:
                        return '外部打开h5链接';
                    case 3:
                        return '仅展示不跳转';
                }
            },
            filterStatus(row, column) {
                switch (row.status) {
                    case 0:
                        return '待审核';
                    case 1:
                        return '审核拒绝';
                    case 2:
                        return '审核通过';
                    case 3:
                        return '准备生成记录';
                    case 4:
                        return '待发送';
                    case 5:
                        return '已发送';
                    case 6:
                        return '发送失败';
                    case 7:
                        return '已过期';

                }
            },
            //群发对象过滤
            filterObj(row, column) {
                switch (row.sendType) {
                    case 1:
                        return '用户包';
                    case 2:
                        return '指定用户';
                }
            },
            //变更类型
            filterType(row, column) {
                switch (row.type) {
                    case 1:
                        return '新增';
                    case 2:
                        return '审核通过';
                    case 3:
                        return '审核拒绝';
                }
            },
            //消息类型
            filterSendType(row, column) {
                switch (row.type) {
                    case 1:
                        return '营销';
                    case 2:
                        return '通知';
                    case 3:
                        return '手机号码包';
                }
            }
        },
        created() {
            this.approvedList.total = 0;
            this.waitAuditList.total = 0;
            this.$nextTick(() => {
                this.getQueryMassMessageMassLi(2);
                this.getQueryMassMessageMassLi(1);
            })
        }
    }

</script>
<style lang="scss">
    .content-form {
        .el-upload--text {
            background-color: #fff;
            border: none;
            border-radius: 0;
            box-sizing: border-box;
            width: auto;
            height: auto;
            text-align: left;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .el-upload__tip {
            display: inline-block;
            margin-top: 0;
            vertical-align: top;
            margin-left: 20px;
        }

        ul.el-upload-list {
            width: 50%;
        }
    }

</style>
<style scoped lang="scss">
    .content-form {
        border: 1px solid #e4e4e4;
        padding: 20px 20px 20px 0;
        height: 500px;
        overflow: auto;

        .el-form-item__content {
            position: relative;

            &>div:nth-child(2) {
                margin-top: 10px;
            }

            .contentLength {
                position: absolute;
                right: -85px;
                bottom: 0px;
                width: 80px;
                line-height: 20px;
                text-align: left;
                font-weight: normal;

                &.redText {
                    color: #f56c6c;
                }
            }
        }

        .el-form {
            width: 50%;
            min-width: 600px;
            margin: 0 auto;
        }

        .userNumber {
            font-size: 12px;
            color: #606266;
            margin-top: 0px !important;
            display: block;
            margin-right: 40px;
            overflow: hidden;
            padding-left: 4px;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            -webkit-transition: color .3s;
            -o-transition: color .3s;
            transition: color .3s;
            white-space: nowrap;
        }
    }

    .content-submit-btn {
        text-align: center;
        margin-top: 20px;

        button {
            margin-right: 20px;
        }
    }

    .plugins-tips {
        .el-form-item {
            margin-right: 40px;
        }
    }

    .add-btn {
        float: right;
        font-size: 16px;
        margin-right: 20px;
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

</style>
