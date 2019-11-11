// miniprogram/pages/index.js
import { app, wxp } from '../utils/index'

Page({
  scan () {
    wxp.showActionSheet({ itemList: ['纯文本识别', '光码传文件'] })
    .then((res) => {
      const mode = ['text', 'file'][res.tapIndex]
      wxp.navigateTo({ url: `scan?mode=${mode}` })
    })
  }
})
