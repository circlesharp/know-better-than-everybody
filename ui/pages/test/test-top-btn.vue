<template>
</template>

<script>
</script>

<style>
.top-btn::before {
  content: '888';
  color: red;
  background: red;
  width: 100rpx;
  height: 100rpx;
}
</style>

<template>
  <view>
      <button
        class="cu-btn lg bg-white radius text-yp-orange"
        style="margin: 0 24upx; z-index: 99; position: fixed; left: 0; right: 0; top: 20upx;"
        @click.once="affirmRep"
      >
        <view class="iconfont icon-fuzhi_line"></view>
        <view style="font-size: 26upx;">从其他设备复制商品</view>
      </button>
  </view>
</template>
