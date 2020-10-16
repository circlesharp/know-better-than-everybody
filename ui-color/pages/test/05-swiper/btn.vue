<template>
  <view>
    <button
      class="cu-btn lg bg-yp-orange round" 
      style="margin: 0 56upx; z-index: 99; position: fixed; left: 0; right: 0; bottom: 30upx;"
      :disabled="disabled"
      @click="onClick"
    >
      {{ text }}
    </button>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '下一步',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('on-click');
    },
  },
};
</script>

<style></style>
