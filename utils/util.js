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

//--- promise 封装ajax
function promiseAjax(_url, type, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: _url,
      method: type,
      data,
      success(res) {//--成功回调
        resolve(res);
      },
      fail(err) {//--失败回调
        reject(err)
      }
    })
  })
}



module.exports = {
  formatTime: formatTime,
  promiseAjax: promiseAjax
}
