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

export const updateStatus = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params
  })
}

/**
 * 获取广告详情
 */

export const getBannerdetail = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params
  })
}

/**
 * 获取所有广告
 */

export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

/**
 * 编辑广告列表
 */
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

/**
 * 广告图片上传
 */
export const uploadBannerImg = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data
  })
}
