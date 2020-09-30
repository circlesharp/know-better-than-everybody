<template>
  <view class="flex align-center justify-between">
    <!-- part 1 pic -->
    <image
      class="solid margin-right-sm"
      :src="`${ImageFixWidthUrl}?x-oss-process=image/resize,h_60`"
      style="width: 80upx; height: 80upx; margin-right: 38upx;"
      mode="aspectFit"
    ></image>
    <view class="flex-sub">{{ Name }}</view>
    <view style="margin-left: 40upx;">{{ `x ${Qty}` }}</view>
    <view class="text-price" style="margin-left: 70upx;">{{ TotalPrice | currency }}</view>
  </view>
</template>

<script>
export default {
  props: ['ImageFixWidthUrl', 'Name', 'Qty', 'TotalPrice'],
}
</script>

<style>
</style>
