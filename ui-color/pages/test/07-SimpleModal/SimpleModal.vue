<template>
  <view class="cu-modal" :class="modalShow ? 'show' : ''">
    <view class="cu-dialog simple-modal">
      <view
        class="content"
        :style="{ height: heightContent + 'px', padding: '0 ' + paddingLR + 'px' }"
        @click.stop=""
      >
        <slot>{{ renderContent }}</slot>
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
/*
::: 使用说明 :::

可以通过模板或者全局方法来调用

由于 uniapp 不支持全局的组件
我的下一步计划是，在编译阶段添加： <SimpleModal ref="modal" />
*/

export default {
  props: {
    content: {
      type: String,
      default: 'SimpleModal default content',
    },
    binary: {
      type: Boolean,
      default: false,
    },
    heightContent: {
      type: Number,
      default: 109,
    },
    paddingLR: {
      type: Number,
      default: 35,
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
    showModal({ content, binary } = {}) {
      if (content) this.renderContent = content;
      if (binary != null) this.renderBinary = binary;
      this.modalShow = true;
    },
    hideModal() {
      this.modalShow = false;
      this.$off('on-ok');
      this.$off('on-cancel');
      console.log(JSON.stringify(this.$data, null, 2));
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
  $yp-grey: grey;
  $yp-orange: orange;
.simple-modal {
  width: 560upx;
  font-size: 30upx;
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #222;
    // height: 218upx;
    padding: 0 70upx;
    border-bottom: 2upx solid #dddddd;
  }
  .btns {
    display: flex;
    height: 100upx;
    line-height: 100upx;
    .cancel {
      flex: 1;
      color: $yp-grey;
      border-right: 2upx solid #dddddd;
    }
    .ok {
      flex: 1;
      color: $yp-orange;
    }
  }
}
</style>
