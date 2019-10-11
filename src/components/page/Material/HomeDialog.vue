<!--首页弹窗管理-->
<template>
    <div class="homeDialog-view">
        <transition name="el-zoom-in-bottom">
            <div>
                <el-tabs type="border-card" @tab-click="checkDeviceType">
                    <el-tab-pane label="全部" name="0">
                        <div class="plugins-tips">
                            为保障用户体验，首页弹窗图统一为PNG、jpg、gif格式，建议尺寸560*760，大小不超过1M。
                            <div class="add-btn" @click="addPopupDialogOpen">
                                <i class="el-icon-lx-roundadd"></i>新增首页弹窗
                            </div>
                        </div>
                        <template>
                            <el-tabs class="second-tabs" tab-position="top" style="" v-model="allactiveName"
                                @tab-click="checkAllStatus">
                                <el-tab-pane v-for="item in userStatusList" :label="item.desc" :name="item.code"
                                    :key="item.code">
                                    <div>
                                        <div class="figure-title">首页弹窗/全部-{{item.desc}}</div>
                                    </div>
                                    <el-table v-loading="loading" :data="allDialogList.list" border style="width: 100%">
                                        <el-table-column type="index" label="弹窗">
                                        </el-table-column>
                                        <el-table-column prop="userstatusname" label="用户状态">
                                        </el-table-column>
                                        <el-table-column prop="frequencyname" label="弹窗频率">
                                        </el-table-column>
                                        <el-table-column prop="starttime" width="300" label="生效时间"
                                            :formatter="formatDate">
                                        </el-table-column>
                                        <el-table-column label="图片内容" width="300">
                                            <template slot-scope="scope">

                                                <div class="tab-imgContent" v-for="(item,index) in scope.row.advertList"
                                                    :key='index'>
                                                    <div class="left">
                                                        <el-popover placement="right" title="" trigger="click">
                                                            <img :src="item.imgurl"
                                                                style="max-width:700px;max-height: 700px" />
                                                            <img slot="reference" :src="item.imgurl" :alt="item.imgurl"
                                                                style="width: 80px;height: 80px">
                                                        </el-popover>
                                                    </div>
                                                    <div class="right">
                                                        <p>{{item.icontext}}</p>
                                                        <el-tooltip :content="item.jumplink" placement="bottom"
                                                            effect="light">
                                                            <p>{{item.jumplink}}</p>
                                                        </el-tooltip>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="status" :formatter="formatStatus" label="状态">
                                        </el-table-column>
                                        <el-table-column prop="updatetime" label="最近修改时间">
                                        </el-table-column>
                                        <el-table-column prop="username" label="最后修改人">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="220">
                                            <template slot-scope="scope">
                                                <el-button @click="editHomeDialog(scope.$index, scope.row)"
                                                    type="primary" size="mini">编辑</el-button>
                                                <el-button size="mini" type="warning"
                                                    @click="handleStop(scope.$index, scope.row)">
                                                    {{scope.row.status==1?'停用': '启用'}}</el-button>
                                                <el-button @click="deletHomeDialog(scope.$index, scope.row)"
                                                    type="danger" size="mini">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination @size-change="handleSizeChangeAll"
                                        @current-change="handleCurrentChangeAll" :current-page="1"
                                        :page-sizes="[10, 20, 30, 40]" :page-size="10"
                                        layout="total, sizes, prev, pager, next, jumper" :total="allDialogList.total">
                                    </el-pagination>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane name="1" label="Android_弹窗">
                        <div class="plugins-tips">
                            为保障用户体验，首页弹窗图统一为PNG、jpg、gif格式，建议尺寸560*760，大小不超过1M。
                            <div class="add-btn" @click="addPopupDialogOpen">
                                <i class="el-icon-lx-roundadd"></i>新增首页弹窗
                            </div>
                        </div>
                        <template>
                            <el-tabs class="second-tabs" tab-position="top" style="" v-model="andactiveName"
                                @tab-click="checkAndStatus">
                                <el-tab-pane v-for="item in userStatusList" :label="item.desc" :name="item.code"
                                    :key="item.code">
                                    <div>
                                        <div class="figure-title">首页弹窗/Android-{{item.desc}}</div>
                                    </div>
                                    <el-table v-loading="loading" :data="androidDialogList.list" border
                                        style="width: 100%">
                                        <el-table-column type="index" label="弹窗">
                                        </el-table-column>
                                        <el-table-column prop="userstatusname" label="用户状态">
                                        </el-table-column>
                                        <el-table-column prop="frequencyname" label="弹窗频率">
                                        </el-table-column>
                                        <el-table-column prop="starttime" width="300" label="生效时间"
                                            :formatter="formatDate">
                                        </el-table-column>
                                        <el-table-column label="图片内容" width="300">
                                            <template slot-scope="scope">

                                                <div class="tab-imgContent" v-for="(item,index) in scope.row.advertList"
                                                    :key="index">
                                                    <div class="left">
                                                        <el-popover placement="right" title="" trigger="click">
                                                            <img :src="item.imgurl"
                                                                style="max-width:700px;max-height: 700px" />
                                                            <img slot="reference" :src="item.imgurl" :alt="item.imgurl"
                                                                style="width: 80px;height: 80px">
                                                        </el-popover>
                                                    </div>
                                                    <div class="right">
                                                        <p>{{item.icontext}}</p>
                                                        <el-tooltip :content="item.jumplink" placement="bottom"
                                                            effect="light">
                                                            <p>{{item.jumplink}}</p>
                                                        </el-tooltip>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="status" :formatter="formatStatus" label="状态">
                                        </el-table-column>
                                        <el-table-column prop="updatetime" label="最近修改时间">
                                        </el-table-column>
                                        <el-table-column prop="username" label="最后修改人">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="220">
                                            <template slot-scope="scope">
                                                <el-button @click="editHomeDialog(scope.$index, scope.row)"
                                                    type="primary" size="mini">编辑</el-button>
                                                <el-button size="mini" type="warning"
                                                    @click="handleStop(scope.$index, scope.row)">
                                                    {{scope.row.status==1?'停用': '启用'}}</el-button>
                                                <el-button @click="deletHomeDialog(scope.$index, scope.row)"
                                                    type="danger" size="mini">删除</el-button>

                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination @size-change="handleSizeChangeAnd"
                                        @current-change="handleCurrentChangeAnd" :current-page="1"
                                        :page-sizes="[10, 20, 30, 40]" :page-size="10"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="androidDialogList.total">
                                    </el-pagination>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane name="2" label="IOS_弹窗">
                        <div class="plugins-tips">
                            为保障用户体验，首页弹窗图统一为PNG、jpg、gif格式，建议尺寸560*760，大小不超过1M。
                            <div class="add-btn" @click="addPopupDialogOpen">
                                <i class="el-icon-lx-roundadd"></i>新增首页弹窗
                            </div>
                        </div>
                        <el-tabs class="second-tabs" tab-position="top" style="" v-model="iosactiveName"
                            @tab-click="checkIosStatus">
                            <el-tab-pane v-for="item in userStatusList" :label="item.desc" :name="item.code"
                                :key="item.code">
                                <div>
                                    <div class="figure-title">首页弹窗/IOS-{{item.desc}}</div>
                                </div>
                                <el-table v-loading="loading" :data="iosDialogList.list" border stripe
                                    style="width: 100%">
                                    <el-table-column type="index" label="弹窗">
                                    </el-table-column>
                                    <el-table-column prop="userstatusname" label="用户状态">
                                    </el-table-column>
                                    <el-table-column prop="frequencyname" label="弹窗频率">
                                    </el-table-column>
                                    <el-table-column prop="starttime" width="300" label="生效时间" :formatter="formatDate">
                                    </el-table-column>
                                    <el-table-column label="图片内容" width="300">
                                        <template slot-scope="scope">

                                            <div class="tab-imgContent" v-for="(item,index) in scope.row.advertList"
                                                :key="index">
                                                <div class="left">
                                                    <el-popover placement="right" title="" trigger="click">
                                                        <img :src="item.imgurl"
                                                            style="max-width:700px;max-height: 700px" />
                                                        <img slot="reference" :src="item.imgurl" :alt="item.imgurl"
                                                            style="width: 80px;height: 80px">
                                                    </el-popover>
                                                </div>

                                                <div class="right">
                                                    <p>{{item.icontext}}</p>
                                                    <el-tooltip :content="item.jumplink" placement="bottom"
                                                        effect="light">
                                                        <p>{{item.jumplink}}</p>
                                                    </el-tooltip>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="status" :formatter="formatStatus" label="状态">
                                    </el-table-column>
                                    <el-table-column prop="updatetime" label="最近修改时间">
                                    </el-table-column>
                                    <el-table-column prop="username" label="最后修改人">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="220">
                                        <template slot-scope="scope">
                                            <el-button @click="editHomeDialog(scope.$index, scope.row)" type="primary"
                                                size="mini">编辑</el-button>
                                            <el-button size="mini" type="warning"
                                                @click="handleStop(scope.$index, scope.row)">
                                                {{scope.row.status==1?'停用': '启用'}}</el-button>
                                            <el-button @click="deletHomeDialog(scope.$index, scope.row)" type="danger"
                                                size="mini">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination @size-change="handleSizeChangeIos"
                                    @current-change="handleCurrentChangeIos" :current-page="1"
                                    :page-sizes="[10, 20, 30, 40]" :page-size="10"
                                    layout="total, sizes, prev, pager, next, jumper" :total="iosDialogList.total">
                                </el-pagination>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="弹窗素材管理">
                        <div class="plugins-tips">
                            为保障用户体验，首页弹窗图统一为PNG、jpg、gif格式，建议尺寸560*760，大小不超过1M。
                            <div class="add-btn" @click="addMaterialList">
                                <i class="el-icon-lx-roundadd"></i>新增首页弹窗素材
                            </div>
                        </div>
                        <div>
                            <div class="figure-title">首页弹窗素材</div>
                        </div>
                        <el-table v-loading="loading" :data="dialogMaterialList.list" border style="width: 100%">
                            <el-table-column type="index" label="序号">
                            </el-table-column>
                            <el-table-column prop="icontext" label="素材名称">
                            </el-table-column>
                            <el-table-column label="图片预览" width="100">
                                <template slot-scope="scope">
                                    <div class="tab-imgContent">
                                        <el-popover placement="right" title="" trigger="click">
                                            <img :src="scope.row.imgurl" style="max-width:700px;max-height: 700px" />
                                            <img slot="reference" :src="scope.row.imgurl" :alt="scope.row.imgurl"
                                                style="width: 80px;height: 80px">
                                        </el-popover>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="jumplink" label="跳转链接">
                            </el-table-column>
                            <el-table-column prop="junmtype" label="打开方式" :formatter="filterJumptype"></el-table-column>
                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button @click="editMaterial(scope.row)" type="primary" size="mini">编辑
                                    </el-button>
                                    <el-button @click="deletDetail(scope.row)" type="warning" size="mini">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper" :total="dialogMaterialList.total">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </transition>
        <el-dialog :title="addPopText" width="40%" center :visible.sync="addPopupDialog" @closed="closePopupDialog">
            <el-form :model="addPopupForm" :rules="addPopupFormRules" ref="addPopupForm" label-width="100px"
                size="mini">
                <el-form-item label="平台分类" prop="devicetype">
                    <el-select v-model="addPopupForm.devicetype" autocomplete="off" placeholder="选择投放平台">
                        <el-option v-for="item in optionDeviceType" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" prop="userstatus">
                    <el-select v-model="addPopupForm.userstatus" autocomplete="off" placeholder="选择用户状态">
                        <el-option v-for="item in userStatusList" :key="Number(item.code)" :label="item.desc"
                            :value="Number(item.code)">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="弹窗频率" prop="frequency">
                    <el-select v-model="addPopupForm.frequency" autocomplete="off" placeholder="选择提示频率">
                        <el-option v-for="item in optionFrequency" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="starttime">
                    <el-date-picker v-model="addPopupForm.starttime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endtime">
                    <el-date-picker v-model="addPopupForm.endtime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="配置图片内容" :label-width="'100px'">
                </el-form-item>
                <el-form-item labelWidth="0px">
                    <el-row v-for="(key,index) in addPopupForm.advertList" :key="index" :gutter="20"
                        class="dialog-advertItem">
                        <el-col :span="18" class="dialog-advertItem-left">
                            <el-col :span="8">
                                <el-select size="mini" v-model="key.advertid" filterable @change="changeMertial">
                                    <el-option v-for="item in dialogMaterialListAll.list" :key="item.advertid"
                                        :label="item.icontext" :value="item.advertid">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="dialog-advertItem-img">
                                <img :src="getAdvertImgurl(key.advertid)" />
                            </el-col>
                            <el-col :span="10">
                                <el-input size="mini" :value="getAdvertJumplink(key.advertid)" readonly>

                                </el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" v-if="index==addPopupForm.advertList.length-1" icon="el-icon-plus"
                                circle @click="addMaterialItem"></el-button>
                            <el-button type="danger" v-if="addPopupForm.advertList.length>1"
                                @click="removeMaterialItem(index)" icon="el-icon-minus" circle></el-button>
                            <el-button v-if="index>0 && addPopupForm.advertList.length>1" @click="upMaterialItem(index)"
                                type="warning" icon="el-icon-upload2" circle></el-button>
                            <el-button
                                v-if="addPopupForm.advertList.length>1 && index!=addPopupForm.advertList.length-1"
                                @click="downMaterialItem(index)" type="warning" icon="el-icon-download" circle>
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addPopupDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureSavePopup('addPopupForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="addMaterialText" width="40%" center :visible.sync="addMaterialListDialog"
            @closed="closeDialog">
            <div class="dialog-tips"><i class="el-icon-info"></i> 为保障用户体验，素材图统一为PNG、jpg、gif格式，大小不超过1M。</div>
            <el-form :model="addMaterialForm" :rules="addMaterialRules" ref="addMaterialForm" label-width="100px"
                size="mini">
                <el-form-item label="素材名称" prop="icontext">
                    <el-input v-model="addMaterialForm.icontext" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="打开方式" prop="jumptype">
                    <el-select v-model="addMaterialForm.jumptype" placeholder="请选择打开方式">
                        <el-option v-for="item in optionsOpen" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转链接" v-if="addMaterialForm.jumptype==1 || addMaterialForm.jumptype == 2">
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
        name: 'StartFigure',
        data: function () {
            const changeAdvertList = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请至少配置一条素材'));
                } else {
                    for (let i = 0; i < value.length; i++) {
                        if (!value[i].advertid) {
                            callback(new Error('请填写完整素材信息'));
                            break;
                        }
                    }
                }
            };
            const changeValidateStart = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入开始时间'));
                } else {
                    if (this.addPopupForm.endtime !== '') {
                        this.$refs.addPopupForm.validateField('endtime');
                    }
                    callback();
                }
            };
            const changeValidateEnd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入结束时间'));
                } else if (value < this.addPopupForm.starttime) {
                    callback(new Error('结束时间不能小于开始时间!'));
                } else {
                    callback();
                }
            };
            return {
                addPopText: '',
                addMaterialText: '',
                allactiveName: '1',
                andactiveName: '1',
                iosactiveName: '1',
                allDialogListParams: {
                    pageSize: 10,
                    pageNum: 1
                },
                andDialogListParams: {
                    pageSize: 10,
                    pageNum: 1
                },
                iosDialogListParams: {
                    pageSize: 10,
                    pageNum: 1
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
                        message: '请输入素材名称'
                    }],
                    jumptype: [{
                        required: true,
                        message: '请选择打开方式'
                    }]

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
                    jumptype: [{
                        required: true,
                        message: '请选择跳转方式',
                        trigger: 'change'
                    }, ],
                    frequency: [{
                        required: true,
                        message: '请选择弹窗频率',
                        trigger: 'change'
                    }, ],
                    userstatus: [{
                        required: true,
                        message: '请选择用户状态',
                        trigger: 'change'
                    }, ],
                    devicetype: [{
                        required: true,
                        message: '选择投放平台',
                        trigger: 'change'
                    }, ],
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
                checkedType: ''

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
            //弹窗素材
            dialogMaterialList: function () {
                console.log("1112333333333");
                console.log(this.$store.state.dialogMaterialList.list);
                return this.$store.state.dialogMaterialList;
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
                return this.$store.state.dialogMaterialListAll;
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
                    let list = this.$store.state.dialogMaterialListAll.list;
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
            init() {
                this.getDialogList('1', 1);
                this.getDialogList('2', 1);
                this.getDialogList('0', 1);
                this.$store.dispatch('changeGetUserStatusList');
                this.$store.dispatch('changeDialogMaterialList', this.defaultParams);
            },
            formatJumptype(row, column) {
                for (let i = 0; i < this.optionsOpen.length; i++) {
                    if (row.jumptype == this.optionsOpen[i].value) {
                        return this.optionsOpen[i].label
                    }
                }
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
            formatStatus: function (row, column) {
                return row.status == 0 ? '已停用' : '已启用';
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
            handleSizeChangeAll(val) {
                this.allDialogListParams.pageSize = val;
                this.getDialogList('0', this.allactiveName);
            },
            handleCurrentChangeAll(val) {
                this.allDialogListParams.pageNum = val;
                this.getDialogList('0', this.allactiveName);
            },
            handleSizeChangeAnd(val) {
                this.andDialogListParams.pageSize = val;
                this.getDialogList('1', this.andactiveName);
            },
            handleCurrentChangeAnd(val) {
                this.andDialogListParams.pageNum = val;
                this.getDialogList('1', this.andactiveName);
            },
            handleSizeChangeIos(val) {
                this.iosDialogListParams.pageSize = val;
                this.getDialogList('2', this.iosactiveName);
            },
            handleCurrentChangeIos(val) {
                this.iosDialogListParams.pageNum = val;
                this.getDialogList('2', this.iosactiveName);
            },
            handleSizeChange(val) {
                this.defaultParams.pageSize = val;
                this.$store.dispatch('changeDialogMaterialList', this.defaultParams);
            },
            handleCurrentChange(val) {
                this.defaultParams.pageNum = val;
                this.$store.dispatch('changeDialogMaterialList', this.defaultParams);
            },
            //打开停用用户对话
            handleStop(index, row) {
                let text = row.status == 1 ? '停用' : '启用';
                this.$confirm('此操作将' + text + '首页弹窗' + row.icontext + '，是否继续?', '提示', {
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
            getDialogList(deviceType, userStatus) {
                let params = {
                    positionId: 1021001,
                    deviceType: deviceType,
                    userStatus: userStatus || '1',
                    pageSize: 10,
                    pageNum: 1
                };
                if (deviceType == 0) {
                    params.pageSize = this.allDialogListParams.pageSize;
                    params.pageNum = this.allDialogListParams.pageNum;
                } else if (deviceType == 1) {
                    params.pageSize = this.andDialogListParams.pageSize;
                    params.pageNum = this.andDialogListParams.pageNum;
                } else if (deviceType == 2) {
                    params.pageSize = this.iosDialogListParams.pageSize;
                    params.pageNum = this.iosDialogListParams.pageNum;
                }
                this.Api.maGetBannerList(params).then((res) => {
                    if (res.data.code == 200) {
                        if (deviceType == 1) {
                            this.androidDialogList = res.data.data;
                            console.log(res.data.data.list);
                            this.loading = false;
                        } else if (deviceType == 2) {
                            this.loading = false;
                            this.iosDialogList = res.data.data;
                        } else {
                            this.loading = false;
                            this.allDialogList = res.data.data;
                        }
                    } else {
                        this.loading = false;
                        this.$message.error(res.data.msg);
                    }
                })
            },
            addPopupDialogOpen() {
                this.addPopText = '添加首页弹窗';
                this.addPopupDialog = true;
            },
            //打开添加首页弹窗素材
            addMaterialList(item) {
                this.addMaterialListDialog = true;
                this.addMaterialText = '添加首页弹窗素材'
            },
            //打开编辑首页弹窗素材
            editMaterial(item) {
                this.addMaterialListDialog = true;
                this.addMaterialText = '编辑首页弹窗素材';
                this.addMaterialForm = JSON.parse(JSON.stringify(item));
            },
            //删除素材
            deletDetail(item) {
                this.$confirm('此操作将删除素材 "' + item.icontext + '"， 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.Api.maDelMaterial({
                        advertId: item.advertid
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$store.dispatch('changeDialogMaterialList', this.defaultParams);
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
            //确认保存素材信息
            sureSaveMaterial(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            icontext: this.addMaterialForm.icontext,
                            jumptype: this.addMaterialForm.jumptype,
                            jumplink: this.addMaterialForm.jumplink,
                            fileid: this.addMaterialForm.fileid,
                            materialtype: '3'
                        };
                        if (this.addMaterialForm.advertid) {
                            params.advertid = this.addMaterialForm.advertid;
                        }
                        this.Api.maSaveMaterial(params).then((res) => {
                            if (res.data.code == 200) {

                                this.$message.success('保存成功');
                                this.$store.dispatch('changeDialogMaterialList', this.defaultParams);
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
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let material = [];
                        for (let i = 0; i < this.addPopupForm.advertList.length; i++) {
                            if (!this.addPopupForm.advertList[i].advertid) {
                                this.$message.error('请选择素材！');
                                return;
                            } else {
                                material = material.concat({
                                    advertid: this.addPopupForm.advertList[i].advertid,
                                    priority: i + 1
                                })
                            }
                        }
                        let params = {
                            oldIds: this.addPopupForm.oldIds || '',
                            positionid: '1021001',
                            devicetype: this.addPopupForm.devicetype,
                            userstatus: this.addPopupForm.userstatus,
                            starttime: start,
                            endtime: end,
                            // materialInfoStr: JSON.stringify(material),
                            materialInfoStr: JSON.stringify(JSON.stringify(material)),
                            frequency: this.addPopupForm.frequency,
                            detailid: this.addPopupForm.detailid || ''
                        };
                        console.log(params);
                        if (this.addMaterialForm.advertid) {
                            params.advertid = this.addMaterialForm.advertid;
                        }
                        this.Api.maSaveBannerAndIcon(params).then((res) => {
                            if (res.data.code == 200) {
                                if (this.addPopupForm.devicetype != this.checkedType) {
                                    //如果更改为其他设备，
                                    this.getDialogList(this.checkedType, this.allactiveName);
                                }
                                switch (this.addPopupForm.devicetype) {
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
                this.allactiveName = tab.name;
                this.getDialogList('0', tab.name);
            },
            //安卓 选择用户状态
            checkAndStatus: function (tab) {
                this.andactiveName = tab.name;
                this.getDialogList('1', tab.name);
            },
            //ios 选择用户状态
            checkIosStatus: function (tab) {
                this.iosactiveName = tab.name;
                this.getDialogList('2', tab.name);
            },
            //选择设备
            checkDeviceType: function (tab) {
                this.checkedType = tab.name;
            },
            //编辑首页弹窗
            editHomeDialog: function (index, row) {
                console.log("===>row");
                console.log(row);
                this.addPopText = '编辑首页弹窗';
                this.addPopupForm = JSON.parse(JSON.stringify(row));
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
                        detailId: row.detailid
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

    .homeDialog-view {
        .el-dialog {
            min-width: 600px;
        }

        .el-tabs__active-bar {
            display: none;
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
    .el-tabs__active-bar {
        display: none;
    }

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
