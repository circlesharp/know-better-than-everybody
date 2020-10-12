<template>
  <view class="temple-list">
    <view 
      v-for="(goods, idx) in collapseGoods"
      :key="goods.BarCode"
    >
      <List
        :goods="goods"
        :isTakeWhole="isTakeWhole"
        @deleteMyself="onDeleteMyself(idx)"
        @updatePickup="onUpdatePickup($event, idx)"
      ></List>
    </view>
    
    <button class="cu-btn bg-brown" @click="calWholePickupNum">calWholePickupNum</button>
    <button class="cu-btn bg-green" @click="takeWhole">takeWhole</button>
    
    <view class="wrap-bottom-operator">
      <BottomOperator
        :totalNum="totalNum"
        @selectGoods="addGoods"
        @submit="onSubmit"
      />
    </view>
  </view>
</template>

<script>
import List from './List.vue';
import BottomOperator from './BottomOperator.vue';

const testAddedGoods = {
  "BarCode": "6902538005555",
  "Name": "脉动青柠新商品",
  "CategoryID": "59ad1ac48b10fb0010ea5087",
  "ParentCategoryID": "58e6ee4369c7ef1100ad2f06",
  "ImageUrl": "https://res.yopoint.com/product/20190506/48dea89ca7e1fab3d5d370621a0a7e2b.png",
  "ImageFixWidthUrl": "https://res.yopoint.com/product/20190506/8b876b7b4025f2b25698e3d4638d513a.png",
  "TotalReplenishStock": 1,
  "TotalSalesCount": 10,
  "AccountStock": 5,
  "BoxGauge": 25,
  "pickupNum": 5
};

export default {
  components: { List, BottomOperator },
  data() {
    return {
      selectedDepot: { name: '测试仓库', value: '' }, // 传入的仓库
      goodsTree: [{"id":"0","text":"所有分类","children":[{"id":"58e6ee4369c7ef1100ad2f06","text":"饮料","level":1,"parent_id":"","children":[{"id":"59ad1ac48b10fb0010ea5087","text":"植物饮料","level":2,"parent_id":"58e6ee4369c7ef1100ad2f06","children":[{"BarCode":"6902538004045","Name":"脉动青柠口味瓶装600ml","CategoryID":"59ad1ac48b10fb0010ea5087","ParentCategoryID":"58e6ee4369c7ef1100ad2f06","ImageUrl":"https://res.yopoint.com/product/20190506/48dea89ca7e1fab3d5d370621a0a7e2b.png","ImageFixWidthUrl":"https://res.yopoint.com/product/20190506/8b876b7b4025f2b25698e3d4638d513a.png","TotalReplenishStock":1,"TotalSalesCount":1,"AccountStock":0,"BoxGauge":25}]}]},{"id":"5c71595549b1a5001351a2f6","text":"其他","level":1,"parent_id":"","children":[{"id":"5c715963d3b8950011f866b5","text":"未分类","level":2,"parent_id":"5c71595549b1a5001351a2f6","children":[{"BarCode":"6925303723910","Name":"统一冰红茶1L","CategoryID":"5c715963d3b8950011f866b5","ParentCategoryID":"5c71595549b1a5001351a2f6","ImageUrl":"https://res.yopoint.com/product/20190528/d10d58e747f583f6f554018e98419cd0.png","ImageFixWidthUrl":"https://res.yopoint.com/product/20190528/4733bc75b0e1c505d42ff8274d799ae3.png","TotalReplenishStock":1,"TotalSalesCount":3,"AccountStock":1,"BoxGauge":1}]}]}],"level":0}],
      collapseGoods: [
        {
          "BarCode": "6902538004045",
          "Name": "脉动青柠口味瓶装600ml",
          "CategoryID": "59ad1ac48b10fb0010ea5087",
          "ParentCategoryID": "58e6ee4369c7ef1100ad2f06",
          "ImageUrl": "https://res.yopoint.com/product/20190506/48dea89ca7e1fab3d5d370621a0a7e2b.png",
          "ImageFixWidthUrl": "https://res.yopoint.com/product/20190506/8b876b7b4025f2b25698e3d4638d513a.png",
          "TotalReplenishStock": 1,
          "TotalSalesCount": 1,
          "AccountStock": 0,
          "BoxGauge": 25,
          "pickupNum": 1
        },
        {
          "BarCode": "6925303723910",
          "Name": "统一冰红茶1L",
          "CategoryID": "5c715963d3b8950011f866b5",
          "ParentCategoryID": "5c71595549b1a5001351a2f6",
          "ImageUrl": "https://res.yopoint.com/product/20190528/d10d58e747f583f6f554018e98419cd0.png",
          "ImageFixWidthUrl": "https://res.yopoint.com/product/20190528/4733bc75b0e1c505d42ff8274d799ae3.png",
          "TotalReplenishStock": 1,
          "TotalSalesCount": 3,
          "AccountStock": 1,
          "BoxGauge": 1,
          "pickupNum": 2
        },
        {
          "BarCode": "6925303723911",
          "Name": "统二冰红茶",
          "CategoryID": "5c715963d3b8950011f866b5",
          "ParentCategoryID": "5c71595549b1a5001351a2f6",
          "ImageUrl": "https://res.yopoint.com/product/20190528/d10d58e747f583f6f554018e98419cd0.png",
          "ImageFixWidthUrl": "https://res.yopoint.com/product/20190528/4733bc75b0e1c505d42ff8274d799ae3.png",
          "TotalReplenishStock": 1, // nonsense
          "TotalSalesCount": 88,
          "AccountStock": 40,
          "BoxGauge": 10,
          "pickupNum": 44
        },
      ],
      isTakeWhole: false,
    };
  },
  computed: {
    totalNum() {
      let total = 0;
      this.collapseGoods.forEach(goods => {
        total += goods.pickupNum;
      });
      return total;
    },
  },
  created() {
    // console.log(this.collapseGoods)
  },
  methods: {
    onDeleteMyself(idx) {
      const targetGoods = this.collapseGoods[idx];
      if (targetGoods)
        this.collapseGoods.splice(idx, 1);
    },
    onUpdatePickup(val, idx) {
      const targetGoods = this.collapseGoods[idx];
      if (targetGoods)
        targetGoods.pickupNum = val.pickupNum;
    },
    takeWhole() {
      this.isTakeWhole = !this.isTakeWhole;
    },
    addGoods(goods) {
      console.log(11, goods)
      const targetBarCode = goods.BarCode;
      let isGoodsExist = false;
      this.collapseGoods.forEach(existedGoods => {
        if (existedGoods.BarCode === targetBarCode) isGoodsExist = true;
      });
      if (!isGoodsExist) this.collapseGoods.push(goods);
    },
    onSubmit() {
      //
    },
    calWholePickupNum() {
      this.collapseGoods.forEach(goods => {
        console.log(goods.Name, goods.pickupNum);
      })
    },
  },
}
</script>

<style>
.temple-list {
  padding: 0 24upx;
}
.wrap-bottom-operator {
  margin: 0 24upx;
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 30upx;
}
</style>
