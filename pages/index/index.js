//index.js
//获取应用实例
const app = getApp();
const base = require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    endtime:40,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindPickerChange:function(e){
        //console.log(e);
        this.setData({
            index:e.detail.value,
        });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  inputBlur:function(e){
      let that = this;
      this.setFocus(e,false);
      if(e.target.id=='phone'){
          if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(e.detail.value))) {
              wx.showModal({
                  title: '提示',
                  content: '请输入正确的手机号',
                  showCancel:false
              })
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
    for (let i = 0; i <= 40;i++){
        setTimeout(function () {
            this.setData({
                codeStat:true,
                phoneDone:false,
                endtime: time - i
            });
            if (this.data.endtime == 0) {
                this.setData({
                    codeStat: false,
                    phoneDone: true,
                    endtime:40
                });
            }
        }.bind(this), i*1000);
    }
    
  },

  checkPhone:function(e){
      let that = this;
      if (!(/^1(3|4|5|7|8)[0-9]\d{8}$/.test(e.detail.value))) {
          that.setData({
              phoneDone: false
          })
       }else{
          that.setData({
              phoneDone: true
          })
      }
  },

  onLoad: function () {
      wx.setNavigationBarTitle({
          title:'名校家长圈'
      })
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
