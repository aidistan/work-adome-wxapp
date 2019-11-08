// miniprogram/app.js
App({
  onLaunch () {
    wx.cloud.init({
      env: 'adome-wxapp',
      traceUser: true,
    })

    wx.cloud.callFunction({
      name: 'login',
      success: console.log
    })
  },
  globalData: {}
})
