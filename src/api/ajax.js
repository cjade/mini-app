import { clientType, isProductionMode, apiurl } from '../config/config'
import apisrc from './apisrc'

const ajax = {}

ajax.get = (url, data) => {
  return request('GET', url, data)
}

ajax.post = (url, data) => {
  return request('POST', url, data)
}

ajax.put = (url, data) => {
  return request('PUT', url, data)
}

ajax.delete = (url, data) => {
  return request('DELETE', url, data)
}

ajax.uploadFile = (url, tempFilePath) => {
  return uploadFile(url, tempFilePath)
}

ajax.downloadFile = (url) => {
  return this.downloadFile(url)
}

function request (method, url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiurl + apisrc[url],
      data,
      method,
      header: {
        'content-type': 'application/json',
        'X-Client-Type': clientType,
        'Authorization': 'store.state.user.authorization'
      },
      success: (resp) => {
        if (resp.statusCode === 200 || resp.statusCode === 201 || resp.statusCode === 204) {
          resolve(resp.data)
        } else {
          if (!isProductionMode && resp.statusCode !== 404 && resp.statusCode !== 401) {
            wx.showModal({
              title: 'ajax错误',
              content: JSON.stringify(resp.data),
              showCancel: false
            })
          }
          reject(resp.data)
        }
      },
      fail: (res) => {
        if (!isProductionMode) {
          wx.showModal({
            title: 'ajax错误',
            content: JSON.stringify(res),
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前网络不可用，请检查你的网络设置',
            showCancel: false
          })
        }
      }
    })
  })
}

function uploadFile (url, tempFilePath) {
  return new Promise((resolve, reject) => {
    var timestamp = Date.parse(new Date())
    wx.uploadFile({
      url: apiurl + apisrc[url],
      filePath: tempFilePath,
      name: 'contentImage_' + timestamp,
      header: {
        'content-type': 'application/json',
        'X-HB-Client-Type': clientType,
        'Authorization': 'store.state.user.authorization'
      },
      success: (resp) => {
        if (resp.statusCode === 200 || resp.statusCode === 201 || resp.statusCode === 204) {
          resolve(resp.data)
        } else {
          if (!isProductionMode && resp.statusCode !== 404 && resp.statusCode !== 401) {
            wx.showModal({
              title: 'ajax错误',
              content: JSON.stringify(resp.data),
              showCancel: false
            })
          }
          reject(resp.data)
        }
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '当前网络不可用，请检查你的网络设置',
          showCancel: false
        })
      }
    })
  })
}

export default ajax
