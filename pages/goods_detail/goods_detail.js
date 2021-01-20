/**
 * 1.发送请求获取数据
 * 2.点击轮播图，预览大图
 *    1）给轮播图绑定点击事件
 *    2）调用小程序api,previewImage
 * 3.点击加入购物车
 *    1）先绑定点击事件
 *    2）获取缓存中的购物车，是数组格式，这样能存储多个商品
 *    3）先判断当前的商品是否已经存在于购物车，已经存在，修改商品的数量++，然后把购物车数组重新填充回到缓存中
 *    4）不存在的话，第一次添加，直接添加一个新元素，新元素需要带上购买数量num的属性,填充回到缓存中
 *    5）弹出用户提示
 */


import { request } from '../../request/index';

Page({
  data: {
    goodsObj: {}
  },
  // 全局请求对象,因为要从请求数据里拿值
  GoodsPreview: {},
  onLoad(options) { 
    const { goods_id } = options
    console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id) { 
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } })
    this.GoodsPreview = goodsObj
    this.setData({
      goodsObj: {
        // 处理从后端拿取用到的数据
        goods_name: goodsObj.data.message.goods_name,
        goods_price: goodsObj.data.message.goods_price,
        // 可以字符串替换,处理iphone部分手机 不识别 webp图片格式
        goods_info: goodsObj.data.message.goods_introduce.replace(/\.webp/g,".jpg"),
        goods_image: goodsObj.data.message.pics
      }
    })
  },
  // 点击轮播图放大预览
  handlePreviewImage(e) { 
    console.log(this.GoodsPreview,"商品信息")
    const urls = this.GoodsPreview.data.message.pics.map(item => item.pics_mid)
    // 点击图片，接收传递过来的图片url,通过data-url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      // 解构赋值
      current,
      urls
    })
  },
  // 加入购物车
  handleAddCart() { 
    //1.先获取缓存中的数组
    let cart = wx.getStorageSync("cart") || []
    console.log(cart,"购物车")
    //2.判断购物车存不存在
    let index = cart.findIndex(item => item.data.message.goods_id === this.GoodsPreview.data.message.goods_id)
    console.log(index,"index")
    if (index === -1) {
      // 不存在的话，第一次添加num=1
      this.GoodsPreview.data.message.num = 1;
      cart.push(this.GoodsPreview)
    } else { 
      // 已经存在购物车数据执行num++
      cart[index].data.message.num++
    }
    // 4.最后存储数据
    wx.setStorageSync("cart", cart);
    // 5.弹出信息
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask: true,
    })
  }
})