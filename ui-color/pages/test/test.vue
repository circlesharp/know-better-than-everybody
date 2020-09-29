<template>
  <view>
    <button class="cu-btn bg-brown" @click="showModal">showModal</button>
    <button class="cu-btn bg-cyan" @click="showLoading">showLoading</button>
    
    <modal ref="modal"></modal>
    <Loading ref="loading" :loading="isLoading"></Loading>
    
  </view>
</template>

<script>
import modal from './SimpleModal.vue';
import Loading from './SimpleLoading.vue';

export default {
  components: { modal, Loading },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    showModal() {
      const content = 'test modal content';
      const confirm = e => console.log(e, 123);
      const cancel = e => console.log(e, 456);
      this.showSimpleModal({
        content, confirm, cancel
      });
    },
    showLoading() {
      // this.showSimpleLoading();
      this.isLoading = true;
      setTimeout(() => {
        // this.hideSimpleLoading();
        this.isLoading = false;
      }, 2000);
    },
  },
}
</script>


