<template>
  <view>
    <Search></Search>
    
    <button class="cu-btn bg-brown" @click="showModal">showModal</button>
    <button class="cu-btn bg-cyan" @click="showLoading">showLoading</button>
    
    <view id='w' class="bg-white" style="position: relative;" @click="wClick">
      <view id='a' class="a" @click="aClick">A</view>
      <view id='b' class="b" @click="bClick">B</view>
    </view>

    
    <modal ref="modal"></modal>
    <Loading ref="loading" :loading="isLoading"></Loading>
    
  </view>
</template>

<style>
  .a {
    width: 400upx;
    height: 400upx;
    background-color: #5E00FF;
  }
  .b {
    position: absolute;
    top: 100upx;
    width: 100upx;
    height: 100upx;
    background-color: #A5673F;
  }
</style>

<script>
import modal from './SimpleModal.vue';
import Loading from './SimpleLoading.vue';
import Search from './Search.vue';

export default {
  components: { modal, Loading, Search },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    aClick(e) {
      const currentTargetId = e.currentTarget && e.currentTarget.id;
      const targetId = e.target && e.target.id
      console.log('click_A', currentTargetId, targetId)
    },
    bClick(e) {
      const currentTargetId = e.currentTarget && e.currentTarget.id;
      const targetId = e.target && e.target.id
      console.log('click_B', currentTargetId, targetId)
    },
    wClick(e) {
      const currentTargetId = e.currentTarget && e.currentTarget.id;
      const targetId = e.target && e.target.id
      this.aClick(e);
    },
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


