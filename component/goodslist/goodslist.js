// component/goodslist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    list:{
      type:Array,
      value:[]
     },


  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickitem:function(e){
      //拿到当前的下班，通知父组件改变数据

 
    this.triggerEvent("tabevent",e.currentTarget.dataset.index);

    }

  }
})
