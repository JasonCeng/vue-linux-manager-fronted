<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'
let timer = null
// let init = 4

export default {
  extends: Line,
  name: 'MemoryDashLineChart',
  props: ['memData'],
  data() {
    return {
      dataCollection: {
        labels: [],
        datasets: [
          {
            label: '内存使用率',
            backgroundColor: "rgba(51, 102, 255, 0.4)",
            borderColor: "rgba(51, 102, 255, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(51, 102, 255, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(51, 102, 255,1)",
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
    let _this = this
    this.fillData()

    timer = setInterval(function() {
      // if(init != 0) { //首次不执行
        _this.updateChart(_this.dataCollection, _this.memData)
        _this.$data._chart.update()
        // console.log('Memory: 每5秒执行一次updateChart()')
      // } else {
      //   init--
      // }
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
            steps:20,
            stepValue:5,
            max:100,
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

      if(newData != null) {// 防止页面刚加载时还未获得websocket的data.mem时执行而发生错误
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
