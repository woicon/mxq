var app = getApp();
const base = require('../../utils/util.js')
Page({
    data: {
        
    },
    clearFav:function(e){
        console.log(e.currentTarget.id)
        let that = this
        wx.showModal({
            title: '提示',
            content: '是否取消收藏',
            success: function (res) {
                if (res.confirm) {
                    that.setData({
                        ['hides' + e.currentTarget.id]: true
                    })
                    if (that.data.hides0 && that.data.hides1 ){
                        that.setData({
                            empty:true
                        })  
                    }
                } else if (res.cancel) {
                    
                }
            }
        })
    },
    onLoad: function (options) {
        let that = this;
        wx.request({
            url: app.host + 'camp/listCampCollection',
            data: {
                userId:'6',
            },
            success: function (res) {
                console.log(res)
                if (res.data.data) {
                    // that.setData({
                    //     coupon: res.data.data.coupons
                    // })
                    // wx.setNavigationBarTitle({
                    //     title: '我收藏的训练营(' + res.data.data.coupons.length + ")",
                    // })
                } else {
                    // base.msg(res.data.message)
                    wx.setNavigationBarTitle({
                        title: '我收藏的训练营',
                    })
                }
            }
        })
    },

    onReady: function () {
        wx.setNavigationBarTitle({
            title: '我收藏的训练营',
        })
    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

    onShareAppMessage: function () {

    }
})