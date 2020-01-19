// pages/goods_list/index.js

const httputil = require('../../utils/http.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    tabs:[

      {
        id:0,
        name:"综合",
        active:true
      },
      {
        id: 1,
        name: "销量",
        active: false
      },
      {
        id: 2,
        name: "价格",
        active: false
      }



    ],

    
    tabsdata:[
     {pageNo:1,
      pageSize:10,
      query:''
     },
      {
        pageNo: 1,
        pageSize: 10,
        query: ''
      },
      {
        pageNo: 1,
        pageSize: 10,
        query: ''
      }
    ],

    goods:[],

    currentTab: 0
  },


cid:0,


/**
 * 获取列表数据
 */

 getGoods:function(e){

   httputil.http({
     url: 'https://api.zbztb.cn/api/public/v1/goods/search',
     data: { query: this.data.tabsdata[this.data.currentTab].query, 
     cid: this.cid,
      pagenum: this.data.tabsdata[this.data.currentTab].pageNo, 
      pagesize: this.data.tabsdata[this.data.currentTab].pageSize},
     header: {},
     method: 'GET',
     dataType: 'json',
     responseType: 'text',

   }).then((data)=>{

    console.log(data);

    this.setData({
      goods:data.message.goods
    })


   });


 },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    this.cid=options.cid;

    this.getGoods();


  },

  bindtab:function(e){

   
  let datas=this.data.tabs;
    console.log(e.detail);
    for (let i = 0; i < datas.length;i++){
        
        datas[i].active=false;

    
   }
  datas[e.detail].active=true;
   this.setData({
     tabs:datas,
     currentTab:e.detail

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
 

    console.log("刷新");
    let tt = this.data.tabsdata;
    tt[this.data.currentTab].pageNo = 1;

    this.setData({
      tabsdata: tt
    });
    httputil.http({
      url: 'https://api.zbztb.cn/api/public/v1/goods/search',
      data: {
        query: this.data.tabsdata[this.data.currentTab].query,
        cid: this.cid,
        pagenum: this.data.tabsdata[this.data.currentTab].pageNo,
        pagesize: this.data.tabsdata[this.data.currentTab].pageSize
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',

    }).then((data) => {
      wx.stopPullDownRefresh();
      this.setData({
        goods: data.message.goods
      });
    });

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

// 要在这里继续请求 
    let current=this.data.currentTab;
   
    let page = this.data.tabsdata[current].pageNo+1;

    let tt = this.data.tabsdata;

    tt[this.data.currentTab].pageNo=page;

    this.setData({
      tabsdata:tt
    })

  //发送请求
    httputil.http({
      url: 'https://api.zbztb.cn/api/public/v1/goods/search',
      data: {
        query: this.data.tabsdata[this.data.currentTab].query,
        cid: this.cid,
        pagenum: this.data.tabsdata[this.data.currentTab].pageNo,
        pagesize: this.data.tabsdata[this.data.currentTab].pageSize
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',

    }).then((res) => {

      let gs = this.data.goods;
      let now = res.message.goods;
      if (now.length==0){
        wx.showToast({
          title: '没有更多了',
        })
        let page = this.data.tabs[this.data.currentTab].pageNo -1;

        let data = this.data.tabs;

        data[this.data.currentTab].pageNo = page;
        this.setData({
          tabs: data
        })
      }
      gs=gs.concat(now);
      this.setData({
        goods: gs
      })


    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})