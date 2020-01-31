// miniprogram/app.js
import { wxp } from './utils/index';

App({
  onLaunch () {
    wxp.cloud.init({ env: 'adome-wxapp', traceUser: true })
  },

  getContext () {
    if (this.globalData.context) {
      return Promise.resolve(this.globalData.context)
    } else {
      return wxp.cloud.callFunction({ name: 'login' })
      .then(({ errMsg, result }) => {
        if (errMsg === 'cloud.callFunction:ok') {
          return this.globalData.context = result
        } else {
          throw(errMsg)
        }
      })
    }
  },

  globalData: {}
})
