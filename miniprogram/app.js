// miniprogram/app.js

App({
  onLaunch () {
    wx.cloud.init({ env: 'adome-wxapp', traceUser: true })
  },

  getContext () {
    if (this.globalData.context) {
      return Promise.resolve(this.globalData.context)
    } else {
      return wx.cloud.callFunction({ name: 'login' })
      .then(({ errMsg, result }) => errMsg === 'cloud.callFunction:ok'
        ? Promise.resolve(this.globalData.context = result)
        : Promise.reject(errMsg)
      )
    }
  },

  globalData: {}
})
