<template>
	<div class="extention-display-wrapper">
    <div class="chart-wrap">
      <div ref="chartEl" class="time-series" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onUnmounted } from 'vue'
import ApexCharts from 'apexcharts'
import Papa from 'papaparse'

export default defineComponent({
	props: {
		value: {
			type: [String, Array, Object],
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
        if (props.type === 'text' && typeof val === 'string') {
          try {
            const { data } = Papa.parse(val, {header: true, skipEmptyLines: true})
            dataList.value = data || []
          } catch (err) {
            console.log(err)
          }
        } else {
          let list = []
          if (Array.isArray(val)) {
            list = val
          } else if (val && Object.keys(val).length) {
            let keys = Object.keys(val)
            let rowLen = val[keys[0]]['length']
            for (let i = 0; i < rowLen; i++) {
              let o = {}
              for (let j = 0; j < keys.length; j++) {
                let k = keys[j]
                o[k] = val[k][i]
              }
              list.push(o)
            }
          }
          dataList.value = list
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
        if (!chartEl.value) return
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

<style>
.extention-display-wrapper .chart-wrap .apexcharts-tooltip.apexcharts-theme-dark {
  color: #444;
}
</style>
