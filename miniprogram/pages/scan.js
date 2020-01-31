// miniprogram/pages/scan.js
import { app, wxp } from '../utils/index'

Page({
  data: {
    auto: null,
    chunks: []
  },

  onLoad ({ auto }) {
    this.setData({ auto })
  },

  onReady () {
    if (this.data.auto) {
      this.scanCode()
    }
  },

  scanCode () {
    return wxp.scanCode()
    .then((res) => {
      let data = {}
      data[`chunks[${this.data.chunks.length}]`] = res.rawData
      this.setData(data)
    })
    .then(() => this.data.auto && this.scanCode())
    .catch(({ errMsg }) => {
      if (errMsg !== "scanCode:fail cancel") {
        return wxp.showModal({
          title: '扫码失败',
          content: `错误信息：“${err.errMsg}”`,
          showCancel: false
        })
      }
    })
  },

  makeFile () {
    let fs = wxp.getFileSystemManager()
    let filePath = wx.env.USER_DATA_PATH

    return wxp.showLoading()
    .then(() => app.getContext())
    .then(({ openid }) => {
      filePath += `/${openid}.zip`
      fs.writeFileSync(filePath, this.data.chunks[0], 'base64')
      for (let i = 1; i < this.data.chunks.length; i++) {
        fs.appendFileSync(filePath, this.data.chunks[i], 'base64')
      }
      return wxp.cloud.uploadFile({ cloudPath: openid + '.zip', filePath })
    })
    .then(({ fileID }) => wxp.cloud.getTempFileURL({ fileList: [fileID] }))
    .then(({ fileList }) => wxp.setClipboardData({ data: fileList[0].tempFileURL }))
    .then(() => {
      wxp.hideLoading()
      return wxp.showModal({
        title: '文件获取成功',
        content: '下载地址已复制至粘贴板',
        showCancel: false
      })
    })
    .catch(() => {
      wxp.hideLoading()
      return wxp.showModal({
        title: '文件获取失败',
        content: `错误信息：“${err.errMsg}”`,
        showCancel: false
      })
    })
    .then(() => wxp.navigateBack())
  }
})
