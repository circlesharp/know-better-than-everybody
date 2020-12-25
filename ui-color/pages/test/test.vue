<template>
  <view class="padding">
    <view class="wrap">
      <view class="item bg-blue">1</view>
      <view class="item bg-blue">2</view>
      <view class="item bg-blue">3</view>
      <view class="item bg-blue">4</view>
      <view class="item bg-blue">5</view>
    </view>
  </view>
</template>

<script>
export default {
  components: {  },
  data() {
    return {
      val: '',
    };
  },
  methods: {
    onChange(val) {
      this.val = val;
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 100px;
    flex: 0 0 33.33%;
  }
}
</style>
