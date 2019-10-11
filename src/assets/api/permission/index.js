import {apiUrl} from "../../base/env";
import {axios, apiVerify } from '../../base/axiosConfig';
/**====》
 权限相关接口
 /**====》

/**
 * 获取用户列表
 * @param data
 * @returns {AxiosPromise}
 */
const perUserList = (data) => {
    return axios.post(`${apiUrl}/opt/authority/getUserList`, data)
};

/**
 * 添加用户
 * @param data
 * @returns {AxiosPromise}
 */
const perAddUser = (data) => {
    return axios.post(`${apiUrl}/opt/authority/saveUser`, data)
};
/**
 * 获取用户组列表
 * @param data
 * @returns {AxiosPromise}
 */
 const perUserGroupList = (data) => {
    return axios.post(`${apiUrl}/opt/authority/getUserGroupList`, data)
 };

/**
 * 根据id修改用户所属用户组
 * @param data
 * @returns {AxiosPromise}
 */
const perUserGroupRel = (data) => {
    return axios.post(`${apiUrl}/opt/authority/saveUserGroupRel`, data)
};

/**
 * 根据id修改用户状态
 * @param data
 * @returns {AxiosPromise}
 */
const perModUserStatus = (data) => {
    return axios.post(`${apiUrl}/opt/authority/modUserStatus`, data)
};

/**
 * 修改用户密码
 * @param data
 * @returns {AxiosPromise}
 */
const perModUserPwd = (data) => {
    return axios.post(`${apiUrl}/opt/authority/modUserPwd`, data)
};


/**
 * 删除用户
 * @param data
 * @returns {AxiosPromise}
 */
const perDelUser = (data) => {
    return axios.post(`${apiUrl}/opt/authority/delUser`, data)
};



/**
 * 获取角色列表
 * @param data
 * @returns {AxiosPromise}
 */
const perRoleList = (data) => {
    return axios.post(`${apiUrl}/opt/authority/getRoleList`, data)
};

/**
 * 新增/修改用户组
 * @param data
 * @returns {AxiosPromise}
 */
const perSaveUserGroup = (data) => {
    return axios.post(`${apiUrl}/opt/authority/saveUserGroup`, data)
};


/**
 * 新增/修改用户组名称
 * @param data
 * @returns {AxiosPromise}
 */
const perSaveUserGroupName = (data) => {
    return axios.post(`${apiUrl}/opt/authority/updateUserGroupName`, data)
};


/**
 * 删除用户组
 * @param data
 * @returns {AxiosPromise}
 */
const perDelUserGroup = (data) => {
    return axios.post(`${apiUrl}/opt/authority/delUserGroup`, data)
};


/**
 * 获取全部菜单列表
 * @param data
 * @returns {AxiosPromise}
 */
const perGetMenuList = (data) => {
    return axios.post(`${apiUrl}/opt/authority/getMenuList`, data)
};


/**
 * 添加角色
 * @param data
 * @returns {AxiosPromise}
 */

const perSaveRole = (data) => {
    return axios.post(`${apiUrl}/opt/authority/saveRole`, data)
};
/**
 * 修改角色菜单关系
 * @param data
 * @returns {AxiosPromise}
 */

const perSaveMenuRoleRel = (data) => {
    return axios.post(`${apiUrl}/opt/authority/saveMenuRoleRel`, data)
};


/**
 * 删除角色
 * @param data
 * @returns {AxiosPromise}
 */

const perDelRole = (data) => {
    return axios.post(`${apiUrl}/opt/authority/delRole`, data)
};


/**
 * 添加/修改菜单
 * @param data
 * @returns {AxiosPromise}
 */

const perSaveMenu = (data) => {
    return axios.post(`${apiUrl}/opt/authority/saveMenu`, data)
};

/**
 * 删除菜单
 * @param data
 * @returns {AxiosPromise}
 */

const perDelMenu = (data) => {
    return axios.post(`${apiUrl}/opt/authority/delMenu`, data)
};

export default apiVerify('per', {
    perUserList,
    perUserGroupList,
    perAddUser,
    perUserGroupRel,
    perModUserStatus,
    perModUserPwd,
    perDelUser,
    perRoleList,
    perSaveUserGroup,
    perSaveUserGroupName,
    perDelUserGroup,
    perGetMenuList,
    perSaveRole,
    perSaveMenuRoleRel,
    perDelRole,
    perSaveMenu,
    perDelMenu
})
