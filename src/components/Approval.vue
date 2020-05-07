<template>
    <el-table
      :data="applies"
      border
      style="width: 100%">
      <el-table-column
        prop="created_at"
        label="申请时间"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="申请人姓名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mentor"
        label="导师姓名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="approval_time"
        label="审批时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="result_show"
        label="审批结果"
        align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleAgree(scope.$index, scope.row)"
            :disabled="applies[scope.$index].disableFlag">批准</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleReject(scope.$index, scope.row)"
            :disabled="applies[scope.$index].disableFlag">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

<style>
.el-table {
  line-height: 0px;
}
</style>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      applies: [],
      userinfo: {
        name: '',
        username: '',
        password: ''
      }
    }
  },
  created () {
    // console.log(this.username)
    this.checkPermision()
  },
  props: ['username'],
  methods: {
    getUserinfo () {
      const token = localStorage.getItem('admin-token')
      axios.get('/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        this.userinfo.name = response.data.data.user.name
        this.userinfo.username = response.data.data.user.username
        this.userinfo.password = response.data.data.user.pwd_bk
      }).catch(error => {
        console.log(error)
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    },
    checkPermision () {
      if(this.username == 'root' || this.username === 'root') {
        // console.log(this.userinfo)
        this.getApplies()
        this.$router.push('/approval')
      } else {
        this.$router.push('/403')
      }
    },
    getApplies () {
      let _this = this
      axios.get('/getApplies').then(response => {
        // console.log(response.data.data)
        const appliesArray = response.data.data
        for(var index in appliesArray) {
          // 格式化申请时间
          const t = new Date(appliesArray[index].created_at)
          const timeString1 = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
          appliesArray[index].created_at = timeString1
          // 格式化申请时间
          const t2 = new Date(appliesArray[index].approval_time)
          const timeString2 = t2.getFullYear() + "-" + (t2.getMonth() + 1) + "-" + t2.getDate() + " " + t2.getHours() + ":" + t2.getMinutes() + ":" + t2.getSeconds()
          appliesArray[index].approval_time = timeString2
          // 处理结果格式化显示
          if(appliesArray[index].result == 0 || appliesArray[index].result === 0) {
            appliesArray[index].result_show = '未处理'
          } else if (appliesArray[index].result == 1 || appliesArray[index].result === 1) {
            appliesArray[index].result_show = '通过'
            appliesArray[index].disableFlag = true
          } else {
            appliesArray[index].result_show = '拒绝'
            appliesArray[index].disableFlag = true
          }
          _this.applies.push(appliesArray[index])
        }
        // console.log(mentorsArray)
      }).catch(error => {
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
        // console.log('error')
      })
    },
    handleAgree (index, row) {
      const obj = row
      const t = new Date()
      const timeString = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
      obj.approval_time = timeString
      obj.result = 1 // 0:未处理，1:批准，2:拒绝
      obj.result_show = '通过'
      obj.disableFlag = true
      console.log(obj)
      axios.post('/agreeApply', obj).then(response => {
        console.log(response)
      }).catch(error => {
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    },
    handleReject (index, row) {
      const obj = row
      const t = new Date()
      const timeString = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
      obj.approval_time = timeString
      obj.result = 2 // 0:未处理，1:批准，2:拒绝
      obj.result_show = '拒绝'
      console.log(obj)
      axios.post('/rejectApply', obj).then(response => {
        console.log(response)
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
