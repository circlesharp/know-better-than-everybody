<template>
  <view>
    <view class="wrap-goods">
      <view class="wrap-detail flex">
        <view>
          <image
            class="solid"
            :src="`${goods.ImageFixWidthUrl}?x-oss-process=image/resize,h_60`"
            style="width: 120upx; height: 120upx; margin-right: 20upx;"
            mode="aspectFit"
          ></image>
        </view>
        <view class="flex-sub">
          <view class="goods-name">{{ goods.Name }}</view>
          <view class="goods-out-stock">
            缺货
            <view class="text-yp-red">{{ goods.TotalSalesCount }}个</view>
            ，个人库存
            <view style="color: #151515;">{{ goods.AccountStock }}个</view>
          </view>
        </view>
        <view>
          <button class="del-btn cu-btn line-black">
            删除商品
          </button>
        </view>
      </view>
      
      <view class="wrap-num">
        <GoodsInput
          :item="goods"
          :value="goods.pickupNum"
          :type="'pickup'"
        />
      </view>
    </view>
  </view>
</template>

<script>
import GoodsInput from './GoodsInput.vue';
export default {
  components: { GoodsInput },
  props: {
    goods: Object,
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
.wrap-goods {
  margin-bottom: 20upx;
  width: 100%;
  background-color: #fff;
  border-radius: 12upx;
  .wrap-detail {
    padding: 32upx 30upx 20upx 30upx;
    color: #333333;
    font-size: 28upx;
    border-bottom: 2upx solid #eee;
    .goods-name {
      margin-bottom: 42upx;
      line-height: 32upx;
    }
    .goods-out-stock {
      display: flex;
      color: #999999;
      line-height: 40upx;
    }
    .del-btn {
      border-radius: 8upx;
      padding: 0 18upx;
      height: 48upx;
      font-size: 26upx;
    }
  }
  .wrap-num {
    padding: 20upx 30upx 18upx 30upx;
  }
}

.text-yp-red {
  color: #ef2727;
}
</style>
