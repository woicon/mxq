//app.js
const QQMapWX = require('./libs/qqmap/qqmap-wx-jssdk.min.js')
App({
  onLaunch: function () {
    let that = this
    let init = new Promise( ()=> {
       // wx.showLoading()
        
        wx.getStorage({
            key: 'location',
            success: function (res) {
                that.globalData.location = res.data
             //   wx.hideLoading()
            },
            fail: function () {
                // wx.getLocation({
                //     type: 'wgs84',
                //     success: function (res) {
                //         let getLocation = new QQMapWX({
                //             key: 'RKABZ-R6DK6-BBSSZ-EW2BY-IFRA7-VHFU7'
                //         })
                //         getLocation.reverseGeocoder({
                //             location: {
                //                 latitude: res.latitude,
                //                 longitude: res.longitude
                //             },
                //             success: function (data) {
                //                 let location = data.result.address_component
                //                 let normalArea = {
                //                     province: location.province,
                //                     city: location.city
                //                 }
                //                 that.globalData.location = normalArea;
                //                 wx.setStorage({
                //                     key: 'location',
                //                     data: normalArea,
                //                 })
                                
                //             },
                //             fail: function () {
                //                 let normalArea = {
                //                     city: '上海',
                //                     province: '上海'
                //                 }
                //                 that.globalData.location = normalArea
                //                 wx.hideLoading()
                //             }
                //         })
                //     }
                // })
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
    setTab: function () {
        var _curPageArr = getCurrentPages()
        var _curPage = _curPageArr[_curPageArr.length - 1]
        var _pagePath = _curPage.__route__
        if (_pagePath.indexOf('/') != 0) {
            _pagePath = '/' + _pagePath
        }
        var tabBar = this.tabBar
       
        for (var i = 0; i < tabBar.length; i++) {
            tabBar[i].selected = false
            console.log(_pagePath)
            if (tabBar[i].url == _pagePath) {
                tabBar[i].selected = true
            }
        }
        _curPage.setData({
            tabBar: tabBar
        });
    },
    tabBar:[
        {
            "ico":"https://woicon.github.io/mxq/pages/images/ico1.png",
            "url": "/pages/training/training",
            "txt": "训练营",
            "selected":false,
        },
        {
            "ico": "https://woicon.github.io/mxq/pages/images/ico2.png",
            "url": "/pages/find/find",
            "txt": "发现",
            "selected": false,
        },
        {
            "ico": "https://woicon.github.io/mxq/pages/images/ico3.png",
            "url": "/pages/recommend/recommend",
            "txt": "有奖推荐",
            "selected": false,
        },
        {
            "ico": "https://woicon.github.io/mxq/pages/images/ico4.png",
            "url": "/pages/member/member",
            "txt": "我",
            "selected": false,
        },
    ],
    member:{
        id:6,
    },
  globalData: {
    userInfo: null,
    
  }
})