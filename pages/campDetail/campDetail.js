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
            types: ['名校家长训练营', '专项训练营', '机构直通车'],
            payStat:false,
            type:1,
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

        wx.request({
            url: app.host + 'camp/getDetail',
            data: {
                campId:1,
            },
            success: function (campDetail) {
                console.log(campDetail)
                
                if (campDetail.data.data) {
                    let types = that.data.types
                    that.setData({
                        success: true,
                        detail: campDetail.data.data
                    })
                    wx.setNavigationBarTitle({
                        title: types[campDetail.data.data.type]
                    })
                } else {
                    base.msg(campDetail.data.message)
                    that.setData({
                        success:false,
                        error: campDetail.data.message
                    })
                    wx.setNavigationBarTitle({
                        title: '训练营详情',
                    })
                }
            }
        })

    },

    onReady: function () {
        
    },
    onShow: function (query) {
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