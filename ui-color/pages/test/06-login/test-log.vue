<template>
  <view>
    <view class="log-list">
      <view
        class="item"
        v-for="(item, index) in LementList"
        :key="index"
        @click="goDetails"
        :data-id="item.id"
      >
        <view class="header">{{ item.CreateAt | formatData }}</view>
        <view class="content flex align-center">
          <view class="left flex flex-sub">
            <view class="device">
              补货设备：{{ item.CabinetVO.Name }} 
              （{{
                item.CabinetVO.DeviceCode
              }}）
            </view>
            <view class="replenisher">
              补货员：{{ item.AccountVO.TrueName }}
            </view>
          </view>
          <view class="right">
            {{ item.TotalSupplementQuantity }}个
          </view>
          <view class="iconfont icon-qianjin_xiayibu_youjiantou_xiayiye"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {  },
  data() {
    return {
      LementList: [{"OID":"5db266d87bd4810010954b0e","CID":"5f519ebf4405f00010750ef5","AccountID":"5d25404ad66b8d0011cfab72","ProductList":[{"BarCode":"6925303723910","Stock":-1,"BeforeStock":-3,"ProviderProductID":"14484","Name":"统一冰红茶1L"},{"BarCode":"6902538004045","Stock":28,"BeforeStock":-15,"ProviderProductID":"17006","Name":"脉动青柠口味瓶装600ml"}],"ReceiptNo":"CSBH20101309574030915","TotalStock":27,"TotalSupplementQuantity":45,"CreateAt":1602554260,"UpdatedAt":1602554260,"id":"5f850994de7a490010a82882","CabinetVO":{"Name":"二楼","DeviceCode":"二楼"},"AccountVO":{"TrueName":"lsy"}}],
    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.log-list {
  margin-bottom: 100upx;
    padding: 0 24upx;

  .item {
    background-color: #ffffff;
    padding: 0 30upx;
    margin: 20upx 0;
    justify-content: space-between;
    border-radius: 12upx;
    .header {
      font-size: 24upx;
      color: #999999;
      padding: 16upx 0;
      border-bottom: 2upx solid #eee;
    }
    .left {
      padding: 24upx 0;
      flex-direction: column;
      justify-content: space-between;
      .device {
        font-size: 30upx;
        line-height: 44upx;
        font-weight: 500;
        margin-bottom: 4upx;
      }
      .replenisher {
        font-size: 24upx;
        line-height: 36upx;
      }
    }
    .right {
      font-size: 30upx;
      line-height: 44upx;
      font-weight: 500;
    }
    .icon-qianjin_xiayibu_youjiantou_xiayiye {
      margin-left: 15upx;
      color: #bbb;
      font-size: 14upx;
      line-height: 44upx;
    }
  }
}
</style>
