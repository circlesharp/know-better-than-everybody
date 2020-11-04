<template>
  <view class="wrap-card">
    <view class="title">{{ title }}</view>
    <view class="content">
      <slot>default content</slot>
    </view>
    <view class="extra" v-if="isExtra">
      <slot name="extra">
        <view class="wrap-add-btn">
          <button class="cu-btn btn" @click="onExtraClick">
            {{ extraText }}
          </button>
        </view>
      </slot>
    </view>
  </view>
</template>

<script>
export default {
  props: { 
    title: {
      type: String,
      default: 'default title',
    },
    isExtra: {
      type: Boolean,
      default: false,
    },
    extraText: {
      type: String,
      default: 'default extra text',
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    onExtraClick() {
      this.$emit('onExtraClick');
    }
  },
}
</script>

<style lang="scss" scoped>
$yp-orange: orange;
.wrap-card {
  width: 100%;
  padding: 0 30upx;
  background-color: #fff;
  border-radius: 12upx;
}
.title {
  height: 80upx;
  border-bottom: 2upx solid #eee;
  color: #333;
  font-size: 30upx;
  font-weight: 600;
  line-height: 80upx;
}
.content {
  padding: 20upx 0 30upx 0;
}
.extra {
  border-top: 2upx solid #eee;
  .wrap-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100upx;
    .btn.cu-btn {
      color: $yp-orange !important;
      background-color: #fff !important;
    }
  }
}
</style>
