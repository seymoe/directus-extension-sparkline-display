<template>
	<div class="extension-display-wrapper">
    <div class="chart-wrap">
      <div ref="chartEl" class="time-series" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onUnmounted } from 'vue'
import ApexCharts from 'apexcharts'

export default defineComponent({
	props: {
		value: {
			type: [String, Array],
			default: null
		},
    dataKey: {
      type: String,
      default: ''
    },
    sparklineType: {
      type: String,
      default: 'line'
    },
    field: {
      type: String,
      defualt: ''
    },
    type: {
      type: String,
      default: ''
    },
    chartOptions: {
			type: Object,
			default: () => {
        return {}
      }
		}
	},
	setup(props) {
    // row data
    const dataList = ref([])
    // chart
    const chartEl = ref()
    const chart = ref()
    
    watch(() => props.value,
      (val) => {
        if (typeof val === 'string') {
          try {
            dataList.value = JSON.parse(val)
          } catch (err) {
            console.log(err)
          }
        } else {
          dataList.value = val === null ? [] : val
        }
        setupChart()
      },
      { immediate: true, deep: true }
    )

    // 图表相关
    function setupChart() {
      const genOptions = () => ({
        series: [{
          data: dataList.value.map(row => {
            if (props.dataKey) {
              return Number(row[props.dataKey])
            } else {
              return row
            }
          })
        }],
        chart: {
          type: props.sparklineType,
          width: 100,
          height: 34,
          sparkline: {
            enabled: true
          },
          animations: {
            enabled: false
          }
        },
        stroke: {
          width: 2
        },
        dataLabels: {
          enabled: false
        },
        // tooltip: {
        //   enabled: false
        // }
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
      })
      const options = genOptions()
      if (props.sparklineType === 'bar') {
        options.plotOptions = {
          bar: {
            columnWidth: '80%'
          }
        }
      }
      if (props.sparklineType === 'pie') {
        options.series = options.series[0].data
        options.chart.width = 34
      } else if (props.sparklineType === 'donut') {
        options.series = options.series[0].data
        options.chart.width = 34
      } else if (props.sparklineType === 'line') {
      }
      setTimeout(() => {
        if (chart.value) {
          chart.value.updateOptions(options)
        } else {
          chart.value = new ApexCharts(chartEl.value, options)
          chart.value.render()
        }
      })
    }

    onUnmounted(() => {
			chart.value?.destroy()
		})

		return { dataList, chartEl }
	}
})
</script>

<style scoped>
.table-wrap{
  height: 60px;
}
</style>
