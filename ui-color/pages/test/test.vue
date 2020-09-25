<template>
  <view>
    <view class="bg-white" style="padding: 20upx 24upx;">
      <button class="cu-btn block" style="color: #bbb; background-color: #f6f6f6; border-radius: 12upx;">
        <text class="cuIcon-search padding-right-xs" style="font-size: 32upx;"></text>
        搜索
      </button>
    </view>
    <NavScroll
      :tree="productTree"
      @on-select="seleGoods"
    />
  </view>
</template>

<script>
import NavScroll from './NavScroll.vue';
import productTree from './goosListTree.mock.js';

export default {
  components: { NavScroll },
  data() {
    return {
      productTree,
    };
  },
  methods: {
    seleGoods(params) {
      console.log(params)
    }
  }
}
</script>

<style>
</style>
