var app = getApp();
const base = require('../../utils/util.js');
Page({
  data: {
      hotSearch: ['北京三中', '锦江小学', '人大附小', '人大附中', '中关村一小222', '世外附小','上外附小', '清华附中'],
      tag:[
          {
              title:'语言表达',
              info:'幼升小看图说话'
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
    detail:false,
    schoolType: ['小学', '初中', '高中', '幼儿园'],
    filtr: ['星级最高', '价格最高', '价格最低','评论最多']
  },

    changePicker:function(e){
        let that = this
        let name = e.target.dataset.name
        that.setData({
            [e.target.id]:that.data[name][e.detail.value]
        })
    },
    searchRes:function(e){
        this.setData({
            detail:true
        })
    },
    toSearch:function(){
        wx.navigateTo({
            url: '/pages/searchSchool/searchSchool',
        })
    },

    onLoad: function (options) {
        app.setTab()
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