import {apiUrl} from "../../base/env"
import {axios, apiVerify } from '../../base/axiosConfig'

/**====》
 消息审核相关接口
 /**====》



 /**
 * 消息审核接口
 * @param data
 * String messagetype（消息类型）, String id（消息id）, Integer status（状态 2 通過  1 拒絕）, String remark（备注）
 * @returns {AxiosPromise}
 */
const auUpdateAuditStatusById = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/updateAuditStatusById`, data)
};




/**
 * 短信测试接口
 * @param data
 * String mobile（手机号码）, String messageid(物料id),String smstype(短信类型（运营，通知）)
 * @returns {AxiosPromise}
 */
const auSendSmsTest = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/sendSmsTest`, data)
};


/**
 * Push测试接口
 * @param data
 * String mobile（手机号码）, String messageid(物料id)
 */
const auSendPushTest = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/sendPushTest`, data)
};


/**
 * 站内信测试接口
 * @param data
 * String mobile（手机号码）, String messageid(物料id)
 */
const auSendAppMessageTest = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/sendAppMessageTest`, data)
};


/**
 * 自動電話测试接口
 * @param data
 * String mobile（手机号码）, String messageid(物料id)
 */
const auSendAutotelTest = (data) => {
    return axios.post(`${apiUrl}/opt/smsmass/sendAutotelTest`, data)
};

export default apiVerify('au', {
    auUpdateAuditStatusById,auSendSmsTest,auSendPushTest,auSendAppMessageTest,auSendAutotelTest
})
