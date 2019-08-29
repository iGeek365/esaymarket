import $ from 'jquery'
import echarts from 'echarts'
export default {
  name: 'dashBoard',
  data () {
    return {
      siteNme: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value: '',
      confiditionList: [
        { name: 'PV', value: 2, tip: '页面浏览量' },
        { name: 'UV', value: 1, tip: '独立访问用户量' },
        { name: '平均加载时长', value: '1.0秒', tip: '用户进入页面开始到页面加载完成所等待的时长' },
        { name: '平均停留时长', value: '298.1秒', tip: '用户访问您的网站停留的平均时长' },
        { name: '流失率', value: '100.0%', tip: '打开网站后无滑动、点击等任何行为就离开的访问占比包含在页面未加载完成就退出的访问' },
        { name: '转化率', value: '0.0%', tip: '转化率=转化数/访问数,目前转化主要包含用户在您的网站上发生的点击跳转及填单数' }
      ],
      detailList: [
        { time: '总计', total: 0, clickJump: 0, fillOdds: 0, addFen: 0, ask: 0, tele: 0 },
        { time: '2019-07-01', total: 0, clickJump: 0, fillOdds: 0, addFen: 0, ask: 0, tele: 0 },
        { time: '2019-07-01', total: 0, clickJump: 0, fillOdds: 0, addFen: 0, ask: 0, tele: 0 }
      ],
      headerList: [
        { name: '时间', code: 'time' },
        { name: '总计', code: 'total' },
        { name: '点击跳转', code: 'clickJump' },
        { name: '填单数', code: 'fillOdds' },
        { name: '微信加粉', code: 'addFen' },
        { name: '在线咨询', code: 'ask' },
        { name: '拨打电话', code: 'tele' }
      ],
      jumpList: [
        { className: 'confiditions', iconName: 'icon-gaikuang', value: '概况' },
        { className: 'changeDetail', iconName: 'icon-biaoge', value: '转化明细' },
        { className: 'changeList', iconName: 'icon-mokuaizhuanhua', value: '转化' },
        { className: 'accessTrend', iconName: 'icon-qushi', value: '访问趋势' },
        { className: 'channelPro', iconName: 'icon-qudaoqushiduibifenxi', value: '渠道占比' },
        { className: 'runPercent', iconName: 'icon-lilvfudongguize', value: '流失率' }

      ]
    }
  },
  components: {
  },
  created () {

  },
  mounted () {
    this.drawTransform()
    this.drawTrend()
  },
  methods: {
    /**
     * @name: jump
     * @description: 锚点跳转
     */
    jump (item, e) {
      console.log(e.currentTarget)
      $(e.currentTarget).addClass('active').siblings().removeClass('active')
      var anchor = $('.floorList').children('.' + item.className)[0]
      console.log(anchor)
      $('.rightContent').animate({ scrollTop: anchor.offsetTop }, 1000)
      // document.querySelector('.rightContent').scrollTop = anchor.offsetTop
    },
    /**
     * @name: drawTransform
     * @description: 画转化图
     */
    drawTransform () {
      console.log(this.$refs.transform)
      var myChart = echarts.init(this.$refs.transform)

      // 指定图表的配置项和数据
      var option = {
        color: ['#1095fe', '#ff8c00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['转化数', '转化率']
        },
        xAxis: [
          {
            type: 'category',
            data: ['08-23', '08-24', '08-25', '08-26', '08-27', '08-28', '08-29'],
            axisLabel: {
              interval: 0,
              rotate: 45, // 倾斜度 -90 至 90 默认为0
              margin: 2,
              textStyle: {
                color: '#666'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '转化数',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            name: '转化率',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} %'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '转化数',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
          },
          {
            name: '转化率',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    /**
     * @name: drawTransform
     * @description: 画转化趋势图
     */
    drawTrend () {
      console.log(this.$refs.trend)
      var myChart = echarts.init(this.$refs.trend)

      // 指定图表的配置项和数据
      var option = {
        color: ['#1095fe', '#ff8c00'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['PV', 'UV']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['08-23', '08-24', '08-25', '08-26', '08-27', '08-28', '08-29']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'PV',
            type: 'line',
            stack: '访问趋势',
            data: [12, 13, 10, 13, 9, 23, 21],
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            }
          },
          {
            name: 'UV',
            type: 'line',
            stack: '访问趋势',
            data: [22, 18, 19, 23, 29, 33, 31],
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}