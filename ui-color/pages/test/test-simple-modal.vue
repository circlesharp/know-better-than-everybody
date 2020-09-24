<template>
  <view class="cu-modal" :class="modalShow ? 'show' : ''">
    <view class="cu-dialog simple-modal">
      <view class="content" @click.stop="">
        {{ content }}
      </view>
      <view class="btns">
        <view class="cancel" @click="hideModal(false)" v-if="binary">
          取消
        </view>
        <view class="ok" @click="hideModal(true)">
          确定
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: 'content'
    },
    binary: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      modalShow: true,
      renderContent: this.content,
    };
  },
  methods: {
    showModal(content) {
      if (content) this.renderContent = content;
      this.modalShow = true;
    },
    hideModal(e) {
      /* e 用作标记事件发出方 */
      this.$emit('on-modal-hide', e);
      this.modalShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$yp-orange: #000;
$yp-grey: #999;
.simple-modal {
  width: 560upx;
  height: 320upx;
  font-size: 30upx;
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #222;
    height: 218upx;
    padding: 0 70upx;
    border-bottom: 2upx solid #DDDDDD;
  }
  .btns {
    display: flex;
    height: 100upx;
    line-height: 100upx;
    .cancel {
      flex: 1;
      color: $yp-grey;
      border-right: 2upx solid #DDDDDD;
    }
    .ok {
      flex: 1;
      color: $yp-orange;
    }
  }
}
</style>
