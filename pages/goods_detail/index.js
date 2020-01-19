// pages/goods_detail/index.js

const app = getApp();
//网络请求
const httputil = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    goodsdetail:{}
    
  },


  cid:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拿到具体的商品ID
    this.cid=options.cid;

    this.loadGoodsDetaile();
    
  },

/**
 * 点击放大图片
 */

  picsclick:function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.pic],
    });
  },
  /**
   * 加载数据
   */
  loadGoodsDetaile:function(){
  
    httputil.http({
      url: 'https://api.zbztb.cn/api/public/v1/goods/detail',
      data: { goods_id:this.cid},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text'}).then((res)=>{

        console.log(res);

        this.setData({

          goodsdetail:res.message

        })


    });





},

/**
 * 添加到购物车，本地存储
 */
  addtocar:function(e){
   //把当前的对象保存如果存在则num加一
   console.log(e);

   let cars=wx.getStorageSync("cars")||[];
   
   let good=cars.findIndex((a)=>{
    return  a.goods_id==this.cid
   });
   if(good==-1){
     //找不到数据
     let car=this.data.goodsdetail;
     car.num=1;
     cars.push(car);
     wx.setStorageSync("cars", cars);
    
   }else{
      //拿到数据
      cars[good].num=cars[good].num+1;

     wx.setStorageSync("cars", cars);
   }
   //存储数据
    

    


   wx.showToast({
     title: '添加成功',
   });



  },

  /**
   * 跳转到购物车
   */
  gotocar:function(){

   wx.switchTab({
     url: '../car/index',
   });
 

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