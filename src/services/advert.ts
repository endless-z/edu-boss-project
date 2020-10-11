/**
 * 广告列表
 */

import request from '@/utils/request'

export const getAdList = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList',
    params
  })
}
