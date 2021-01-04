import { request } from '../../request/index';

Page({
  data: {
    tabs: [
      {
        id: 0,
        label: "综合",
        isActive:true
      },
      {
        id: 1,
        label: "销量",
        isActive:false
      },
      {
        id: 2,
        label: "价格",
        isActive:false
      }
    ],
    goodsList: []
  },
  onLoad(options) { 
    console.log(options)
    this.getGoodsList()
  },
  // 点击tab切换
  handleItem(e) { 
    const { index } = e.detail //获取被点击的标题索引
    let { tabs } = this.data //修改原数组
    tabs.forEach((item,i)=> i === index ? item.isActive = true :item.isActive = false)
    this.setData({
      tabs
    })
  },
  // 请求商品列表数据
  getGoodsList() { 

  }
})