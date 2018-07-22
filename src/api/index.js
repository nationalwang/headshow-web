import client from './client.js'
class LogManage { // 分页查询操作日志
  querybacklogsall (data) {
    return client.request('/backlog/operation/querybacklogsall?p=1&c=15', data, {
      method: 'post'
    })
  }

  querybacklogsall1 (data) {
    return client.request('/backlog/operation/querybacklogsall?p=1&c=15', data)
  }
}
const logManage = new LogManage()
export default logManage
