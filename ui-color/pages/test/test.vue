<template>
  <view
    class="bg-white flex align-center radius-10 margin-bottom-sm"
    style="width: 336upx; height: 140upx;"
  >
    <view class="image-wrap">
      <image
        :src="item.icon"
        style="width: 72upx; height: 72upx;"
      />
      <view class="badge" v-if="badgeInfo">{{ badgeInfo }}</view>
    </view>
    <view class="">{{ item.name }}</view>
  </view>
</template>

<script>
export default {
  data() {return {
    item: {
      icon: `https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2948649887,2339419726&fm=26&gp=0.jpg`,
      name: 'f**k you',
      info: '',
    }
  };},
  computed: {
    badgeInfo() {
      const info = this.item.info;
      if (info > 0 && info < 100) return info;
      if (info > 100) return '...';
      return null;
    }
  }
}
</script>

<style lang="scss">
.image-wrap {
  position: relative;
  margin-left: 36upx;
  margin-right: 22upx;
  width: 72upx;
  height: 72upx;
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    border-radius: 100%;
    color: #fff;
    font-size: 22upx;
    line-height: 28upx;
    text-align: center;
    width: 28upx;
    height: 28upx;
  }
}
</style>
