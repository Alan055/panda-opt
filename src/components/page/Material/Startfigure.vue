<!--启动图管理-->
<template>
    <div>
        <transition name="el-zoom-in-bottom">
            <div>
                <el-tabs type="border-card" v-model="deviceType" @tab-click="checkAllStatus">
                    <el-tab-pane v-for="item in optionDevice" :label="item.label" :name="item.value" :key="item.value">
                        <div class="plugins-tips">
                            为保障用户体验，启动图统一为PNG、jpg、gif格式，尺寸：720*1280px，大小不超过1M。
                            <div class="add-btn" @click="addDialog">
                                <i class="el-icon-lx-roundadd"></i>新增启动图
                            </div>

                        </div>
                        <template>
                            <template>
                                <el-table :data="startfigure.list" border style="width: 100%">
                                    <el-table-column type="index" label="序号">
                                    </el-table-column>
                                    <el-table-column prop="icontext" label="启动图名称" width="120">
                                    </el-table-column>
                                    <el-table-column prop="jumptypename" width="120" label="打开方式">
                                    </el-table-column>
                                    <el-table-column prop="starttime" width="300" label="生效时间" :formatter="formatDate">
                                    </el-table-column>
                                    <el-table-column prop="isdefault" :formatter="formatDefault" label="是否默认">
                                    </el-table-column>
                                    <el-table-column prop="advertList[0].jumplink" label="跳转链接" width="300">
                                    </el-table-column>
                                    <el-table-column label="图片预览" prop="advertList" header-align="center" align="center"
                                        width="100px">
                                        <template slot-scope="scope">
                                            <div class="left_imgContent" v-for="(key,index) in scope.row.advertList"
                                                :key="index">
                                                <el-popover placement="right" title="" trigger="click">
                                                    <img :src="key.imgurl" style="max-width:700px;max-height: 700px" />
                                                    <img slot="reference" :src="key.imgurl" :alt="key.imgurl"
                                                        style="width: 80px;height: 80px">
                                                </el-popover>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="updatetime" width="150" label="最近修改时间">
                                    </el-table-column>
                                    <el-table-column prop="username" label="最后修改人">
                                    </el-table-column>
                                    <el-table-column prop="status" :formatter="formatStatus" label="状态">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="230">
                                        <template slot-scope="scope">
                                            <el-button :disabled="scope.row.isdefault==1"
                                                @click="editDetail(scope.$index, scope.row)" type="primary" size="mini">
                                                编辑</el-button>
                                            <el-button :disabled="scope.row.isdefault==1" size="mini" type="warning"
                                                @click="handleStop(scope.$index, scope.row)">
                                                {{scope.row.status==1?'停用': '启用'}}</el-button>
                                            <el-button :disabled="scope.row.isdefault==1"
                                                @click="deletStart(scope.$index, scope.row)" type="danger" size="mini">
                                                删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination @size-change="handleSizeChangeAll"
                                    @current-change="handleCurrentChangeAll" :current-page="1"
                                    :page-sizes="[10, 20, 30, 40]" :page-size="10"
                                    layout="total, sizes, prev, pager, next, jumper" :total="startfigure.total">
                                </el-pagination>
                            </template>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </transition>
        <el-dialog :title="startTitle" width="40%" center :visible.sync="dialogFormVisible" @closed="closeDialog">
            <el-form :model="editForm" :rules="startRules" ref="editForm" label-width="100px" size="mini">
                <el-form-item label="平台分类" prop="devicetype">
                    <el-select v-model="editForm.devicetype" :disabled="editDisabled" placeholder="选择投放平台">
                        <el-option v-for="item in startOptionDeviceType" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片名称" prop="icontext">
                    <el-input v-model="editForm.icontext" placeholder="请输入图片名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传图片1">
                    <el-upload class="avatar-uploader" :action="actionUrl" :drag="canDrag" :disabled="loaded"
                        :with-credentials="actionWidth" :show-file-list="false" :on-progress='handleUploading'
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="editForm.advertList[0].imgurl" :src="editForm.advertList[0].imgurl || ''"
                            class="avatar">
                        <i class="el-icon-upload"></i>
                        <div v-if="loaded" class="el-up-loading"><i class="el-icon-loading"></i><br />拼命上传中</div>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB，适用于正常屏幕</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="图片1尺寸">
                    <el-input v-if="editForm.advertList[0]" v-model="editForm.advertList[0].imgmeasure" readOnly
                        placeholder="图片尺寸" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片1大小">
                    <el-input v-if="editForm.advertList[0]" v-model="editForm.advertList[0].imgsize" placeholder="图片大小"
                        readOnly autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接" prop="jumplink">
                    <el-input v-model="editForm.jumplink" placeholder="输入跳转链接" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传图片2" v-if="editForm.devicetype == 2">
                    <!--
                        action==> 上传地址
                        drag ==> 是否可拖动
                        disabled ==> 上传中 开启禁用
                        with-credentials ==> 请求头是否允许文件上传
                        show-file-list ==> 是否显示上传列表
                        on-progress ==> 上传中绑定事件
                        on-success ==> 上传成功
                        before-upload ==> 上传前
                        -->
                    <el-upload class="avatar-uploader" :action="actionUrl" :drag="canDrag" :disabled="loaded"
                        :with-credentials="actionWidth" :show-file-list="false" :on-progress='handleUploading1'
                        :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
                        <img v-if="editForm.advertList[1].imgurl" :src="editForm.advertList[1].imgurl || ''"
                            class="avatar">
                        <i class="el-icon-upload"></i>
                        <div v-if="loaded" class="el-up-loading"><i class="el-icon-loading"></i><br />拼命上传中</div>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB，适用于流海屏手机</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="图片2尺寸" v-if="editForm.devicetype == 2">
                    <el-input v-if="editForm.advertList[1]" v-model="editForm.advertList[1].imgmeasure" readOnly
                        placeholder="图片尺寸" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片2大小" v-if="editForm.devicetype == 2">
                    <el-input v-if="editForm.advertList[1]" v-model="editForm.advertList[1].imgsize" placeholder="图片大小"
                        readOnly autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="打开方式" prop="jumptype">
                    <el-select v-model="editForm.jumptype" placeholder="请选择打开方式">
                        <el-option v-for="item in optionsOpen" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="starttime">
                    <el-date-picker v-model="editForm.starttime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endtime">
                    <el-date-picker v-model="editForm.endtime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('editForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="bigImgUrlDialog">
            <img width="100%" :src="bigImgUrl" alt="">
        </el-dialog>
    </div>

</template>

<script>
    import {
        quillEditor
    } from 'vue-quill-editor';
    import {
        apiUrl
    } from "@/assets/base/env";
    export default {
        name: 'StartFigure',
        data: function () {
            const changeValidateStart = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入开始时间'));
                } else {
                    if (this.editForm.endtime !== '') {
                        this.$refs.editForm.validateField('endtime');
                    }
                    callback();
                }
            };
            const changeValidateEnd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入结束时间'));
                } else if (value < this.editForm.starttime) {
                    callback(new Error('结束时间不能小于开始时间!'));
                } else {
                    callback();
                }
            };
            return {
                editDisabled: false, //编辑状态不允许修改平台
                actionWidth: true,
                bigImgUrlDialog: false,
                canDrag: true,
                imgPercent: 0,
                loaded: false,
                bigImgUrl: '',
                content: '',
                startTitle: '',
                dialogFormVisible: false, //添加表单弹窗
                activeName: 'first',
                addForm: {
                    type: '', //分类
                    isDefault: '', //是否默认图
                    openType: '', //打开方式
                    theHref: '', //跳转地址
                    dateTime: '', //生效时间
                },
                editForm: {
                    advertid: '',
                    icontext: '',
                    devicetype: '',
                    imgsize: '',
                    isdefault: '',
                    jumptype: '',
                    userstatus: '',
                    starttime: '',
                    endtime: '',
                    frequency: '',
                    jumplink: '',
                    fileid: '',
                    advertList: [{
                            advertid: '',
                            fileid: '',
                            filename: '',
                            imgmeasure: '',
                            imgsize: '',
                            imgurl: ''
                        },
                        {
                            advertid: '',
                            fileid: '',
                            filename: '',
                            imgmeasure: '',
                            imgsize: '',
                            imgurl: ''
                        }
                    ]

                },
                startRules: {
                    icontext: [{
                        required: true,
                        message: '请输入图片名称'
                    }],
                    devicetype: [{
                        required: true,
                        message: '请选择分类'
                    }],
                    isdefault: [{
                        required: true,
                        message: '请选择是否默认图',
                    }],
                    jumptype: [{
                        required: true,
                        message: '请选择打开类型'
                    }],
                    jumplink: [{
                        required: true,
                        message: '请输入跳转链接'
                    }],
                    starttime: [{
                            required: true,
                            message: '请选择开始时间'
                        },
                        {
                            validator: changeValidateStart,
                            trigger: 'change'
                        }
                    ],
                    endtime: [{
                            required: true,
                            message: '请选择结束时间'
                        },
                        {
                            validator: changeValidateEnd,
                            trigger: 'change'
                        }

                    ],
                    imgmeasure: [{
                            required: true,
                            message: '请上传图片'
                        }

                    ],
                    imgsize: [{
                        required: true,
                        message: '请上传图片'
                    }],
                    imgmeasure1: [{
                        required: true,
                        message: '请上传图片'
                    }],
                    imgsize1: [{
                        required: true,
                        message: '请上传图片'
                    }],


                },
                pictureLimit: 1,
                canEdit: false,
                imageUrl: '',
                imageUrl1: '',
                pageSize: 10,
                pageNum: 1,
                startfigure: [],
                deviceType: '1',
                optionDevice: [{
                        label: 'android',
                        value: '1'
                    },
                    {
                        label: 'ios',
                        value: '2'
                    }
                ]
            }
        },
        components: {
            quillEditor
        },
        computed: {
            // startfigure : function(){
            //     return this.$store.state.startFigureList;
            // },
            optionsOpen: function () {
                return this.$store.state.optionsOpen;
            },
            startOptionDeviceType: function () {
                return this.$store.state.startOptionDeviceType;
            },
            optionDefault: function () {
                return this.$store.state.optionDefault;
            },
            actionUrl: function () {
                return this.$store.state.actionUrl;
            }
        },
        methods: {
            init() {
                this.changeStartFigureList();
            },
            handleClick() {

            },
            //打开停用用户对话
            handleStop(index, row) {
                let text = row.status == 1 ? '停用' : '启用';
                this.$confirm('此操作将' + text + '启动图 "' + row.icontext + '" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.Api.maUpdateStatus({
                        oldIds: row.oldIds,
                        status: row.status == 1 ? '0' : '1',
                        detailid: row.detailid || ''
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: text + '成功!'
                            });
                            this.changeStartFigureList();

                        } else {
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
            checkAllStatus(val) {
                this.changeStartFigureList();
            },

            //表格时间显示
            formatDate(row, column) {
                return row.starttime + ' 至 ' + row.endtime
            },
            formatStatus: function (row, column) {
                return row.status == 0 ? '已停用' : '已启用';
            },
            formatDefault: function (row, column) {
                return row.isdefault == 1 ? '是' : '否';
            },
            changeStartFigureList: function () {
                this.Api.maGetAdvertListBatch({
                    positionId: '1003001',
                    deviceType: this.deviceType,
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.startfigure = res.data.data;
                        for (let i = 0; i < this.startfigure.list.length; i++) {
                            this.startfigure.list[i].advertList = this.startfigure.list[i].advertList
                                .reverse();
                        }
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //添加弹窗
            addDialog() {
                this.startTitle = '添加启动图';
                this.dialogFormVisible = true;
            },
            onEditorChange({
                editor,
                html,
                text
            }) {
                this.content = html;
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveStartFigure();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //修改或者添加 启动图
            saveStartFigure() {
                let start = String(new Date(this.editForm.starttime));
                let end = String(new Date(this.editForm.endtime));
                let adverListParams = [];
                if (this.editForm.devicetype == '1') {
                    adverListParams = [{
                        advertid: this.editForm.advertList[0].advertid || "",
                        fileid: this.editForm.advertList[0].fileid,
                        filename: this.editForm.advertList[0].filename,
                        imgsize: this.editForm.advertList[0].imgsize,
                        imgmeasure: this.editForm.advertList[0].imgmeasure
                    }];
                } else {
                    adverListParams = [{
                            advertid: this.editForm.advertList[0].advertid || "",
                            fileid: this.editForm.advertList[0].fileid,
                            filename: this.editForm.advertList[0].filename,
                            imgsize: this.editForm.advertList[0].imgsize,
                            imgmeasure: this.editForm.advertList[0].imgmeasure
                        },
                        {
                            advertid: this.editForm.advertList[1].advertid || "",
                            fileid: this.editForm.advertList[1].fileid,
                            filename: this.editForm.advertList[1].filename,
                            imgsize: this.editForm.advertList[1].imgsize,
                            imgmeasure: this.editForm.advertList[1].imgmeasure
                        }
                    ];
                }

                let params = {
                    oldIds: this.editForm.oldIds,
                    icontext: this.editForm.icontext,
                    positionid: '1003001',
                    advertid: this.editForm.advertid || '',
                    relid: this.editForm.relid || '',
                    devicetype: this.editForm.devicetype,
                    isdefault: this.editForm.isdefault,
                    jumptype: this.editForm.jumptype,
                    starttime: start,
                    endtime: end,
                    jumplink: this.editForm.jumplink,
                    frequency: this.editForm.frequency,
                    advertListStr: JSON.stringify(JSON.stringify(adverListParams)),
                    detailid: this.editForm.detailid || ''
                };
                this.Api.maSaveAdvertBatch(params).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success('保存成功');
                        this.dialogFormVisible = false;
                        this.changeStartFigureList();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.$message.success('上传成功');
                this.imageUrl = URL.createObjectURL(file.raw);
                let img = new Image();
                img.src = this.imageUrl;
                img.onload = () => {
                    this.editForm.advertList[0].imgmeasure = img.width + '*' + img.height;
                    this.editForm.advertList[0].imgsize = (file.size / 1024).toFixed(2) + 'KB';
                    this.editForm.advertList[0].imgurl = this.imageUrl;
                    this.editForm.advertList[0].fileid = res.data.id;
                    this.editForm.advertList[0].filename = file.name;
                    console.log(this.editForm.fileid);
                };
                this.loaded = false;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error('上传启动图只能是PNG或者JPG 格式!');
                    this.loaded = false;
                    return;
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过1MB!');
                    this.loaded = false;
                    return;
                }
                this.loaded = true;
                return isJPG && isLt2M;
            },
            handleUploading(event, file, fileList) {

            },
            handleAvatarSuccess1(res, file) {
                this.$message.success('上传成功');
                this.imageUrl1 = URL.createObjectURL(file.raw);
                let img = new Image();
                img.src = this.imageUrl1;
                img.onload = () => {
                    this.editForm.advertList[1].imgmeasure = img.width + '*' + img.height;
                    this.editForm.advertList[1].imgsize = (file.size / 1024).toFixed(2) + 'KB';
                    this.editForm.advertList[1].imgurl = this.imageUrl1;
                    this.editForm.advertList[1].fileid = res.data.id;
                    this.editForm.advertList[1].filename = file.name;
                    console.log(this.editForm.fileid);
                };
                this.loaded = false;
            },
            beforeAvatarUpload1(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error('上传启动图只能是PNG或JPG 格式!');
                    this.loaded = false;
                    return;
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过1MB!');
                    this.loaded = false;
                    return;
                }
                this.loaded = true;
                return isJPG && isLt2M;
            },
            handleUploading1(event, file, fileList) {

            },
            editDetail(index, row) {
                this.startTitle = '编辑启动图';
                this.dialogFormVisible = true;
                this.editForm = JSON.parse(JSON.stringify(row));
                this.editDisabled = true;
            },
            deletStart(index, row) {
                this.$confirm('此操作将永久删除启动图，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {
                    this.Api.maDelAdvert({
                        advertId: row.advertid,
                        detailId: row.detailid
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.changeStartFigureList();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeDialog() {
                this.resetForm('editForm');
                Object.keys(this.editForm).forEach((key) => {
                    if (key == 'dateTime') {
                        this.editForm.dateTime = [];
                    } else if (key == 'advertList') {
                        this.editForm[key] = [{
                                imgmeasure: '',
                                imgsize: '',
                                imgurl: ''
                            },
                            {
                                imgmeasure: '',
                                imgsize: '',
                                imgurl: ''
                            }
                        ];
                    } else {
                        this.editForm[key] = '';
                    }
                });
                this.editDisabled = false;
            },
            handleSizeChangeAll: function (val) {
                this.pageSize = val;
                this.changeStartFigureList();
            },
            handleCurrentChangeAll: function (val) {
                this.pageNum = val;
                this.changeStartFigureList();
            }
        },
        mounted() {
            this.init();
        },
        watch: {

        },
        filters: {
            jumpType: function (value) {
                switch (value) {
                    case 1:
                        return '内部打开h5链接';
                    case 2:
                        return '外部打开h5链接';
                    case 3:
                        return '仅展示不跳转';
                }
            }
        }
    }

</script>
<style lang="scss">
    .figure-img {
        cursor: pointer;
    }

    .avatar-uploader {
        width: 220px;
        height: 250px;

        .el-upload--text {
            width: 100%;
        }

        .el-upload-dragger {
            width: 100%;
            height: 100%;
        }

        .el-upload {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .el-up-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        padding-top: 30px;
        color: #ffffff;

        i {
            color: #ffffff;
            font-size: 24px;
        }
    }

    .plugins-tips {
        background: #eef1f6
    }

    .startFigure {
        .el-dialog {
            min-width: 600px;
        }
    }

    .tab-imgContent {
        display: block;
        width: 100%;
        height: 80px;
        margin-bottom: 10px;
        background: #eef1f6;

        &>img {
            width: 100%;
            height: 100%;
        }

        .left {
            display: block;
            width: 80px;
            height: 80px;
            float: left;

            img {
                width: 80px;
                height: 80px;
            }
        }

        .right {
            float: right;
            width: calc(100% - 90px);
            height: 80px;

            p {
                &:first-child {
                    font-size: 18px;
                    color: #333333;
                    height: 40px;
                    text-align: left;
                    cursor: default;
                }

                &:last-child {
                    font-size: 14px;
                    color: #666666;
                    height: 40px;
                    text-align: left;
                    letter-spacing: -0.32px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: default;
                }



            }
        }
    }

    .left_imgContent {
        margin-bottom: 10px;
    }

</style>

<style lang="scss" scoped>
    .editor-btn {
        margin-top: 20px;
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

    .figure-title {
        &:before {
            content: "";
            width: 4px;
            height: 16px;
            background: #409EFF;
            display: inline-block;
            top: -1px;
            position: relative;
            margin-right: 5px;
            vertical-align: middle;
        }
    }

    .formImg {
        width: 120px;
        height: 180px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .startFigure {
        background: #ffffff;
    }

    .figure-item {
        width: 400px;
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        margin-top: 28px;
        margin-right: 30px;
        border: 1px solid #e6e6e6;
        background: #ffffff;

        .figure-item-header {
            padding: 0 10px;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #e6e6e6;

            span.left {
                font-size: 20px;
                font-weight: normal;
                float: left;

            }

            span.right {
                font-size: 14px;
                font-weight: normal;
                float: right;
                cursor: pointer;
                color: #409EFF;

                a {
                    cursor: pointer;
                    opacity: 0.8;
                    transition: all 0.5s;
                }

                a:hover {
                    opacity: 1.0;
                    transition: all 0.5s;
                }
            }
        }

        .figure-detail {
            padding: 10px 10px;

            .el-form-item {
                span {
                    padding-left: 15px;
                    display: inline-block;
                    font-size: 14px;
                    width: 80%;
                    line-height: 30px;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap;
                }
            }

            .figure-img {
                width: 375px;
                height: 640px;
                margin: 0 auto;
                border-radius: 6px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .figure-upload {
                height: 640px;
                width: 375px;
                margin: 0 auto;
                border-radius: 6px;
                position: relative;

                &:hover {
                    .upload-demo {
                        display: block;
                    }
                }
            }

            .upload-trigger {
                width: 100%;
                height: 100%;
                position: absolute;
                padding-top: 30%;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                top: 0;
                left: 0;
                display: block;
                background: rgba(0, 0, 0, 0.4);
            }
        }

        .line {
            text-align: center;
        }
    }

</style>
