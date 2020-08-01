<template>
	<view class="cu-card case">
	  <view class="cu-item shadow">

			<!-- part 1 header -->
			<view class="cu-bar bg-white solid-bottom">
			  <view class='action'>
			    <text class='cuIcon-cart text-orange'></text>
					{{ idx | goodTitle }}
					<text class='text-orange' style="margin-left: 10px;" v-show="cheapest">更加划算</text>
					<text class='' v-if="rate > 0" style="margin-left: 10px;">
						每元能买 {{ rate }} 单位
					</text>
			  </view>
			</view>
			
			<!-- part 2 表单 -->
			<form>
				<view class="cu-form-group">
					<view class="title">价格</view>
					<text class='cuIcon-moneybag text-orange'></text>
					<input 	placeholder="该商品售价"
									type="digit"
									v-model="price"
									@blur="finishInput">
					</input>
				</view>
				<view class="cu-form-group">
					<view class="title">容量</view>
					<input 	placeholder="该商品的容量"
									type="digit"
									v-model="content"
									@blur="finishInput">
					</input>
				</view>
			</form>
	  </view>
	</view>
</template>

<script>
	export default {
		props: {
			cheapest: { type: Boolean, default: false },
			reset: { type: Boolean, default: false },
			idx: { type: Number, default: 0 },
		},
		data() {
			return {
				price: null,
				content: null,
				rate: null,
			};
		},
		filters: {
			goodTitle(idx) {
				return `商品 0${idx + 1}`
			}
		},
		watch: {
			reset(bool) {
				if (bool) {
					this.price = null
					this.content = null
					this.rate = null
				}
			}
		},
		methods: {
			finishInput(e) {
				this.rate = parseFloat(this.content) / parseFloat(this.price)
				this.rate = Math.floor(this.rate * 100) / 100
				this.$emit('finish-input', this.idx, this.rate)
			}
		},
	}
</script>

<style>

</style>
