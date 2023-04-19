// export const baseURL = __DEV__ ? 'http://47.94.249.77' : 'http://47.94.249.77' //'http://101.200.150.143';
export const baseURL = __DEV__ ?
  'http://101.200.150.143:8880' :
  'http://101.200.150.143:8880';

// export const mapUrlPrefix = __DEV__ ? 'http://47.94.249.77/mediaresource/admin/'
//   : 'http://47.94.249.77/mediaresource/admin/';
export const mapUrlPrefix = __DEV__ ?
  'http://101.200.150.143:8880/mediaresource/testadmin/' :
  'http://101.200.150.143:8880/mediaresource/testadmin/';

export function dealError(error) {
  console.log('Oops', error.message)
  throw error
}
