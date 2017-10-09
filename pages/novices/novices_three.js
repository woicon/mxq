var app = getApp()
const base = require('../../utils/util.js')
Page({
    data: {

    },
    inputName: function (e) {
        let that = this
        let value = e.detail.value
        let info = that.data.info
        info.nickname = value.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g, "")
        that.setData({
            info: info
        })
    },
    inputBlur:function(){
        this.setData({
            focus: false
        })
    },
    inputFocus:function(){
        this.setData({
            focus:true
        })
    },
    subimtInfo: function () {
        let that = this
        wx.reLaunch({
            url: '/pages/home/home'
        })
        // wx.request({
        //     url: app.host + 'user/completeInfo',
        //     method:'POST',
        //     header: { 'content-type': 'application/x-www-form-urlencoded' },
        //     data: that.data.info,
        //     success:function(res){

        //     }
        // })
    },
    onLoad: function (options) {

    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '新手引导',
        })
    },
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})