<template>
  <view
    class="flex flex-direction align-center justify-center"
    :style="{ height: height + 'px' }"
  >
    <image class="img-empty" :src="imgEmptyPic" v-if="!noEquitment" mode=""></image>
    <image class="img-no-equitment" :src="imgNoEquitment" v-else mode=""></image>
    <view class="text" :style="{marginTop: showBtn ? '20px' : '30px'}">{{ text }}</view>
    <button class="cu-btn" v-if="showBtn" @click="onBtnClick">
      {{ btnText }}
    </button>
  </view>
</template>

<script>
// eslint-disable-next-line import/extensions
import EmptyPic from '@/static/empty.png';
import NoEquitment from '@/static/noEquitment.png';

export default {
  props: {
    height: {
      type: Number,
      default: 600,
    },
    text: {
      type: String,
      default: '这里什么也没有～',
    },
    noEquitment: {
      type: Boolean,
      default: false,
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
    btnText: {
      type: String,
      default: 'default btn text',
    }
  },
  data() {
    return {
      imgEmptyPic: EmptyPic,
      imgNoEquitment: NoEquitment,
    };
  },
  methods: {
    onBtnClick() {
      this.$emit('onBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
$yp-orange: orange;

.img-empty {
  width: 400upx;
  height: 256upx;
}
.img-no-equitment {
  width: 360upx;
  height: 360upx;
}
.text {
  color: #999999;
  font-size: 28upx;
  line-height: 40upx;
}
.cu-btn {
  margin-top: 60upx;
  padding: 0 50upx;
  height: 60upx;
  color: $yp-orange;
  background-color: rgba(0,0,0,0);
  border: 2upx solid $yp-orange;
  border-radius: 30upx;
}
</style>
