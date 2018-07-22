<template>
  <el-row class="navBar">
    <el-col :span="20">
      <div class="logo-box">Headshow共享平台</div></el-col>
    <el-col :span="4">
      <div class="user-box">
        <i class="icon icon-user"></i>
        <span>{{navData}}</span>
        <i class="icon icon-exit" @click="signOut"></i>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import api from '@/api/api'
export default {
  data () {
    return {

    }
  },
  props: {
    navData: {
      type: String,
      default: ''
    }
  },
  methods: {
    signOut () { // 退出登录
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.configPower.postData('/index/logout', {}).then((res) => {
          if (res.data.code !== '0') {
            this.$message.error(res.data.msg)
            this.goLogin(res.data.code)
          } else {
            this.$router.push({ path: '/' })
            this.$store.commit('showLogin', true)
          }
        })
      }).catch(() => { })
    }
  }
}
</script>
<style scoped>
.navBar {
  padding: 0 40px 0 20px;
  background-color: #409eff;
}
.el-row,
.el-col,
.el-row > div,
.el-col > div {
  height: 100%;
}
.logo-box,
.user-box {
  line-height: 60px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}
.user-box {
  font-weight: normal;
  text-align: right;
}
.user-box span {
  margin: 0 16px;
  font-size: 14px;
}
.icon-user {
  background: url("../../assets/icon-user-white.png") no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
.icon-exit {
  background: url("../../assets/icon-user-pull.png") no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
.icon {
  cursor: pointer;
}
</style>
