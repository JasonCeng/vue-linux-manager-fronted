<template>
  <div class="apply-wrapper">
    <div class="content-container">
      <p class="content">申请必读：<br/>
        1.每个用户仅限申请一个服务器账户，申请过后下次该申请按钮将失效。<br/>
        2.申请无需填写任何信息，相关信息均从本管理系统的注册信息进行读取。<br/>
        3.只需点击下面的申请服务器账户便可一键申请。<br/>
      </p>
    </div>
    <div class="btn-container">
      <el-button type="success" class="btn" @click="createApply();successMessage()" :disabled="userinfo.appliedflag">申请服务器账户</el-button>
    </div>
  </div>
</template>

<style scoped>
.apply-wrapper {
  padding: 0 0 0 50px;
}
.content-container {
  margin: 20px 0 0 0;
}
.content {
  font-size: 16px;
  text-align: left;
  line-height: 26px;
}
.btn-container {
  margin: -30px 0 0 0;
  padding: 0;
  text-align: left;
}
.btn {
  background-color: #00cc33;
  width: 300px;
  color: #ffffff;
  font-size: 16px;
}
</style>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      userinfo: {
        username: this.username,
        name: this.author,
        password: this.pwd_bk,
        mentor: this.mentor,
        appliedflag: false
      },
    }
  },
  props: ['author', 'username', 'pwd_bk', 'mentor'],
  created () {
    this.getUserinfo()
    // this.checkApply()
  },
  methods: {
    successMessage() {
      this.$message({
        message: '恭喜你，成功发起服务器申请',
        type: 'success'
      });
    },
    errorMessage() {
      this.$message.error('你已经申请过服务器，不可重复申请');
    },
    setAppliedFlag () {
      if(this.userinfo.appliedflag == 0 || this.userinfo.appliedflag === 0) {
        this.userinfo.appliedflag = false
      } else {
        this.userinfo.appliedflag = true
      }
    },
    getUserinfo () {
      const token = localStorage.getItem('admin-token')
      axios.get('/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        // console.log('appliedflag:' + response.data.data.user.appliedflag)
        this.userinfo.name = response.data.data.user.name
        this.userinfo.username = response.data.data.user.username
        this.userinfo.password = response.data.data.user.pwd_bk
        this.userinfo.mentor = response.data.data.mentor.name
        this.userinfo.appliedflag = response.data.data.user.appliedflag
        // console.log(this.userinfo)
        this.setAppliedFlag() // ******************************特殊处理*************************************
      }).catch(error => {
        console.log(error)
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    },
    checkApply () {
      const token = localStorage.getItem('admin-token')
      // console.log(this.userinfo)
      axios.get('/checkApply', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response.data.data)
      }).catch(error => {
        console.log(error)
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    },
    createApply () {
      console.log(this.userinfo.appliedflag)
      axios.post('/createApply', this.userinfo).then(response => {
        this.userinfo.appliedflag = true
        this.setAppliedFlag()
        this.successMessage()
        // console.log(response)
      }).catch(error => {
        this.errorMessage()
        console.log(error)
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
