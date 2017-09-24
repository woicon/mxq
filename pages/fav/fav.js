var app = getApp();
const base = require('../../utils/util.js')
Page({

    data: {

    },
    onLoad: function (options) {
        let that = this;
        wx.request({
            url: app.host + 'camp/listCampCollection',
            data: {
                id:6,
            },
            success: function (res) {
                //console.log(res)
                if (res.data.data) {
                    // that.setData({
                    //     coupon: res.data.data.coupons
                    // })
                    // wx.setNavigationBarTitle({
                    //     title: '我收藏的训练营(' + res.data.data.coupons.length + ")",
                    // })
                } else {
                    base.msg(res.data.message)
                    wx.setNavigationBarTitle({
                        title: '我收藏的训练营',
                    })
                }
            }
        })
    },

    onReady: function () {

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