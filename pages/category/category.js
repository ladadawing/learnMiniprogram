import { request } from '../../request/index';
// import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    leftMenuList: [], //左侧商品数据
    rightContent: [], //右侧商品数据
    currentIndex: 0, //选中当前的菜单
    scrollTop:0
  },
  Cates:[],//接口返回的数据
  onLoad() {
    /**
     * 1.先判断一下本地存储中是否有旧数据
     * 本地存储数据格式：{time：Date.now() 时间戳,data:[...]}
     * 2.没有旧数据，直接发送新的请求
     * 3.有旧的数据，且无过期，可以直接从本地取
     */
    // this.getCates()
    //1.先获取本地存储中的数据（小程序）
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      //如果不存在直接请求
      this.getCates()
    } else { 
      if (Date.now() - Cates.time > 1000 * 30) {
        //定义过期时间,两个时间相减超过多少秒，重新请求，是毫秒单位
        this.getCates()
      } else {
        console.log("可以使用旧数据")
        this.Cates = Cates.data //这样就可以获取本地数据
        let leftMenuList = this.Cates.map(item => { return item.cat_name })
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
       }
    }
  },
  // 获取分类数据
   async getCates() {
    // request({ url: '/categories' })
    //   .then(res => { 
    //     // console.log(res)
    //     this.Cates = res.data.message

    //     //把请求回来的数据存储在本地存储中
    //     wx.setStorageSync("cates", {
    //       time: Date.now(),
    //       data:this.Cates
    //     })

    //     //构造左侧菜单栏数据
    //     let leftMenuList = this.Cates.map(item => { return item.cat_name })
    //     // 右侧菜单数据
    //     /**
    //      * 1.首先传入不同索引就会显示不同的内容
    //      */
    //     let rightContent = this.Cates[0].children
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    const res = await request({ url: '/categories' })
    this.Cates = res.data.message
      //把请求回来的数据存储在本地存储中
      wx.setStorageSync("cates", {
        time: Date.now(),
        data:this.Cates
      })

      //构造左侧菜单栏数据
      let leftMenuList = this.Cates.map(item => { return item.cat_name })
      // 右侧菜单数据
      /**
       * 1.首先传入不同索引就会显示不同的内容
       */
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  // 点击左侧菜单
  handleItemIndex(e) { 
    /*
      1.先获取被点击的标题身上的索引
      2.给currentIndex 赋值
      3.根据不同的索引渲染右侧的商品内容
    */
    const { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,   
      rightContent,
      scrollTop:0 //重新设置scrollTop为0
    })

  }
})