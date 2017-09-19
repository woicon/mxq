const app = getApp();
const base = require('../../utils/util.js');
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        endtime:40,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    bindPickerChange:function(e){
        this.setData({
            index:e.detail.value,
        });
    },
    
    loginSys:function(e){
        let that = this;
        if (that.data.phoneNumber){
            if (!that.data.phoneCode) {
                base.msg('请输入验证码')
            }else{
                if (that.data.exists) {
                    //登录
                    wx.request({
                        url: app.host + 'auth/login',
                        method: 'POST',
                        data: {
                            'phone': that.data.phoneNumber,
                            'number': that.data.phoneCode
                        },
                        success: function () {

                        }
                    })
                } else {
                    //注册
                    wx.request({
                        url: app.host + '/auth/register',
                        method: 'POST',
                        data: {
                            'phone': that.data.phoneNumber,
                            'number': that.data.phoneCode,
                            'channel': -1
                        },
                        success: function (res) {
                            base.msg(res.data.message);
                        }
                    })
                };
            }
        }else{
            base.msg('请输入手机号')
        }
        
    },

    inputBlur:function(e){
        let that = this;
        this.setFocus(e,false);
        if(e.target.id=='phone'){
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(e.detail.value))) {
                base.msg('请输入正确的手机号');
            }else{
            that.setData({
                phoneDone:true,
            })
            }
        }
    },

    inputFocus:function(e){
        this.setFocus(e,true)
    },
    
    setFocus:function(e,stat){
        let that = this;
        let focus = {};
        focus[e.target.id] = stat;
        that.setData(focus);
    },

    getCode:function(e){
        let that = this;
        let time = that.data.endtime;
        wx.request({
            url: app.host + 'auth/getVerify',
            data: {
                phone: that.data.phoneNumber
            },
            success: function (res) {
                console.log(res);
                base.msg(res.data.message);
                if(res.data.data){
                    that.setData({
                        exists: res.data.data.exists
                    });
                    for (let i = 0; i <= 40; i++) {
                        setTimeout(function () {
                            that.setData({
                                codeStat: true,
                                phoneDone: false,
                                endtime: time - i
                            });
                            if (that.data.endtime == 0) {
                                that.setData({
                                    codeStat: false,
                                    phoneDone: true,
                                    endtime: 40
                                });
                            }
                        }.bind(that), i * 1000);
                    }
                }
            },
        })
    },

    checkPhone:function(e){
        let that = this;
        if (!(/^1(3|4|5|7|8)[0-9]\d{8}$/.test(e.detail.value))) {
            that.setData({
                phoneDone: false,
            })
         }else{
            that.setData({
                phoneDone: true,
                phoneNumber: e.detail.value
            })
        }
    },
    checkCode: function (e) {
        let that = this;
        if(e.detail.value.length==6){
            that.setData({
                phoneCode:e.detail.value
            })
        }
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title:'名校家长圈'
        });
        if (app.globalData.userInfo) {
            this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
                })
            }
            })
        }
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
