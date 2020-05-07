<template>
  <div class="ui stackable three column centered grid container">
    <div class="column login-form">
      <h2 class="ui dividing header centered">可视化Linux管理系统登录</h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <label>用户名</label>
          <input type="text" name="username" v-model="username" placeholder="username" required>
        </div>

        <div class="field">
          <label>密码</label>
          <input type="password" name="password" v-model="password" placeholder="Password" required>
        </div>

        <button class="fluid ui primary button">登 录</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            没有账户? <router-link to="/signup">马上注册</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Notification from '@/components/Notification'

export default {
  name: 'LogInForm',
  components: {
    Notification
  },
  data () {
    return {
      username: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('admin-token')
    return token ? next('/') : next()
  },
  methods: {
    login () {
      axios.post('/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        // save token in localstorage
        localStorage.setItem('admin-token', response.data.data.token)
        // redirect to user home
        this.$router.push('/')
      }).catch(error => {
        // clear form inputs
        this.username = this.password = ''
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    }
  }
}
</script>

<style scoped>
.login-form {
  margin-top: 120px;
}
</style>
