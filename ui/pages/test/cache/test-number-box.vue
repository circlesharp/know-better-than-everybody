<template>
  <view class="number-box">
    <view
      class="operator iconfont icon-jian1"
      :class="[disabled || min >= value ? 'disabled' : '']"
      @tap="reduce"
      :style="{ color: iconColor, fontSize: iconSize + 'upx' }"
    ></view>
    <input
      type="number"
      v-model="inputValue"
      :disabled="disabled"
      @blur="blur"
      class="num-input"
    />
    <view
      class="operator iconfont icon-jia"
      :class="[disabled || value >= max ? 'disabled' : '']"
      @tap="plus"
      :style="{ color: iconColor, fontSize: iconSize + 'upx' }"
    ></view>
  </view>
</template>

<style>
.number-box {
  display: inline-flex;
  align-items: center;
  border-left: 2upx #ddd solid;
  border: 2upx #ddd solid;
  border-radius: 6upx;
  width: auto;
}

.operator {
  background: #fff;
  width: 128upx;
  height: 88upx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.num-input {
  text-align: center;
  font-weight: 400;
  border-left: 2upx #ddd solid;
  border-right: 2upx #ddd solid;
  color: #333;
  fontSize: 40upx;
  background: #fff;
  height: 88upx;
  width: 160upx;
}

.disabled {
  color: #999 !important;
}
</style>

<script>
export default {
  name: 'numberbox',
  props: {
    value: {
      type: Number,
      default: 1,
    },
    // 最小值
    min: {
      type: Number,
      default: 1,
    },
    // 最大值
    max: {
      type: Number,
      default: 99,
    },
    // 迈步大小 1 1.1 10...
    step: {
      type: Number,
      default: 1,
    },
    // 是否禁用操作
    disabled: {
      type: Boolean,
      default: false,
    },
    // 加减图标大小 upx
    iconSize: {
      type: Number,
      default: 35,
    },
    iconColor: {
      type: String,
      default: '#FFAF2E',
    },
    // input 高度
    height: {
      type: Number,
      default: 88,
    },
    // input 宽度
    width: {
      type: Number,
      default: 160,
    },
    size: {
      type: Number,
      default: 40,
    },
    // input 背景颜色
    bgcolor: {
      type: String,
      default: '#fff',
    },
    // input 字体颜色
    color: {
      type: String,
      default: '#333',
    },
    // 索引值，列表中使用
    index: {
      type: [Number, String],
      default: 0,
    },
    // 自定义参数
    custom: {
      type: [Number, String],
      default: 0,
    },
  },
  created() {
    this.inputValue = +this.value;
  },
  data() {
    return {
      inputValue: 0,
    };
  },
  watch: {
    value(val) {
      this.inputValue = +val;
    },
  },
  methods: {
    getScale() {
      let scale = 1;
      // 浮点型
      if (!Number.isInteger(this.step)) {
        scale = Math.pow(10, `${this.step}`.split('.')[1].length);
      }
      return scale;
    },
    calcNum(type) {
      if (this.disabled) {
        return;
      }
      const scale = this.getScale();
      let num = this.value * scale;
      const step = this.step * scale;
      if (type === 'reduce') {
        num -= step;
      } else if (type === 'plus') {
        num += step;
      }
      let value = num / scale;
      if (type === 'plus' && value < this.min) {
        value = this.min;
      } else if (type === 'reduce' && value > this.max) {
        value = this.max;
      }
      if (value < this.min || value > this.max) {
        return;
      }
      this.handleChange(value, type);
    },
    plus() {
      this.calcNum('plus');
    },
    reduce() {
      this.calcNum('reduce');
    },
    blur(e) {
      let { value } = e.detail;
      if (value) {
        if (~value.indexOf('.') && Number.isInteger(this.step)) {
          value = value.split('.')[0];
        }
        value = Number(value);
        if (value > this.max) {
          value = this.max;
        } else if (value < this.min) {
          value = this.min;
        }
      } else {
        value = this.min;
      }
      if (value == this.value && value != this.inputValue) {
        this.inputValue = value;
      }
      this.handleChange(value, 'blur');
    },
    handleChange(value, type) {
      if (this.disabled) return;
      this.$emit('change', {
        value,
        type,
        index: this.index,
        custom: this.custom,
      });
    },
  },
};
</script>
