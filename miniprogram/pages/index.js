// miniprogram/pages/index.js
const app = getApp()

Page({
  scanQrcode () {
    wx.showActionSheet({
      itemList: ['文本识别', '发票识别', '光码传输'],
      success (res) {
        console.log(res.tapIndex)
      }
    })
  }
})
