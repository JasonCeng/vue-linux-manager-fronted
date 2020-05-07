<template>
  <el-container>
    <el-container>
      <el-header style="font-size: 15px">
        <div class="title-wrapper inline-block">
          <p class="title">可视化Linux服务器管理系统</p>
        </div>
        <div class="userinfo-wrapper inline-block">
          <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 6px; font-size: 15px;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="logout" class="userinfo-btn">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          <span>{{ name }}</span>
        </div>
      </el-header>

      <el-container class="main-wrapper">
        <el-aside width="200px">
          <el-menu active-text-color="#409EFF">
            <router-link to="home" class="link-color">
              <el-menu-item index="1">
                <i class="el-icon-s-home"></i>
                <span slot="title">首 页</span>
              </el-menu-item>
            </router-link>
            <router-link to="apply" class="link-color">
              <el-menu-item index="2">
                <i class="el-icon-s-tools"></i>
                <span slot="title">申请服务器账户</span>
              </el-menu-item>
            </router-link>
            <router-link to="approval" class="link-color">
              <el-menu-item index="3">
                <i class="el-icon-edit"></i>
                <span slot="title">审批申请</span>
              </el-menu-item>
            </router-link>
            <router-link to="dashboard" class="link-color">
              <el-menu-item index="4">
                <i class="el-icon-s-operation"></i>
                <span slot="title">服务器仪表盘</span>
              </el-menu-item>
            </router-link>
            <router-link to="message" class="link-color">
              <el-menu-item index="5">
                <i class="el-icon-s-comment"></i>
                <span slot="title">意见留言板</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <!-- <el-main max-height="560"> -->
        <el-main>
          <router-view :author="name" :username="username" :pwd_bk="pwd_bk" :mentor="mentor"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  name: 'layout',
  components: {
  },
  data () {
    return {
      name: '',
      username: '',
      password: '',
      pwd_bk: '',
      mentor: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('admin-token')
      this.$router.push('/login')
    },
    getUserinfo () {
      const token = localStorage.getItem('admin-token')
      axios.get('/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        // console.log('导师姓名：' + response.data.data.mentor.name)
        this.name = response.data.data.user.name
        this.username = response.data.data.user.username
        this.pwd_bk = response.data.data.user.pwd_bk
        this.mentor = response.data.data.mentor.name
      }).catch(error => {
        console.log(error)
        // display error notification
        // this.notification = Object.assign({}, this.notification, {
        //   message: error.response.data.message,
        //   type: error.response.data.status
        // })
      })
    }
  },
  created () {
    this.getUserinfo()
  }
}
</script>

<style>
  .el-header {
    position: fixed;
    width: 100%;
    z-index: 99;
  }
  .el-header, .el-footer {
    background-color: #ffffff;
    color: rgb(134, 134, 134);
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid rgb(220, 223, 230)
  }
  .main-wrapper {
    margin-top: 60px;
  }
  .el-aside {
    background-color: #ffffff;
    text-align: center;
    line-height: 200px;
    /* position: relative; */
    /* height: 596px; */
    position: fixed;
    height: 100%;
  }
  .el-aside .el-menu {

  }
  .el-aside .el-menu .el-menu-item {
    text-align: left;
    /* background-color: rgb(0, 51, 102); */
    color: rgb(83, 83, 83);
    font-size: 17px;
    font-weight: 600;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    /* background-color: #f7f7f7; */
    display: inline;
    text-align: center;
    line-height: 160px;
    /* position: relative;
    height: 588px; */
    position: absolute;
    height: 100%;
    width: 85%;
    overflow: hidden;
    margin-left: 200px;
  }
  .inline-block {
    display: inline-block;
  }
  .title-wrapper {
    width: 30%;
    text-align: left;
  }
  .title-wrapper .title {
    font-size: 18px;
    font-weight: 700;
    color: #409EFF
  }
  .userinfo-wrapper {
    width: 68%;
    text-align: right;
  }
  .userinfo-wrapper .userinfo-btn {
  }
  .link-color {
    color: rgb(122, 122, 122);
  }
  a:hover,:active {
    color: #409EFF;
  }
  .router-link-exact-active, .router-link-active {
    color: #409EFF;
  }
</style>
