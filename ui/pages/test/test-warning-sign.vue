<template>
<view>
  <view class="border bg-white" style="width: 200px; height: 100px;">
  </view>
  <view class="border bg-grey" style="position:relative;width: 200px; height: 100px;">
    <view class="warning-sign-orange">
      12345
    </view>
  </view>
</view>
</template>

<script>
</script>

<style>
.warning-sign-red {
  font-size: 26upx;
  line-height: 36upx;
  background: #EF2727;
  color: #fff;
  padding: 0 8px 0 8px;
  position: absolute;
  top: -10upx;
  border-radius: 12upx 0 0 0;
}
.warning-sign-red::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-width: 18upx 18upx 18upx 0;
  border-style: solid;
  border-color: #EF2727 transparent #EF2727 transparent;
  position: absolute;
  top: 0;
  right: -18upx;
}

.warning-sign-orange {
  font-size: 26upx;
  line-height: 36upx;
  background: #FFAF2E;
  color: #fff;
  padding: 0 8px 0 8px;
  position: absolute;
  top: -10upx;
  border-radius: 12upx 0 0 0;
}
.warning-sign-orange::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-width: 18upx 18upx 18upx 0;
  border-style: solid;
  border-color: #FFAF2E transparent #FFAF2E transparent;
  position: absolute;
  top: 0;
  right: -18upx;
}
</style>
