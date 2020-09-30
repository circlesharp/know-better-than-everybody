<template>
	<view>
		<!-- part 1 -->
    <view style="height: 120upx; position: relative;">
      <view
        style="z-index: -1; width: 100%; height: 100%; position: absolute;"
        class="flex flex-direction"
      >
        <view class="flex-sub bg-yp-orange"></view>
        <view class="flex-sub"></view>
      </view>
      

      <view
        class="margin-lr-sm padding-lr-lg flex justify-between align-center bg-white radius-10"
        style="height: 100%; font-size: 28upx; color: #333;"
      >
        <view
          v-for="(item, index) in tabArr"
          :key="index"
          :class="[{active: item == TabCur}]"
          style="height: 100%; line-height: 120upx;"
          @click="tabSelect(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        TabCur: '订单',
				tabArr: ['交易概览', '设备排行', '商品排行', '订单'],
			}
		},
		methods: {
      tabSelect(TabCur) {
        this.TabCur = TabCur;
      },
		}
	}
</script>

<style>
  
.active {
  position:relative;
  font-size: 36upx;
  display: block;
  color: #FFAF2E;
}

.active:after {
  content: "";
  position: absolute;
  left: 25%;
  bottom: 0upx;
  width: 50%;
  height: 8upx;
  border-radius: 10upx;
  background-color: #FFAF2E;
}

.test {
  position:relative;
  height:50px;
  background-color:#bbb;
  padding:4px;
}
</style>
