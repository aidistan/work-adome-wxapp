import { promisifyAll } from 'miniprogram-api-promise';

// Store the app
let app = undefined

// Promisify all APIs
const wxp = {}
promisifyAll(wx, wxp)
promisifyAll(wx.cloud, wxp.cloud)

module.exports = {
  get app () {
    return app || (app = getApp())
  },
  get wxp () {
    return wxp
  }
}
