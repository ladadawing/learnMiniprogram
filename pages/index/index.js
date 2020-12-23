import { request } from '../../request/index'
Page({
  data: {
    swiperList: [], // 轮播图数据
    catesList:[], // 导航栏数据
    floorList:[] // 楼层数据
  },
  onLoad(){
    this.getSwiperList(),
    this.getCatesList(),
    this.getFloorList()
  },
  onHide(){

  },
  // 获取轮播图数据
  getSwiperList() { 
    // wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success:(res) => { 
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata' })
      .then(res => { 
        this.setData({
          swiperList:res.data.message
        })
      })
  },
  //获取导航数据
  getCatesList() { 
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems' })
      .then(res => { 
        this.setData({
          catesList:res.data.message
        })
      })
  },
  //获取楼层数据
  getFloorList() { 
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata' })
      .then(res => { 
        this.setData({
          floorList:res.data.message
        })
      })
  }
  
});
  