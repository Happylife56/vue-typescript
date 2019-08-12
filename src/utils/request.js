'use strict'
/**
 * @file axios请求封装
 */
import axios from 'axios'
import store from '../store'
import {
    Message
} from 'element-ui'

// 全屏loading
let loadingInstance = {}

// 响应时间
axios.defaults.timeout = 10000
// `withCredentails`选项表明了是否是跨域请求
axios.defaults.withCredentials = true
// 设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
}

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // loadingInstance = Loading.service({
        //   fullscreen: true
        // });
        // 获取token
        if (store.state.common.token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = store.state.common.token
        }
        return config
    },
    error => {
        loadingInstance.close()
        return Promise.reject(error)
    }
)

// 添加返回拦截器
axios.interceptors.response.use(
    response => {
        // 设置token不过期
        store.commit('common/setTokenState', false)
        // store.commit('common/setQuitShift', false)
        if (
            typeof response !== 'undefined' &&
            (response.data.code == 1001 ||
                response.data.code == 0 ||
                response.data.code == 1000 ||
                response.data.code == 1100 ||
                response.data.code == 1200)
        ) {
            return response.data
        } else if (typeof response !== 'undefined' && response.data.code == 1006) {
            // Message.error(response.data.msg);
            // 设置token过期
            // store.commit('common/setTokenState', true)

        } else if (typeof response !== 'undefined' && response.data.code == 20008) {

        } else if (typeof response !== 'undefined' && response.data.msg) {
            if (response.data.code !== 1006) checkCode(response.data.msg)
            return response.data
        } else {
            // checkCode('操作失败，请重试')
        }
        return ''
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '登录过期，请重新登录'
                    // 跳到登录界面
                    localStorage.clear()
                    sessionStorage.clear()
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = '请求失败'
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '无法连接服务器'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '连接服务器超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
            }
        } else {
            // error.message = '无法连接服务器'
        }
        // 对返回的错误处理
        return Promise.reject(error)
    }
)

// 请求失败错误信息提示
function checkCode(message) {
    // 关闭loading
    // loadingInstance.close();
    // 弹出错误信息
    Message.closeAll()
    Message.error(message)
}
export default {
    post(obj) {
        return axios
            .post(obj.url, obj.params)
            .then(res => {
                if (typeof res.data !== 'undefined' && typeof obj.fn !== 'undefined') {
                    if (res.code == 1200) {
                        obj.fn(res)
                    } else {
                        obj.fn(res.data)
                    }
                }
                if (typeof res.data === 'undefined') {
                    if (res.code == 1000 || res.code == 1001 || res.code == 1100 || res.code == 20008) {
                        obj.fn(res)
                    }
                }
                // loadingInstance.close();
            })
            .catch(err => {
                checkCode(err.message)
            })
    },
    get(obj) {
        return axios
            .get(obj.url, {
                params: obj.params
            })
            .then(res => {
                if (typeof res.data !== 'undefined' && typeof obj.fn !== 'undefined') {
                    obj.fn(res.data)
                    return
                }
                if (typeof res.data === 'undefined') {
                    if (res.code == 1000 || res.code == 1001) {
                        obj.fn(res)
                    }
                }
                // loadingInstance.close();
            })
            .catch(err => {
                checkCode(err.message)
            })
    },
    put(obj) {
        return axios
            .put(obj.url, obj.params)
            .then(res => {
                if (typeof res.data !== 'undefined' && typeof obj.fn !== 'undefined') {
                    obj.fn(res.data)
                }
                // loadingInstance.close();
            })
            .catch(err => {
                checkCode(err.message)
            })
    },
    delete(obj) {
        return axios
            .delete(obj.url, obj.params)
            .then(res => {
                if (typeof res.data !== 'undefined' && typeof obj.fn !== 'undefined') {
                    obj.fn(res.data)
                }
                // loadingInstance.close();
            })
            .catch(err => {
                checkCode(err.message)
            })
    },
    all(obj) {
        return axios
            .all(obj.url)
            .then(res => {
                if (typeof obj.fn !== 'undefined') {
                    obj.fn(res)
                }
                // loadingInstance.close();
            })
            .catch(err => {
                checkCode(err.message)
            })
    }
}