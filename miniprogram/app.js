// miniprogram/app.js
import { wxp } from './utils/index';

App({
  onLaunch () {
    wxp.cloud.init({ env: 'adome-wxapp', traceUser: true })
    wxp.cloud.callFunction({ name: 'login' })
    .then(console.log)
  },
  globalData: {}
})
