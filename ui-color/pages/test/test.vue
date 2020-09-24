<template>
	<view class="container">

		<!-- part 1 tap-left -->
		<scroll-view
			scroll-y
			scroll-anchoring
			class="scroll-left"
			:scroll-with-animation="isTap"
			:scroll-into-view="scrollView_leftId"
			:style="{ height: height + 'px', top: top + 'px', width: leftOffset + 'px' }"
		>
			<view
				class="tab-bar-item"
				:class="[currentCate === index ? 'active' : '']"
				:id="`left_${index}`"
				v-for="(cate, index) in catesGroups.cates"
				:key="index"
				@tap.stop="swichLeft(index)"
			>
				<text>{{ cate }}</text>
			</view>
		</scroll-view>

		<!-- part 2 tap-top -->
		<scroll-view
			scroll-x
			scroll-anchoring
			class="scroll-top"
			:style="{ top: headerOffset + 'px', paddingLeft: leftOffset + 'px' }"
			:scroll-with-animation="isTap"
			:scroll-into-view="scrollView_leftId"
		>
			<view class="flex" style="white-space: nowrap;">
				<block
					v-for="(group, index) in catesGroups.groups[currentCate]"
					:key="index"
				>
					<view :id="`left_${index}`">
						<button
							class="btn cu-btn margin-right-sm"
							
							:class="[currentTab === index ? 'active' : '']"
							@tap.stop="switchTop(index)"
						>
							{{ `tap - ${group}` }}
						</button>
					</view>
				</block>
			</view>
		</scroll-view>

		<!-- part 3 scroll -->
		<scroll-view
			@scroll="scroll"
			scroll-anchoring
			scroll-y
			scroll-with-animation
			class="scroll-main"
			:scroll-into-view="scrollView_rightId"
			:style="{ height: height + 'px', top: top + 'px', paddingLeft: leftOffset + 'px'}"
		>
			<block v-for="(item, index) in mock[Object.keys(mock)[currentCate]]" :key="index">
				<Linkage
          :distanceTop="distanceTop"
          :recalc="1"
          :scrollTop="scrollTop"
          :index="index"
          @linkage="linkage"
        >
					<view class="page-view" :id="`right_${index}`">
						<view class="bg-grey solid padding-xs" style="width: 100%; height: 100px;">
							{{ item }}
						</view>
					</view>
				</Linkage>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import Linkage from './Linkage';
import mock from './tree.mock';

const TOP_SCROLL_THRESHOLD = 2;
const TOP_SCROLL_OFFSET = 2;
const LEFT_SCROLL_THRESHOLD = 6;
const LEFT_SCROLL_OFFSET = 2;
const HEADER_HEIGHT = 46;
const ACTUAL_HEIGHT = 500;

const HEADER_OFFSET = 100;
const LEFT_OFFSET = 80;

export default {
	components: {
		Linkage
	},
	data() {
		return {
			mock,
			leftOffset: LEFT_OFFSET,
			headerOffset: HEADER_OFFSET,
			height: 0, //scroll-view高度
			top: 0,
			currentCate: 0,
			currentTab: 0, //预设当前项的值
			scrollView_leftId: 'left_0', // tap 的起点
			scrollView_rightId: 'right_0', // scroll 的起点
			scrollTop: 0,
			distanceTop: HEADER_HEIGHT + HEADER_OFFSET,
			isScroll: true,
			isTap: true
		};
	},
	computed: {
		catesGroups() {
			const cates = Object.keys(this.mock).map(i => i);
			const groups = [];
			cates.forEach(i => {
				groups.push(Object.keys(this.mock[i]));
			})
			return { cates, groups };
		},
	},
	/* 只控制 height, top */
	onLoad: function(options) {
		this.height = ACTUAL_HEIGHT - HEADER_HEIGHT;
		this.top = HEADER_HEIGHT + HEADER_OFFSET;
	},
	methods: {
		// 点击标题切换当前页时改变样式
		swichLeft(cur) {
			if (this.currentCate === cur) return false;
			this.currentCate = cur;
			// this.checkCor('LEFT');
		},
		switchTop(cur) {
			if (this.currentTab == cur) return false;
			this.currentTab = cur;
			this.checkCor('TOP');
		},
		//判断当前滚动超过一屏时，设置tab标题滚动条。
		checkCor: function(from) {
			/* 由 scroll 触发 */
			if (!from) {
				this.scrollView_leftId = `left_${this.currentTab}`;
				return;
			}
			/* 由 tap 而触发 */
			this.isScroll = false;
			this.isTap = true;
			if (this.currentTab > TOP_SCROLL_THRESHOLD) {
				this.scrollView_leftId = `left_${this.currentTab - TOP_SCROLL_OFFSET}`;
			} else {
				this.scrollView_leftId = `left_0`;
			}
			this.scrollView_rightId = `right_${this.currentTab}`;
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
				this.checkCor();
			}
		},
	}
};
</script>

<style lang="scss" scoped>

$yp-orange: #FFAF2E;
$yp-orange-light: #FFF4E2;
$yp-black: #333;

page {
	background-color: #f1f1f1;
}

/* 左侧导航布局 start */
.scroll-left {
	position: fixed;
	z-index: 11;
	color: $yp-black;
	font-size: 26upx;
	.tab-bar-item {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		&.active {
			color: $yp-orange;
			font-size: 28upx;
			background-color: #fff;
		}
	}
}
/* 左侧导航布局 end */



/* 左侧导航布局 start */

.scroll-top {
	position: fixed;
}

.btn {
	margin: 20upx 0;
	margin-right: 20upx;
	padding: 0 20upx;
	height: 52upx;
	color: #666;
	background-color: #F6F6F6;
	font-size: 24upx;
	line-height: 52upx;
	&.active {
		color: $yp-orange;
		background-color: $yp-orange-light;
	}
}

/* 左侧导航布局 end*/

.scroll-main {
	width: 100%;
	position: fixed;
	box-sizing: border-box;
	left: 0;
}

.page-view {
	width: 100%;
	overflow: hidden;
	box-sizing: border-box;
	padding-bottom: env(safe-area-inset-bottom);
}

</style>
