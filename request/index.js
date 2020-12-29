export const request = (params) => { 
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
            }
        }) 
    })
}