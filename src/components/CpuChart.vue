<script>
/* eslint-disable */
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  data() {
    return {
    }
  },
  async mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    await this.renderChart(this.chartData, this.options)
    // console.log('this.$data._chart:', this.$data._chart)
  },
  watch: {
    chartData: {
      handler: async function () {
        // console.log('this.$data._chart:', this.$data._chart)
        // this.$data._chart.destroy()
        // console.log(this.chartData);
        // console.log(this.options);
        // this.renderLineChart()
        await this.$data._chart.update()
        // this.$data._chart.render()
      },
      deep: true,
      // immediate: true
    }
  }
}
</script>
