// miniprogram/pages/scan.js
const app = getApp()

Page({
  data: {
    chunks: [],
    recentChunks: []
  },

  computeRecentChunks () {
    this.setData({
      recentChunks: this.data.chunks
        .map((val, index) => ({ head: val.slice(0 ,10), index }))
        .slice(-5)
        .reverse()
    })
  },

  scanCode ({ currentTarget: { dataset: { auto }}}) {
    const scan = () =>
      wx.scanCode()
      .then((res) => {
        const data = {}
        data[`chunks[${this.data.chunks.length}]`] = res.rawData
        this.setData(data)
        this.computeRecentChunks()
      })
      .then(() => auto && scan())

    return wx.showLoading()
    .then(() => scan())
    .catch(({ errMsg }) => {
      if (errMsg !== "scanCode:fail cancel") {
        return wx.showModal({
          title: '扫码失败',
          content: `错误信息：“${err.errMsg}”`,
          showCancel: false
        })
      }
    })
    .then(() => wx.hideLoading())
  },

  removeChunk (e){
    const index = e.currentTarget.dataset.index

    return wx.showModal({
      title: `移除码块# ${index + 1}`
    })
    .then(() => {
      const chunks = this.data.chunks
      chunks.splice(index, 1)
      this.setData({ chunks })
      this.computeRecentChunks()
    })
  },

  makeFile () {
    let fs = wx.getFileSystemManager()
    let filePath = wx.env.USER_DATA_PATH

    return wx.showLoading()
    .then(() => app.getContext())
    .then(({ openid }) => {
      filePath += `/${openid}.zip`
      fs.writeFileSync(filePath, this.data.chunks[0], 'base64')
      for (let i = 1; i < this.data.chunks.length; i++) {
        fs.appendFileSync(filePath, this.data.chunks[i], 'base64')
      }
      return wx.cloud.uploadFile({ cloudPath: openid + '.zip', filePath })
    })
    .then(({ fileID }) => wx.cloud.getTempFileURL({ fileList: [fileID] }))
    .then(({ fileList }) => wx.setClipboardData({ data: fileList[0].tempFileURL }))
    .then(() => {
      wx.hideLoading()
      return wx.showModal({
        title: '文件获取成功',
        content: '下载地址已复制至粘贴板',
        showCancel: false
      })
    })
    .catch(() => {
      wx.hideLoading()
      return wx.showModal({
        title: '文件获取失败',
        content: `错误信息：“${err.errMsg}”`,
        showCancel: false
      })
    })
    .then(() => wx.navigateBack())
  }
})
