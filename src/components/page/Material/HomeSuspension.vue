<!--首页悬浮窗管理-->

<template>
    <div class="supension-view">
        <transition name="el-zoom-in-bottom">
            <div class="card-div">
                <div class="plugins-tips">
                    为保障用户体验，首页弹窗图统一为PNG、jpg、gif格式，建议尺寸560*760，大小不超过1M。
                </div>
                <template>
                    <div>
                        <div class="figure-title">Android_悬浮窗</div>
                    </div>
                    <el-table v-loading="loading" :data="allDialogList" border stripe style="width: 100%">
                        <el-table-column prop="icontext" label="文件名称" width="120">
                        </el-table-column>
                        <el-table-column prop="jumplink" label="跳转链接" width="280">
                        </el-table-column>
                        <el-table-column prop="starttime" width="300" label="生效时间" :formatter="formatDate">
                        </el-table-column>
                        <el-table-column label="图片预览" width="100" prop="imgurl">
                            <template slot-scope="scope">
                                <div class="left_imgContent">
                                    <el-popover placement="right" title="" trigger="click">
                                        <img :src="scope.row.imgurl" style="max-width:700px;max-height: 700px" />
                                        <img slot="reference" :src="scope.row.imgurl" :alt="scope.row.imgurl"
                                            style="width: 80px;height: 80px">
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" :formatter="formatStatus" label="状态">
                        </el-table-column>
                        <el-table-column prop="updatetime" width="160" label="最近修改时间">
                        </el-table-column>
                        <el-table-column prop="username" label="最后修改人">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button @click="editMaterial(scope.$index, scope.row)" type="primary" size="mini">编辑
                                </el-button>
                                <el-button size="mini" type="warning" @click="handleStop(scope.$index, scope.row)">
                                    {{scope.row.status==1?'停用': '启用'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template>
                    <div style="margin-top: 20px;">
                        <div class="figure-title">IOS_悬浮窗</div>
                    </div>
                    <el-table v-loading="loading" :data="iosDialogList" border stripe style="width: 100%">
                        <el-table-column prop="icontext" label="文件名称" width="120">
                        </el-table-column>
                        <el-table-column prop="jumplink" label="跳转链接" width="280">
                        </el-table-column>
                        <el-table-column prop="starttime" width="300" label="生效时间" :formatter="formatDate">
                        </el-table-column>
                        <el-table-column label="图片预览" width="100" prop="imgurl">
                            <template slot-scope="scope">
                                <div class="left_imgContent">
                                    <el-popover placement="right" title="" trigger="click">
                                        <img :src="scope.row.imgurl" style="max-width:700px;max-height: 700px" />
                                        <img slot="reference" :src="scope.row.imgurl" :alt="scope.row.imgurl"
                                            style="width: 80px;height: 80px">
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" :formatter="formatStatus" label="状态">
                        </el-table-column>
                        <el-table-column prop="updatetime" width="160" label="最近修改时间">
                        </el-table-column>
                        <el-table-column prop="username" label="最后修改人">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button @click="editMaterial(scope.$index, scope.row)" type="primary" size="mini">编辑
                                </el-button>
                                <el-button size="mini" type="warning" @click="handleStop(scope.$index, scope.row)">
                                    {{scope.row.status==1?'停用': '启用'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </transition>
        <el-dialog title="编辑悬浮窗" width="40%" center :visible.sync="addMaterialListDialog" @closed="closeDialog">
            <div class="dialog-tips"><i class="el-icon-info"></i> 为保障用户体验，悬浮窗图片统一为PNG、jpg、gif格式，大小不超过1M。</div>
            <el-form :model="addMaterialForm" :rules="addMaterialRules" ref="addMaterialForm" label-width="100px"
                size="mini">
                <el-form-item label="文件名称" prop="icontext">
                    <el-input v-model="addMaterialForm.icontext" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="打开方式" prop="jumptype">
                    <el-select v-model="addMaterialForm.jumptype" placeholder="请选择打开方式">
                        <el-option v-for="item in optionsOpen" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="starttime">
                    <el-date-picker v-model="addMaterialForm.starttime" value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endtime">
                    <el-date-picker v-model="addMaterialForm.endtime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="跳转链接" prop="jumplink"
                    v-if="addMaterialForm.jumptype==1 || addMaterialForm.jumptype == 2">
                    <el-input v-model="addMaterialForm.jumplink" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-upload class="avatar-uploader" :action="actionUrl" :drag="canDrag" :disabled="loaded"
                        :with-credentials="actionWidth" :show-file-list="false" :on-progress='handleUploading'
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="addMaterialForm.imgurl" :src="addMaterialForm.imgurl || ''" class="avatar">
                        <i class="el-icon-upload"></i>
                        <div v-if="loaded" class="el-up-loading"><i class="el-icon-loading"></i><br />拼命上传中</div>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMaterialListDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureSaveMaterial('addMaterialForm')">确 定</el-button>
            </div>
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
        name: 'HomeSuspension',
        data: function () {

            const changeValidateStart = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入开始时间'));
                } else {
                    if (this.addMaterialForm.endtime !== '') {
                        this.$refs.addMaterialForm.validateField('endtime');
                    }
                    callback();
                }
            };
            const changeValidateEnd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入结束时间'));
                } else if (value < this.addMaterialForm.starttime) {
                    callback(new Error('结束时间不能小于开始时间!'));
                } else {
                    callback();
                }
            };
            return {
                BannerTypeList: [],
                allactiveName: '1001001',
                userStatus: '',
                allDialogListParams: {
                    pageSize: 10,
                    pageNum: 1
                },
                andDialogListParams: {
                    pageSize: 1,
                    pageNum: 10
                },
                iosDialogListParams: {
                    pageSize: 1,
                    pageNum: 10
                },
                actionWidth: true,
                bigImgUrlDialog: false,
                canDrag: true,
                imgPercent: 0,
                loaded: false,
                loading: true,
                bigImgUrl: '',
                content: '',
                addMaterialRules: {
                    icontext: [{
                        required: true,
                        message: '请输入文件名称'
                    }],
                    jumptype: [{
                        required: true,
                        message: '请选择打开方式'
                    }],
                    jumplink: [{
                        required: true,
                        message: '请填写跳转链接'
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

                    ]

                },
                pictureLimit: 1,
                canEdit: false,
                imageUrl: '',
                androidDialogList: [],
                iosDialogList: [],
                allDialogList: [],
                materialList: [],
                addMaterialListDialog: false,
                addMaterialForm: {
                    advertid: '',
                    icontext: '',
                    jumptype: '',
                    jumplink: '',
                    fileid: '',
                    imgurl: ''
                },
                defaultParams: {
                    pageSize: 10,
                    pageNum: 1
                },
                addPopupDialog: false,
                addPopupForm: {
                    oldIds: '',
                    positionid: '',
                    userstatus: '',
                    starttime: '',
                    devicetype: '',
                    endtime: '',
                    advertid: '',
                    priority: '',
                    frequency: '',
                    advertList: [{
                        advertid: '',
                        jumplink: '',
                        imgurl: ''
                    }]
                },
                addPopupFormRules: {
                    icontext: [{
                        required: true,
                        message: '请填写文件名称',
                        trigger: 'blur'
                    }],
                    jumptype: [{
                        required: true,
                        message: '请选择跳转方式',
                        trigger: 'change'
                    }, ],
                    userstatus: [{
                        required: true,
                        message: '请选择用户状态',
                        trigger: 'change'
                    }, ],
                    positionid: [{
                        required: true,
                        message: '选择banner位置',
                        trigger: 'change'
                    }, ]
                }


            }
        },
        components: {
            quillEditor
        },
        computed: {
            //用户状态
            userStatusList: function () {
                console.log(this.$store.state.userStatusList);
                return this.$store.state.userStatusList;
            },
            //banner素材
            dialogMaterialList: function () {
                console.log("1112333333333");
                console.log(this.$store.state.bannerMaterialList.list);
                return this.$store.state.bannerMaterialList;
            },
            optionsOpen: function () {
                return this.$store.state.optionsOpen;
            },
            optionDeviceType: function () {
                return this.$store.state.optionDeviceType;
            },
            optionDefault: function () {
                return this.$store.state.optionDefault;
            },
            actionUrl: function () {
                return this.$store.state.actionUrl;
            },
            optionFrequency: function () {
                return this.$store.state.optionFrequency;
            },
            dialogMaterialListAll: function () {
                return this.$store.state.bannerMaterialListAll;
            },
            getAdvertImgurl: function () {
                return function (id) {
                    let list = this.$store.state.dialogMaterialListAll.list;
                    if (list) {
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].advertid == id) {
                                return list[i].imgurl;
                            }
                        }
                    }
                }
            },
            getAdvertJumplink() {
                return function (id) {
                    let list = this.$store.state.bannerMaterialListAll.list;
                    if (list) {
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].advertid == id) {
                                return list[i].jumplink;
                            }
                        }
                    }

                }
            }
        },
        methods: {
            //打开停用用户对话
            handleStop(index, row) {
                let text = row.status == 1 ? '停用' : '启用';
                this.$confirm('此操作将' + text + '悬浮窗 "' + row.icontext + '，" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.Api.maUpdateStatus({
                        oldIds: row.relid,
                        status: row.status == 1 ? '0' : '1',
                        detailid: row.detailid || ''
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: text + '成功!'
                            });
                            this.getDialogList(row.devicetype);

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
            formatStatus: function (row, column) {
                return row.status == 0 ? '已停用' : '已启用';
            },
            init() {
                this.getDialogList('1');
                this.getDialogList('2');
                this.getBannerTypeList();
                this.$store.dispatch('changeGetUserStatusList');
            },
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
            filterPosition(row, column) {
                for (let i = 0; i < this.BannerTypeList.length; i++) {
                    console.log(this.BannerTypeList)
                    if (row.positionid == this.BannerTypeList[i].positionId) {
                        return this.BannerTypeList[i].desc;
                    } else {
                        return '无'
                    }
                }
            },
            //获取所有bannerType;
            getBannerTypeList() {
                this.Api.maGetAllBannerTypeList({}).then((res) => {
                    if (res.data.code == 200) {
                        this.BannerTypeList = res.data.data;
                    }
                })
            },
            formatJumptype(row, column) {
                for (let i = 0; i < this.optionsOpen.length; i++) {
                    if (row.jumptype == this.optionsOpen[i].value) {
                        return this.optionsOpen[i].label
                    }
                }
            },
            //表格时间显示
            formatDate(row, column) {
                return row.starttime + ' 至 ' + row.endtime
            },
            onEditorChange({
                editor,
                html,
                text
            }) {
                this.content = html;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeDialog() {
                this.resetForm('addMaterialForm');
                Object.keys(this.addMaterialForm).forEach((key) => {
                    if (key == 'dateTime') {
                        this.addMaterialForm.dateTime = [];
                    } else {
                        this.addMaterialForm[key] = '';
                        this.imageUrl = "";
                    }
                });
            },
            closePopupDialog() {
                this.resetForm('addPopupForm');
                Object.keys(this.addPopupForm).forEach((key) => {
                    if (key == 'dateTime') {
                        this.addPopupForm.dateTime = [];
                    } else if (key == 'advertList') {
                        this.addPopupForm.advertList = [{
                            advertid: '',
                            jumplink: '',
                            imgurl: ''
                        }]
                    } else {
                        this.addPopupForm[key] = '';
                    }
                });
                console.log(this.addPopupForm);
            },
            handleSizeChange(val) {
                this.defaultParams.pageSize = val;
                this.$store.dispatch('changeBannerMaterialList', this.defaultParams);
            },
            handleCurrentChange(val) {
                this.defaultParams.pageNum = val;
                this.$store.dispatch('changeBannerMaterialList', this.defaultParams);
            },
            // getDialogList(bannerType){
            //     let params = {
            //         positionId: bannerType,
            //         pageSize: this.allDialogListParams.pageSize || 10,
            //         pageNum: this.allDialogListParams.pageNum || 1
            //     };
            //
            //     this.Api.maGetBannerList(params).then((res)=>{
            //         if(res.data.code == 200){
            //             this.loading= false;
            //             this.allDialogList = res.data.data;
            //         }else{
            //             this.loading= false;
            //             this.$message.error(res.data.msg);
            //         }
            //     }) n
            // },
            getDialogList(deviceType) {
                this.Api.maAdverList({
                    positionId: '1001003',
                    deviceType: deviceType,
                    pageSize: 10,
                    pageNum: 1
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.loading = false;
                        if (deviceType == 1) {
                            this.allDialogList = res.data.data;
                        } else {
                            this.iosDialogList = res.data.data;
                        }
                    } else {
                        this.loading = false;
                        this.$message.error(res.data.msg);
                    }
                })
            },
            addPopupDialogOpen() {
                this.addPopupDialog = true;
            },
            //打开添加首页弹窗素材
            addMaterialList(item) {
                this.addMaterialListDialog = true;
            },
            //打开编辑首页弹窗素材
            editMaterial(index, row) {
                this.addMaterialListDialog = true;
                this.addMaterialForm = JSON.parse(JSON.stringify(row));
            },
            //删除素材
            deletDetail(item) {
                this.$confirm('此操作将删除素材 "' + item.filename + '，" 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.Api.maDelAdvert({
                        advertId: item.advertid,
                        detailId: item.detailid
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$store.dispatch('changeBannerMaterialList', this.defaultParams);
                        } else {
                            this.$message.error(res.data.msg);

                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //确认保存悬浮窗
            sureSaveMaterial(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let start = String(new Date(this.addMaterialForm.starttime));
                        let end = String(new Date(this.addMaterialForm.endtime));
                        let params = {
                            positionid: 1001003,
                            icontext: this.addMaterialForm.icontext,
                            devicetype: this.addMaterialForm.devicetype,
                            jumptype: this.addMaterialForm.jumptype,
                            jumplink: this.addMaterialForm.jumplink,
                            fileid: this.addMaterialForm.fileid,
                            relid: this.addMaterialForm.relid,
                            detailid: this.addMaterialForm.detailid || '',
                            starttime: start,
                            endtime: end,
                        };
                        if (this.addMaterialForm.advertid) {
                            params.advertid = this.addMaterialForm.advertid;
                        }
                        this.Api.maSaveAdvert(params).then((res) => {
                            if (res.data.code == 200) {

                                this.$message.success('保存成功');
                                this.getDialogList(this.addMaterialForm.devicetype);
                                this.addMaterialListDialog = false;
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                this.$message.success('上传成功');
                this.imageUrl = URL.createObjectURL(file.raw);
                let img = new Image();
                img.src = this.imageUrl;
                img.onload = () => {
                    this.addMaterialForm.imgmeasure = img.width + '*' + img.height;
                    this.addMaterialForm.imgsize = (file.size / 1024).toFixed(2) + 'KB';
                    this.addMaterialForm.imgurl = this.imageUrl;
                    this.addMaterialForm.fileid = res.data.id;
                    console.log(this.addMaterialForm.fileid);
                };
                this.loaded = false;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error('上传启动图只能是PNG 格式!');
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
            //素材选择
            changeMertial(val) {
                console.log(val);
            },
            //添加素材
            addMaterialItem() {
                if (this.addPopupForm.advertList && this.addPopupForm.advertList.length == 4) {
                    this.$message.error("最多添加4张素材")
                } else {
                    this.addPopupForm.advertList.push({
                        advertid: '',
                        jumplink: '',
                        imgurl: ''
                    })
                }

            },
            //删除素材
            removeMaterialItem(index) {
                for (let i = 0; i < this.addPopupForm.advertList.length; i++) {
                    if (i == index) {
                        this.addPopupForm.advertList.splice(index, 1);
                    }
                }
            },
            //上移素材
            upMaterialItem(index) {
                console.log("index", index);

                let tempOption = this.addPopupForm.advertList[index - 1];
                this.$set(this.addPopupForm.advertList, index - 1, this.addPopupForm.advertList[index]);
                this.$set(this.addPopupForm.advertList, index, tempOption);

            },
            //下移素材
            downMaterialItem(index) {
                let tempOption = this.addPopupForm.advertList[index + 1];
                this.$set(this.addPopupForm.advertList, index + 1, this.addPopupForm.advertList[index]);
                this.$set(this.addPopupForm.advertList, index, tempOption);
            },
            //保存弹窗
            sureSavePopup: function (formName) {
                let start = String(new Date(this.addPopupForm.starttime));
                let end = String(new Date(this.addPopupForm.endtime));
                let material = [];
                for (let i = 0; i < this.addPopupForm.advertList.length; i++) {
                    material = material.concat({
                        advertid: this.addPopupForm.advertList[i].advertid,
                        priority: i + 1
                    })
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            oldIds: this.addPopupForm.oldIds || '',
                            positionid: this.addPopupForm.positionid,
                            userstatus: this.addPopupForm.userstatus,
                            starttime: start,
                            endtime: end,
                            // materialInfoStr: JSON.stringify(material),
                            materialInfoStr: JSON.stringify(JSON.stringify(material)),
                            detailid: this.addPopupForm.detailid || ''
                        };
                        console.log(params);
                        if (this.addMaterialForm.advertid) {
                            params.advertid = this.addMaterialForm.advertid;
                        }
                        this.Api.maSaveBannerAndIcon(params).then((res) => {
                            if (res.data.code == 200) {

                                this.getDialogList(this.addPopupForm.devicetype);
                                this.$message.success('保存成功');
                                this.addPopupDialog = false;
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //全部 选择用户状态
            checkAllStatus: function (tab) {
                console.log(tab.name);
                this.getDialogList(tab.name, this.userStatus);
            },
            //编辑首页弹窗
            editHomeDialog: function (index, row) {
                console.log("===>row");
                console.log(row);
                this.addPopupForm = Object.assign(this.addPopupForm, row);
                this.addPopupDialog = true;
            },
            //删除首页弹窗
            deletHomeDialog: function (index, row) {
                this.$confirm('此操作将永久删除弹窗 ，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    center: true
                }).then(() => {
                    this.Api.maDelBannerAndIcon({
                        oldIds: row.oldIds,
                        detailId: item.detailid
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            switch (row.devicetype) {
                                case 0:
                                    this.getDialogList('0', this.allactiveName);
                                    break;
                                case 1:
                                    this.getDialogList('1', this.andactiveName);
                                    break;
                                case 2:
                                    this.getDialogList('2', this.iosactiveName);
                                    break;
                            }
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        created() {
            this.init();
        },
        mounted() {

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
        margin-bottom: 20px;

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

    .el-pagination {
        text-align: right;
        margin-top: 20px;
    }

    .figure-item {
        width: 400px;
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        margin-top: 28px;
        margin-right: 30px;
        border: 1px solid #e6e6e6;

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
