// pages/fenlei/index.js

const httputil = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

   leftmenu:[],

   rightmenu:[],

   position:0,
   scroll:"0"


  },

 loadLeft:function(){

  var that=this;
  wx.showLoading({
  title: '数据加载中',
   });
   httputil.http({
     url: 'https://api.zbztb.cn/api/public/v1/categories', data: '',
     method: 'GET',
     dataType: 'json',
     responseType: 'text'}).then(function(data){
        console.log(data);
        wx.setStorageSync("datas", data);
       that.setData({
          leftmenu:data.message,
          rightmenu:data.message[0].children,

        });
        wx.hideLoading();
     });
 },

 /**
  * 点击事件触发
  */
  clickmenu:function(e){
  //拿到当前的点


  let position1=e.currentTarget.dataset.flag;
  

  this.setData({
    position: position1,
    rightmenu:this.data.leftmenu[position1].children,
    scroll:"0"
  });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    let datas=wx.getStorageSync("datas");
    if(!datas){
      this.loadLeft();
    }else{
      /**
       * 添加缓存
       */
      this.setData({
        leftmenu: datas.message,
        rightmenu: datas.message[0].children,
        

      });
    }
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