<template>
  <div class="account-main">
    <account-login
      @login-info="loginAccount"
      @regist-info="registAccount"
      :error-info-status="errorInfoStatus"
      ref="accoutLogin"
    ></account-login>
  </div>
</template>
<script>
import accountLogin from '../../components/account-components'
import accountApi from '../../utils/account-api.js'
export default {
  data () {
    return {
      errorInfoStatus: true // 登录错误信息状态展示
    }
  },
  components: {
    accountLogin: accountLogin
  },
  methods: {
    loginAccount (formData) {
      this.$axios.post('/rest/account/user/login', formData).then((res) => {
        this.errorInfoStatus = res.data.data
        if (res.headers.errorinfo && res.headers.errorinfo === 'token diff') {
          this.errorInfoStatus = false
        }
        if (localStorage && this.errorInfoStatus) {
          localStorage.setItem('main', this.errorInfoStatus)
          localStorage.setItem('token', res.headers.token)
        }
        if (this.errorInfoStatus) {
          this.$router.push('/main').catch((error) => {
            console.log(error)
          })
        } else {
          this.$refs.accoutLogin.accountForm = {
            userName: '',
            passWord: ''
          }
        }
      })
        .catch((error) => {
          console.log(error)
        })
    },
    registAccount (formData) {}
  },
  beforeRouteEnter (to, from, next) {
    history.pushState(null, null, 'http://localhost:8082/login')
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (localStorage && localStorage.getItem(to.name)) next(true)
    else next(false)
  }

}
</script>
<style scoped lang="less">
.account-main {
  background-color: blanchedalmond;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
