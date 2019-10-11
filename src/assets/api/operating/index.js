import {apiUrl} from "../../base/env"
import {axios, apiVerify } from '../../base/axiosConfig'

/**====》
 消息审核相关接口
 /**====》



 /**
 * 查询活动列表
 * @param data
 *
 * @returns {AxiosPromise}
 */
const opeQueryActList = (data) => {
    return axios.post(`${apiUrl}/opt/activity/manage/queryActList`, data)
};

/**
 * 修改活动状态
 * @param data
 *
 * @returns {AxiosPromise}
 */
const opeModifyAct = (data) => {
    return axios.post(`${apiUrl}/opt/activity/manage/modifyAct`, data)
};


/**
 * 件查询活动策略列表
 * @param data
 *
 * @returns {AxiosPromise}
 */
const opeQueryStrategyList= (data) => {
    return axios.post(`${apiUrl}/opt/activity/welfare/manage/strategy/queryStrategyList`, data)
};


/**
 * 件查询活动策略列表
 * @param data
 *
 * @returns {AxiosPromise}
 */
const opeSaveStrategy= (data) => {
    return axios.post(`${apiUrl}/opt/activity/welfare/manage/strategy/saveStrategy`, data)
};


/**
 * 查询红包列表
 * @param data
 *
 * @returns {AxiosPromise}
 */
const opeQueryRedpacketList= (data) => {
    return axios.post(`${apiUrl}/opt/activity/welfare/manage/redpacket/queryRedpacketList`, data)
};
/**
 * 查询红包列表
 * @param data
 *
 * @returns {AxiosPromise}
 */
const saveStrategy= (data) => {
    return axios.post(`${apiUrl}/opt/activity/welfare/manage/strategy/saveStrategy`, data)
};



export default apiVerify('ope', {
    opeQueryActList,opeQueryRedpacketList,
    opeModifyAct,opeQueryStrategyList,opeSaveStrategy
})
