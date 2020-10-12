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
      提货总数: {{ item.BoxGauge }} x
      <input
        ref="inputPackges"
        type="number"
        class="input"
        v-model="inputPackges"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
      />
      件 +
      <input
        ref="inputNumber"
        type="number"
        class="input"
        v-model="inputNumber"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
      />个
      = {{ input || 0 }}个
    </view>
  </view>
</template>

<script>
/*
::: 使用说明 :::

由于多次修改等历史原因，本组件逻辑可能比较不太明晰

经过修改，本组件不改变传入的对象的属性
本组件只修改 pickupNum，也就是提货数量
本组件触发 updatePickup，并把原对象、商品条形码、新的提货属性传出去
*/
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
      const goods = this.item;
      const BarCode = goods.BarCode;
      const pickupNum = parseInt(this.input, 10) || 0;
      this.updatePickup({ goods, BarCode, pickupNum });
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
  font-weight: 500;
  font-size: 26upx;
  line-height: 40upx;
  color: #333;
}
.input {
  width: 110upx;
  height: 60upx;
  font-size: 28rpx;
  text-align: center;
  padding: 0rpx 10upx;
  border-radius: 10rpx;
  margin: 0 16upx;
  border: 1px solid #d9d8d9;
  color: #333;
}
</style>
