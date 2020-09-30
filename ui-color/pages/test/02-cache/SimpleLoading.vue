<template>
  <view class="loading-wrap" v-if="isLoading">
    <view class="load">
      <image class="icon-loading" src="./loading.png" mode=""></image>
      <view class="">{{ content }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '加载中'
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      loadingContent: this.content,
    };
  },
  watch: {
    loading(bool) {
      this.isLoading = bool;
    },
  },
  methods: {
    showLoading(content) {
      if (content) this.loadingContent = content;
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    }
  },
}
</script>

<style lang="scss" scoped>
.loading-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .load {
    width: 220upx;
    height: 220upx;
    background-color: rgba(34,34,34,0.80);
    border-radius: 10upx;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-size: 26upx;
    z-index: 9999;
    color: #fff;
  }
  .icon-loading {
    margin: 30upx;
    width: 40upx;
    height: 40upx;
    animation: cuIcon-spin 2s infinite linear;
  }
}
</style>
