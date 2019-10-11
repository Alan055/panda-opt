import {apiUrl} from "../../base/env"
import {axios, apiVerify} from '../../base/axiosConfig'

/**====》
 屏蔽渠道相关接口
 /**====》



 /**
 * 获取屏蔽渠道列表
 * @param data
 * @returns {AxiosPromise}
 */
const loGetLoanmarketListById = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/getLoanmarketListById`, data)
};

/**
 * 获取商户屏蔽列表
 * @param data
 * @returns {AxiosPromise}
 */
const loGetMerchantListById = (data) => {
  return axios.post(`${apiUrl}/opt/merchant/getMerchantListById`, data)
};


/**
 * 获取手机号屏蔽列表
 * @param data Integer pageNumber, @RequestParam(defaultValue = "20") Integer pageSize, Integer model
 * @returns {AxiosPromise}
 */
const loGetUserLoanmarketListById = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/getUserLoanmarketListById`, data)
};

/**
 * 获取商户列表
 * @param data
 * @returns {AxiosPromise}
 */
const loQueryProductInfo = (data) => {
  return axios.post(`${apiUrl}/opt/merchant/queryProductInfo`, data)
};


/**
 * 保存添加渠道
 * @param data
 * @returns {AxiosPromise}
 */
const loSureSaveChannel = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/insertLoanmarketList`, data)
};

/**
 * 保存添加商户黑名单
 * @param String mobile,  String financeid,String financename
 * @returns {AxiosPromise}
 */
const loInsertMerchantListById = (data) => {
  return axios.post(`${apiUrl}/opt/merchant/insertMerchantListById`, data)
};

/**
 * 保存添加手机号屏蔽
 * @param String mobile
 * @returns {AxiosPromise}
 */
const loInsertUserLoanmarketList = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/insertUserLoanmarketList`, data)
};


/**
 * 保存编辑手机号屏蔽
 * @param String mobile
 * @returns {AxiosPromise}
 */
const loSaveUserLoanmarketList = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/saveUserLoanmarketList`, data)
};


/**
 * 删除渠道
 * @param data
 * @returns {AxiosPromise}
 */
const loDeleteLoanmarketByIdl = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/deleteLoanmarketById`, data)
};

/**
 * 删除商户黑名单
 * @param data
 * @returns {AxiosPromise}
 */
const loDeleteMerchantListById = (data) => {
  return axios.post(`${apiUrl}/opt/merchant/deleteMerchantListById`, data)
};

/**
 * 删除手机号屏蔽
 * @param data
 * @returns {AxiosPromise}
 */
const loDeleteUserLoanmarketById = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/deleteUserLoanmarketById`, data)
};


/**
 * 保存编辑渠道
 * @param data
 * @returns {AxiosPromise}
 */
const loSaveLoanmarketList = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/saveLoanmarketList`, data)
};

/**
 * 贷款超市管理 - 贷款超市表格数据接口
 * @param data
 * @returns {AxiosPromise}
 */
const loGetMarketListById = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/getMarketLinkListById`, data)
};

/**
 * 贷款超市管理 - 链接管理表格数据接口
 * @param data
 * @returns {AxiosPromise}
 */
const loGetLinkListById = (data) => {
  return axios.post(`${apiUrl}/opt/advert/getLinkListById`, data)
};
/**
 * 链接资源管理 - 合同协议 表格数据接口
 * @param data
 * @returns {AxiosPromise}
 */
const loGetContractData = (data) => {
  return axios.post(`${apiUrl}/opt/advert/getLinkListById`, data)
};
/**
 * 贷款超市管理 - 新增贷款超市管理  模块的下拉框数据接口  从后台读取
 * @param data
 * @returns {AxiosPromise}
 */
const loGetMarketPositionList = (data) => {
  return axios.post(`${apiUrl}/opt/advert/getMarketPositionList`, data)
};
/**
 * 贷款超市管理 - 新增贷款超市管理  用户状态的下拉框数据接口  从后台读取
 * @param data
 * @returns {AxiosPromise}
 */
const loGetMarketUserStatusList = (data) => {
  return axios.post(`${apiUrl}/opt/advert/getMarketUserStatusList`, data)
};
/**
 * 贷款超市管理 - 新增贷款超市管理  bi名称的下拉框数据接口  从后台读取
 * @param data
 * @returns {AxiosPromise}
 */
const loGetLinkComboBoxById = (data) => {
  return axios.post(`${apiUrl}/opt/advert/getLinkComboBoxById`, data)
};
/**
 * 贷款超市管理 - 删除一条链接管理的数据
 * @param data
 * @returns {AxiosPromise}
 */
const loDeleteLinkListById = (data) => {
  return axios.post(`${apiUrl}/opt/advert/deleteLinkListById`, data)
};
/**
 * 贷款超市管理 - 增加修改一条链接管理的数据
 * @param data
 * @returns {AxiosPromise}
 */
const loSaveLinkListById = (data) => {
  return axios.post(`${apiUrl}/opt/advert/saveMarketLinkListById`, data)
};
/**
 * 贷款超市管理 - 增加修改一条贷超管理的数据
 * @param data
 * @returns {AxiosPromise}
 */
const loSaveMarketListById = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/saveMarketLinkById`, data)
};
/**
 * 贷款超市管理 - 删除一条贷超管理的数据
 * @param data
 * @returns {AxiosPromise}
 */
const loDeleteMarketLinkById = (data) => {
  return axios.post(`${apiUrl}/opt/loanmarket/deleteMarketLinkById`, data)
};
/**
 * 链接资源管理 - 增加或者修改一条合同协议的数据
 * @param data
 * @returns {AxiosPromise}
 */
const loSaveContractLinkListById = (data) => {
  return axios.post(`${apiUrl}/opt/advert/saveLinkListById`, data)
};
/**
 * 链接资源管理 - 预览一条合同协议的数据
 * @param data
 * @returns {AxiosPromise}
 */
const loCreateQRCode = (data) => {
  return axios.post(`${apiUrl}/opt/advert/createQRCode`, data)
};
/**
 * 链接资源管理 - 合同协议  读取二维码数据的接口
 * @param data
 * @returns {AxiosPromise}
 */
const loGetLinkContentById = (data) => {
  return axios.post(`${apiUrl}/opt/advert/getLinkContentById`, data)
};


export default apiVerify('lo', {
  loGetLoanmarketListById,
  loGetMerchantListById,
  loGetUserLoanmarketListById,
  loSureSaveChannel,
  loDeleteLoanmarketByIdl,
  loDeleteMerchantListById,
  loSaveLoanmarketList,
  loSaveUserLoanmarketList,
  loQueryProductInfo,
  loInsertMerchantListById,
  loInsertUserLoanmarketList,
  loDeleteUserLoanmarketById,
  loGetMarketListById,
  loGetLinkListById,
  loGetContractData,
  loGetMarketPositionList,
  loGetMarketUserStatusList,
  loGetLinkComboBoxById,
  loDeleteLinkListById,
  loSaveLinkListById,
  loSaveMarketListById,
  loDeleteMarketLinkById,
  loSaveContractLinkListById,
  loCreateQRCode,
  loGetLinkContentById,
})
