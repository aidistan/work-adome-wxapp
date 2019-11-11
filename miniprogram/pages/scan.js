// miniprogram/pages/scan.js
import { app, wxp } from '../utils/index'

Page({
  data: {
    mode: 'text',
    text: ''
  },

  onLoad ({ mode }) {
    this.setData({ mode })
  },

  onReady () {
    switch (this.data.mode) {
      case 'text':
        this.scanAsText()
        break
      case 'file':
        wxp.showModal({
          title: '施工中',
          content: '本功能尚在开发，敬请期待!',
          showCancel: false
        })
        .then(() => wxp.navigateBack())
        break
    }
  },

  scanAsText () {
    return wxp.scanCode()
    .then((res) => this.setData({ text: res.result }))
    .catch((err) =>
      wxp.showModal({
        title: '扫码失败',
        content: `错误信息：“${err.errMsg}”`,
        showCancel: false
      })
      .then(() => this.scanAsText())
    )
  }
})
