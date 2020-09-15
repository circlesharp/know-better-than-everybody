<template>
  <view class="margin padding bg-white radius-10">
  <view class="flex align-center bg-white" style="width: 100%; border-bottom: 1upx solid #EEEEEE;">
    <view style="margin-right: 40upx;">{{ idxStr }}</view>
    <view style="padding: 44upx 0; width: 100%;">
      <view class="first-line flex align-center">
        <view
          class="cu-avatar round"
          style="width: 36upx; height: 36upx; margin-right: 10upx;"
          :style="'background-image:url(' + icon + ');'"
         ></view>
         <view class="flex-sub text-bold" style="font-size: 28upx; color: #333;">
          {{ item.Name }}（{{ item.DeviceCode }}）
         </view>
         <view class="desc">
          成交额
         </view>
      </view>
      <view class="second-line flex align-center">
        <view class="desc flex-sub">
          {{ item.IndustryParentName || '' }}{{ item.IndustryName || '' }}
        </view>
        <view class="text-price">
          {{ item.TotalPrice | FormatPrice }}
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number,
      default: 1,
    },
    item: {
      type: Number,
      default() {
        return {
          Address: "福海街道",
          CID: "5f519ebf4405f00010750ef5",
          DeviceCode: "voffice横屏展示",
          IndustryName: "零售类公司",
          IndustryParentName: "公司企业工厂",
          LandMarkName: "福永",
          Name: "富尔达饮料柜",
          TotalOrderCount: 2,
          TotalPrice: 1,
          TotalProductsCount: 2,
          TotalRefundsOrderCount: 1,
          TotalRefundsPrice: 2,
          TotalTradePrice: 3,
          TotalTurnOverPrice: 1,
          TotalUserCount: 1,
        };
      }
    },
  },
  data() {
    return {
      icon: 'https://common.cnblogs.com/images/wechat.png',
    };
  },
  computed: {
    idxStr() {
      const str = (this.idx + 1).toString();
      if (str.length < 2) return '0' + str;
      return str;
    }
  },
  filters: {
    FormatPrice(value) {
      if (value) {
        return (+(value || 0) / 100).toFixed(2);
      }
      return (0.0).toFixed(2);
    },
  },
}
</script>

<style>
  .desc {
    color: #999999;
    font-size: 24upx;
  }
</style>