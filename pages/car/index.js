// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //当前地址
     address:{},
     goods:[],
     totalprice:0,
     allcheck:true
  },
  /**
   * 添加地址按钮
   */
  gotoaddaddress:function(){
    let that=this;
    wx.getSetting({
      success: function(res) {
        console.log(res);
        if (res.authSetting["scope.address"] == true || res.authSetting["scope.address"]==undefined){
             //直接请求地址权限
          wx.chooseAddress({
            success: function (res) {
              //拿到地址存储记录
              console.log(res);
              wx.setStorageSync("address", res);
              that.setData({
               address:res
              });
            },

          });
        }else{
          //没有权限弹出授权窗口
          wx.openSetting({
            success: function(res) {
              if (res.authSetting["scope.address"] == true) {
                //直接请求地址权限
                wx.chooseAddress({
                  success: function (res) {
                     //拿到地址存储记录
                     wx.setStorageSync("address", res);
                    that.setData({
                      address: res
                    });
                  },
                })
              }
            },
           
          })
        }
      },
    });
  },

  /**
   * 单个item点击check的回调事件
   */
  itemcheckboxchange:function(e){
     console.log(e);
     let goods=this.data.goods;
    if(goods[e.currentTarget.dataset.flag].checked){
      goods[e.currentTarget.dataset.flag].checked=false;
  
    }else{
      goods[e.currentTarget.dataset.flag].checked = true;
    }
    //更新数据

    wx.setStorageSync("cars", goods);

    this.setPrice();

  },

   /**
    * 全选和全不选
    */
  allcheckchange:function(e){
   let checked=e.currentTarget.dataset.checked;
    //全部不选
    let goods = this.data.goods;
   if(checked){
  
     for(let i=0;i<goods.length;i++){
        goods[i].checked=false;
     }
     wx.setStorageSync("cars", goods);
     this.setData({
        allcheck:false,
       goods: goods
     });
   }else{
     //全选
     for (let i = 0; i < goods.length; i++) {
       goods[i].checked = true;
     }
     this.setData({
       allcheck: true,
       goods:goods
     });
     wx.setStorageSync("cars", goods);
   }
    this.setPrice();
  },
 

 /**
  * 更新价格
  */
  setPrice:function(){
    let goods = this.data.goods;
    let totalprice = 0;
    let allcheck=true;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].checked === true) {
        totalprice = totalprice + goods[i].goods_price * goods[i].num;
      }else{
        allcheck = false;
      }
    }
    this.setData({
      totalprice: totalprice,
      allcheck:allcheck
    })
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
      //每次页面进来的时候刷新
      let add=wx.getStorageSync("address")||{};
      let goods=wx.getStorageSync("cars")||[];
      let totalprice=0;
      let allcheck=true;
      //计算总价
      for(let i=0;i<goods.length;i++){
        if(goods[i].checked===undefined){
          goods[i].checked=true;
        }
        if(goods[i].checked===false){

          console.log("有不选的");
          allcheck=false;
        }else{
          totalprice = totalprice + goods[i].goods_price * goods[i].num;
        }
      }
    console.log(goods);
    wx.setStorageSync("cars", goods);
     //更新数据
      this.setData({
         address:add,
         goods:goods,
         totalprice:totalprice,
         allcheck: allcheck
      })

  },


  /**
   * 
   *  加一 
   */
   
  add:function(e){
    console.log(e);
     //当前的数量加一然后更细到本地存储
     let goods=this.data.goods;
     let index=e.currentTarget.dataset.index;
     goods[index].num = goods[index].num+1;

  //重新存储
    this.setData({
      goods:goods
    });
    wx.setStorageSync("cars", goods);
    this.setPrice();

  },

  /**
   * 减一
   */ 
  reduce:function(e){
    let goods = this.data.goods;
    let index = e.currentTarget.dataset.index;
    if (goods[index].num - 1==0){
      //删除
      goods.splice(index,1);
    }else{
    goods[index].num = goods[index].num - 1;
    }
    //重新存储
    this.setData({
      goods: goods
    });
    wx.setStorageSync("cars", goods);
    this.setPrice();
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