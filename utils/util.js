
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
    formatTime: formatTime,
    //消息框
    msg:function(txt){
    let _curPageArr = getCurrentPages();
    let _curPage = _curPageArr[_curPageArr.length-1];
    _curPage.setData({
        msg:txt,
    })
    setTimeout(function(){
        _curPage.setData({
            msg:'',
        })
    },1500)
    },
    //去重
    distinct: function(arr) {
        var result = [],
            i,
            j,
            len = arr.length;
        for (i = 0; i < len; i++) {
            for (j = i + 1; j < len; j++) {
                if (arr[i] === arr[j]) {
                    j = ++i;
                }
            }
            result.push(arr[i]);
        }
        return result;
    },
    ajax:function(opt){
        let header = (opt.type) ? { 'content-type': 'application/x-www-form-urlencoded' }:{ 'content-type': 'application/json' }
        wx.request({
            url:'http://101.132.71.121:8080/' + opt.url,
            method: opt.type || 'GET',
            header: header,
            data: opt.data || '',
            success: function (res) {
                opt.success(res);
            },
            fail: function (res) {
                opt.fail(res);
            },
            complete:function(res){
                opt.complete(res);
            }
        })
    }
}
