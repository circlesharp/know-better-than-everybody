<template name="pageData">
  <view class="data-content">
    <view id="tabbar" style="height: 120upx; position: relative;">
      <view
        style="z-index: -1; width: 100%; height: 100%; position: absolute;"
        class="flex flex-direction"
      >
        <view class="flex-sub bg-yp-orange"></view>
        <view class="flex-sub"></view>
      </view>
      <view
        class="margin-lr-sm padding-lr-lg flex justify-between align-center bg-white radius-10"
        style="height: 100%; font-size: 28upx; color: #333;"
      >
        <view
          v-for="(item, index) in tabArr"
          :key="index"
          class="item"
          :class="[{ active: item == TabCur }]"
          style="height: 100%; line-height: 120upx;"
          @click="tabSelect(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <block>
      <view v-if="TabCur === '交易概览'">
        1
      </view>
      <view v-if="TabCur === '设备排行'">
        2
      </view>
      <view v-if="TabCur === '商品排行'">
        3
      </view>
      <view v-if="TabCur === '订单'">
        4
      </view>
    </block>
    
    
    <view class="test" :class="isBig ? 'big' : 'small'" @click="toggle">test</view>
  </view>
</template>

<style lang="scss" scoped>
$yp-orange: #ffaf2e;

@keyframes rainbow {
  0% {
    background-color: green;
  }
  100% {
    background-color: $yp-orange;
  }
}

@keyframes fuck {
  0% {
    height: 100upx;
  }
  50% {
    height: 200upx;
  }
  75% {
    height: 50upx;
  }
  100% {
    height: 100upx;
  }
}

.test {
  width: 100upx;
  height: 100upx;
  position: fixed;
  background-color: red;
  top: 400upx;
  left: 0;
}
.test.big {
  // left: 400upx;
  background-color: $yp-orange;
  animation: 1s rainbow infinite;
}
.test.small {
  // animation: 2s fuck;
}


.data-content {
  .item {
    transition: .2s;
  }
  .active {
    position: relative;
    font-size: 36upx;
    display: block;
    color: $yp-orange;
  }
  .active:after {
    content: '';
    position: absolute;
    left: 25%;
    bottom: 0upx;
    width: 50%;
    height: 8upx;
    border-radius: 10upx;
    background-color: $yp-orange;
  }
}
.pad-30 {
  padding: 0 30upx;
}
uni-picker-view-column {
  font-size: 24rpx;
}
</style>

<script>

export default {
  name: 'pageData',
  props: {
    userInfo: { type: Object },
  },
  data() {
    return {
      TabCur: '交易概览',
      scrollLeft: 0,
      tabbarHeight: 60,
      isBig: false,
    };
  },
  computed: {
    tabArr() {
      return ['交易概览', '设备排行', '商品排行', '订单'];
    },
  },
  methods: {
    toggle() {
      this.isBig = !this.isBig;
    },
    tabSelect(TabCur) {
      this.TabCur = TabCur;
    },
  },
};
</script>


