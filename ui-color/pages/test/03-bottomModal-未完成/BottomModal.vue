<template>
  <view>
    <view
      class="cu-modal bottom-modal"
      :class="modalShow ? 'show' : ''"
      @tap="hideModal"
    >
      <view
        class="modal-whole cu-dialog bg-white"
        style="border-radius: 12px 12px 0 0;"
        @tap.stop=""
      >
        
        <!-- part 1 title -->
        <view class="cu-bar justify-end solid-bottom" v-if="title">
          <view
            class="content text-bold"
            style="color: #333; font-size: 30upx;"
          >
            {{ title }}
          </view>
          <view class="action" @tap="hideModal">
            <text class="cuIcon-close" style="color: #999;"></text>
          </view>
        </view>
        
        <!-- part 2 body = search + content -->
        <view class="modal-body">
          <view class="modal-search" v-if="!hideSearch">
            <Search @on-search="handleSearch" @on-clear="handleClear" />
          </view>
          <view class="modal-content">
            <slot>the default Content of this Bottom Modal</slot>
          </view>
        </view>

        <view class="modal-btns">
          <button
            class="btn cu-btn lg bg-yp-orange round"
            @click="handleConfirm"
          >
            确定
          </button>
        </view>
        
      </view>
    </view>
  </view>
</template>

<script>
import Search from './02-cache/Search.vue';

export default {
  components: { Search },
  props: {
    title: String,
    hideSearch: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      modalShow: true,
    };
  },
  methods: {
    showModal() {
      this.modalShow = true;
    },
    hideModal() {
      this.modalShow = false;
    },
    handleSearch(key) {
      this.$emit('on-search', key);
    },
    handleClear(key) {
      this.$emit('on-clear', key);
    },
    handleConfirm() {
      this.$emit('on-confirm');
      this.hideModal();
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-whole {
  .modal-body {
    padding-bottom: 110upx;
  }
  .modal-btns {
    .btn {
      margin: 0 56upx;
      z-index: 9999;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 30upx;
    }
  }
}
</style>
