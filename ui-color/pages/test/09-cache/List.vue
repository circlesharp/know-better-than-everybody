<template>
  <view class="wrap-list" @click="onListClick">
    <view class="wrap-badge">
      <view class="badge">
        已处理异常订单
      </view>
    </view>
    <view class="wrap-header">
      <view class="date">
        {{ item.CreateAt | formatData }}
      </view>
      <view class="status">
        {{ item.ServiceStatus === 1 ? '服务中' : '服务结束' }}
      </view>
    </view>
    <view class="wrap-content">
      <view class="item" v-for="i in cols" :key="i.title">
        <view class="title">{{ i.title }}</view>
        <view class="content">{{ i.content }}</view>
      </view>
    </view>
    <view class="wrap-btn">
      <button class="cu-btn round" @click="onBtnClick">去处理</button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: Object,
    status: {
      type: Number,
      default: 2, // 通过
    },
  },
  data() {
    return {
      cols: [
        { title: '订单编号', content: this.item.ReceiptNo },
        { title: '设备名称', content: `${this.item.CabinetVO.Name}(${this.item.CabinetVO.DeviceCode})` },
        { title: '设备地址', content: this.item.CabinetVO.Address },
      ]
    };
  },
  computed: {
    isRejected() {
      return this.status === -1;
    },
  },
  methods: {
    onListClick() {
      if (this.isRejected) return;
      this.$emit('onListClick');
    },
    onBtnClick() {
      this.$emit('onBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
$yp-orange: orange;
$yp-red: red;
.wrap-list {
  padding: 20upx 30upx 30upx 30upx;
  background-color: #ffffff;
  border-radius: 12upx;
  font-size: 24upx;
  line-height: 36upx;
  color: #333;
}
.wrap-badge {
  position: relative;
  height: 30upx;
  .badge {
    position: absolute;
    top: -20upx;
    right: -30upx;
    padding: 0 16upx;
    background-color: red;
    color: #fff;
    line-height: 40upx;
    border-radius: 0 12upx 0 0;
  }
}
.wrap-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16upx;
  border-bottom: 2upx solid #eee;
  .date {
    color: #999;
  }
}
.wrap-content {
  display: flex;
  flex-direction: column;
  margin-top: 20upx;
  .item {
    display: flex;
    .title {
      margin-right: 46upx;
      color: #999;
    }
    & + .item {
      margin-top: 16upx;
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
    color: #ffffff;
    font-size: 26upx;
  }
}
</style>
