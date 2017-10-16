var app = getApp();
const base = require('../../utils/util.js')
Page({
    data: {
       campType:['家长','专项','平台'],
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
        let that = this
        console.log(options)
        wx.request({
            url: app.host + 'camp/listCampCollection',
            data: {
                userId: 6,
            },
            success: function (favCamp) {
                console.log(favCamp)
                if (favCamp.data.data) {
                    console.log(favCamp.data.data.collection)
                    that.setData({
                        favCamp: favCamp.data.data.collection
                    })
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