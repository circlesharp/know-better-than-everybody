<template>
  <view
    class="flex align-center"
    style="width: 100%; border-bottom: 1upx solid #EEEEEE;"
  >
    <view style="margin-right: 40upx;">{{ idxStr }}</view>
    <view class="flex" style="padding: 44upx 0; width: 100%;">
      <!-- part 1 pic -->
      <image
        class="solid margin-right-sm"
        :src="item.ImageFixWidthUrl"
        style="width: 120upx; height: 120upx; margin-right: 10upx;"
        mode="aspectFit"></image>
      <!-- part 2 name, codebar -->
      <view class="flex flex-direction justify-center flex-sub" style="width: 280upx;">
        <view class="text-bold" style="font-size: 28upx; color: #333; margin-bottom: 12upx;">
          {{ item.Name }}
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuihuojilu"></use>
          </svg>
        </view>
        <view class="desc">
          {{ item.BarCode }}
        </view>
      </view>
      
      <!-- part 3 number -->
      <view class="flex flex-direction justify-center align-end">
        <view class="desc">
          商品数量
        </view>
        <view class="text-bold" style="font-size: 32upx; color: #333;">
          {{ `${item.TotalPrice} 个` }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      item: {"Name":"脉动青柠口味瓶装600ml","BarCode":"6902538004045","TotalPrice":2,"TotalOrderCount":2,"TotalQty":3,"ImageUrl":"https://res.yopoint.com/product/20190506/48dea89ca7e1fab3d5d370621a0a7e2b.png","ImageFixWidthUrl":"https://res.yopoint.com/product/20190506/8b876b7b4025f2b25698e3d4638d513a.png"},
      idx: 0,
    }
  },
  computed: {
    idxStr() {
      const str = (this.idx + 1).toString();
      if (str.length < 2) return `0${str}`;
      return str;
    },
  },
}
</script>

<style>
.desc {
  color: #999;
  font-size: 24upx;
}
</style>
