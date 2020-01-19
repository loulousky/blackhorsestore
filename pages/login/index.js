// pages/login/index.js

const common=require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  userInfo:function(e){
    wx.setStorageSync(common.userinfoname(), e.detail);
    wx.navigateBack({
      delta: 1,
    })
  }
})