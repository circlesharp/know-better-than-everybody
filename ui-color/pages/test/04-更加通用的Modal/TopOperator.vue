<template>
  <view>
    <view class="wrap-top-operator">
      <view style="color: #999;">提货仓库：</view>
      <view class="text-bold flex-sub">{{ selectedDepot.name }}</view>
      <view style="margin-right: 6px;">
        <switch color="#FFAF2E" @change="onSwitchChange"></switch>
      </view>
      <view>整件拿</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap-top-operator {
  position: fixed;
  top: 85px;
  left: 24upx;
  right: 24upx;
  display: flex;
  align-items: center;
  height: 80upx;
  line-height: 40upx;
  font-size: 28upx;
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      selectedDepot: { name: '测试仓库', value: '' }, // 传入的仓库
      goodsTree: [{"id":"0","text":"所有分类","children":[{"id":"58e6ee4369c7ef1100ad2f06","text":"饮料","level":1,"parent_id":"","children":[{"id":"59ad1ac48b10fb0010ea5087","text":"植物饮料","level":2,"parent_id":"58e6ee4369c7ef1100ad2f06","children":[{"BarCode":"6902538004045","Name":"脉动青柠口味瓶装600ml","CategoryID":"59ad1ac48b10fb0010ea5087","ParentCategoryID":"58e6ee4369c7ef1100ad2f06","ImageUrl":"https://res.yopoint.com/product/20190506/48dea89ca7e1fab3d5d370621a0a7e2b.png","ImageFixWidthUrl":"https://res.yopoint.com/product/20190506/8b876b7b4025f2b25698e3d4638d513a.png","TotalReplenishStock":1,"TotalSalesCount":1,"AccountStock":0,"BoxGauge":25}]}]},{"id":"5c71595549b1a5001351a2f6","text":"其他","level":1,"parent_id":"","children":[{"id":"5c715963d3b8950011f866b5","text":"未分类","level":2,"parent_id":"5c71595549b1a5001351a2f6","children":[{"BarCode":"6925303723910","Name":"统一冰红茶1L","CategoryID":"5c715963d3b8950011f866b5","ParentCategoryID":"5c71595549b1a5001351a2f6","ImageUrl":"https://res.yopoint.com/product/20190528/d10d58e747f583f6f554018e98419cd0.png","ImageFixWidthUrl":"https://res.yopoint.com/product/20190528/4733bc75b0e1c505d42ff8274d799ae3.png","TotalReplenishStock":1,"TotalSalesCount":3,"AccountStock":1,"BoxGauge":1}]}]}],"level":0}],
    };
  },
  created() {
    console.log(
      JSON.stringify(this.goodsTree, null, 2)
    );
  },
  methods: {
    onSwitchChange(e) {
      const isFullPackage = e.detail && e.detail.value;
      this.isFullPackage = isFullPackage;
    }
  }
}
</script>