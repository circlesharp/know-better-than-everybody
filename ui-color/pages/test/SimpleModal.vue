<template>
  <view class="cu-modal" :class="modalShow ? 'show' : ''">
    <view class="cu-dialog simple-modal">
      <view class="content" @click.stop="">
        {{ renderContent }}
      </view>
      <view class="btns">
        <view class="cancel" @click="onCancel" v-if="renderBinary">
          取消
        </view>
        <view class="ok" @click="onOk">
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
      default: 'content',
    },
    binary: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modalShow: false,
      renderContent: this.content,
      renderBinary: this.binary,
    };
  },
  methods: {
    showModal({ content, binary }) {
      if (content) this.renderContent = content;
      if (binary) this.renderBinary = binary;
      this.modalShow = true;
    },
    hideModal() {
      this.modalShow = false;
    },
    onCancel() {
      this.$emit('on-cancel');
      this.hideModal();
    },
    onOk() {
      this.$emit('on-ok');
      this.hideModal();
    },
  },
};
</script>

<style lang="scss" scoped>
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
    border-bottom: 2upx solid #dddddd;
  }
  .btns {
    display: flex;
    height: 100upx;
    line-height: 100upx;
    .cancel {
      flex: 1;
      color: grey;
      border-right: 2upx solid #dddddd;
    }
    .ok {
      flex: 1;
      color: orange;
    }
  }
}
</style>
