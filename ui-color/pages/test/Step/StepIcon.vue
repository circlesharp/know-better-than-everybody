<template>
  <view>
    <!-- 打勾 -->
    <view v-if="state === 'done'" class="step-icon">
      <text
        class="cuIcon-roundcheckfill"
        style="font-size: 52upx; color: #FFAF2E; padding: 0;"
      ></text>
    </view>

    <!-- 打叉 -->
    <view v-else-if="state === 'fail'" class="step-icon">
      <text
        class="cuIcon-roundclosefill"
        style="font-size: 52upx; color: #FFAF2E; padding: 0;"
      ></text>
    </view>

    <!-- 圈圈 -->
    <view class="step-icon" :class="state" v-else>
      <view class="inner"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      default: 'done',
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.step-icon {
  border-radius: 100%;
  width: 52upx;
  height: 52upx;
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    border-radius: 100%;
    background-color: yellow;
    width: 28upx;
    height: 28upx;
  }
}
.step-icon {
  &.here {
    background: rgba(255, 175, 46, 0.3);
    .inner {
      background: #ffaf2e;
    }
  }
  &.not-yet {
    background: rgba(0, 0, 0, 0);
    .inner {
      background: #eeeeee;
    }
  }
}
</style>
