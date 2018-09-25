import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

class ApiClient {
  generateApiURI (uri) {
    // return 'http://119.23.18.224:168' + uri // 服务器
    // return 'http://203.195.203.71:168' + uri // 服务器
    return 'http://193.112.103.154:168' + uri // 服务器
    // return 'http://localhost:168' + uri // 本地
  }

  request (uri, data, config) {
    if (!config) {
      return axios.get(this.generateApiURI(uri), {
        params: data
      })
    }

    return axios.request({
      url: this.generateApiURI(uri),
      data: data,
      ...config
    })
  }

  delete (uri, config) {
    return axios.delete(this.generateApiURI(uri), {
      ...config
    })
  }
}

const client = new ApiClient()

export default client
