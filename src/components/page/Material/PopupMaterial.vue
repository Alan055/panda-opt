<!--弹窗素材管理-->
<template>
    <div>
        <div>
            <div class="figure-title">首页弹窗-素材管理</div>
        </div>
        <el-table v-loading="loading" :data="iosDialogList.list" border style="width: 100%">
            <el-table-column type="index" label="弹窗">
            </el-table-column>
            <el-table-column prop="userstatusname" label="用户状态">
            </el-table-column>
            <el-table-column prop="frequency" label="弹窗频率">
            </el-table-column>
            <el-table-column prop="starttime" width="300" label="生效时间" :formatter="formatDate">
            </el-table-column>
            <el-table-column label="图片内容" width="300">
                <template slot-scope="scope">

                    <div class="tab-imgContent" v-for="(item,index) in scope.row.advertList" :key="index">
                        <div class="left">
                            <el-popover placement="right" title="" trigger="click">
                                <img :src="item.imgurl" style="max-width:700px;max-height: 700px" />
                                <img slot="reference" :src="item.imgurl" :alt="item.imgurl"
                                    style="width: 80px;height: 80px">
                            </el-popover>
                        </div>
                        <div class="right">
                            <p>{{item.filename}}</p>
                            <el-tooltip :content="item.jumplink" placement="bottom" effect="light">
                                <p>{{item.jumplink}}</p>
                            </el-tooltip>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="updatetime" label="最近修改时间">
            </el-table-column>
            <el-table-column prop="username" label="最后修改人">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template>
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button type="warning" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
            :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
            :total="androidDialogList.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "PopupMaterial"
    }

</script>

<style scoped>

</style>
