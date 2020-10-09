<template>
  <view>
    <view class="bg-white padding-tb">
    	<view class="cu-steps">
    		<view
          class="cu-item"
          :class="index>basics?'':'text-yp-orange'"
          v-for="(item, index) in basicsList"
          :key="index"
         >
          <view class="wrap">
            <StepIcon :state="test(index)"/>
          </view>
          <view class="desc">
            {{item.name}}
          </view>
    		</view>
    	</view>
    </view>
    
    <button class="cu-btn bg-brown" @click="BasicsSteps">test</button>
  </view>
</template>

<script>
import StepIcon from './StepIcon.vue';

export default {
  components: { StepIcon },
  data() {
    return {
      basics: 0,
      basicsList: [
        {
          name: '选择设备'
        }, {
          name: '选择仓库'
        }, {
          name: '审核数量'
        }, {
          name: '确认收货'
        },
      ],
    };
  },
  methods: {
    test(idx) {
      if (idx > this.basics) return "not-yet";
      if (idx < this.basics) return "done";
      if (idx === this.basics) return 'here';
    },
    BasicsSteps() {
    	this.basics= this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1				
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  padding-top: 15upx;
  padding-bottom: 8upx;
}
.desc {
  font-size: 26upx;
}
</style>
