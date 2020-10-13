<template>
  <view>
    <view class="order-info">
      
      <!-- part 1 wrap title -->
      <view class="wrap-title">
        <view class="title flex-sub">{{ title }}</view>
        <view class="flex">
          <view @change="onCheckAll">c</view>
          <view style="color: #666; margin-left: 10upx;">全部核对</view>
        </view>
      </view>
      
      <!-- part 2 content -->
      <view class="content">
        <view class="title">
          <view class="name">商品名称</view>
          <view class="qty">申请数</view>
          <view class="real-qty" v-if="isShowRealQty">审核数</view>
          <view class="check" v-if="isShowCheck">核对</view>
        </view>
        <view class="table">
          <checkbox-group @change="checkboxChange">
            <view
              class="table-item"
              v-for="(item, idx) in goodsData"
              :key="idx"
            >
              <view class="name">{{ item.ProductVO && item.ProductVO.Name }}</view>
              <view class="qty">{{ item.Qty }}</view>
              <view
                v-if="isShowRealQty"
                class="real-qty"
                style="font-size: 28upx; font-weight: 500;"
              >
                {{ item.RealQty }} ({{ item.Tips }})
              </view>
              <view class="check" v-if="isShowCheck">
                <label>
                  <checkbox
                    class="yp-orange"
                    :value="idx"
                    :checked="item.checked"
                    style="transform:scale(0.7)"
                  />
                </label>
              </view>
            </view>
           </checkbox-group>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '提货商品',
    },
    goodsData: Array,
    status: Number,
  },
  data() {
    return {
      
    };
  },
  computed: {
    isShowRealQty() {
      return this.status === 1;
    },
    isShowCheck() {
      return this.status === 1 || this.status === 2;
    },
  },
  created() {

  },
  methods: {
    toggleCheckAll() {},
    onCheckAll(idx) {},
    checkboxChange(e) {
      const checkedIdxs = e.detail && e.detail.value;
      console.log(checkedIdxs);
    }
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 20upx 20upx 20upx;
  background-color: #fff;
  border-radius: 12upx;
  text-align: center;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 26upx;
    font-weight: 500;
    height: 80upx;
    line-height: 80upx;
    border-bottom: 2upx solid #eee;
  }
  .table {
    .table-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16upx 0;
      font-size: 24upx;
      line-height: 28upx;
    }
  }
}
.order-info {
  margin: 0 24upx;
  color: #333;
  font-size: 26upx;
  line-height: 40upx;
}
.wrap-title {
  padding: 20upx 0;
  display: flex;
  color: #999;
}
/* 固定列宽 */
.content {
  .name {
    width: 240upx;
  }
  .qty {
    width: 120upx;
  }
  .real-qty {
    width: 180upx;
  }
  .check {
    width: 70upx;
  }
}
</style>
