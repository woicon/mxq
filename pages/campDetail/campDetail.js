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
            likeStat:true,
            priceSel:1
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
        console.log(options)
        let that = this
        that.setData({
            type: options.id
        })
    },

    onReady: function () {

        let types = this.data.type
        let name = ['名校家长训练营', '专项训练营', '机构直通车']
        wx.setNavigationBarTitle({
            title: name[types]
        })
    },
    onShow: function (query) {
        console.log(query)
    },
    onHide: function (options) {

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