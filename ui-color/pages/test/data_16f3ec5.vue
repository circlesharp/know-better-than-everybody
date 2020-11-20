<template name="pageData">
  <view class="data-content">
    <scroll-view
      scroll-x
      class="bg-white nav"
      scroll-with-animation
      :scroll-left="scrollLeft"
    >
      <view
        class="cu-item"
        :class="item == TabCur ? 'text-orange cur' : ''"
        v-for="(item, index) in tabArr"
        :key="index"
        @tap="tabSelect"
        :data-id="item"
      >
        {{ item }}
      </view>
    </scroll-view>

    <block>
      <view v-if="TabCur === '交易概览'" class="pad-30">
        <DataOverview :userInfo="userInfo"></DataOverview>
      </view>
      <view v-if="TabCur === '设备排行'" class="pad-30">
        <DeviceRanking></DeviceRanking>
      </view>
      <view v-if="(TabCur === '商品排行')" class="pad-30">
        <GoodsRanking></GoodsRanking>
      </view>
      <view v-if="(TabCur === '订单')" class="pad-30">
        <DataOrder></DataOrder>
      </view>
    </block>
  </view>
</template>

<script>
import DataOverview from './DataOverview/DataOverview';
import DataOrder from './DataOrder/DataOrder';
import DeviceRanking from './DeviceRanking/DeviceRanking';
import GoodsRanking from './GoodsRanking/GoodsRanking';
export default {
  name: 'pageData',
  components: {
    DataOverview,
    DataOrder,
    DeviceRanking,
    GoodsRanking,
  },
  props: {
    userInfo: { type: Object }
  },
  data() {
    return {
      TabCur: '交易概览',
      scrollLeft: 0,
    };
  },
  computed: {
    tabArr() {
      if (this.userInfo.BizRole !== 3) { return ['交易概览', '设备排行', '商品排行', '订单']; }
      let arr = ['交易概览', '设备排行']; //  '商品排行', '订单'
      if (this.userInfo.BizRoleExtend.EnableProductRank) { arr.push('商品排行'); }
      if (this.userInfo.BizRoleExtend.EnableOrderList) { arr.push('订单'); }
      return arr;
    },
  },
  created() {
    //
  },
  methods: {
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
    },
  },
};
</script>

<style lang="scss" scoped>
.data-content {
  height: calc(100vh - 40px);
  background-color: #ffffff;
  // margin-bottom: 100upx;
}
.pad-30 {
  padding: 0 30upx;
}
.text-orange {
  color: #f5bc34;
}
uni-picker-view-column {
  font-size: 24rpx;
}
</style>
