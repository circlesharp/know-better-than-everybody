<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">导航栏</block></cu-custom>
		
		<view class="bg-grey padding margin text-center">
			Tab{{TabCur}}
		</view>

		<button class="root">test</button>
		<view class="bg-grey" style="height: 200px;"></view>
		<button class="root2">test2</button>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 默认
			</view>
		</view>
		<scroll-view
			scroll-x
			scroll-with-animation
			class="bg-white nav scroll"
			:scroll-left="scrollLeft"
		>
			<view
				class="cu-item"
				:class="index==TabCur?'text-green cur':''"
				v-for="(item,index) in 10"
				:key="index"
				:data-id="index"
				@tap="tabSelect"
			>
				Tab{{index}}
			</view>
		</scroll-view>

		<view class="cu-bar bg-white margin-top solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 居中
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in 3" :key="index" @tap="tabSelect" :data-id="index">
				Tab{{index}}
			</view>
		</scroll-view>

		<view class="cu-bar bg-white margin-top solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 平分
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 4" :key="index" @tap="tabSelect" :data-id="index">
					Tab{{index}}
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar bg-white margin-top solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 背景
			</view>
		</view>
		<scroll-view scroll-x class="bg-red nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in 3" :key="index" @tap="tabSelect" :data-id="index">
				Tab{{index}}
			</view>
		</scroll-view>
		<view class="cu-bar bg-white margin-top solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 图标
			</view>
		</view>
		<scroll-view scroll-x class="bg-green nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-camerafill"></text> 数码
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-upstagefill"></text> 排行榜
			</view>
			<view class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
				<text class="cuIcon-clothesfill"></text> 皮肤
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log('scrollLeft', this.scrollLeft);
			}
		},
		mounted() {
			this.mogai();
		},
		methods: {
			mogai() {
				const query = uni.createSelectorQuery();
				query.select('.root').boundingClientRect();
				query.selectViewport().scrollOffset();
				query.select('.scroll').scrollOffset();
				query.exec((e) => {
					console.log(e)
				})
			}
		},
	}
</script>

<style>

</style>
