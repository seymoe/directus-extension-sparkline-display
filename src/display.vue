<template>
	<div class="extension-display-wrapper">
    <div class="chart-wrap">
      <div ref="chartEl" class="time-series" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
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
    // 行数据
    const dataList = ref([])
    // 图表
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
          }
        },
        stroke: {
          width: 2
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
      nextTick(() => {
        if (chart.value) {
          console.log('图表更新', options)
          chart.value.updateOptions(options)
        } else {
          console.log('图表创建', options)
          chart.value = new ApexCharts(chartEl.value, options)
          chart.value.render()
        }
      })
    }

    onMounted(() => {
      setupChart()
    })
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
