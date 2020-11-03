<template>
  <view class="refund-list">
    <view class="wrap-img">
      <image :src="`${item.ImageFixWidthUrl}?x-oss-process=image/resize,h_60`"></image>
    </view>
    <view class="wrap-info">
      <view class="name">{{ item.Name }}</view>
      <view class="desc">
        <view>{{ item.QtyBefore }}</view>
        <view>{{ item.Qty }}</view>
      </view>
      <view class="operator">
        <view>{{ item.RealQty }}</view>
        <view>{{ (item.RealQty * item.Price) | currency }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
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
    
  },
}
</script>

<style lang="scss" scoped>
.refund-list {
  
}
</style>
