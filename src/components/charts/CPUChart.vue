<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'
let timer = null

export default {
  extends: Line,
  name: 'CPUDashLineChart',
  props: ['cpuData'],
  data() {
    return {
      dataCollection: {
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
    }
  },
  beforeCreate () {
  },
  created() {
    this.fillData()
    let _this = this
    timer = setInterval(function() {
      // console.log('_this.cpuData:' ,_this.cpuData)
      _this.updateChart(_this.dataCollection, _this.cpuData)
      _this.$data._chart.update()
      // console.log('CPU:每5秒执行一次updateChart()')
    }, 5000)
  },
  beforeMount () {
  },  
  mounted() {
    this.renderChart(this.dataCollection, {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            steps:3,
            stepValue:1,
            max:30,
            // Include a '%' sign in the ticks
            callback: function(value, index, values) {
                return value + '%';
            }
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    });
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed() {
    // 页面销毁时，停止timer
    clearInterval(timer)
  },
  // watch: {
  //   dataCollection: {
  //     handler: function () {
  //       this.$data._chart.update()
  //     },
  //     deep: true,
  //     // immediate: true
  //   }
  // },
  methods: {
    fillData () {
      let date = new Date()
      let nowTime = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
      // 初始化dataCollection横坐标和数据
      this.dataCollection.labels = [nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime, nowTime]
      this.dataCollection.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    formatTime (time) {
      let date = new Date()
      date.setTime(time)
      return (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
    },
    updateChart (chartData, newData) {
      let _this = this
      // console.log('updateChart() _this:', _this)
      chartData.datasets[0].data.length = 0
      chartData.labels.length = 0

      if(newData != null) {// 防止页面刚加载时还未获得websocket的data.cpu时执行而发生错误
        newData.forEach(function (obj) {
          chartData.labels.push(_this.formatTime(obj[0]))
          // console.log('当前横坐标：', chartData.labels)
          chartData.datasets[0].data.push(parseFloat(obj[1]).toFixed(3))
        })
      }
    }
  }
}
</script>
