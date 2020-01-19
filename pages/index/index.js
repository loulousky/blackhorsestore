//index.js
//获取应用实例
const http=require('../../utils/http.js')
const app = getApp();


Page({
  /**
     * 页面的初始数据
     */
  data: {

    imgs: [],
    guides: [],
    louceng: [],

  },
 
 /**
  * 获取banner
  */
  loadBanner: function () {
    var that=this;
  
    http.http({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',

    }).then(function(data){
      console.log(data);
      that.setData({
        imgs: data.message
      })
    });

  },

  /**
   * 获取导航栏四个标签页
   */
  loadGUIde: function () {
    var that=this;

    http.http({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',

    }).then(function(data){
      console.log(data);
      that.setData({
        guides: data.message
      })

    });



  },

  /**
   * 获取推荐的商品列表
   */
  loadGoods:function(){

   http.http({
     url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
     data: '',
     header: {},
     method: 'GET',
     dataType: 'json',
     responseType: 'text',
   }).then(data=>{

     console.log(data);
     this.setData({
       louceng:data.message

     });

   });




  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    

    this.loadBanner();
    this.loadGUIde();
    this.loadGoods();
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