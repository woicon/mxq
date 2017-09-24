var app = getApp();
const base = require('../../utils/util.js');
Page({
    data: {
        price:[{
                price:'300',
                time:'1月',
                hot:false,
            },
            {
                price: '600',
                time: '2月',
                hot: true,
            },
            {
                price: '1200',
                time: '6月',
                hot: false,
            }],
            payStat:false,
            type:2,
            likeStat:true
    },

    likeThis:function(e){
        base.msg('收藏成功，您可在我的收藏中查看')
        this.setData({
            likeStat:false
        })
    },

    unLike:function(){
        base.msg('已取消收藏本训练营')
        this.setData({
            likeStat: true
        })
    },

    jionTo:function(e){
        let that = this
        that.setData({
            layerStat:true
        })
    },

    hideLayer:function(){
        let that = this
        that.setData({
            layerStat:false,
            payStat:false
        })
    },

    selectPrice:function(){
        let that = this
        that.setData({
            layerStat: false
        })
        wx.requestPayment({
            'success': function (res) {
            },
            'fail': function (res) {
                that.setData({
                    payStat: true
                })
            }
        })
    },
    choosePrice:function(e){
        let that = this
        console.log(e)
        that.setData({
            priceSel:e.target.id
        })
    },

    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '名校家长训练营',
        })
    },

    onReady: function () {
    
    },

    /**
     * 生命周期函数--监听页面显示
     */
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