/**
 * 1.获取用户的收货地址
 *    1）绑定点击事件
 *    2）调用小程序内置的api:获取用户的收货地址
 *        1.获取用户对小程序所授予获取地址的权限状态scope
 *         ①if 用户点击获取收货地址的提示框  确定 authSetting scope.address,scope值为true
 *         if  用户从来没有调用过  scope 为undefined
 *         以上两种情况，直接调用获取收货地址 api
 *         
 *        ② if  用户点击获取收货地址的提示框  取消  authSetting scope.address,scope值为false
 *          诱导用户自己打开授权设置页面，当用户重新给获取地址权限的时候
 *         --------------------------以前版本
 *        现在官方更新点击什么scope都为true
 *        ③把 获取到的收货地址存入到本地存储中
 * 
 * 2.页面加载完毕
 *    1）获取本地存储中的地址数据
 *    2）把数据设置给data中的一个变量
 */

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js"

Page({
  data: {
    address: {}
  },
  onShow() { 
    const address = wx.getStorageSync("address")
    this.setData({
      address
    })
  },
  // 点击收货地址
  async handleChooseAddress() { 
    // wx.getSetting({
    //   success: (result) => { 
    //     // 获取权限状态,要使用[]形式来获取属性值
    //     const scopeAddress = result.authSetting["scope.address"]
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1)
    //         }
    //       })
    //     } else { 
    //       wx.openSetting({
    //         succes: (result2) => { 
    //           console.log(result2)
    //           wx.chooseAddress({
    //             success: (result3) => {
    //               console.log(result3)
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    //1.获取权限状态
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      // 2.判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName
      +address.detailInfo
      //3.存入到缓存中
      wx.setStorageSync("address",address)
    }
    catch (error) { 
      console.log(error)
    }
  }
})