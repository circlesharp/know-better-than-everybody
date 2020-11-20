<template name="DataOverview">
  <view>
    <view class="overview">
      <text
        v-for="(el, index) in initSelectList"
        :key="index"
        class="item"
        :class="{ active: activeSelect === index }"
        @click="selectInit(index)"
      >
        {{ el }}
      </text>
    </view>
    <view class="date-selection" data-mode="range1">
      <view class="picker">
        <dyDatePicker
          placeholder="起始日期"
          :childValue="Time.from"
          :minSelect="Time.from_minSelect"
          :maxSelect="Time.from_maxSelect"
          :iconshow="false"
          @getData="getFromData"></dyDatePicker>
        <text class="operator_cabinettriangledownfill"></text>
      </view>
      <text class="middle">到</text>
      <view class="picker">
        <dyDatePicker
          placeholder="结束日期"
          :minSelect="Time.to_minSelect"
          :childValue="Time.to"
          :maxSelect="Time.to_maxSelect"
          :iconshow="false"
          @getData="getToData"></dyDatePicker>
        <text class="operator_cabinettriangledownfill"></text>
      </view>
    </view>
    <view class="market-all">
      <view class="market-sum flex" style="justify-content: space-around;">
        <!-- part 1 总额 -->
        <view class="sum-middle">
          <view class="sum-box">
            <text class="money">{{
              OrderDashboard.TotalTurnOverPrice || 0 | currency
            }}</text>
            <text class="float" v-if="OrderDashboard.Rate && userInfo.BizRole !== 3">{{
              OrderDashboard.Rate | increase
            }}</text>
          </view>
          <text class="sum-text">{{ activeSelect === 0 ? '今日总额' : '总成交额' }}</text>
        </view>

        <!-- part 2 分成 合作伙伴可见 -->
        <view class="sum-middle" v-if="userInfo.BizRole === 3">
          <view class="sum-box">
            <text class="money">{{
              OrderDashboard.TotalCommissionPrice || 0 | currency
            }}</text>
          </view>
          <text class="sum-text">{{ activeSelect === 0 ? '今日分成' : '总分成' }}</text>
        </view>
      </view>
      <!-- <view class="profit flex">
				<text>毛利润：¥42.90</text>
				<text>毛利率：39%</text>
			</view> -->
      <view class="deal flex">
        <view class="deal-item flex">
          <text class="number">{{ OrderDashboard.TotalOrderCount }}</text>
          <text class="text">交易笔数</text>
        </view>
        <view class="deal-item flex">
          <text class="number">{{ OrderDashboard.TotalUserCount }}</text>
          <text class="text">服务人数</text>
        </view>
        <view class="deal-item flex">
          <text class="number">{{
            OrderDashboard.AvgUserPrice | currency
          }}</text>
          <text class="text">客单价</text>
        </view>
        <view class="deal-item flex">
          <text class="number">{{
            OrderDashboard.TotalTurnOverPrice / OrderDashboard.TotalOrderCount | currency
          }}</text>
          <text class="text">笔单价</text>
        </view>
      </view>
    </view>
    <view class="container">
      <mpvue-echarts
        id="main"
        ref="pieChart"
        :echarts="echarts"
        @onInit="initChart"
      />
    </view>
  </view>
</template>

<script>
import dyDatePicker from '@/components/dy-Date/dy-Date';
import * as echarts from '@/common/echarts/echarts.min'; /* chart.min.js为在线定制 */
import mpvueEcharts from '@/components/mpvue-echarts/src/echarts';
let charts = '';

export default {
  name: 'DataOverview',
  components: {
    dyDatePicker,
    mpvueEcharts,
  },
  props: {
    userInfo: { tyep: Object },
  },
  data() {
    return {
      echarts,
      initSelectList: ['今日', '近七日', '近30日'],
      activeSelect: 0,
      chartType: 'line',
      OrderDashboard: '',
      Time: {
        from_minSelect: '2020/01/01',
        from_maxSelect: this.timeFormat(),
        to_minSelect: '2020/01/01',
        to_maxSelect: this.timeFormat(),
        from: this.timeFormat(),
        to: this.timeFormat(),
      },
    };
  },
  filters: {
    increase(value) {
      if (value === undefined || value === null) return 0;
      value = value > 0 ? `↑${value}` : `↓${Math.abs(value)}`;
      return `${value}%`;
    },
  },
  created() {
    this.orderDashboard();
    // this.orderOperatorsReport();
  },
  methods: {
    sliceTime(data) {
      const reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      const arr = data.match(reg);
      const month = arr[2];
      const day = arr[3];
      return `${month}-${day}`;
    },
    // 订单数据展板
    orderDashboard() {
      const time = `${this.Time.from} - ${this.Time.to}`;
      this.$wxRequest.cabinet.orderDashboard({ DateRange: time }).then(res => {
        if (res.error_code === 0) {
          this.OrderDashboard = res.data;
        }
      });
    },
    // 订单数据报表
    async orderOperatorsReport() {
      const time = `${this.Time.from} - ${this.Time.to}`;
      const res = await this.$wxRequest.cabinet.orderOperatorsReport({
        DateRange: time,
      });
      if (res.error_code === 0) {
        const trendData = [];
        let xAxis = [];
        xAxis = res.data.map(item => {
          trendData.push({
            value: this.filterPrice(item.TotalPrice), // 金额
            extraData: item, // 所有的数据
          });
          return item.Date ? this.sliceTime(item.Date) : item.Hour;
        });
        await this.renderCharts(trendData, xAxis);
      } else {
        this.$util.showToast(this.$t(`RESPONSE_MSG.${res.error_msg}`));
      }
    },
    selectInit(v) {
      this.activeSelect = v;
      let time = {};
      switch (v) {
        case 0:
          time = this.$util.timeForMat(0);
          break;
        case 1:
          time = this.$util.timeForMat(7 - 1); // n天前 传参 n-1
          break;
        case 2:
          time = this.$util.timeForMat(30 - 1); // n天前 传参 n-1
          break;
        default:
          break;
      }
      this.Time.from = time.timer3[0];
      this.Time.to = time.timer3[1];
      this.orderDashboard();
      this.orderOperatorsReport();
    },
    /**
     * @param {to_minSelect|from}  to_minSelect结束时间的最小选择范围 from=>开始日期
     */
    getFromData(time) {
      time = String(time).replace(/-/g, '/');
      this.Time.to_minSelect = time;
      this.Time.from = time;
      this.orderDashboard();
      this.orderOperatorsReport();
      // 改乱索引，不让时间按钮 actived, 并控制【成交】与【分成】的文字显示
      this.activeSelect = -1;
    },
    /**
     * @param {from_maxSelect|to} from_maxSelect=>开始日期可选最大可选值 to=> 结束日期
     */
    getToData(time) {
      time = String(time).replace(/-/g, '/');
      const start = this.Time.from;
      const nowTime = new Date(start).getTime();
      const endTime = new Date(time).getTime();
      // 判断结束时间大于开始时间
      if (endTime < nowTime) {
        this.$util.showToast('请选择开始时间');
        return;
      }
      this.Time.from_maxSelect = time;
      this.Time.to = time;
      this.orderDashboard();
      this.orderOperatorsReport();
      // 改乱索引，不让时间按钮 actived, 并控制【成交】与【分成】的文字显示
      this.activeSelect = -1;
    },
    timeFormat() {
      const time = new Date();
      const Y1 = time.getFullYear();
      const M1 =
        time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : `0${time.getMonth() + 1}`;
      const D1 = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
      return `${Y1}/${M1}/${D1}`;
    },
    filterPrice(value) {
      if (value) {
        return (+(value || 0) / 100).toFixed(2);
      }
      return (0.0).toFixed(2);
    },
    renderCharts(trendData, xAxis) {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#efb320',
            },
          },
          renderMode: 'richText',
          extraCssText: 'text-align:left',
          formatter: function formatter(params) {
            const param = params[0];
            const { extraData } = param.data;
            return `${extraData.Hour || extraData.Date || 0}\n交易金额：${
              param.value
            } 元\n交易笔数：${extraData.TotalOrderCount} 笔`;
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '6%',
          bottom: '6%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxis,
          axisTick: {
            // y轴刻度线
            alignWithLabel: true,
          },
          splitLine: {
            // 网格线
            lineStyle: {
              color: ['#888'],
            },
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#666',
            },
          },
        },
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                type: 'doted',
                color: ['#eee', '#f1f1f1'],
              },
            },
            nameGap: 10,
            position: 'left',
            axisLine: {
              show: false,
              lineStyle: {
                color: ['#eee'],
              },
            },
            axisTick: {
              // y轴刻度线
              show: false,
            },
            axisLabel: {
              formatter: value => {
                let label;
                if (value >= 1000) {
                  label = `${value / 1000}K`;
                } else {
                  label = `${value}`;
                }
                return `¥${label}`;
              },
              textStyle: {
                color: '#888',
                fontSize: 12,
              },
            },
          },
        ],
        series: [
          {
            name: '交易额',
            type: 'line',
            data: trendData,
            itemStyle: {
              normal: {
                color: '#00aaed',
              },
            },
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            splitNumber: 5,
            z: 2,
          },
        ],
      };
      charts.setOption(option);
    },
    async initChart(e) {
      let { canvas, width, height } = e;
      width -= 20;
      //let canvas = this.$refs.pieChart.canvas;
      echarts.setCanvasCreator(() => canvas);
      const chart = echarts.init(canvas, null, {
        width,
        height,
      });
      canvas.setChart(chart);
      charts = chart; // 暴露出去
      await this.orderOperatorsReport();
      this.$refs.pieChart.setChart(chart);
    },
  },
};
</script>

<style>
.uni-ec-canvas {
  width: 100%;
  height: 500upx;
  display: block;
}
.container {
  height: 500upx;
}
</style>
<style lang="scss" scoped>
.overview {
  padding: 20upx 10upx;
  .item {
    display: inline-flex;
    min-width: 100upx;
    height: 40upx;
    border: 1px solid rgba(236, 236, 236, 1);
    color: #595656;
    border-radius: 40upx;
    font-size: 24upx;
    justify-content: center;
    align-items: center;
    margin-right: 20upx;
    background-color: #ffffff;
    &.active {
      background-color: #f5bc34;
      color: #ffffff;
      border-color: #f5bc34;
    }
  }
}
.date-selection {
  padding: 10upx 10upx;
  border-bottom: 1px solid #d6d6d6;
  .picker {
    display: inline-flex;
    align-items: center;
  }
  .middle {
    margin: 0 16upx;
  }
}
.market-all {
  .market-sum {
    justify-content: center;
    align-items: center;
    padding: 30upx 0;
    .sum-box {
      position: relative;
      .money {
        font-size: 44upx;
        font-weight: 600;
      }
      .float {
        position: absolute;
        top: 10upx;
        color: #ff0000;
      }
    }
    .sum-text {
      color: #959494;
      font-size: 26upx;
    }
  }
  .sum-middle {
    text-align: center;
  }
  .profit {
    padding: 0 20upx;
    justify-content: space-between;
    color: #959494;
    font-size: 24upx;
  }
  .deal {
    justify-content: space-around;
    .deal-item {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30upx 0;
      .number {
        font-weight: 700;
        font-size: 40upx;
      }
      .text {
        font-size: 24upx;
        color: #959494;
      }
    }
  }
}

.charts {
  width: 690upx;
  height: 500upx;
  background-color: #ffffff;
}
</style>
