//app.js
const QQMapWX = require('./libs/qqmap/qqmap-wx-jssdk.min.js')
App({
  onLaunch: function () {
    let that = this;
    let init = new Promise(()=>{
        let getLocation = new QQMapWX({
            key: 'RKABZ-R6DK6-BBSSZ-EW2BY-IFRA7-VHFU7'
        });
        
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                console.log(res);
                getLocation.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (res) {
                        console.log(res);
                        let location = res.result.address_component;
                        
                        that.globalData.location = {
                            city: location.city,
                            province: location.province
                        }
                    },
                    fail: function (res) {
                        console.log(res);
                    },
                    complete: function (res) {
                        console.log(res);
                    }
                })
            }
        });
    }).then(() => {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    })
    .then(()=>{
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    })
    .then(()=>{
        // 获取用户信息
        
    })
  },
  host: 'http://101.132.71.121:8080/',
  globalData: {
    userInfo: null,
  }
})