<template>
  <view>
    <view style="height: 80upx; position: relative;">
      <view
        style="z-index: -1; width: 100%; height: 100%; position: absolute;"
        class="flex flex-direction"
      >
        <view class="flex-sub bg-yp-orange"></view>
        <view class="flex-sub"></view>
      </view>
      <view class="wrap-content">
        <view class="iconfont icon-sousuo"></view>
        <input 
          type="text" 
          placeholder="仅支持商品条码搜索"
          placeholder-class="placeholder"
          :value="value"
          @input="onInput"
          @confirm="onClick"
        />
        <button class="cu-btn" @click="onClick">添加</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {  },
  props: {
    value: String,
  },
  data() {
    return {

    };
  },
  methods: {
    onInput(e) {
      const inputValue = e.detail && e.detail.value;
      this.$emit('input', inputValue)
    },
    onClick() {
      this.$emit('onSearch');
    },
  },
}
</script>

<style lang="scss" scoped>
$yp-blue: #4B80F7;

.wrap-content {
  position: relative;
  padding: 0 24upx;
  display: flex;
  .iconfont {
    position: absolute;
    top: 22upx;
    left: 40upx;
    color: #bbb;
  }
  input {
    flex: 1;
    padding: 0 40upx 0 60upx;
    height: 80upx;
    background-color: #fff;
    border-radius: 12upx;
    .placeholder {
      font-size: 28upx;
      color: #bbb;
      text-align: center;
    }
  }
  .cu-btn {
    margin-left: 14upx;
    width: 140upx;
    height: 80upx;
    background-color: $yp-blue;
    color: #fff;
  }
}
</style>
