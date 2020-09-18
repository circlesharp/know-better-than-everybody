<template>
  <view class="bg-grey">
    <view class="test">test</view>
  </view>
</template>

<style>
.test {
  font-size: 33px;
}
.test::before {
	/* font-family: "cuIcon"; */
  font-family: "iconfont";
  content: '\e6c3';
	display: inline-block;
	margin-right: 6upx;
  color: red;
}
</style>

<script>
import mock from './mock.js';
const cabinetIcon = '';
const deviceIcon = '';

export default {
  data() {
    return {
      Device: mock,
      DeviceList: mock.DeviceList,
      filtedDeviceList: mock.DeviceList,
      modalShow: !false,
      icons: {
        cabinet: cabinetIcon,
        device: deviceIcon,
      },
      def: 1,
      searchText: '',
    };
  },
  computed: {
    terminalType() {
      return 'cabinet';
    },
  },
  created() {
    console.log(this.Device);
  },
  methods: {
    showModal() {
      this.modalShow = true;
      console.log('showModal');
    },
    test() {
      console.log('test')
    },
    search() {
      this.filtedDeviceList = this.DeviceList.filter(item => item.label.includes(this.searchText))
    },
    hideModal() {
      this.modalShow = false;
    },
    radioChange(e) {
      const CID = e.detail.value;
      const { label } = this.Device.DeviceList.find(i => i.value === CID);
      const rst = { CID, label };
      console.log(rst)
    },
  },
};
</script>
