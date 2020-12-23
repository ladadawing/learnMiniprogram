export const request = (params) => { 
    return new Promise((resolve, reject) => { 
        wx.request({
            ...params,
            success: (res) => { 
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        }) 
    })
}