<template>
  <view class="wrap-nice-input">
    <view class="wrap-operator wrap-minus">
      <button
        class="operator cu-btn"
        :class="isMinusDisabled ? 'disabled' : ''"
        :disabled="isMinusDisabled"
        @click="onMinus"
      >
        -
      </button>
    </view>
    <view class="wrap-input">
      <input
        :value="inputValue"
        :type="inputType"
        :style="{ width: widthInput + 'px' }"
        @input="onInput"
      />
      <view class="unit" v-if="unit">{{ unit }}</view>
    </view>
    <view class="wrap-operator wrap-plus">
      <button
        class="operator cu-btn"
        :class="isPlusDisabled ? 'disabled' : ''"
        :disabled="isPlusDisabled"
        @click="onPlus"
      >
        +
      </button>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    unit: String,
    inputType: {
      type: String,
      default: 'text',
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    widthInput: {
      type: Number,
      default: 50,
    },
    defaultValue: {
      type: Number || String,
      default: 0,
    },
  },
  data() {
    return {
      inputValue: this.defaultValue,
    };
  },
  computed: {
    isMinusDisabled() {
      return this.inputValue <= this.min;
    },
    isPlusDisabled() {
      return this.inputValue >= this.max;
    },
  },
  watch: {
    inputValue(val) {
      this.emitChange(val);
    },
  },
  methods: {
    onInput(e) {
      const inputVal = +(e.detail && e.detail.value);
      this.inputValue = Number.isNaN(inputVal) ? this.defaultValue : inputVal;
    },
    onMinus() {
      this.inputValue -= 1;
    },
    onPlus() {
      this.inputValue += 1;
    },
    emitChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 56upx;
$bg-color: #fff;
$yp-orange: orange;

view {
  background-color: $bg-color;
}
.wrap-nice-input {
  display: inline-flex;
  border: 2upx solid #ddd;
  border-radius: 6upx;
}
.wrap-operator {
  height: $height;
  width: 60upx;
  .operator {
    font-size: 40upx;
    height: $height;
    width: 100%;
    background-color: $bg-color;
    border: none;
    color: $yp-orange;
    &.disabled {
      color: #eeeeee;
    }
  }
}
.wrap-input {
  display: flex;
  align-items: center;
  padding: 0 24upx;
  border-left: 2upx solid #ddd;
  border-right: 2upx solid #ddd;
  input {
    padding: 0;
    height: 34upx;
    text-align: center;
  }
  .unit {
    height: 34upx;
    line-height: 34upx;
  }
}
</style>
