import {apiUrl} from "../../base/env"
import {axios, apiVerify } from '../../base/axiosConfig'

/**====》
 群发消息相关接口
 /**====》




/**
 * 获取群发消息列表
 * @param data
 * messagetype =》2 push消息
 * @returns {AxiosPromise}
 */
const sentQueryMassMessageMassList = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/queryMassMessageMassList`, data)
};



/**
 * 变更记录查询
 * @param data
 * String messagetype (消息类型), String id  （记录id）
 * @returns {AxiosPromise}
 */
const sentQueryUpdatelogByid = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/queryUpdatelogByid`, data)
};



/**
 * 提交短信群发申请
 * @param data
 * String sendType (群发对象),
 * String id (短信id),
 * String fileId(文件包id),
 * Sting smsTotal (文件包用户数量)，
 * Sting expectTime (发送时间)，
 * Sting type (业务类型),
 * Sting inputUser (指定用户)
 * @returns {AxiosPromise}
 */
const sentSaveBatchInfo = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/saveBatchInfo`, data)
};

/**
 * 提交站内信群发申请
 * @param data
 * String sendType (群发对象),
 * String id (站内信id),
 * String fileId(文件包id),
 * Sting smsTotal (文件包用户数量)，
 * Sting expectTime (发送时间)，
 * Sting type (业务类型),
 * Sting inputUser (指定用户)
 * @returns {AxiosPromise}
 */
const sentSaveAppMessageBatchInfo   = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/saveAppMessageBatchInfo`, data)
};

/**
 * 提交push群发申请
 * @param data
 * String type (群发对象),
 * String id (push id),
 * String fileId(文件包id),
 * Sting sendTotal (文件包用户数量)，
 * Sting expectTime (发送时间)，
 * Sting smsType (业务类型),
 * Sting inputUser (指定用户)
 * @returns {AxiosPromise}
 */
const sentSavePushBatchInfo = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/savePushBatchInfo`, data)
};

/**
 * 提交自动电话群发申请
 * @param data
 * String type (群发对象),
 * String id (自动电话id),
 * String fileId(文件包id),
 * Sting sendTotal (文件包用户数量)，
 * Sting expectTime (发送时间)，
 * Sting smsType (业务类型),
 * Sting inputUser (指定用户)
 * @returns {AxiosPromise}
 */
const sentSaveAutotelBatchInfo = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/saveAutotelBatchInfo`, data)
};



/**
 * 导出短信群发列表
 * @param data
 * String type (群发对象),
 * String id (自动电话id),
 * String fileId(文件包id),
 * Sting sendTotal (文件包用户数量)，
 * Sting expectTime (发送时间)，
 * Sting smsType (业务类型),
 * Sting inputUser (指定用户)
 * @returns {AxiosPromise}
 */
const sentExportSmsMessageList = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/exportSmsMessageList`, data)
};


export default apiVerify('sent', {
    sentQueryMassMessageMassList,
    sentQueryUpdatelogByid,
    sentSaveBatchInfo,
    sentSavePushBatchInfo,
    sentSaveAppMessageBatchInfo,
    sentSaveAutotelBatchInfo,
    sentExportSmsMessageList
})
