
/**
 * 广告位列表
 */
import request from '@/utils/request'

export const getAllSpaces = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces',
    params
  })
}
