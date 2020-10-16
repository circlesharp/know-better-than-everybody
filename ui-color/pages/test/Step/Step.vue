<template>
  <view>
    <view class="bg-white padding-tb">
      <view class="cu-steps">
        <view
          class="cu-item"
          :class="index > basics ? '' : 'text-yp-orange'"
          v-for="(item, index) in basicsList"
          :key="index"
        >
          <view class="wrap">
            <StepIcon :state="test(index)" />
          </view>
          <view class="desc">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import StepIcon from './StepIcon.vue';

export default {
  components: { StepIcon },
  props: {
    basics: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      basicsList: [
        {
          name: '选择设备',
        },
        {
          name: '选择仓库',
        },
        {
          name: '审核数量',
        },
        {
          name: '确认收货',
        },
      ],
    };
  },
  methods: {
    test(idx) {
      if (this.basics === -1) {
        if (idx < 3) return 'done';
        return 'fail';
      }
      if (idx > this.basics) return 'not-yet';
      if (idx < this.basics) return 'done';
      return 'here';
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  padding-top: 15upx;
  padding-bottom: 8upx;
}
.desc {
  font-size: 26upx;
}
</style>
