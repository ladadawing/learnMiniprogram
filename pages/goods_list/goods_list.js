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
    goodsList:[]
  },
  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize:10
  },
  //总页数
  totalPages:1, //为默认值
  onLoad(options) { 
    console.log(options)
    this.QueryParams.cid = options.cid
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
  // 获取商品列表数据
  async getGoodsList() { 
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    const total = res.data.message.total;
    console.log(res)
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)   
    // console.log(this.totalPages,'总页数');
    this.setData({ //先解构原来的数据，再放请求回来的数据
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })

    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh()

  },
  /**上拉加载
   * 1.用户上滑页面，滚动条触底，页面加载下一条数据
   *   1）找到滚动条触底事件
   *   2）判断还有没有下一页数据
   *        1)获取总页数和获取到当前的页码；当前页码pagenum、只有总条数，
   *        总页数 = Math.ceil(总条数/页容量 pageSize)
   *        2）判断当前的页码是否大于等于总页数，表示没有下一页  
   *   3）假如 没有下一页数据，弹出一个提示框，如果有下一页数据，来加载数据
   *        1）当前的页码++
   *        2）重新发送请求，数据请求回来要对数组进行拼接，而不是全部替换
  */
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) { 
      //表示没有下一页
      wx.showToast({
        title: '已经到底了哦~'
      });
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },
  /**
   * 下拉刷新
   * 1.触发下拉刷新事件，需要在页面的json文件开启配置
   * 2.重置数据数组
   * 3.重置页码设置为1,重新发送请求
   * 4.数据请求回来，需要手动关闭等待效果
   */
  onPullDownRefresh() { 
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList()
  }
})