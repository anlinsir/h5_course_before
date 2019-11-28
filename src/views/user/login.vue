<template>
<div class="login-page-warp">
    <div class="login-page">
        <div class="login-head-tilte">注册登录</div>

        <div class="login-form">
            <div class="login-form-label">手机号</div>
            <div class="login-form-input login-form-input-after">
                <span>+86</span>
                <input type="text" v-model="form.mobile" placeholder="请输入手机号" >
            </div>
        </div>

        <!--  login-form-has-tips -->
        <div class="login-form">
            <div class="login-form-label">验证码</div>
            <div class="login-form-input">
                <input type="text" v-model="form.sms_code"  placeholder="请输入验证码" >
                <div @click="sendSmsCode" class="login-form-input-before  login-form-input-get-code">获取验证码</div>
            </div>
        </div>
        <!-- <p class="login-form-tips">验证码已发送，可能会延后，请耐心等待</p> -->

        <div v-if="false" class="login-form">
            <div class="login-form-label">图形验证码</div>
            <div class="login-form-input">
                <input type="text" placeholder="请输入图形验证码" >
                <div class="login-form-input-before ">
                    <img class="login-form-input-refresh" src="@/assets/images/login-code-img.png" alt="">
                    <img class="login-form-input-code-img" src="@/assets/images/login-code-img.png" alt="">
                </div>

            </div>
        </div>

        <div class="base-btn base-btn-large login-btn" @click="ok">确认</div>

    </div>
</div>
</template>

<script>
import { Login, sendSmsCode } from '@/libs/axios/modules/user'
import { local, cookie } from '@/libs/storage'
const message = {
  1: '请输入正确的电话号码',
  2: '验证码错误',
  3: '图形验证码错误',
  4: '电话号码不存在'
}
export default {
  data () {
    return ({
      form: {
        mobile: '',
        sms_code: '',
        source: 'android'
      },
      imgCode: ''
    })
  },
  methods: {
    sendSmsCode () { /* 发送验证码 */
      sendSmsCode({ mobile: this.form.mobile, type: 'login', img_code: this.imgCode })
        .then(r => {
          this.$toast({
            message: r.message
          })
        })
    },
    ok () {
      Login({ ...this.form })
        .then(r => {
          local.set('token', r.data.user_access_token)
          /*  cookie.set('token', r.data.user_access_token) */
          this.$store.dispatch('login', { user: r.data, token: r.data.user_access_token })
          this.$router.push({ name: 'diagnose' })
        })

      /* this.$toast({
        message: message[1],
        duration: 0
      })
      this.$router.push({ name: 'over-time' }) */
    }
  }
}
</script>
