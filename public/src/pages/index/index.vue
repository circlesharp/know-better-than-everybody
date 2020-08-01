<template>
	<view>
		<cu-custom bgColor="bg-grey">
			<block slot="content" style="font-weight: 600;">没有人比我更懂</block>
		</cu-custom>

		<!-- part 1 -->
		<Price v-if="PageCur=='price'"></Price>
		<Saving v-if="PageCur=='saving'"></Saving>
		<!-- <plugin v-if="PageCur=='plugin'"></plugin> -->

		<!-- part 2 -->
		<view class="cu-bar tabbar bg-white shadow foot">

			<view class="action" @click="NavChange" data-cur="price">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='price'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='price'?'text-green':'text-gray'">计价</view>
			</view>
			
			<view class="action" @click="NavChange" data-cur="saving">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'saving'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='saving'?'text-green':'text-gray'">攒钱</view>
			</view>
			<!-- <view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'price',
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
