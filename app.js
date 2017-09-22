//app.js

App({
  onLaunch: function () {
    let that = this
    let init = new Promise( ()=> {
        
        wx.showLoading()
        wx.getStorage({
            key: 'location',
            success: function(res) {
                that.globalData.location = res.data
                wx.hideLoading()
            },
            fail: function() {
                
            }
        })
    })
    // }).then(() => {
    //     wx.login({
    //         success: res => {
    //             // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //         }
    //     })
    // })
    // .then(() => {
    //     wx.getSetting({
    //         success: res => {
    //             if (res.authSetting['scope.userInfo']) {
    //                 // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //                 wx.getUserInfo({
    //                     success: res => {
    //                         // 可以将 res 发送给后台解码出 unionId
    //                         this.globalData.userInfo = res.userInfo
    //                         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                         // 所以此处加入 callback 以防止这种情况
    //                         if (this.userInfoReadyCallback) {
    //                             this.userInfoReadyCallback(res)
    //                         }
    //                     }
    //                 })
    //             }
    //         }
    //     })
    // })
    // .then(()=>{
    //     // 获取用户信息
    // })
  },
  host: 'http://101.132.71.121:8080/',
  globalData: {
    userInfo: null,
  }
})