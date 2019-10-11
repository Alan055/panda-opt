import {apiUrl} from "../../base/env"
import {axios, apiVerify } from '../../base/axiosConfig'

/**====》
    素材管理相关接口
/**====》


 * //获取启动图、首页弹窗、首页悬浮窗
 * @param data
 * @returns {AxiosPromise}
 */
const maAdverList = (data) => {
    return axios.post(`${apiUrl}/opt/advert/getAdvertList`, data)
};


/**
 * //获取启动图、首页弹窗、首页悬浮窗列表
 * @param data
 * @returns {AxiosPromise}
 */
const maGetAdvertListBatch= (data) => {
    return axios.post(`${apiUrl}/opt/advert/getAdvertListBatch`, data)
};

 /**
 * //保存启动图/首页悬浮窗
  * @param data
 * @returns {AxiosPromise}
 */
 const maSaveAdvert= (data) => {
     return axios.post(`${apiUrl}/opt/advert/saveAdvert`, data)
 };



/**
 * //保存启动图/首页悬浮窗
 * @param data
 * @returns {AxiosPromise}
 */
const maSaveAdvertBatch= (data) => {
    return axios.post(`${apiUrl}/opt/advert/saveAdvertBatch`, data)
};



/**
 * //删除启动图/首页弹窗/首页悬浮窗
 * @param data
 * @returns {AxiosPromise}
 */
const maDelAdvert= (data) => {
    return axios.post(`${apiUrl}/opt/advert/delAdvert`, data)
};

/**
 * //删除素材
 * @param data
 * @returns {AxiosPromise}
 */
const maDelMaterial= (data) => {
    return axios.post(`${apiUrl}/opt/advert/delMaterial`, data)
};

/**
 * //获取首页弹窗/banner/icon管理列表
 * @param data
 * @returns {AxiosPromise}
 */
const maGetBannerList= (data) => {
    return axios.post(`${apiUrl}/opt/advert/getBannerList`, data)
};

/**
 * //获取用户状态列表
 * @param data
 * @returns {AxiosPromise}
 */
const  maGetUserStatusList= (data) => {
    return axios.post(`${apiUrl}/opt/advert/getUserStatusList`, data)
};


/**
 * //获取素材列表
 * @param data
 * @returns {AxiosPromise}
 */
const  maGetMaterialList= (data) => {
    return axios.post(`${apiUrl}/opt/advert/getMaterialList`, data)
};

/**
 * //保存首页弹窗/banner/icon素材
 * @param data
 * @returns {AxiosPromise}
 */

const  maSaveMaterial= (data) => {
    return axios.post(`${apiUrl}/opt/advert/saveMaterial`, data)
};


/**
 * //保存首页弹窗／banner/icon管理
 * @param data
 * @returns {AxiosPromise}
 */

const  maSaveBannerAndIcon= (data) => {
    return axios.post(`${apiUrl}/opt/advert/saveBannerAndIcon`, data)
};

/**
 * //删除首页弹窗/banner/icon管理
 * @param data
 * @returns {AxiosPromise}
 */

const  maDelBannerAndIcon= (data) => {
    return axios.post(`${apiUrl}/opt/advert/delBannerAndIcon`, data)
};


/**
 * //获取所有banner类型
 * @param data
 * @returns {AxiosPromise}
 */

const  maGetAllBannerTypeList= (data) => {
    return axios.post(`${apiUrl}/opt/advert/getAllBannerTypeList`, data)
};



/**
 * //获取所有icon位置
 * @param data
 * @returns {AxiosPromise}
 */

const  maGetAllIconTypeList= (data) => {
    return axios.post(`${apiUrl}/opt/advert/getAllIconTypeList`, data)
};


/**
 * //更改广告状态
 * @param data
 * @returns {AxiosPromise}
 */

const  maUpdateStatus= (data) => {
    return axios.post(`${apiUrl}/opt/advert/updateStatus`, data)
};

export default apiVerify('ma', {
    maAdverList,
    maGetAdvertListBatch,
    maSaveAdvert,
    maSaveAdvertBatch,
    maDelAdvert,
    maDelMaterial,
    maGetBannerList,
    maGetUserStatusList,
    maGetMaterialList,
    maSaveMaterial,
    maSaveBannerAndIcon,
    maDelBannerAndIcon,
    maGetAllBannerTypeList,
    maGetAllIconTypeList,
    maUpdateStatus
})
