<template>
<view class="bg-red padding">
  <view class="list bg-white" @click="priceTip = false">
    <!-- part 1 -->
    <view class="flex">
      <view class="margin-right-sm" >
        <image
          :src="`${item.ProductVO.ImageFixWidthUrl}?x-oss-process=image/resize,h_100`"
          style="width: 120upx; height: 120upx; border: 1upx #DDDDDD solid;"
          mode="aspectFit"
        ></image>
      </view>
      <view class="flex-sub">
        <view class="flex justify-between">
          <view class="product-name">{{ item.ProductVO.Name }}</view>
          <view>
            <!-- 有价格 -->
            <view style="font-weight:500;" v-if="!item.Price">
              {{ item.Price | currency }}
            </view>
            <!-- 没价格 -->
            <view class="text-red hint" v-else @tap.stop="handelPriceTip">
              <view class="flex align-center justify-center">
                <text class="symbol">!</text>
                <text>无价格</text>
              </view>
              <text class="tip" v-if="priceTip">
                请联系管理员配置价格否则此设备无法售卖
              </text>
            </view>
          </view>
        </view>
        <view class="desc" style="width: 480upx;">缺货货道：{{ cargoStr }}</view>
      </view>
    </view>
    
    <!-- part 2 -->
    <view class="flex justify-between margin-tb">
      <view class="text-red">缺货数量：</view>
      <view>个人库存：{{ item.AccountStock }}</view>
      <view>当前数量：{{ item.ReplenishStock - item.SalesCount }}</view>
    </view>
    
    <!-- part 3 -->
    <view class="flex align-center">
      <view class="desc">补后数量：</view>
      <NumberBox />
    </view>
  </view>
</view>
</template>

<script>
import NumberBox from './test-number-box.vue';
const mock = {"OID":"5db266d87bd4810010954b0e","CID":"5f519ebf4405f00010750ef5","BarCode":"6902538004045","ProviderProductID":"17006","Price":1,"OnShelvesTime":1599201612,"Stock":-32,"SalesCount":32,"CreateAt":1599201612,"UpdatedAt":1599448708,"id":"5f51e14c4405f00010750ef9","ProductVO":{"Name":"脉动青柠口味瓶装600ml","ImageUrl":"https://res.yopoint.com/product/20190506/48dea89ca7e1fab3d5d370621a0a7e2b.png","ImageFixWidthUrl":"https://res.yopoint.com/product/20190506/8b876b7b4025f2b25698e3d4638d513a.png","BarCode":"6902538004045"},"ReplenishStock":0,"AccountStock":2,"CargoList":[{"Row":1,"Col":2,"BarCode":"6902538004045","ProviderProductID":"17006","ProviderExist":1}],"clash":12};

export default {
  components: { NumberBox },
  props: {
    item: {
      type: Object,
      default() {
        return mock;
      },
    },
    index: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      priceTip: false,
    };
  },
  computed: {
    cargoStr() {
      if (!this.item.CargoList) return '';
      const str = this.item.CargoList.map(i => `${i.Row}-${i.Col}`).join('、');
      return str;
    },
  },
  methods: {
    handelPriceTip() {
      this.priceTip = true;
    },
  }
};
</script>

<style>
.list {
  color: #333;
  font-size: 28upx;
  line-height: 32upx;
  padding: 30upx;
  border-radius: 12upx;
}
.product-name {
  width: 320upx;
  height: 64upx;
  margin-bottom: 12upx;
  /* 两行 */
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
.desc {
  color: #999;
}
.symbol {
  width: 20upx;
  height: 20upx;
  background-color: red;
  color: #ffffff;
  border-radius: 50%;
  font-size: 20upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hint {
  position: relative;
  .tip {
    position: absolute;
    left: 0rpx;
    background-color: rgba(70, 76, 91, 0.9);
    color: #fff;
    font-size: 20upx;
    padding: 10upx;
    border-radius: 8upx;
    z-index: 9;
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      top: -10upx;
      border-color: transparent;
      border-style: solid;
      left: 24upx;
      border-width: 10upx 10upx 0;
      transform: rotate(180deg);
      border-top-color: rgba(70, 76, 91, 0.9);
    }
  }
}
</style>
