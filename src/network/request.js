import axios from 'axios'
import qs from 'qs'
import {Message, Loading} from "element-ui";
import router from '../router.js'

const service = axios.create({
  timeout: 5000
})
let loadinginstace

service.interceptors.request.use(
    config => {
      loadinginstace = Loading.service({      // 请求一开始就调用elementUI的加载组件
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        customClass: "osloading",
        fullscreen: true
      })
      const token = localStorage.getItem('token');
      if (config.method == 'post' || config.method == 'put' || config.method == 'patch') {
        // 当请求为post时，判断localstorage中是否有token，若有，把token也带入请求参数
        if (token) {
          config.data.token = token;
        }
        config.data = qs.stringify(config.data, { arrayFormat: 'repeat', allowDots: true })
      } else if (config.method == 'delete' || config.method == 'get') {
        // 当请求是get或delete时，有参数则携带参数，没参数则带上token
        config.params = config.params || {}
        config.params.token = token
        config.url += '?' + qs.stringify(config.params, { arrayFormat: 'repeat' })
        delete config.params
      }

      return config;

    },
    error => {
      loadinginstace.close();
      return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {

      loadinginstace.close();     // 关闭加载组件

      if (response.data.success == true) {
        return response.data
      }

      Message({
        message: response.data.msg || '请求失败',
        type: 'error',
        duration: 5000
      })

      if (response.data.success == false && response.data.msg == 'token非法') {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        router.replace('/login')
      }

      return response.data
    },
    error => {
      loadinginstace.close();     // 关闭加载组件
      Message({
        message: error.message || '请求失败',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(error)
    }
)

export default service
