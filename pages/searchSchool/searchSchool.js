const app = getApp()
const base = require('../../utils/util.js')
Page({
    data: {

    },
    onLoad: function (options) {
        let that = this
        wx.request({
            url: app.host + 'school/getHot',
            data: {
                city: '上海' || that.data.location.city
            },
            success: function (res) {
                console.log(res)
                let stat =  res.data.code
                if(res.data.data){
                    let hot = res.data.data.schools
                    that.setSchool(hot)
                    that.setData({
                        hot: that.data.hotSchool
                    })
                }else{
                    console.log(res.data.message)
                }

                
            }
        })
    },

    searchKeyup: function (e) {
        let that = this;
        let value = e.detail.value;
        if (e.detail.value != '') {
            this.setData({
                clear: true,
                searchKeyWord: e.detail.value
            })
        } else {
            this.setData({
                clear: false,
                schoolStatus: false,
            })
        }

        wx.request({
            url: app.host + 'school/search',
            data: {
                name: e.detail.value,
            },
            success: function (res) {
                console.log(res)
                if (res.data.data) {
                    let _school = res.data.data.schools
                    that.setSchool(_school);
                    that.setData({
                        searchRes: true
                    })
                }else{
                    that.setData({
                        schoolStatus: true,
                        searchMsg: res.data.message
                    })
                }
                // else if (res.data.code === 'KEYWORD_IS_NULL') {
                //     that.setData({
                //         schoolStatus: false,
                //         searchRes: false,
                //         hotSchool: that.data.hot
                //     })
                // }
                // else if (res.data.code === 'NO_SUCH_SCHOOL') {
                //     that.setData({
                //         schoolStatus: true,
                //         searchMsg: res.data.message
                //     })
                // }
            }
        })
    },

    clearKeyword: function (e) {
        this.setData({
            clear: false,
            searchKeyWord: '',
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

    selectedSchool: function (e) {
       let that = this
        wx.navigateBack({
            delta: 0
        })
        let _curPageArr = getCurrentPages()
        let _curPage = _curPageArr[_curPageArr.length-2]
        let info = _curPage.data.info
        info.childSchool = this.data.hotSchool[e.currentTarget.id].id
        _curPage.setData({
            selectedSchool: that.data.hotSchool[e.currentTarget.id].fullName,
            info: info
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