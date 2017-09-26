var app = getApp()
const base = require('../../utils/util.js')
Page({
  data: {
      hotCity: ['北京市',"上海市","杭州市"],
      area:[],
      search:false,
      areaStat:false,
      info:{}
    },

    setInfo:(name,value)=> {
        let that = this;
        let _info = that.data.info;
        _info[name] = value;
        that.setData({
            "info":_info,
        })
    },

    //单选
    selected:function(data,id){
        let that = this;
        let _data = that.data[data];
        for (var i in _data) {
            _data[i] = false
        }
        _data[id] = true;
        that.setData({
            [data]: _data
        });
    },

    nextStep:function(e) {
        wx.navigateTo({
            url: '/pages/novices/novices_two',
        })
    },
    chooseCity:function(e){
        let that = this
        let _sel = that.select({
            arr: that.data.citySel,
            id: e.target.id
        });
        let info = that.data.info
        let selCity = that.data.hotCity[e.target.id]
        info.city = selCity
        let yourLocation = app.globalData.location;
        that.getCity({
            data:{
                city: selCity
            },
            success:function(res){
                let arealist = res.data.data.cities
                let datas = res.data.data
                let area = []
                let areaSel = []

                for (let i in arealist){
                    area[i] = arealist[i].district
                    areaSel[i] = false
                }
                that.setData({
                    area: area,
                    areaSel:areaSel
                })
            }
        });
        that.setData({
            citySel: _sel,
            info: info
        });
    },

    getCity:function(opt){
        wx.showLoading();
        wx.request({
            url: app.host + 'location/getCityList',
            method: 'POST',
            data:opt.data||'',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            //data:opt.data||'',
            success: function (res) {
                opt.success(res)
                wx.hideLoading()
            },
            fail: function (res) {
                opt.fail(res)
                wx.hideLoading()
            }
        })
    },
    
    chooseDistrict:function(e){
        let that = this
        if(that.data.area.length != 0){
            that.setData({
                areaStat:true,
                district: e.target.id
            });
        }else{
            base.msg('请选择在哪个城市寻找导师')
        }
    },

    hideArea:function(){
        this.setData({
            areaStat:false
        });
    },

    chooseArea:function(e){
        console.log(e)
        let that = this
        let areaSel = that.data.areaSel
        let _sel = that.select({
            arr:areaSel,
            id: e.target.id
        })
        that.setData({
            areaSel: _sel,
            selectArea:e.target.id
        })
    },
    select:function(o) {
        let arr = o.arr
        let _arr = arr.map(itm =>{
            return itm = false
        })
        _arr[o.id] = true
        return _arr
    },

    selectArea:function(e){
        let that = this
        let name = e.target.dataset.name
        let info = that.data.info;
        info[name] = that.data.area[that.data.selectArea]
        that.setData({
            info: info,
            areaStat: false
        })
    },

    onLoad: function (options) {
        console.log('onload')
        let that = this
        
        wx.getStorage({
            key: 'location',
            success: function (res) {
                that.setData({
                    location: res.data
                })
            },
            fail:function(){
                that.setData({
                    location: {
                        city: '上海',
                        province: '上海'
                    }
                })
            }
        })
        
       // base.msg('您当前所在位置:' + app.globalData.location.province)
    },

    onReady: function () {
        console.log('onReady')
        let that = this
        wx.setNavigationBarTitle({
            title: '名校家长圈',
        })
        console.log(that.data.location.city)
        wx.request({
            url: app.host + 'location/getCityList',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                city: that.data.location.city
            },
            success: function (rt) {
                console.log(rt)
                if (rt.data.data) {
                    let arealist = rt.data.data.cities
                    let area = []
                    let areaSel = []
                    for (let i in arealist) {
                        area[i] = arealist[i].district
                        areaSel[i] = false
                    }
                    that.setData({
                        area: area,
                        areaSel: areaSel
                    })
                }
                wx.hideLoading()
            },
            fail: function (res) {
                opt.fail(res)
                wx.hideLoading()
            }
        })
        wx.hideLoading()
    },

    onShow: function () {
        let that = this
        wx.request({
            url: app.host + 'location/getCityList',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(res)
                let cityList = res.data.data.cities
                let city = []
                for (var i in cityList) {
                    city[i] = cityList[i].city;
                }
                let citys = base.distinct(city)
                let citySel = [];
                for (var i in citys) {
                    citySel[i] = (citys[i] == that.data.location.city) ? true : false
                }
                that.setData({
                    hotCity: citys,
                    citySel: citySel,

                })
                wx.hideLoading()
            },
            fail: function (res) {
                opt.fail(res)
                wx.hideLoading()
            }
        })
        
       // console.log('onShow' + app.globalData.selectSchool.fullName)
    },

    onHide: function () {
        console.log('onHide')
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