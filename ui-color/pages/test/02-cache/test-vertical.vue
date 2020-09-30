<template>
	<view class="container">

		<!-- part 1 左边 -->
		<scroll-view
			scroll-y
			scroll-anchoring
			class="tab-view"
			:scroll-with-animation="isTap"
			:scroll-into-view="scrollView_leftId"
			:style="{ height: height + 'px', top: top + 'px' }"
		>
			<view
				class="tab-bar-item"
				:class="[currentTab == index ? 'active' : '']"
				:id="`left_${index}`"
				v-for="(item, index) in tabbar"
				:key="index"
				@tap.stop="swichNav(index)"
			>
				<text>{{ item }}</text>
			</view>
		</scroll-view>
		<scroll-view
			@scroll="scroll"
			scroll-anchoring
			scroll-y
			scroll-with-animation
			class="right-box"
			:scroll-into-view="scrollView_rightId"
			:style="{ height: height + 'px', top: top + 'px' }"
		>
			<!--内容部分 start 自定义可删除-->
			<block v-for="(item, index) in tabbar" :key="index">
				<Linkage
          :distanceTop="distanceTop"
          :recalc="1"
          :scrollTop="scrollTop"
          :index="index"
          @linkage="linkage"
        >
					<view class="page-view" :id="`right_${index}`">
						<view class="bg-grey" style="width: 100%; height: 100px;">
							{{ item }}
						</view>
					</view>
				</Linkage>
			</block>
			<!--内容部分 end 自定义可删除-->
		</scroll-view>
	</view>
</template>

<script>
import Linkage from './Linkage';

const TAP_SCROLL_THRESHOLD = 6;
const TAP_SCROLL_OFFSET = 2;
const HEADER_HEIGHT = 150;

export default {
	components: {
		Linkage
	},
	data() {
		return {
			tabbar: [
				'推荐分类',
				'进口超市',
				'国际名牌',
				'奢侈品',
				'海囤全球',
				'男装',
				'女装',
				'男鞋',
				'女鞋',
				'钟表珠宝',
				'手机数码',
				'电脑办公',
				'家用电器',
				'玩具乐器',
				'运动户外',
				'宠物生活',
				'特产馆'
			],
			height: 0, //scroll-view高度
			top: 0,
			currentTab: 0, //预设当前项的值
			scrollView_leftId: 'left_0', // tap 的起点
			scrollView_rightId: 'right_0', // scroll 的起点
			scrollTop: 0,
			distanceTop: HEADER_HEIGHT,
			isScroll: true,
			isTap: true
		};
	},
	/* 只控制 height, top */
	onLoad: function(options) {
		setTimeout(() => {
			uni.getSystemInfo({
				success: res => {
					let top = 0;
					this.height = res.windowHeight - HEADER_HEIGHT;
					this.top = top + HEADER_HEIGHT;
				}
			});
		}, 50);
	},
	methods: {
		// 点击标题切换当前页时改变样式
		swichNav: function(cur) {
			if (this.currentTab == cur) return false;
			this.currentTab = cur;
			this.checkCor();
		},
		//判断当前滚动超过一屏时，设置tab标题滚动条。
		checkCor: function(isScroll) {
			if (!isScroll) {
				/* 由 tap 而触发 */
				this.isScroll = false;
				this.isTap = true;
				if (this.currentTab > TAP_SCROLL_THRESHOLD) {
					this.scrollView_leftId = `left_${this.currentTab - TAP_SCROLL_OFFSET}`;
				} else {
					this.scrollView_leftId = `left_0`;
				}
				this.scrollView_rightId = `right_${this.currentTab}`;
			} else {
				/* 由 scroll 而触发 */
				this.scrollView_leftId = `left_${this.currentTab}`;
			}
		},
		scroll(e) {
			//动画时长固定300ms
			if (!this.isScroll) {
				setTimeout(() => {
					this.isScroll = true;
				}, 150);
			} else {
				this.scrollTop = e.detail.scrollTop;
			}
		},
		linkage(e) {
			if (e.isLinkage && e.index != this.currentTab) {
				this.isTap = false;
				this.currentTab = e.index;
				this.checkCor(true);
			}
		},
	}
};
</script>

<style>
page {
	background-color: #f1f1f1;
}

/* 左侧导航布局 start*/

.tab-view {
	/* height: 100%; */
	width: 200upx;
	position: fixed;
	left: 0;
	z-index: 10;
}

.tab-bar-item {
	width: 200rpx;
	height: 110rpx;
	background: #f6f6f6;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #444;
	font-weight: 400;
}

.active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fcfcfc;
}

.active::before {
	content: '';
	position: absolute;
	border-left: 8rpx solid #e41f19;
	height: 30rpx;
	left: 0;
}

/* 左侧导航布局 end*/

.right-box {
	width: 100%;
	position: fixed;
	padding-left: 220rpx;
	box-sizing: border-box;
	left: 0;
}

.page-view {
	width: 100%;
	overflow: hidden;
	padding-top: 20rpx;
	padding-right: 20rpx;
	box-sizing: border-box;
	padding-bottom: env(safe-area-inset-bottom);
}

</style>
