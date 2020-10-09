<template>
  <view>
    <button class="cu-btn bg-cyan" @click="showModal">show</button>
    <BottomModal
      ref="bottomModal"
      title="测试标题"
    >
      <view class="wrap">
        <view class="content"></view>
      </view>
    </BottomModal>
  </view>
</template>

<script>
import BottomModal from './BottomModal.vue';

export default {
  components: { BottomModal },
  data() {
    return {
      
    };
  },
  methods: {
    showModal() {
      const bottomModal = this.$refs && this.$refs.bottomModal;
      bottomModal.showModal();
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 700upx;
  background-color: #8799A3;
  .content {
    height: 900upx;
    background-color: rgba($color: #333, $alpha: .2);
  }
}
</style>
