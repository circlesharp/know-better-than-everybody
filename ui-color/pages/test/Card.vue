<template>
  <view class="wrap-card">
    <view class="title">{{ title }}</view>
    <view class="content">
      <slot >default content</slot>
    </view>
  </view>
</template>

<script>
export default {
  props: { 
    title: {
      type: String,
      default: 'default title',
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
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
</style>
