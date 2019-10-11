//导入接口请求模块
import login from './login'
import permission from './permission';
import material from './material';
import feedback from './feedback';
import periodism from './periodism';
import loanmarket from './loanmarket';
import groupsentMsg from './groupsentMsg';
import msgAudit from './msgAudit';
import operating from './operating';
//将所有请求合并导出
export default Object.assign(
    login, permission, material, feedback, periodism, loanmarket, groupsentMsg, msgAudit,operating
)
