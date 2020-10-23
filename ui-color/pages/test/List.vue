<template>
  <view class="wrap-list">
    <view class="wrap-header">
      {{ (item.SubmitTime * 1000) | date }}
      {{ (item.SubmitTime * 1000) | time }}
    </view>
    <view class="wrap-content">
      <view class="wrap-left">
        <image
          :src="item.ProviderProductSubmitData.imageUrl1"
          mode="aspectFit"
        ></image>
      </view>
      <view class="wrap-right">
        <view class="name">{{item.ProviderProductSubmitData.goodName}}</view>
        <view class="barcode">{{ item.BarCode }}</view>
        <view class="question" v-if="isRejected">{{ item.VerifyMsg }}</view>
      </view>
    </view>
    <view class="wrap-btn" v-if="isRejected">
      <button class="cu-btn round">修改</button>
    </view>
  </view>
</template>

<script>
export default {
  props: { 
    item: Object,
    status: {
      type: Boolean,
      default: 2, // 通过
    }
  },
  data() {
    return {
      
    };
  },
  computed: {
    isRejected() {
      return this.status === '-1';
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
$yp-orange: orange;
$yp-red: red;
  
.wrap-list {
  padding: 20upx 30upx 30upx 30upx;
  background-color: #FFFFFF;
  border-radius: 12upx;
  font-size: 24upx;
  line-height: 36upx;
  color: #999999;
}
.wrap-content {
  display: flex;
  margin-top: 20upx;
  .wrap-left {
    margin-right: 20upx;
    width: 120upx;
    height: 120upx;
    image {
      width: 120upx;
      height: 120upx;
      border: 2upx solid #eee;
    }
  }
  .wrap-right {
    .name {
      margin-bottom: 4upx;
      font-size: 28upx;
      line-height: 40upx;
      color: #333;
    }
    .question {
      color: $yp-red;
      font-size: 26upx;
    }
  }
}
.wrap-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20upx;
  button {
    width: 160upx;
    height: 60upx;
    background-color: $yp-orange;
    color: #FFFFFF;
    font-size: 26upx;
  }
}
</style>
