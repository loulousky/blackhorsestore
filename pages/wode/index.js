// pages/wode/index.js
const common=require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let user=wx.getStorageSync(common.userinfoname())||{};
    console.log(user);
    console.log(user.userInfo);
    if(user.userInfo==undefined){
      //跳转到登录界面 
      wx.navigateTo({
        url: "../login/index",
      });
    }else{
      this.setData({
        userInfo:user.userInfo
      });
    }
  


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})