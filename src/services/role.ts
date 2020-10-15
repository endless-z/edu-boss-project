import request from '@/utils/request'

export const getRoleList = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
