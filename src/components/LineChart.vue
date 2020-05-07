<template>
  <div class="chart-container">

    <div style="width:800px; height:300px;" id="cpu">
      <cpu-chart chart-id="cpu" :chart-data="datacollection" :options="cpuOptions" :height=300 :width=800></cpu-chart>
    </div>

      <!-- <cpu-chart chart-id="cpu" :chart-data="datacollection" :options="cpuOptions" :height=300 :width=800></cpu-chart> -->

    <div style="width:800px; height:300px;" id="mem">
      <mem-chart chart-id="mem" :chart-data="memDatacollection" :options="memOptions" :height=300 :width=800></mem-chart>
    </div>

      <!-- <mem-chart chart-id="mem" :chart-data="memDatacollection" :options="memOptions" :height=300 :width=800></mem-chart> -->

  </div>
</template>

<script>
/* eslint-disable */
import 'babel-polyfill';
import CpuChart from './CpuChart'
import MemChart from './MemChart'
// import Ws from '@adonisjs/websocket-client'
// const ws = Ws('ws://120.78.183.194:3334')
let once = true

export default {
  components: {
    CpuChart,
    MemChart
  },
  data () {
    return {
      datacollection: {},
      memDatacollection: {},
      cpuOptions: {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps:4,
              stepValue:1,
              max:20
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      },
      memOptions: {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps:20,
              stepValue:5,
              max:100
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      },
      chat: null // subscribe to websocket channel named chat
    }
  },
  beforeCreate () {
  },
  created() {
  },
  beforeMount () {
  },
  async mounted () {
    await this.fillData()
    await this.initSocket()
    console.log(this.memDatacollection)
  },
  beforeUpdate () {
    // this.initSocket()
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

        // 只执行一次 initChart()
        // if(once) {
        //   console.log('初始化datacollection')
        //   this.initChart(data.cpu)
        //   console.log(this.datacollection.labels)
        //   console.log(this.datacollection.datasets[0].data)
        //   once = false
        // }
        this.updateChart(this.datacollection, data.cpu)
        this.updateChart(this.memDatacollection, data.mem)
      })

      this.chat.on('ready', () => {
        this.chat.emit('message', 'Hello server 2222222')
        console.log('websoclet发送数据 ' + 'Hello server 2222222' + ' 成功')
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
    formatTime (time) {
      let date = new Date()
      date.setTime(time)
      return (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    },
    updateChart(chartData, newData) {
      let _this = this
      // console.log('updateChart() _this:', _this)
      chartData.datasets[0].data.length = 0;
      chartData.labels.length = 0;

      newData.forEach(function (obj) {
        chartData.labels.push(_this.formatTime(obj[0]));
        // console.log('当前横坐标：', chartData.labels)
        chartData.datasets[0].data.push(parseFloat(obj[1]));
      });

      // new:优化方法：
      // 移除老数组的首元素
      // chartData.datasets[0].data.splice(0, 1); // splice(index, numbers) 第一个参数是要移除的目标元素下标，第二个参数是要移除的元素个数
      // chartData.labels.splice(0, 1);
      // // 向老数组末尾push一个新数组的末尾元素
      // let lastIndex = newData.length - 1;
      // chartData.datasets[0].data.push(parseInt(newData[lastIndex][1]))
      // chartData.labels.push(_this.formatTime(newData[lastIndex][0]))
    },
    initChart (newData) {
      let _this = this
      this.datacollection.datasets[0].data.length = 0;
      this.datacollection.labels.length = 0;

      newData.forEach(function (obj) {
        _this.datacollection.labels.push(_this.formatTime(obj[0]));
        _this.datacollection.datasets[0].data.push(parseFloat(obj[1]));
      });
    },
    fillData () {
      this.datacollection = {
        labels: [],
        datasets: [
          {
            label: 'CPU使用率',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
      this.memDatacollection = {
        labels: [],
        datasets: [
          {
            label: "内存使用率",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(51, 102, 255, 0.4)",
            borderColor: "rgba(51, 102, 255, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(51, 102, 255,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(51, 102, 255,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
      let date = new Date()
      let nowTime = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
      // 初始化cpuDatacollection横坐标和数据      
      this.datacollection.labels = [nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime]
      this.datacollection.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      // 初始化memDatacollection横坐标和数据
      this.memDatacollection.labels = [nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime]
      this.memDatacollection.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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
