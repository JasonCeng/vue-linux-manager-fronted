<template>
  <div class="home-wrapper">
    <div class="slogan-container">
      <p class="slogan">欢迎访问长沙理工大学计算机与通信工程学院<br/>可视化Linux服务器管理系统</p>
    </div>
    <div class="dashboard-container">
      <div id="cpuChart" :style="{width: '300px', height: '300px'}" class="dashboard"></div>
      <div id="memoryChart" :style="{width: '300px', height: '300px'}" class="dashboard"></div>
      <div id="balanceChart" :style="{width: '300px', height: '300px'}" class="dashboard"></div>
    </div>
  </div>
</template>

<style scoped>
.home-wrapper {
  position: relative;
}
.home-wrapper .slogan-container {
  margin: 40px 0;
}
.home-wrapper .slogan-container .slogan {
  font-size: 32px;
  color: rgb(1, 104, 181);
  font-weight: 600
}
.home-wrapper .dashboard-container {
}
.dashboard-container {

}
.dashboard-container .dashboard {
  display: inline-block;
}
</style>

<script>
/* eslint-disable */
// // 引入基本模板
// let echarts = require('echarts/lib/echarts')
// // 引入柱状图组件
// require('echarts/lib/chart/bar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
export default {
  data () {
    return {
      serveinfo: {
        cpu: 1,
        memory: 0,
        drive: 0
      }
    }
  },
  mounted () {
    this.getServeInfo()
  },
  methods: {
    getServeInfo () {
      axios.get('/homeDashboard').then(response => {
        // console.log(response.data.data)
        this.serveinfo.cpu = response.data.data.cpu
        this.serveinfo.memory = response.data.data.memory
        this.serveinfo.drive = response.data.data.drive
        // console.log(this.serveinfo)
        this.drawLine()
      }).catch(error => {
        console.log(error)
        // display error notification
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    },

    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let cpuChart = this.$echarts.init(document.getElementById('cpuChart'))
      let memoryChart = this.$echarts.init(document.getElementById('memoryChart'))
      let balanceChart = this.$echarts.init(document.getElementById('balanceChart'))

      // 准备图表配置和数据
      const cpuOption = {
        title: { 
          text: 'CPU使用率',
          x:'right',
          y:'top',
          textAlign:'right'
        },
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {},
        series: [{
          name:'CPU使用率',
          type:'gauge',
          axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
              color: [[0.2, 'lightgreen'],[0.4, 'orange'],[0.8, 'skyblue'],[1, '#ff4500']], 
              width: 15
            }
          },
          axisTick: {            // 坐标轴小标记
            show: true,        // 属性show控制显示与否，默认不显示
            splitNumber: 5,    // 每份split细分多少段
            length :8,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#eee',
                width: 1,
                type: 'solid'
            }
          },
          splitLine: {           // 分隔线
            show: true,        // 默认显示，属性show控制显示与否
            length :15,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#eee',
              width: 2,
              type: 'solid'
            }
          },
          pointer : {
            length : '80%',
            width : 8,
            color : 'auto'
          },
          detail: {formatter:'{value}%'},
          data: [{value: this.serveinfo.cpu}]
        }]
      }
      const memoryOption = {
        title: { 
          text: '内存使用率',
          x:'right',
          y:'top',
          textAlign:'right'
        },
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {},
        series: [{
          name:'内存使用率',
          type:'gauge',
          axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
              color: [[0.2, 'lightgreen'],[0.4, 'orange'],[0.8, 'skyblue'],[1, '#ff4500']], 
              width: 15
            }
          },
          axisTick: {            // 坐标轴小标记
            show: true,        // 属性show控制显示与否，默认不显示
            splitNumber: 5,    // 每份split细分多少段
            length :8,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#eee',
                width: 1,
                type: 'solid'
            }
          },
          splitLine: {           // 分隔线
            show: true,        // 默认显示，属性show控制显示与否
            length :15,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#eee',
              width: 2,
              type: 'solid'
            }
          },
          pointer : {
            length : '80%',
            width : 8,
            color : 'auto'
          },
          detail: {formatter:'{value}%'},
          data: [{value: this.serveinfo.memory}]
        }]
      }
      const balanceOption = {
        title: { 
          text: '磁盘使用率',
          x:'center',
          y:'top',
          textAlign:'left'
        },
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {},
        series: [{
          name:'磁盘使用率',
          type:'gauge',
          axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
              color: [[0.2, 'lightgreen'],[0.4, 'orange'],[0.8, 'skyblue'],[1, '#ff4500']], 
              width: 15
            }
          },
          axisTick: {            // 坐标轴小标记
            show: true,        // 属性show控制显示与否，默认不显示
            splitNumber: 5,    // 每份split细分多少段
            length :8,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#eee',
                width: 1,
                type: 'solid'
            }
          },
          splitLine: {           // 分隔线
            show: true,        // 默认显示，属性show控制显示与否
            length :15,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#eee',
              width: 2,
              type: 'solid'
            }
          },
          pointer : {
            length : '80%',
            width : 8,
            color : 'auto'
          },
          detail: {formatter:'{value}%'},
          data: [{value: this.serveinfo.drive}]
        }]
      }
      // 绘制图表
      cpuChart.setOption(cpuOption)
      memoryChart.setOption(memoryOption)
      balanceChart.setOption(balanceOption)
    },

    getCPUInfo () {
      
    }
  }
}
</script>
