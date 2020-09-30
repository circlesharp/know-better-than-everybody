<template>
  <view
    class="flex flex-direction align-center justify-center bg-white"
    :style="style"
  >
    <image class="img" :src="img" mode=""></image>
    <view class="text">{{ text }}</view>
  </view>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 400,
    },
    text: {
      type: String,
      default: '这里什么也没有～',
    },
  },
  data() {
    return {
      img: '../../static/BasicsBg.png',
    };
  },
  computed: {
    style() {
      return {
        height: this.height + 'px',
      };
    },
  },
}
</script>

<style>
.img {
  width: 400upx;
  height: 256upx;
}
.text {
  margin-top: 60upx;
  color: #999999;
  font-size: 28upx;
  line-height: 40upx;
}
</style>
