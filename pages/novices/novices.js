// pages/novices/novices.js
Page({
  data: {
      hotCity: ['上海', '杭州', '北京', '广州', '深圳', '苏州'],
      area: ["黄浦", "卢湾", "静安", "徐汇", "浦东", "长宁", "虹口", "杨浦", "普陀", "闸北", "闵行", "宝山", "嘉定", "青浦", "奉贤", "南汇"],
      sex:['男孩','女孩'],
      grade: ["小学1年级", "小学2年级", "小学3年级", "小学4年级", "小学5年级", "小学6年级", "小学7年级", "中学7年级", "中学7年级", "中学7年级", "高中1年级", "高中2年级", "高中3年级"],
      step:[false,true,false],
      gradeSel:0,

    },
    chooseGrade:function(e){
        console.log(e);
        let that = this;
        let sel = that.data.gradeSel;
        let grade = that.data.grade;
        let _sel = (e.target.id == 'add') ? (sel + 1) : (sel - 1);
        
        // _sel = (_sel <= 0)?0:'';
        // _sel = (_sel => grade.length) ? grade.length : '';

        console.log(_sel);
        that.setData({
            gradeSel: _sel,
        })

        
        
    },
    nextStep:function(e){
        console.log(e);
        let that = this;
        let step = that.data.step;
        //console.log(citySel);
        let _sel = step.map((itm) => {
            return itm = false;
        });
        _sel[Number(e.target.id)+1] = true;
        that.setData({
            step: _sel
        });
        console.log(that.data.step);
    },
    datePicker:function(){
        let that = this;
        const date = new Date()
        const years = []
        const months = []
        const days = []

        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push(i)
        }

        for (let i = 1; i <= 12; i++) {
            months.push(i)
        }

        for (let i = 1; i <= 31; i++) {
            days.push(i)
        }

        this.setData({
            datePicker:{
                years:years,
                months:months,
                value: [9999,1]
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

    chooseCity:function(e){
        let that = this;
        let citySel = that.data.citySel;
        //console.log(citySel);
        let _sel = citySel.map((itm)=>{
            return itm = false;
        });
        _sel[e.target.id] = true;
        that.setData({
            citySel:_sel
        });
    },

    onLoad: function (options) {
        let that = this;
        that.datePicker();
        const hotCity = that.data.hotCity;
        let citySel = [];
        for (var i in hotCity){
            citySel[i] = false;
        }
        that.setData({
            citySel: citySel
        })
        
    },
    onReady: function () {

    },

  /**
   * 生命周期函数--监听页面显示
   */
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