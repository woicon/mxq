var app = getApp()
const base = require('../../utils/util.js')
Page({
    data: {
        grade: app.grade,
        sex: ['男孩', '女孩'],
        info:{},
        gradeSel:0
    },
    chooseGrade: function (e) {
        let that = this
        let gradeSel = that.data.gradeSel
        let gradeLength = that.data.grade.length
        let _value
        if (e.target.id === 'add') {
            _value = (gradeSel < gradeLength - 1) ? (gradeSel + 1) : gradeLength - 1
        } else {
            _value = (gradeSel > 0) ? (gradeSel - 1) : 0
        }
        let info = that.data.info
        info.childGrade = _value + 1
        that.setData({
            gradeSel: _value,
            info: info,
        })
    },
    dateChange: function (e) {
        console.log(e)
        let that = this
        let info = that.data.info
        let val = e.detail.value
        info.childBirth = that.data.datePicker.years[val[0]] + that.data.datePicker.months[val[1]]
        that.setData({
            info: info
        })
    },
    childSex: function (e) {
        let that = this
        let info = that.data.info
        info.childGender = that.data.sex[e.target.id]
        that.setData({
            info: info,
            sexSel: e.target.id
        })
    },
    searchSchool: function (e) {
        wx.navigateTo({
            url: '/pages/searchSchool/searchSchool',
        })
    },
    datePicker: function () {
        let that = this;
        const date = new Date()
        const years = []
        const months = []
        const days = []
        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push(i)
        }
        for (let i = 1; i <= 12; i++) {
            if (i < 10) {
                i = '0' + i;
            }
            months.push(i)
        }
        for (let i = 1; i <= 31; i++) {
            days.push(i)
        }
        this.setData({
            datePicker: {
                years: years,
                months: months,
                value: [9999, 1]
            }
        })
    },
    
    bindChange: function (e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })
    },
    setSchool: function (hot) {
        let school = [];
        for (var i in hot) {
            school[i] = {
                fullName: hot[i].fullName,
                alias: hot[i].alias[0].alias,
                id: hot[i].locationId
            }
        }
        this.setData({
            hotSchool: school,
            schoolStatus: false,
        })
    },
    nextStep:function(e){
        wx.navigateTo({
            url: '/pages/novices/novices_three',
        })
    },

    onLoad: function (options) {
        let that = this
        that.datePicker()
    },

    onReady: function () {
        wx.setNavigationBarTitle({
            title: '新手引导',
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