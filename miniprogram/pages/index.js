// miniprogram/pages/index.js
import { app, wxp } from '../utils/index'

Page({
  scanQrcode () {
    wxp.showActionSheet({
      itemList: ['文本识别', '发票识别', '光码传输']
    })
    .then((res) => console.log(res.tapIndex))
  }
})
