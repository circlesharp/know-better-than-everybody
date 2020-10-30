<template>
  <view>
    <!-- just a string -->
    <button class="cu-btn bg-cyan" @click="string">
      string
    </button>
    
    <!-- just a content -->
    <button class="cu-btn bg-brown" @click="content">
      content
    </button>
    
    <!-- contentWithComfirm -->
    <button class="cu-btn bg-blue" @click="contentWithComfirm">
      contentWithComfirm
    </button>
    
    <!-- confirmAndCancel -->
    <button class="cu-btn bg-olive" @click="confirmAndCancel">
      confirmAndCancel
    </button>
    
    <!-- confirmAndCancel -->
    <button class="cu-btn bg-mauve" @click="contentSlot">
      contentSlot
    </button>
        
    <SimpleModal ref="modal"></SimpleModal>
    
    <SimpleModal ref="contentSlot" :heightContent="110" :paddingLR="20">
      <view class="price-desc-modal">
        <view>标品：包装有条码的商品；</view>
        <view>非标品：生鲜水果等非预包装品。</view>
      </view>
    </SimpleModal>
  </view>
</template>

<script>
import SimpleModal from './SimpleModal.vue';

export default {
  components: { SimpleModal },
  data() {
    return {
      confirmCallTime: 0,
    };
  },
  methods: {
    string() {
      this.showSimpleModal('string');
    },
    content() {
      this.showSimpleModal({
        content: 'content',
      });
    },
    contentWithComfirm() {
      this.showSimpleModal({
        content: 'contentWithComfirm',
        confirm: () => {
          console.log('contentWithComfirm');
        },
      })
    },
    confirmAndCancel() {
      this.showSimpleModal({
        content: 'confirmAndCancel',
        confirm: () => {
          console.log('confirmAndCancel - 1');
        },
        cancel: () => {
          console.log('confirmAndCancel - 2');
        }
      });
    },
    contentSlot() {
      this.showSimpleModal({
        modalName: 'contentSlot',
        content: 'contentSlot',
        confirm: () => {
          console.log('contentSlot');
        },
      });
    },
    showSimpleModal(e) {
      let modalName;
      let content;
      let confirm;
      let cancel;
      if (typeof e === 'string') {
        content = e;
      } else {
        modalName = e.modalName;
        content = e.content;
        confirm = e.confirm;
        cancel = e.cancel;
      }
      if (!modalName) modalName = 'modal';
      if (!confirm) confirm = () => {};
      const modal = this.$refs[modalName];
      if (!modal) {
        console.error(`本页面没有 $refs.${modalName}，去设置一个吧`);
        return;
      }
      if (modal.showModal) modal.showModal({ content, binary: !!cancel });
      modal.$on('on-ok', confirm);
      modal.$on('on-cancel', cancel);
    },
  },
}
</script>

<style lang="scss" scoped>
.price-desc-modal {
  text-align: center;
  font-size: 30upx;
  color: #222222;
  line-height: 44upx;
}
</style>
