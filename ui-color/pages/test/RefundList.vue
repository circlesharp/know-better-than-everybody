<template>
  <view class="refund-list">
    <view class="wrap-img">
      <image :src="`${item.ImageFixWidthUrl}?x-oss-process=image/resize,h_60`" mode="aspectFit"></image>
    </view>
    <view class="wrap-info">
      <view class="name">{{ item.Name }}</view>
      <view class="desc">
        <view>订单识别数：{{ item.QtyBefore }}</view>
        <view>申请数{{ item.Qty }}</view>
      </view>
      <view class="operator">
        <view v-if="type === 0" class="flex align-center">
          审核数：
          <NiceInput
            inputType="number"
            :min="0"
            :widthInput="20"
            :defaultValue="item.RealQty"
            @change="onInputChange"
          />
        </view>
        <view v-else>审核数：{{ item.RealQty }}</view>
        <view>退款金额：{{ (item.RealQty * item.Price) | currency }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import NiceInput from './NiceInput.vue';

export default {
  components: { NiceInput },
  props: { 
    item: Object,
    type: Number,
  },
  data() {
    return {
      
    };
  },
  created() {
    console.log(JSON.stringify(this.item, null, 2))
  },
  methods: {
    onInputChange(e) {
      this.$emit('realQtyChange', e);
    }
  },
}
</script>

<style lang="scss" scoped>
.refund-list {
  display: flex;
  font-size: 24upx;
  line-height: 36upx;
}
.wrap-img {
  margin-right: 16upx;
  image {
    height: 120upx;
    width: 120upx;
    border: 2upx solid #eee;
  }
}
.wrap-info {
  flex: 1;
  .name {
    font-size: 26upx;
  }
  .desc {
    display: flex;
    color: #999;
    view + view {
      margin-left: 24upx;
    }
  }
  .operator {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
