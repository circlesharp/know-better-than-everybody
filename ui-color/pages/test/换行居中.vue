<template>
  <view class="padding">
    <NiceInput :min="13" :widthInput="30" :defaultValue="15" @change="onChange"></NiceInput>
    <view>{{ typeof val }} - {{ val }}</view>
    
    <view class="wrap">
      <view class="item bg-blue">1</view>
      <view class="item bg-blue">2</view>
      <view class="item bg-blue">3</view>
      <view class="item bg-blue">4</view>
      <view class="item bg-blue">5</view>
      <view class="item"></view>
    </view>
  </view>
</template>

<script>
import NiceInput from './NiceInput.vue';

export default {
  components: { NiceInput },
  data() {
    return {
      val: '',
    };
  },
  methods: {
    onChange(val) {
      this.val = val;
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    flex: 0 0 30%;
    text-align: center;
  }
}
</style>
