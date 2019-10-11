import {apiUrl} from "../../base/env"
import {axios, apiVerify } from '../../base/axiosConfig'

/**====》
 登录相关接口
 /**====》



/**
 * 用户登陆
 * @param data
 * @returns {AxiosPromise}
 */
const userLogin = (data) => {
    return axios.post(`${apiUrl}/opt/login/submitLogin`, data)
}


/**
 * 用户退出
 * @param data
 * @returns {AxiosPromise}
 */
const userLoginOut = (data) => {
    return axios.post(`${apiUrl}/opt/login/logout`, data)
}

/**
 * 通过token获取权限列表
 * @param data
 * @returns {AxiosPromise}
 */
const userGetMenuList= (data) => {
    return axios.post(`${apiUrl}/opt/authority/getMenuListByUserId`, data)
}
/**
 * 获取产品列表
 * @param data
 * @returns {AxiosPromise}
 */
const userGetProductList= (data) => {
    return axios.post(`${apiUrl}/opt/login/getProductList`, data)
}

export default apiVerify('user', {
    userLogin,
    userLoginOut,
    userGetMenuList,
    userGetProductList
})
