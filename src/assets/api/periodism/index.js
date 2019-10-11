import {apiUrl} from "../../base/env"
import {axios, apiVerify} from '../../base/axiosConfig'

/**====》
 用户周期管理相关接口
 /**====》



 /**
 * 获取 消息设置 =+==》短信列表
 * @param data
 * @returns {AxiosPromise}
 */
const msGetSmsListById = (data) => {
  return axios.post(`${apiUrl}/opt/message/getSmsListById`, data)
};

/**
 * 获取 消息设置 =+==》自动电话列表
 * @param data
 * @returns {AxiosPromise}
 */
const msGetAutoCallListById = (data) => {
  return axios.post(`${apiUrl}/opt/message/getAutoCallListById`, data)
};

/**
 * 获取 消息设置 =+==》app push列表
 * @param data
 * @returns {AxiosPromise}
 */
const msGetPushListById = (data) => {
  return axios.post(`${apiUrl}/opt/message/getPushListById`, data)
};

/**
 * 获取 消息设置 =+==》站内信列表
 * @param data
 * @returns {AxiosPromise}
 */
const msGetUserMsgListById = (data) => {
  return axios.post(`${apiUrl}/opt/message/getUserMsgListById`, data)
};


/**
 * 获取 消息设置 =+==》 保存短信信息
 * @param data
 * @returns {AxiosPromise}
 */
const msInsertSmsList = (data) => {
  return axios.post(`${apiUrl}/opt/message/insertSmsList`, data)
};

/**
 * 获取 消息设置 =+==》 保存自动电话信息
 * @param data
 * @returns {AxiosPromise}
 */
const msInsertAutoCallList = (data) => {
  return axios.post(`${apiUrl}/opt/message/insertAutoCallList`, data)
};


/**
 * 获取 消息设置 =+==》 保存PUSH信息
 * @param data
 * @returns {AxiosPromise}
 */
const msInsertPushList = (data) => {
  return axios.post(`${apiUrl}/opt/message/insertPushList`, data)
};


/**
 * 获取 消息设置 =+==》 保存站内信消息
 * @param data
 * @returns {AxiosPromise}
 */
const msInsertUserMsgList = (data) => {
  return axios.post(`${apiUrl}/opt/message/insertUserMsgList`, data)
};


/**
 * 获取 消息设置 =+==》 删除消息
 * @param data
 * @returns {AxiosPromise}
 */
const msDeleteMessageById = (data) => {
  return axios.post(`${apiUrl}/opt/message/deleteMessageById`, data)
};


/**
 * 获取 运营性 =+==》 查询运营事件列表
 * @param data
 * @returns {AxiosPromise}
 */
const msGetSysEventlListById = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/getSysEventlListById`, data)
};


/**
 * 获取 系统性 =+==》 查询系统事件列表
 * @param data
 * @returns {AxiosPromise}
 */
const msGetOptEventlListById = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/getOptEventlListById`, data)
};


/**
 * 获取 运营性 =+==》  事件状态设置
 * @param data
 * @returns {AxiosPromise}
 */
const msUpdateIsProhibit = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/updateIsProhibit`, data)
};


/**
 * 获取 运营性 =+==》  ABtest状态设置
 * @param data
 * @returns {AxiosPromise}
 */
const msUpdateAbtestById = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/updateAbtestById`, data)
};

/**
 * 获取 运营性 =+==》  删除渠道物料
 * @param data
 * @returns {AxiosPromise}
 */
const msDeleteEventById = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/deleteEventById`, data)
};

/**
 * 获取 运营性 =+==》  获取全部用户状态
 * @param data
 * @returns {AxiosPromise}
 */
const msGetSysEventlUserStatus = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/getSysEventlUserStatus`, data)
};

/**
 * 获取 系统性 =+==》  获取全部系统事件状态
 * @param data
 * @returns {AxiosPromise}
 */
const msGetOptEventlUserStatus = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/getOptEventlUserStatus`, data)
};


/**
 * 获取 运营性 =+==》 根据物料ID获取物料内容
 * @param data
 * @returns {AxiosPromise}
 */
const msGetSysEventDetailById = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/getSysEventDetailById`, data)
};


/**
 * 获取 运营性 =+==》 保存运营事件
 * @param data
 * @returns {AxiosPromise}
 */
const msSaveSysEvent = (data) => {
  return axios.post(`${apiUrl}/opt/sysEvent/saveSysEvent`, data)
};
/**
 * 获取 消息群发 =+==》 push群发 大数据标签  标签名称下拉选项查询
 * @param data
 * @returns {AxiosPromise}
 */
const msGetPushSelectOption = (data) => {
  return axios.post(`${apiUrl}/opt/tag/apiTagSearch`, data)
};
/**
 * 获取 消息群发 =+==》 push群发 大数据标签  标签名称描述查询
 * @param data
 * @returns {AxiosPromise}
 */
const msGetPushTabDes = (data) => {
  return axios.post(`${apiUrl}/opt/tag/apiTagDesc`, data)
};

export default apiVerify('ms', {
  msGetSmsListById,
  msGetAutoCallListById,
  msGetPushListById,
  msGetUserMsgListById,
  msInsertSmsList,
  msInsertAutoCallList,
  msInsertPushList,
  msInsertUserMsgList,
  msDeleteMessageById,
  msGetSysEventlListById,
  msGetOptEventlListById,
  msUpdateIsProhibit,
  msUpdateAbtestById,
  msDeleteEventById,
  msGetSysEventlUserStatus,
  msGetOptEventlUserStatus,
  msGetSysEventDetailById,
  msSaveSysEvent,
  msGetPushSelectOption,
  msGetPushTabDes,
})
