<template>
  <div id="app">
    <div v-if="showLog">
      <login></login>
    </div>
    <div v-else v-show="showContent">
      <el-container class="appContent">
        <el-header>
          <navbar :navData="userName"></navbar>
        </el-header>
        <el-container>
          <el-aside :width="leftBarwidth+'px'" class="leftNav">
            <sidebar :navData="navData"></sidebar>
            <div class="dragBar" @mousedown.prevent="touchBar($event)"></div>
          </el-aside>
          <el-container>
            <el-main>
              <top-tabs></top-tabs>
              <app-main class="app-main"></app-main>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import home from './views/home'
import login from './views/login/Login'
import Navbar from './components/layout/Navbar'
// import TopTabs from './components/layout/TopTabs'
import Sidebar from './components/layout/Sidebar'
// import AppMain from './components/layout/AppMain'
// import FooterBar from './components/layout/FooterBar'

export default {
  data () {
    return {
      navData: [{
			"id": 1,
			"name": "表单管理",
			"parentId": 0,
			"url": null,
			"serialNum": 1,
			"userId": 1,
			"createTime": null,
			"btnName": null,
			"authFunctionVOChild": [{
				"id": 4,
				"name": "表单配置",
				"parentId": 1,
				"url": "/formmanager/config",
				"serialNum": 2,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}]
		}, {
			"id": 2,
			"name": "接口管理",
			"parentId": 0,
			"url": null,
			"serialNum": 1,
			"userId": 1,
			"createTime": null,
			"btnName": null,
			"authFunctionVOChild": [{
				"id": 3,
				"name": "接口配置",
				"parentId": 2,
				"url": "/interface/manage",
				"serialNum": 2,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}, {
				"id": 10,
				"name": "IP白名单",
				"parentId": 2,
				"url": "/interface/whitename",
				"serialNum": 4,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}, {
				"id": 11,
				"name": "接口报表",
				"parentId": 2,
				"url": "/interface/statement",
				"serialNum": 5,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}]
		}, {
			"id": 5,
			"name": "用户管理",
			"parentId": 0,
			"url": null,
			"serialNum": 1,
			"userId": 1,
			"createTime": null,
			"btnName": null,
			"authFunctionVOChild": [{
				"id": 6,
				"name": "系统用户管理",
				"parentId": 5,
				"url": "/identity/user",
				"serialNum": 2,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}, {
				"id": 7,
				"name": "角色与权限管理",
				"parentId": 5,
				"url": "/identity/role",
				"serialNum": 3,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}, {
				"id": 8,
				"name": "菜单管理",
				"parentId": 5,
				"url": "/identity/function",
				"serialNum": 4,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}]
		}, {
			"id": 14,
			"name": "内容管理",
			"parentId": 0,
			"url": null,
			"serialNum": 1,
			"userId": 1,
			"createTime": null,
			"btnName": null,
			"authFunctionVOChild": [{
				"id": 16,
				"name": "内容发布",
				"parentId": 14,
				"url": "/cms/manage",
				"serialNum": 2,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}]
		}, {
			"id": 56,
			"name": "操作日志",
			"parentId": 0,
			"url": null,
			"serialNum": 1,
			"userId": 1,
			"createTime": null,
			"btnName": null,
			"authFunctionVOChild": [{
				"id": 57,
				"name": "操作日志",
				"parentId": 56,
				"url": "/backlog/operation",
				"serialNum": 2,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}]
		}, {
			"id": 61,
			"name": "定时管理",
			"parentId": 0,
			"url": "",
			"serialNum": null,
			"userId": 1,
			"createTime": null,
			"btnName": null,
			"authFunctionVOChild": [{
				"id": 62,
				"name": "任务调度",
				"parentId": 61,
				"url": "/timer/cron",
				"serialNum": 1,
				"userId": 1,
				"createTime": null,
				"btnName": null,
				"authFunctionVOChild": null
			}]
		}],
      userName: 'linlangleo',
      loading: null,
      showContent: true,
      leftBarwidth: 200
    }
  },
  created () {
    console.log(this.navData);
  },
  components: {
    home,
    login,
    Navbar,
    Sidebar
    // AppMain,
    // FooterBar,
    // TopTabs
  },
  name: 'App',
  methods: {
    // go (name) {
    //   this.$router.push({ name: name })//1.使用name的方式访问
      // this.$router.push({ path: '/123' })//2.使用path的方式访问
    // },
    // login () {
      // this.$router.push({ name: 'home'})
      // api.index.querybacklogsall('').then((res) => {
      //   console.log(res)
      // })
    // }
  },
  computed: {
    showLog() {
      var ifShowLog = this.$store.state.showLog;
      // if (val) {
      //   this.loading.close()
      // }
      return ifShowLog;
    }
  }
}
</script>

<style scoped>
.el-header{
  padding: 0 ;
}
#app,#app>div,
.appContent{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.appContent>section{
  flex-grow: 1;
  height: 1px;
}

.leftNav{
  box-shadow: 0px 1px 11px #ccc;
  position: relative;
}

.el-main {
  padding: 0;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.app-main{
  height: 100%;
  flex-grow: 1;
  overflow: auto;
}
</style>
