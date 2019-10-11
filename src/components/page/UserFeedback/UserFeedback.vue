<!--用户反馈-->
<template>
    <div class="userFeedback-view">
        <div class="container">
            <div class="plugins-tips">
                <div class="plugins-search">
                    <el-form>
                        <el-row :gutter="40">
                            <el-col :span="10">
                                <el-form-item label="开始时间" labelWidth="80px">
                                    <el-date-picker v-model="searchForm.starttime" type="date" value-format="yyyy-MM-dd"
                                        placeholder="选择开始日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="结束时间" labelWidth="80px">
                                    <el-date-picker v-model="searchForm.endtime" type="date" value-format="yyyy-MM-dd"
                                        placeholder="选择结束日期">
                                    </el-date-picker>
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
                <div class="add-btn" @click="exportList(feedList) ">
                    <i class="el-icon-edit-outline"></i>导出
                </div>
            </div>
            <el-table :data="feedList.data" border style="width: 100%">
                <el-table-column label="序号" type="index">
                </el-table-column>
                <el-table-column prop="accountid" label="用户id">
                </el-table-column>
                <el-table-column prop="username" label="登录手机号">
                </el-table-column>
                <el-table-column prop="suggestcontent" label="反馈内容" width="300">
                </el-table-column>
                <el-table-column prop="devicetype" label="机型" :formatter="formatDevice">
                </el-table-column>
                <el-table-column prop="contactway" label="联系方式">
                </el-table-column>
                <el-table-column prop="suggesttime" label="提交时间">
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                :total="feedList.total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {
        apiUrl
    } from "../../../assets/base/env";
    export default {
        name: "UserFeedback",
        data() {
            return {
                searchForm: {
                    starttime: '',
                    endtime: ''
                },
                apiUrl: apiUrl,
                pageSize: 10,
                pageNum: 1,
                feedList: []
            }
        },
        methods: {
            init: function () {
                this.getSuggestionList();
            },
            formatDevice: function (row, column) {
                if (row.devicetype == 1) {
                    return "安卓";
                } else if (row.devicetype == 2) {
                    return "苹果";
                } else {
                    return "未知";
                }
            },
            getSuggestionList: function () {
                let params = {
                    pageIndex: this.pageNum,
                    pageSize: this.pageSize,
                };
                if (this.searchForm.starttime) params.starttime = String(this.searchForm.starttime);
                if (this.searchForm.endtime) params.endtime = String(this.searchForm.endtime);
                this.Api.feedGetSuggestionList(params).then((res) => {
                    if (res.data.code == 200) {
                        this.feedList = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            searchChannel: function () {
                this.pageNum = 1;

                this.getSuggestionList();
            },
            handleSizeChange: function (val) {
                this.pageSize = val;
                0
                this.getSuggestionList();
            },
            handleCurrentChange: function (val) {
                this.pageNum = val;
                this.getSuggestionList();
            },
            exportList: function () {
                let params = {};
                if (this.searchForm.starttime) {
                    params.starttime = String(this.searchForm.starttime);
                } else {
                    this.$message.error("请选择导出开始时间");
                    return false;
                }
                if (this.searchForm.endtime) {
                    params.endtime = String(this.searchForm.endtime);
                } else {
                    this.$message.error("请选择导出结束时间");
                    return false;
                }
                if (this.searchForm.starttime > this.searchForm.endtime) {
                    this.$message.error("开始时间不能大于结束时间");
                    return false;
                }
                let url = this.apiUrl + '/opt/suggestion/exportSuggestionList?starttime=' + params.starttime +
                    '&endtime=' + params.endtime;
                window.location.href = url;
            }
        },
        created() {
            this.init();
        }
    }

</script>

<style lang="scss">
    .userFeedback-view {
        .plugins-tips {
            height: 70px;
            line-height: 70px;
            padding: 0 20px;

            .plugins-search {
                display: inline-block;
                vertical-align: middle;
            }

            .add-btn {
                float: right;
                display: block;
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

            .el-form-item {
                margin-bottom: 0;
                vertical-align: middle;
            }
        }

        .el-form-item {
            margin-bottom: 0;
        }
    }

</style>
