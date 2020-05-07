<template>
  <div class="message-wrapper">
    <el-form :model="messageForm" ref="messageForm" label-width="0px" class="demo-ruleForm">
      <el-form-item
        label-position="left"
        label-width="0px"
        prop="content"
        :rules="[
          { required: true, content: '意见不能为空' }
        ]"
      >
        <el-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="请输入内容"
          v-model="messageForm.content">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>

    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="item in items" :key="item.id" :timestamp="item.created_at" placement="top">
          <el-card>
            <h4>{{ item.content }}</h4>
            <p>提交人：{{ item.author }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<style>
.message-wrapper {
  line-height: 100px;
  margin: 0;
  padding: 0;
}
.el-form-item__content {
  text-align: right;
}
.block {
  text-align: left;
}
ul {
  padding-inline-start: 10px;
}
</style>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      messageForm: {
        content: '我的意见',
        author: this.author,
        created_at: '',
        updated_at: ''
      },
      items: [],
      notification: {
        message: '',
        type: ''
      }
    }
  },
  props: ['author', 'username'],
  methods: {
    init () {
      let _this = this
      // console.log(_this.items)
      axios.get('/showMessage').then(response => {
        const messageArray = response.data.data
        for(var index in messageArray) {
          const t = new Date(messageArray[index].created_at)
          const timeString = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
          messageArray[index].created_at = timeString
          _this.items.push(messageArray[index])
        }
      }).catch(error => {
        console.log(error)
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    },
    submitForm () {
      const t = new Date()
      const timeString = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
      const messageObj = {
        content: this.messageForm.content,
        author: this.messageForm.author,
        created_at: timeString,
        updated_at: timeString
      }
      axios.post('/createMessage', {
        content: this.messageForm.content,
        author: this.messageForm.author,
        created_at: timeString,
        updated_at: timeString
      }).then(response => {
        // const newMessage = response.data
        // console.log(response.data)
        this.items.push(messageObj)
      }).catch(error => {
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
