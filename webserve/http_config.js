//* 开发环境
export const env = '开发环境'
export const baseURL = __DEV__ ? 'http://47.94.249.77' : 'http://47.94.249.77' //'http://101.200.150.143';
export const mapUrlPrefix = __DEV__ ? 'http://47.94.249.77/mediaresource/'
  : 'http://47.94.249.77/mediaresource/';
/* ///中车环境
export const env = '中车内网'
export const baseURL = 'http://10.217.215.3'
export const mapUrlPrefix = 'http://10.217.215.3/mediaresource/'
//*/

/* 联通演示环境
export const env = '演示'
export const baseURL = 'https://lms.cuscri.com'
export const mapUrlPrefix = 'https://lms.cuscri.com/mediaresource/'
// */

/* 测试环境
export const env = '测试环境'
export const baseURL = __DEV__ ?
  'http://101.200.150.143:8880' :
  'http://101.200.150.143:8880';
export const mapUrlPrefix = __DEV__ ?
  'http://101.200.150.143:8880/mediaresource/' :
  'http://101.200.150.143:8880/mediaresource/';
//*/

export function dealError(error) {
  console.log('Oops', error.message)
  throw error
}
