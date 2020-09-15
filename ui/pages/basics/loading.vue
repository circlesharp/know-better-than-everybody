<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">加载</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load load-cuIcon" :class="!isLoad?'loading':'over'"></view>
				</view>
			</block>
		</cu-custom>

		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>背景
			</view>
		</view>
		<view class="cu-load bg-blue" :class="!isLoad?'loading':'over'"></view>
		<Comment>
			<ol>
				<li>cu-load</li>
				<li>bg-n 设置背景颜色</li>
				<li>3种状态：.loading, .over .erro</li>
			</ol>
		</Comment>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>加载状态
			</view>
			<view class="action">
				<switch @change="isLoading" :class="isLoad?'checked':''"></switch>
			</view>
		</view>
		<view class="cu-load bg-grey" :class="!isLoad?'loading':'over'"></view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>加载错误
			</view>
		</view>
		<view class="cu-load bg-red erro"></view>
		<view class="cu-load" :class="fancyLoadStyle"></view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>弹框加载
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="LoadModal">
					点我
				</button>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>进度条加载
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="LoadProgress">
					点我
				</button>
			</view>
		</view>
		<view class="load-progress" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-green" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
			<view class="load-progress-spinner text-green"></view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				isLoad:false,
				loadModal: false,
				loadProgress: 0,
				fancyLoading: {
					cnt: 0,
					loading: false,
					erro: false,
				}
			};
		},
		created() {
			setInterval(() => {
				this.fancyLoading.cnt++;
				let { cnt } = this.fancyLoading;
				this.fancyLoading.loading = false;
				this.fancyLoading.erro = false;
				if (cnt % 2 === 0) this.fancyLoading.loading = true;
				if (cnt % 3 === 0) this.fancyLoading.erro = true;
			}, 1000);
		},
		computed: {
			fancyLoadStyle() {
				return {
					loading: this.fancyLoading.loading,
					over: !this.fancyLoading.loading && !this.fancyLoading.erro,
					erro: !this.fancyLoading.loading && this.fancyLoading.erro,
					'bg-red': this.fancyLoading.erro,
					'bg-blue': !this.fancyLoading.erro,
				};
			},
		},
		methods: {
			isLoading(e) {
				this.isLoad = e.detail.value;
			},
			LoadModal(e) {
				this.loadModal = true;
				setTimeout(() => {
					this.loadModal = false;
				}, 2000)
			},
			LoadProgress(e) {
				this.loadProgress = this.loadProgress + 3;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			}
		}
	}
</script>

<style>

</style>
