<template>
  <el-row :gutter="10" class="h-full">
    <el-col :span="12" style="height: 50%" class="mb-10">
      <el-card shadow="always" class="h-full" :body-style="{ height: '100%', padding: 0 }">
        <div id="lineChart" class="w-full h-full"></div>
      </el-card>
    </el-col>
    <el-col :span="12" style="height: 50%" class="mb-10">
      <el-card shadow="always" class="h-full" :body-style="{ height: '100%', padding: 0 }">
        <div id="barChart" class="w-full h-full"></div>
      </el-card>
    </el-col>
    <el-col :span="12" style="height: 50%" class="mb-10">
      <el-card shadow="always" class="h-full" :body-style="{ height: '100%', padding: 0 }">
        <div id="pieChart" class="w-full h-full"></div>
      </el-card>
    </el-col>
    <el-col :span="12" style="height: 50%" class="mb-10">
      <el-card shadow="always" class="h-full" :body-style="{ height: '100%', padding: 0 }">
        <div id="radarChart" class="w-full h-full"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  PieChart,
  PieSeriesOption,
  RadarChart,
  RadarSeriesOption,
} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  LegendComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

export default defineComponent({
  setup() {
    const lineOption: ECOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    }
    const barOption: ECOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    }
    const pieOption: ECOption = {
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    const radarOption: ECOption = {
      legend: {
        data: ['Allocated Budget', 'Actual Spending'],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 },
        ],
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget',
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending',
            },
          ],
        },
      ],
    }
    onMounted(() => {
      var lineChart = echarts.init(document.getElementById('lineChart')!)
      lineChart.setOption(lineOption)
      var barChart = echarts.init(document.getElementById('barChart')!)
      barChart.setOption(barOption)
      var pieChart = echarts.init(document.getElementById('pieChart')!)
      pieChart.setOption(pieOption)
      var radarChart = echarts.init(document.getElementById('radarChart')!)
      radarChart.setOption(radarOption)
      window.onresize = function () {
        lineChart.resize()
        barChart.resize()
        pieChart.resize()
        radarChart.resize()
      }
    })
  },
})
</script>

<style lang="scss" scoped></style>
