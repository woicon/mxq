var app = getApp()
const base = require('../../utils/util.js')
var mtabW
Page({
    data: {
        tabBar: app.tabBar,
        currentTab: 0,
        activeIndex: 0,
        slideOffset: 0,
        tabW: 0,
        pageTitle: ['训练营', '发现', '有奖推荐', '我'],
        hotSearch: ['北京三中', '锦江小学', '人大附小', '人大附中', '中关村一小222', '世外附小', '上外附小', '清华附中'],
        tag: [
            {
                title: '语言表达',
                info: '幼升小看图说话'
            },
            {
                title: '语言表达',
                info: '幼升小看图说话2123213'
            },
            {
                title: '语言表达',
            },
            {
                title: '语言表达',
                info: '幼升小看图说话'
            },
            {
                title: '高效英语',
                info: '幼升小看图说话'
            }
        ],
        detail: false,
        schoolType: ['小学', '初中', '高中', '幼儿园'],
        filtr: ['星级最高', '价格最高', '价格最低', '评论最多'],
        teacher: ['未申请', '已申请未审核', '已审核通过', '未通过'],
        auth: ['未申请', '已申请未审核', '已审核通过', '未通过'],
        application: ['未申请', '已申请', '审核中', '已通过', '未通过']
    },
    tabClick: function (e) {
        var that = this
        var idIndex = e.currentTarget.id
        var offsetW = e.currentTarget.offsetLeft
        this.setData({
            activeIndex: idIndex,
            slideOffset: offsetW
        });
    },
    tabChange: function (e) {
        let that = this
        var current = e.detail.current
        console.log(current)
        if ((current + 1) % 4 == 0) {
        }
        var offsetW = current * mtabW
        let pageTitle = that.data.pageTitle
        wx.setNavigationBarTitle({
            title: pageTitle[current],
        })
        that.setData({
            activeIndex: current,
            slideOffset: offsetW,
        });

    },
    changePicker: function (e) {
        let that = this
        let name = e.target.dataset.name
        that.setData({
            [e.target.id]: that.data[name][e.detail.value]
        })
    },
    searchRes: function (e) {
        this.setData({
            detail: true
        })
    },
    toSearch: function () {
        wx.navigateTo({
            url: '/pages/searchSchool/searchSchool',
        })
    },

    onLoad: function (options) {

    },

    onReady: function () {
        wx.hideLoading()
        let that = this
        // 获取系统信息 
        let pageTitle = that.data.pageTitle
        wx.setNavigationBarTitle({
            title: '训练营',
        })
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    onShow: function () {
        let that = this
        wx.showLoading()
        wx.request({
            url: app.host + 'user/getDetail',
            data: {
                id: app.member.id
            },
            success: function (res) {
                if (res.data.data) {
                    console.log(res.data.data)
                    that.setData({
                        member: res.data.data
                    })
                } else {
                    base.msg(res.data.message)
                }
                wx.hideLoading()
            }
        })
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