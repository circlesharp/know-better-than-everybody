<template>
	<view>
		<!-- part 1 页面 titil -->
		<view class="cu-bar bg-white solid-bottom">
		  <view class='action'>
		    <text class='cuIcon-titles text-green'></text> 商品比价 - 到底那个容量更划算
		  </view>
		</view>

		<!-- part 2 计价表单 -->
		<view v-for="(good, idx) in goods" :key="idx">
			<PriceItem 	:cheapest="idx === cheapestIdx"
									:reset="reset"
									:idx="idx"
									@finish-input="finishInput">
			</PriceItem>
		</view>

		<!-- part 3 按钮组 -->
		<view class="padding flex flex-direction">
		<button class="cu-btn bg-green lg" @tap="addGood">加个商品</button>
		<button class="cu-btn bg-red margin-tb-sm lg" @tap="clear">清空</button>
		</view>
	</view>
</template>

<script>
	import PriceItem from './components/price-item.vue'
	
	const defaultNum = 2
	
	export default {
		components: { PriceItem },
		data() {
			return {
				goods: [ 0, 0 ],
				reset: true,
				cheapestIdx: -1,
			}
		},
		onLoad() {
			
		},
		methods: {
			addGood() {
				this.goods.push(0)
			},
			clear() {
				this.goods = [ 0, 0 ],
				this.reset = true
				this.cheapestIdx = -1
			},
			finishInput(idx, rate) {
				this.reset = false
				this.goods[idx] = rate
				this.cheapestIdx = this.getMaxIdx()
			},
			getMaxIdx() {
				let max = 0
				let maxIdx = -1
				this.goods.forEach((good, idx) => {
					if (good > max) {
						max = good
						maxIdx = idx
					}
				})
				return maxIdx
			},
		}
	}
</script>

<style>
	
</style>
