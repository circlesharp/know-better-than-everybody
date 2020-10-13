<template>
  <!-- record detail -->
  <view>
    <!-- part 1 step -->
    
    <!-- part 2 waiting -->
    <view class="wrap-waiting" v-if="recordInfo.Status === 0">
      等待管理员完成审核
    </view>
    
    <!-- part 3 orderInfo -->
    <view>
      <OrderInfo :orderData="recordInfo" />
    </view>
    
    <!-- part 4 goodsInfo -->
    <view>
      <GoodsInfo :status="recordInfo.Status" :goodsData="recordInfo.ProductList" />
    </view>
    
  </view>
</template>

<script>
import OrderInfo from './OrderInfo/OrderInfo.vue';
import GoodsInfo from './GoodsInfo.vue';

const mock = {"ProductList":[{"BarCode":"6925303723910","Qty":2,"RealQty":0,"BeforeQty":0,"BoxGauge":1,"Tips":"0件0个"},{"BarCode":"6928804011296","Qty":26,"RealQty":0,"BeforeQty":0,"BoxGauge":24,"Tips":"1件2个"},{"BarCode":"6928804011142","Qty":45,"RealQty":0,"BeforeQty":0,"BoxGauge":24,"Tips":"1件21个"}],"AccountID":"5eeacd7535c873000f20fec2","OID":"5db266d87bd4810010954b0e","DepotID":"5ed4fea51e5cd7000fa8f425","Remarks":"[系统]自动审核","OutOfStock":{"Info":""},"BizSource":0,"ReceiptNo":"TH20101315190675792","OpAccountID":"","Status":1,"CreateAt":1602573546,"UpdatedAt":1602573546,"id":"5f8554eac6ea3e0010b16e79"};

export default {
  components: { OrderInfo, GoodsInfo },
  data() {
    return {
      recordInfo: mock,
    };
  },
  computed: {

  },
  created() {
    // console.log(this.recordInfo)
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.wrap-waiting {
  width: 100%;
  height: 112upx;
  background-color: #FFEDD0;
  color: #FFAF2E;
  font-size: 46upx;
  line-height: 112upx;
  text-align: center;
}
</style>
