<template>
  <view>
   <!-- <Empty
      showBtn
      text="这里什么也没有，去添加商品吧"
      btnText="添加商品"
      @onBtnClick="goAddGoods"
    /> -->
    <Empty
      showBtn
      noEquitment
      text="暂时还没有设备，去添加设备吧"
      btnText="扫码激活设备"
      @onBtnClick="goAddGoods"
    />
  </view>
</template>

<script>
import Empty from './Empty.vue';

export default {
  components: { Empty },
  data() {
    return {
      
    };
  },
  methods: {
    goAddGoods() {
      console.log('goAddGoods');
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
