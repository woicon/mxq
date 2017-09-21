// pages/novices/novices.js
const app = getApp()
const base = require('../../utils/util.js')
Page({
  data: {
      hotCity: ['上海', '杭州', '北京', '广州', '深圳', '苏州'],
      area: ["黄浦", "卢湾", "静安", "徐汇", "浦东", "长宁", "虹口", "杨浦", "普陀", "闸北", "闵行", "宝山", "嘉定", "青浦", "奉贤", "南汇"],
      sex:['男孩','女孩'],
      sexSel:[true,false],
      grade: ["幼儿园小班","幼儿园中班","幼儿园大班","小学一年级", "小学二年级", "小学三年级", "小学四年级", "小学五年级", "小学六年级", "初中一年级", "初中二年级", "初中三年级"],
      step:[true,false,false],
      gradeSel:0,
      search:false,
      info:{}
    },

    chooseGrade:function(e){
        let that = this
        let sel = that.data.gradeSel
        let grade = that.data.grade
        let _sel
        let info = that.data.info
        if (e.target.id == 'add'){
            _sel = (sel < grade.length - 1) ? (sel + 1) : (grade.length - 1)
        } else if (e.target.id == 'min'){
            _sel = (sel == 0) ? 0 : (sel - 1)
        }
        info.childGrade = _sel+1
        that.setData({
            gradeSel: _sel,
            info:info,
        })
    },

    dateChange:function(e){
        console.log(e)
        let that = this
        let info = that.data.info
        let val = e.detail.value
        info.childBirth = that.data.datePicker.years[val[0]]+that.data.datePicker.months[val[1]]
        that.setData({
            info:info
        })
    },

    childSex:function(e){
        let that = this;
        that.selected('sexSel',e.target.id);
        let info = that.data.info;
        info.childGender = that.data.sex[e.target.id];
        that.setData({
            info: info,
        })
    },

    setInfo:function(name,value){
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

    nextStep:function(e){
        let that = this;
        let step = that.data.step;
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
            if (i < 10) {
                i = '0' + i;
            }
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

    searchSchool:function(e){
        let that = this;
        that.setData({
            search:true
        });
        wx.request({
            url:app.host + 'school/getHot',
            data:{
                city:'上海'|| that.data.location.city
            },
            success:function(res){
                //console.log(res);
                if(res.data.status == 0){
                    let hot = res.data.data.schools;
                    that.setSchool(hot);
                    that.setData({
                        hot:that.data.hotSchool
                    })
                }
            }
        })
    },

    setSchool:function(hot){
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

    searchKeyup:function(e){
        let that = this;
        let value = e.detail.value;
        if(e.detail.value != ''){
            this.setData({
                clear:true,
                searchKeyWord:e.detail.value
            })
        }else{
            this.setData({
                clear: false,
                schoolStatus:false,
            })
        }

        wx.request({
            url: app.host + 'school/search',
            data: {
                name:e.detail.value,
            },
            success:function(res){
                console.log(res);
                if (res.data.status == 0){
                    let _school = res.data.data.schools;
                    that.setSchool(_school);
                    that.setData({
                        searchRes:true
                    })
                }
                else if (res.data.code === 'KEYWORD_IS_NULL'){
                    that.setData({
                        schoolStatus: false,
                        searchRes: false,
                        hotSchool:that.data.hot
                    })
                }
                else if (res.data.code === 'NO_SUCH_SCHOOL'){
                    that.setData({
                        schoolStatus:true,
                        searchMsg:res.data.message
                    })
                }
            }
        })
    },
    
    clearKeyword:function(e){
        this.setData({
            clear:false,
            searchKeyWord:'',
        })
    },

    selectedSchool:function(e){
        let info = this.data.info;
        info.childSchool = this.data.hotSchool[e.currentTarget.id].id;
        this.setData({
            search:false,
            info:info,
            selectedSchool: this.data.hotSchool[e.currentTarget.id].fullName,
        })
    },

    chooseCity:function(e){
        let that = this
        let citySel = that.data.citySel
        let _sel = citySel.map((itm)=>{
            return itm = false;
        });
        _sel[e.target.id] = true
        let info = that.data.info
        let selCity = that.data.hotCity[e.target.id]
        info.city = selCity
        
        let yourLocation = app.globalData.location;
        that.getCity({
            data: {
                city: selCity
            },
            success:function(res){
                let arealist = res.data.data.cities;
                let datas = res.data.data;
                let area = [];
                for (let i in arealist){
                    area[i] = arealist[i].district
                }
                that.setData({
                    area: area
                })
            }
        });
        that.setData({
            citySel: _sel,
            info: info
        });
    },

    getCity:function(opt){
        wx.request({
            url: app.host + 'location/getCityList',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data:opt.data||'',
            success: function (res) {
                opt.success(res);
            },
            fail: function (res) {
                opt.fail(res);
            }
        })
    },

    //提交
    subimtInfo:function(){
        let that = this;
        wx.request({
            url: app.host + 'user/completeInfo',
            method:'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: that.data.info,
            success:function(res){

            }
        })
    },

    inputName:function(e){
        let that = this;
       let value = e.detail.value;
       let info = that.data.info;
       info.nickname = value.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g, "");
       that.setData({
            info:info
       })
    },
    onLoad: function (options) {
        let that = this;
        
        wx.setNavigationBarTitle({
            title: '名校家长圈',
        })
        that.datePicker();
        
        base.msg('您当前所在位置:' + app.globalData.location.province);
        that.getCity({
            success:function(res){
                let cityList = res.data.data.cities;
                let city = [];
                for (var i in cityList){
                    city[i] = cityList[i].city;
                }
                let citys = base.distinct(city)
                let citySel = [];
                for (var i in citys) {
                    citySel[i] = false;
                }
                that.setData({
                    hotCity: citys,
                    citySel: citySel
                })
                
            }
        });
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