import {apiUrl} from "../../base/env"
import {axios, apiVerify } from '../../base/axiosConfig'

/**====》
用户反馈相关接口
 /**====》



 /**
 * 获取用户反馈列表
 * @param data
 * @returns {AxiosPromise}
 */
const feedGetSuggestionList = (data) => {
    return axios.post(`${apiUrl}/opt/suggestion/getSuggestionList`, data)
};


/**
 * 导出用户反馈列表
 * @param data
 * @returns {AxiosPromise}
 */
const feedExportSuggestionList = (data) => {
    return axios.post(`${apiUrl}/opt/suggestion/exportSuggestionList`, data)
};


export default apiVerify('feed', {
    feedGetSuggestionList,
    feedExportSuggestionList
})
