<template>
    <view>
      <picker @change="PickerChange" :value="index" :range="picker" range-key="name">
        <view class="picker picker-text">
          {{ picker[index].name }}
          <view class="iconfont icon-xiala"></view>
        </view>
      </picker>
    </view>
</template>

<script>
export default {
  components: {  },
  data() {
    return {
      index: 0,
      picker: [{"name":"测试仓库","value":"5ed4fea51e5cd7000fa8f425"},{"name":"默认仓库","value":"5db266d87bd4810010954b10"}],
    };
  },
  methods: {
    PickerChange: console.log,
  }
}
</script>

<style lang="scss" scoped>
.picker-text {
  display: flex;
  font-size: 26upx;
  color: #333;
  align-items: center;
  height: 80upx;
  margin: 0 24upx;
  .icon-xiala {
    margin-left: 10upx;
    font-size: 16upx;
  }
}
</style>
