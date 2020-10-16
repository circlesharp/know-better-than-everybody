<template>
  <view class="wrap-list" @click="onClick">
    <view class="wrap-top flex">
      <view class="flex-sub" style="color: #999;">
        {{ item.CreateAt | formatData }}
      </view>
      <view :style="{color: item.Status === 1 ? '#EF2727' : ''}">
        {{ item.Status | pickupStatus }}
      </view>
    </view>
    <view class="wrap-bottom flex">
      <view class="flex-sub">
        <view class="repo">
          提货仓库：{{ item.DepotVO.Name }}
        </view>
        <view class="flex">
          <view class="account">
            申请人：{{ item.ReplenisherAccountVO.TrueName }}
          </view>
          <view class="num">
            申请数量：{{ item.TotalProductQty }} 个
          </view>
        </view>
      </view>
      <view class="flex flex-direction justify-center">
        <view
          class="right-icon iconfont icon-qianjin_xiayibu_youjiantou_xiayiye"
        ></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap-list {
  margin-bottom: 20upx;
  padding: 0 30upx;
  color: #333;
  background-color: #fff;
  border-radius: 12upx;
}
.wrap-top {
  padding: 16upx 0;
  font-size: 24upx;
  line-height: 36upx;
  border-bottom: 2upx solid #eee;
}
.wrap-bottom {
  padding: 24upx 0 30upx 0;
  .repo {
    margin-bottom: 8upx;
    font-size: 30upx;
  }
  .account {
    min-width: 200upx;
    margin-right: 20upx;
  }
  .num {}
  .right-icon {
    color: #bbb;
    font-size: 12upx;
  }
}
</style>

<script>
export default {
  props: { 
    item: Object,
  },
  data() {
    return {
      
    };
  },
  filters: {
    pickupStatus(statusCode) {
      switch (statusCode) {
        case -1:
          return '已拒绝';
          break;
        case 0:
          return '待审核';
          break;
        case 1:
          return '待提货';
          break;
        case 2:
          return '已提货';
          break;
        default:
          return statusCode;
      }
    },
  },
  methods: {
    onClick() {
      this.$emit('on-click', this.item);
    },
  },
}
</script>
