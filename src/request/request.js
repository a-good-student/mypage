import axios from 'axios'

// 创建实例时设置配置的默认值
const instance = axios.create({
    //https://yxcr-music-api.vercel.app/
    //http://101.35.235.36:3000/http://47.102.159.133:80
    baseURL: 'http://localhost:3000/',
    changeOrigin: true,  //解决跨域
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
});

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // store.isLoading = true
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    // store.isLoading = fasle
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

function handleError(error) {
    if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        Promise.reject({
            data: error.response.data,
            code: 10000,
            msg: '请求错误'
        })
    } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
        Promise.reject({
            data: null,
            code: 10001,
            msg: '无响应'
        })
    } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
        Promise.reject({
            data: null,
            code: 10002,
            msg: error.message
        })
    }
}

export const getBlob = (url, params, headers) =>
    axios.get(url, { params, headers, responseType: 'blob' })
        .then((res) => res.data)
        .catch((error) => {
            handleError(error)
        })

//暴露出去
export default instance;
