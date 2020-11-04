<template>
  <view class="refund-list">
    <view class="wrap-img">
      <image :src="`${item.ImageFixWidthUrl}?x-oss-process=image/resize,h_60`" mode="aspectFit"></image>
    </view>
    <view class="wrap-info">
      <view class="wrap-name">
        <view class="name">{{ item.Name }}</view>
        <button class="cu-btn" @click="onDel">删除</button>
      </view>
      <view class="wrap-operator">
        <view v-if="type === 0" class="flex align-center">
          数量：
          <NiceInput
            inputType="number"
            :min="0"
            :widthInput="20"
            :defaultValue="item.RealQty"
            @change="onInputChange"
          />
        </view>
        <view>金额：{{ (item.RealQty * item.Price) | currency }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import NiceInput from './NiceInput.vue';

export default {
  components: { NiceInput },
  props: { 
    item: Object,
    type: Number,
  },
  data() {
    return {
      
    };
  },
  created() {
    console.log(JSON.stringify(this.item, null, 2))
  },
  methods: {
    onDel() {
      this.$emit('delete');
    },
    onInputChange(e) {
      this.$emit('realQtyChange', e);
    }
  },
}
</script>

<style lang="scss" scoped>
.refund-list {
  display: flex;
  font-size: 24upx;
  line-height: 36upx;
}
.wrap-img {
  margin-right: 16upx;
  image {
    height: 120upx;
    width: 120upx;
    border: 2upx solid #eee;
  }
}
.wrap-info {
  flex: 1;
  .wrap-name {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20upx;
    font-size: 26upx;
    .cu-btn {
      padding: 0;
      height: 36upx;
      color: red;
      background-color: rgba(0,0,0,0);
    }
  }
  .wrap-operator {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
