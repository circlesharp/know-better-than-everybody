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
          <button class="del-btn cu-btn line-black" @click="deleteMyself">
            删除商品
          </button>
        </view>
      </view>
      
      <view class="wrap-num">
        <GoodsInput
          type="pickup"
          :item="goods"
          :value="goods.pickupNum"
          :isTakeWhole="isTakeWhole"
          @updatePickup="updatePickup"
        />
      </view>
    </view>
  </view>
</template>

<script>
/*
::: 字段说明 :::

一个商品的对象里面有多个属性，其中值为数字的有5个

1. TotalReplenishStock 上次补货后的总数量
2. TotalSalesCount 上次补货后卖出去的数量
3. AccountStock 我的个人库存
4. BoxGauge 箱规
5. pickupNum 提货数量
  5.1 初始值为 TotalSalesCount - AccountStock
  5.2 随后根据 GoodsInput 的 emit 修改
*/
import GoodsInput from './GoodsInput.vue';
export default {
  components: { GoodsInput },
  props: {
    goods: Object,
    isTakeWhole: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {

    };
  },
  created() {
    // console.log(this.goods)
  },
  methods: {
    deleteMyself() {
      this.$emit('deleteMyself')
    },
    updatePickup(val) {
      this.$emit('updatePickup', val);
    },
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
