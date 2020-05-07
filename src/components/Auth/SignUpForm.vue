<template>
  <div class="ui stackable three column centered grid container">
    <div class="column signup-form">
      <h2 class="ui dividing header centered ">可视化Linux服务器管理系统注册</h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form" @submit.prevent="signup">
        <div class="field" :class="{ error: errors.has('name') }">
          <label>姓名</label>
          <input type="text" name="name" v-model="name" v-validate="'required'" placeholder="Full name">
          <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('username') }">
          <label>用户名</label>
          <input type="text" name="username" :class="{'input': true, 'is-danger': errors.has('username') }" v-model="username" v-validate="'required'" placeholder="Username">
          <span v-show="errors.has('username')" class="is-danger">{{ errors.first('username') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('email') }">
          <label>邮箱</label>
          <input type="email" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" v-model="email" v-validate="'required|email'" placeholder="Email">
          <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('password') }">
          <label>密码</label>
          <input type="password" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" v-model="password" v-validate="'required'" placeholder="Password" ref="password">
          <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('password') }">
          <label>重复密码</label>
          <input type="password" name="checkPassword" :class="{'input': true, 'is-danger': errors.has('checkPassword') }" v-model="checkPass" v-validate="'required|confirmed:password'" placeholder="Enter password again" data-vv-as="password">
          <span v-show="errors.has('checkPassword')" class="is-danger">{{ errors.first('checkPassword') }}</span>
        </div>

        <div class="field">
          <label>性别</label>
          <select class="ui dropdown" v-model="gender">
            <option value="1">男</option>
            <option value="0">女</option>
          </select>
        </div>

        <div class="field" :class="{ error: errors.has('phone') }">
          <label>电话</label>
          <input type="text" name="phone" :class="{'input': true, 'is-danger': errors.has('phone') }" v-model="phone" v-validate="'required'" placeholder="Phone">
          <span v-show="errors.has('phone')" class="is-danger">{{ errors.first('phone') }}</span>
        </div>

        <div class="field">
          <label>身份</label>
          <div style="text-align:center">
            <div class="radio-left">
              <input type="radio" v-model="role" label="0" name="role" value="0" id="student" class="radio" /><label for="student">学生</label>
            </div>
            <div class="radio-right">
              <input type="radio" v-model="role" label="1" name="role" value="1" id="teacher" class="radio" /><label for="teacher">老师</label>
            </div>
          </div>
        </div>

        <div class="field" v-if="this.role === 0 || this.role === '0'">
          <label>导师</label>
          <select class="ui dropdown" v-model="mentorId" id="mentorId">
            <option :value="mentor.id" v-for="mentor in mentors" :key="mentor.id">{{ mentor.name }}</option>
          </select>
        </div>

        <button class="fluid ui primary button" :disabled="!isFormValid">注 册</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            已经有账户? <router-link to="/login">直接登录</router-link>
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
  name: 'SignUpForm',
  components: {
    Notification
  },
  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      checkPass: '',
      role: '',
      gender: '',
      phone: '',
      mentorId: 0,
      mentors: [],
      notification: {
        message: '',
        type: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('admin-token')
    return token ? next('/') : next()
  },
  created () {
    this.getMentors()
  },
  methods: {
    getMentors () {
      let _this = this
      axios.get('/getMentors').then(response => {
        const mentorsArray = response.data.data
        for(var index in mentorsArray) {
          _this.mentors.push(mentorsArray[index])
        }
        // console.log(mentorsArray)
      }).catch(error => {
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    },
    checkRole () {
      var checkFlag = false
      const role = document.getElementsByName('role')
      for (var i = 0; i < role.length; i++) {
        if (role[i].checked) {
          checkFlag = true
          // console.log(this.role)
          break
        }
      }
    },
    getSelectMentorIdValue () {
      const myselect=document.getElementById("mentorId")
      const index=myselect.selectedIndex
      const value = myselect.options[index].value
      const text = myselect.options[index].text
      console.log('value:' + value)
      console.log('text:' + text)
      console.log('mentorId in data:' + this.mentorId)
    },
    signup () {
      this.checkRole()
      // this.getSelectMentorIdValue()
      // console.log('password' + this.password)
      axios.post('/signup', {
        name: this.name,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
        pwd_bk: this.password,
        sex: this.gender,
        role: this.role,
        mentor_id: this.mentorId
      }).then(response => {
        // save token in localstorage
        localStorage.setItem('admin-token', response.data.data.token)
        // redirect to user home
        this.$router.push('/')
      }).catch(error => {
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
.placeholder {
  color: rgb(203, 202, 199)
}
.signup-form {
  margin-top: 60px;
}
.radio-left {
  display: inline-block;
  margin: 0 0 0 0;
}
.radio-right {
  display: inline-block;
  margin: 0 0 0 120px;
}
.radio {
  display: inline-block;
  margin: 0 10px;
  padding: 5px;
}
</style>

