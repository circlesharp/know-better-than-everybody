<template>
  <view>
    <view class="order-info">
      <view class="title">{{ title }}</view>
      <view class="content">
        <view class="item" v-for="item in recordInfo" :key="item.name">
          <view>{{item.name}}</view>
          <view style="color: #333;">{{item.value}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import helper from './dataHelper.js';

export default {
  props: {
    title: {
      type: String,
      default: '单据信息',
    },
    orderData: Object,
  },
  data() {
    return {
      recordInfo: helper[this.orderData.Status](this.orderData),
    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.order-info {
  margin: 0 24upx;
  color: #999;
  font-size: 26upx;
  line-height: 40upx;
  .title {
    padding: 20upx 0;
  }
  .content {
    padding: 10upx 30upx;
    background-color: #fff;
    border-radius: 12upx;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10upx 0;
    }
  }
}
</style>
