<template>
<view>
  <button
    class="cu-btn search-btn line-gray"
    style="position: relative;"
    @tap="showModal"
   >
    <view
      class="cuIcon-search"
      style="margin-right: 15upx; font-size: 34upx;"
    ></view>
    <view class="flex-sub" :class="{ active: Device.DefaultValue }">
      {{ Device.DefaultValue ? Device.DefaultValue : '请输入设备名称' }}
    </view>
    <view
      class="cuIcon-search"
      style="font-size: 34upx; position: absolute; right: 0; padding: 18upx"
      @click.stop="test"
    ></view>
  </button>
  
  
  <view class="cu-modal bottom-modal" :class="modalShow ? 'show' : ''"  @tap="hideModal">
    <view class="cu-dialog bg-white" style="border-radius: 12px 12px 0 0;" @tap.stop="">
      
      <!-- title -->
      <view class="cu-bar justify-end solid-bottom">
        <view class="content text-bold" style="color: #333; font-size: 30upx;">选择设备</view>
        <view class="action" @tap="hideModal">
          <text class="cuIcon-close" style="color: #999;"></text>
        </view>
      </view>
      
      <view class="cu-bar search">
        <view class="search-form radius">
          <text class="cuIcon-search"></text>
          <input
            :adjust-position="false"
            type="text"
            v-model="searchText"
            placeholder="请输入设备名称"
          ></input>
        </view>
        <view class="action">
          <button class="cu-btn bg-yp-orange shadow-blur radius" @click="search">搜索</button>
        </view>
      </view>
      
      <!-- content -->
      <view class="modal-content" style="padding: 0 24upx 110upx 24upx;">
        
        <!-- part 0 按钮 -->
        <button
          class="cu-btn lg bg-yp-orange round"
          style="margin: 0 56upx; z-index: 99; position: fixed; left: 0; right: 0; bottom: 30upx;"
        >确定</button>
        
        <!-- part 1 列表 -->
        <radio-group style="width: 100%;" @change="radioChange">
          <label
            v-for="(item, idx) of filtedDeviceList"
            :key="idx"
           >
            <view
              class="solid"
              style="margin-bottom: 20upx; padding: 30upx; border-radius: 12upx; text-align: start;"
             >
              <view class="first-line flex align-center;">
                <view
                  class="cu-avatar round"
                  style="width: 40upx; height: 40upx; margin-right: 10upx;"
                  :style="{ backgroundImage: 'url(' + icons[terminalType] + ')' }"
                ></view>
                <view
                  class="flex-sub text-bold"
                  style="font-size: 28upx; line-height: 40upx; color: #333333;">
                  {{ item.label }}
                </view>
                <view style="margin-left: 60upx;">
                  <label class="">
                    <radio :value="item.value" :checked="idx === def"/>
                  </label>
                </view>
              </view>
              <view class="second-line flex align-start margin-top-sm" style="font-size: 22upx; color: #333; line-height: 28upx;">
                <view class="flex-sub">广东省深圳市宝安区</view>
                <view style="line-height: 32upx; margin-left: 18upx;">11.8Km</view>
              </view>
            </view>
          </label>
         </radio-group>
      </view>
    </view>
  </view>
</view>
</template>


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

<style>
.modal-content {
  max-height: 70vh;
  min-height: 40vh;
  overflow: auto;
}
uni-radio-input .uni-radio-input {
  height: 40upx;
  width: 40upx;
}
</style>
