//同时发送异步代码的次数
let ajaxTimes = 0; //针对一个页面三次请求接口
export const request = (params) => { 
    ajaxTimes++;//每调用一次方法，进行++
    //显示loading
    wx.showLoading({
        title: "加载中",
        mask:true
    })

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => { 
        wx.request({
            ...params,
            url:baseUrl+ params.url, //params.url是你页面下传递过来的url参数 
            success: (res) => { 
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            },
            complete: () => { 
                ajaxTimes--;
                if (ajaxTimes ===0) { 
                    wx.hideLoading();
                }
            }
        }) 
    })
}