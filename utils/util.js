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
  }
}
