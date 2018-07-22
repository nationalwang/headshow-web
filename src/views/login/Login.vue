<template>
  <div class="loginBG">
    <div class="infoBox">
      <div>
        <h1>欢迎登录Headshow文件共享平台</h1>
        <p>关注我：CSDN博客<a target="_blank" href="https://my.csdn.net/qq_35992900?locationNum=0&fps=1">【点击进入】</a>
          <br>QQ:1529761321 GitHub<a target="_blank" href="https://github.com/linlangleo">【点击进入】</a> </p>
        <div class="contentImg">
          <img src="../../assets/scyion.png" /></div>
      </div>
    </div>
    <div class="loginBox">  
      <loading v-show="loading" text="登录中..."></loading>
      <div class="loginTitle">用户登录</div>
      <div class="loginInfo">
        <el-form :model="rule" :rules="rules2" ref="rule">
          <el-form-item :label="user" prop="user">
            <el-input type="text" v-model="rule.user" auto-complete="off" clearable placeholder="请输入帐号"></el-input>
          </el-form-item>
          <el-form-item :label="pwd" prop="pwd">
            <el-input type="password" v-model="rule.pwd" auto-complete="off" clearable placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="Code" class="Code">
            <el-input type="text" maxlength="4" clearable v-model="rule.Code" placeholder="请输入验证码"></el-input>
            <div class="imgBox" @click="changeCode">
              <img src="" ref="imgCode">
            </div>
          </el-form-item>
          <el-form-item class="loginBtn">
            <el-button type="primary" @click="submitForm('rule')" @keyup.enter="submitForm('rule')">登录</el-button>
            <el-button @click="resetForm('rule')">重置</el-button></el-form-item>
        </el-form>
      </div>
    </div>
    <p class="copyright">linlangleo-刘大仙</p></div>
</template>
<script>
// import md5 from 'js-md5'
import api from '@/api/api'
export default {
  data () {
    var validateUser = (rule, value, callback) => { // 验证账号
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        if (this.rule.pwd !== '') {
          this.$refs.rule.validateField('pwd')
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => { // 验证密码
      value === '' ? callback(new Error('请输入密码')) : callback()
    }
    var validateCode = (rule, value, callback) => { // 验证验证码
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      pwd: '密　码',
      user: '账　号',
      rule: { user: '', pwd: '', Code: '' },
      rules2: {
        user: [{ validator: validateUser, trigger: 'blur' }],
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        Code: [{ validator: validateCode, trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    getImgCode () { // 获取验证码
      api.configPower.postDataT('/log/code/check.jpg', {}).then(res => {
        this.$refs.imgCode.src = URL.createObjectURL(new Blob([res.data]))
      }).catch((err) => { console.error(err) })
    },
    submitForm (formName) { // 点击登录按钮
      this.$store.commit("showLog", false)//TODO:直接登陆
      this.$message('登陆成功')//TODO:直接登陆
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          api.configPower.postData('/index/login', {
            code: this.rule.Code,
            name: this.rule.user,
            pwd: md5(this.rule.pwd) // MD5加密
          }).then(res => {
            this.loading = false
            if (res.data.code !== '0') {
              this.rule.Code = ''
              this.getImgCode()
              this.$message.error(res.data.msg)
            } else {
              document.onkeydown = ''
              this.$store.commit('showLogin', false)
              this.$emit('showPage')
              this.$router.push({ path: '/' })
            }
          }).catch((err) => { console.error(err) })
        } else {
          return false
        }
      })
    },
    resetForm (formName) { // 重置
      this.$refs[formName].resetFields()
    },
    changeCode () {
      this.getImgCode()
    }
  },
  created () {
    this.getImgCode()
    document.onkeydown = ev => { // 监听键盘事件
      if (ev.keyCode === 13) {
        this.submitForm('rule')
      }
    }
  }
}
</script>

<style scoped>
.loginBG {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  padding: 0 220px 0 100px;
  justify-content: space-between;
  background: url(../../assets/loginBG.jpg) no-repeat center center #fff;
}
.infoBox{
  width: 0;
  flex-grow: 1;
  height: 360px;
  margin-top: -64px;
  margin-right: 36px;
  text-align: center;
}

.infoBox h1{
  color: #333;
  font-size: 22px;
}

.infoBox p{
  color: #666;
  font-size: 14px;
  margin-top: 10px;
  line-height: 18px
}

.loginBox {
  width: 350px;
  overflow: hidden;
  margin-top: -50px;
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 5px 40px 0px rgba(112, 117, 120, 0.35);
}
.loginTitle {
  height: 46px;
  color: #333;
  font-size: 18px;
  line-height: 46px;
  text-align: center;
  border-bottom: 1px solid #d5d5d5;
}

.contentImg{
  padding: 10px;
  text-align: center;
}

.contentImg img{
  width: 70%;
  height: auto;
}
.loginInfo {
  padding: 20px;
}
.loginBtn {
  text-align: center;
}

.loginInfo>>>.el-form-item {
  display: flex;
  margin-bottom: 28px;
  border-bottom: 1px solid #ececec;
}

.loginInfo>>>.el-form-item:last-of-type {
  border: none;
}

.loginInfo>>>.el-input > input {
  border: none !important;
}

.loginInfo>>>.el-form-item__content {
  width: 0;
  flex-grow: 1;
}

.loginBtn>>>.el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.loginBtn>>>.el-form-item__content .el-button {
  padding: 12px 28px;
}
.Code>>>.el-form-item__content {
  display: flex;
}

.Code .imgBox {
  height: 37px;
  width: 100px;
  margin-left: 10px;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  line-height: 100%;
  border: 1px solid #ececec;
}
.imgBox img {
  width: 100%;
  height: 100%;
}

.loginInfo>>>.el-form-item__error {
  z-index: 1;
  padding: 4px;
  border-radius: 2px;
}
.copyright{
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  left: 0;
  color: #333;
  font-size: 12px;
}
</style>
