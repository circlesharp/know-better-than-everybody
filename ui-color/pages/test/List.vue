<template>
  <view class="flex flex-sub" @click="onClick">
    <image
      class="solid margin-right-sm"
      :src="`${item.ImageFixWidthUrl}?x-oss-process=image/resize,h_120`"
      style="width: 120upx; height: 120upx; margin-right: 20upx;"
      mode="aspectFit"
    ></image>
    <view class="flex-sub">
      <view class="name">{{ item.Name }}</view>
      <view class="flex align-center">
        <view class="desc flex-sub">{{ item.BarCode || '' }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    onClick() {
      const params = {
        BarCode: this.item.BarCode,
        ProductVO: {
          Name: this.item.Name,
          ImageUrl: this.item.ImageUrl,
          ImageFixWidthUrl: this.item.ImageFixWidthUrl,
        },
      };
      this.$emit('on-select', params);
    },
  },
};
</script>

<style lang="scss">
.name {
  width: 360upx;
  height: 64upx;
  font-size: 28upx;
  line-height: 32upx;

  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.desc {
  margin-top: 16upx;
  color: #999;
  font-size: 24upx;
}
</style>
