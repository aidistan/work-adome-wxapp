// miniprogram/pages/index.js
import { app, wxp } from '../utils/index'

Page({
  scan () {
    wxp.showActionSheet({ itemList: ['手动连续扫码', '自动连续扫码'] })
    .then((res) => wxp.navigateTo({ url: `scan?auto=${res.tapIndex}` }))
  }
})
