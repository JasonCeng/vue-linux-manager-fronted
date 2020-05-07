<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <div id="cpuChart" :style="{width: '500px', height: '500px'}" class="dashboard"></div>
      <div id="memoryChart" :style="{width: '500px', height: '500px'}" class="dashboard"></div>
      <div id="netChart" :style="{width: '500px', height: '500px'}" class="dashboard"></div>
      <div id="diskChart" :style="{width: '500px', height: '500px'}" class="dashboard"></div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container .dashboard {
  display: inline-block;
}
</style>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let cpuChart = this.$echarts.init(document.getElementById('cpuChart'))
      let memoryChart = this.$echarts.init(document.getElementById('memoryChart'))
      let netChart = this.$echarts.init(document.getElementById('netChart'))
      let diskChart = this.$echarts.init(document.getElementById('diskChart'))

      const cpuOption = {
        title: {
          text: 'CPU使用情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLine: {onZero: false},
          boundaryGap: false,
          // data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
          data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        series: [{
          data: [30, 32, 29, 34, 36, 35, 34],
          type: 'line',
          smooth: true
        }]
      }
      const memoryOption = {
        title: {
          text: '内存使用情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        series: [{
          data: [30, 32, 29, 34, 36, 35, 34],
          type: 'line',
          smooth: true
        }]
      }
      const netOption = {
        title: {
          text: '网络情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        series: [{
          data: [30, 32, 29, 34, 36, 35, 34],
          type: 'line',
          smooth: true
        }]
      }
      const diskOption = {
        title: {
          text: '磁盘使用情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        series: [{
          data: [30, 32, 29, 34, 36, 35, 34],
          type: 'line',
          smooth: true
        }]
      }
      // 绘制图表
      cpuChart.setOption(cpuOption)
      memoryChart.setOption(memoryOption)
      netChart.setOption(netOption)
      diskChart.setOption(diskOption)
    }
  }
}
</script>
