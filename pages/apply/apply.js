var app = getApp()
const base = require('../../utils/util.js')
Page({
    data: {
        payStat:true,
        sex: ['男孩', '女孩'],
        grade: app.grade,
        gradeSel:1,
        applyOk:false
    },
    childSex:function(e){
        let that = this
        that.setData({
            sexSel:e.target.id
        })
    },
    applyOk:function(){
        wx.redirectTo({
            url: '/pages/home/home',
        })
    },
    chooseGrade:function(e){
        console.log(e)
        let that = this
        let gradeSel = that.data.gradeSel
        let gradeLength = that.data.grade.length
        let _value
        if(e.target.id === 'add'){
            _value = (gradeSel < gradeLength - 1) ? (gradeSel + 1) : gradeLength - 1
        }else {
            _value = (gradeSel > 0) ? (gradeSel - 1) : 0
        }
        that.setData({
            gradeSel:_value
        })
    },
    submitApply:function(){
        this.setData({
            applyOk:true
        })
    },
    hideLayer:function(){
        this.setData({
            payStat: false
        })
        
    },
    onLoad: function (options) {

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