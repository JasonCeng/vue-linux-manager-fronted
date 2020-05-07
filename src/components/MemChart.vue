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
  },
  watch: {
    chartData: {
      handler: function () {
        this.$data._chart.update()
      },
      deep: true,
      // immediate: true
    }
  }
}
</script>
