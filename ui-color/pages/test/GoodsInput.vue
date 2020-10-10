<template>
  <view class="goodsInput">
    <view class="goods-tips" v-if="type === 'refund'">
      <input
        type="number"
        class="input"
        @blur="onBlur"
        @focus="onFocus"
        v-model="input"
        @change="updateInput"
      />
    </view>
    <view class="goods-tips" v-if="type === 'pickup'">
      提货总数（{{ input || 0 }}）= {{ item.BoxGauge }} *
      <input
        ref="inputPackges"
        type="number"
        class="input"
        v-model="inputPackges"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
      />
      件+
      <input
        ref="inputNumber"
        type="number"
        class="input"
        v-model="inputNumber"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
      />个
    </view>
  </view>
</template>

<script>
export default {
  name: 'goodsInput',
  props: {
    // 商品本身
    item: {
      type: Object,
      required: true,
    },
    // 提货 pickup 、退货 refund
    type: {
      type: String,
      required: true,
    },
    // 推荐的数量
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      input: 0,
      inputPackges: 0,
      inputNumber: 0,
    };
  },
  watch: {
    value(n) {
      this.$nextTick(() => {
        this.changeInnerInputValue(n);
      });
    },
    inputPackges() {
      this.input =
        Number(this.inputPackges) * this.item.BoxGauge +
        Number(this.inputNumber);
    },
    inputNumber() {
      this.input =
        Number(this.inputPackges) * this.item.BoxGauge +
        Number(this.inputNumber);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.changeInnerInputValue(this.value);
      // 显式地调用，以触发数据更新
      this.updateInput();
    });
  },
  methods: {
    onBlur() {
      this.inputPackges = Number(this.inputPackges);
      this.inputNumber = Number(this.inputNumber);
      this.changeInnerInputValue(
        this.item.BoxGauge * this.inputPackges + this.inputNumber,
      );
      this.updateInput();
    },
    onFocus() {
      this.$emit('onFocus');
    },
    onChange() {
      this.$emit('onChange');
    },
    changeInnerInputValue(value) {
      this.input = value;
      this.inputPackges = Math.floor(this.input / this.item.BoxGauge);
      this.inputNumber = this.input % this.item.BoxGauge;
    },
    updateInput() {
      const value = this.input;
      const goods = this.item;
      goods.TotalSalesCount = parseInt(value, 10) || 0;
      this.updatePickup({
        goods,
        quantity: parseInt(value, 10) || 0,
      });
    },
    updatePickup(val) {
      this.$emit('updatePickup', val);
    },
  },
};
</script>

<style scoped>
.goodsInput,
.goods-tips {
  display: flex;
  align-items: center;
}
.input {
  width: 88rpx;
  height: 48rpx;
  font-size: 30rpx;
  text-align: center;
  padding: 0rpx 10rpx;
  border-radius: 10rpx;
  margin: 0 20rpx;
  border: 1px solid #d9d8d9;
  color: #333;
}
</style>
