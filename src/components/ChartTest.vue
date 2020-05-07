<template>
  <div class="chart-container">

    <div style="width:800px; height:300px;" id="cpu">
      <cpu-chart chart-id="cpu" :cpu-data="cpuData" :height=300 :width=800></cpu-chart>
    </div>

    <div style="width:800px; height:300px;" id="mem">
      <mem-chart chart-id="mem" :mem-data="memData" :height=300 :width=800></mem-chart>
    </div>

    <div style="width:800px; height:300px;" id="mem">
      <net-chart chart-id="net" :net-data="netData" :height=300 :width=800></net-chart>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import 'babel-polyfill';
import CpuChart from './charts/CPUChart'
import MemChart from './charts/MemoryChart'
import NetChart from './charts/NetworkChart'
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://120.78.183.194:3334')
let once = true

export default {
  components: {
    CpuChart,
    MemChart,
    NetChart
  },
  data () {
    return {
      cpuData: [],
      memData: [],
      netData: [],
      chat: null // subscribe to websocket channel named chat
    }
  },
  beforeCreate () {
  },
  created() {
    this.initData(this.cpuData)
    this.initData(this.memData)
    this.initData(this.netData)
    this.initSocket()
  },
  beforeMount () {
  },
  mounted () {
    // console.log('cpuData:', this.cpuData)
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed() {
    // 页面销毁关闭连接
    this.webSocketOnClose()
  },
  methods: {
    // 建立连接
    initSocket () {
      ws.connect()
      this.chat = ws.subscribe('chat')
      console.log('websocket连接成功')
      this.webSocketOnMessage()
      this.webSocketOnError()
    },
     // 获取到后台消息的事件
    webSocketOnMessage() {
      this.chat.on('message2', (data) => {
        // console.log('websocket获得服务器数据成功:' + data)
        // console.log('CPU Data:', data.cpu)
        // console.log('Memory Data:', data.mem)
        console.log('Network Data:', data.net) // net:[time, inputBytes, outputBytes]

        this.cpuData = data.cpu
        this.memData = data.mem
        this.netData = data.net
      })

      this.chat.on('ready', () => {
        this.chat.emit('message', 'Hello server 3333333')
        console.log('websoclet发送数据 ' + 'Hello server 3333333' + ' 成功')
      })
    },
    //连接失败的事件
    webSocketOnError() {
      this.chat.on('error', (error) => {
        // 打印失败的数据
        console.log('websocket连接失败:', error)
      })
    },
    // 关闭连接
    webSocketOnClose() {
      this.chat.on('close', () => {
        // server acknowledged close
      })
      this.chat.close()
      ws.close()
      console.log('websocket连接已关闭'); 
    },
    initData(data) {
      let date = new Date()
      let timeString = date.getTime()
      let nowTime = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
      // console.log(timeString)

      for(var i = 0; i < 30; i++) {
        data.push([timeString, 0])
      }
    }
  }
}
</script>

<style>
  .chart-container {
    max-width: 800px;
    margin:  10px auto;
  }
</style>