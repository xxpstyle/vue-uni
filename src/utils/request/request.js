const requestURL = 'http://127.0.0.1:8888/api/v1'
import Code from './code'

function getType(data, method) { // 获取请求方式
    let type = {}
    if (!method) {
        method = 'post'
        type = {
            method,
            data: {
                ...data
            },
            header: {
                // 'content-type': 'application/x-www-form-urlencoded',
                contentType: "application/json;charset=utf-8",
                'biu-token': uni.getStorageSync("token")
            }
        }
    } else {
        method = 'get'
        type = {
            method,
            params: {
                ...data
            }
        }
    }
    return type
}

function Request(url, data, method) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: requestURL + url,
            data: data,
            ...getType(data, method),
            success: res => {
                if (res.data.succ) {
                    //如果后台返回的json显示成功，pass
                    resolve(res.data)
                } else {
                    if (res.data.code === Code.UNAUTHEN || res.data.code === Code.SESSION_TIMOUT) {
                        //处理登录相关的错误
                        uni.showToast({icon: 'none', title: "你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出"})
                    } else {
                        uni.showToast({icon: 'none', title: res.data.msg})
                    }
                }
            },
            fail: err => {
                uni.showToast({icon: 'none', title: err.msg})
                reject(err)
            }
        })
    }).catch(err => console.log(err))
}


export default function (url, data, method) {
    return Request(url, data, method)
}