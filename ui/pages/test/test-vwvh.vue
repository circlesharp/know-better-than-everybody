<template>
  <view>
    <button class="cu-btn line-gray" @tap="showModal">test</button>
    <view class="c1 bg-blue">c1</view>
    <view class="c2 bg-cyan">c2</view>
  </view>
</template>

<style>
.c1 {
  height: 50vw;
  width: 50vw;
}
.c2 {
  width: calc(50vh - 20vw);
  height: calc(100vw - 175px);
}
</style>

<script>
import AsyncModel from './AsyncModal.vue';
import mock from './mock.js';
  
export default {
  components: { AsyncModel },
  data() {
    return {
      Device: mock,
    };
  },
  created() {
    console.log(this.Device);
  },
  methods: {
    showModal() {
      this.Device.result = true;
    },
    closeModel(data) {
      this.Device.result = data; // 子组件触发父组件事件，进行数据变更，同步result数据
    },
    onChange(e) {
      this.Device.DeviceID = e.value[0];
      this.Device.DefaultValue = e.options.map(n => n.label).join('');
      // this.resetRequest();
    },
    onLoadOptions() {
      this.Device.result = false;
    },
  },
};
</script>

<style>

</style>
