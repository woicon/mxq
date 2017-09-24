var app = getApp()
const base = require('../../utils/util.js')
Page({

  data: {
      teacher: ['未申请',' 已申请未审核','已审核通过','未通过'],
      auth: ['未申请','已申请未审核','已审核通过','未通过'],
      application: ['未申请','已申请','审核中','2已通过','未通过']

  },
  onLoad: function (options) {
      let that = this;
      app.setTab()
      
  },
  onReady: function () {
  
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