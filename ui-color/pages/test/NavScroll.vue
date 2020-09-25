<template>
	<view class="container">

		<!-- part 1 tap-left -->
		<scroll-view
			scroll-y
			scroll-anchoring
			class="scroll-left"
			:scroll-with-animation="isTap"
			:style="{ height: height + headerHeight + 'px', top: top - headerHeight + 'px', width: leftOffset + 'px' }"
		>
			<view
				class="tab-bar-item"
				:class="[currentCate === index ? 'active' : '']"
				:id="`left_${index}`"
				v-for="(cate, index) in productTree"
				:key="index"
				@tap.stop="swichLeft(index)"
			>
				<text>{{ cate.text }}</text>
			</view>
		</scroll-view>

		<!-- part 2 tap-top -->
		<scroll-view
			scroll-x
			scroll-anchoring
			class="scroll-top"
      :scroll-into-view="scrollView_leftId"
			:style="{ top: headerOffset + 'px', paddingLeft: leftOffset + 12 + 'px' }"
			:scroll-with-animation="isTap"
		>
			<view class="flex" style="white-space: nowrap;">
        <view
          v-for="(group, index) in currentCateTree"
          :key="index"
          :id="`left_${index}`"
        >
          <button
            class="btn cu-btn margin-right-sm"
            :class="[currentTab === index ? 'active' : '']"
            @tap.stop="switchTop(index)"
          >
            {{ group.text }}
          </button>
        </view>
			</view>
		</scroll-view>

		<!-- part 3 scroll -->
		<scroll-view
			@scroll="scroll"
			scroll-anchoring
			scroll-y
			scroll-with-animation
			class="scroll-main bg-white"
			:scroll-into-view="scrollView_rightId"
			:style="{ height: height + 'px', top: top + 'px', paddingLeft: leftOffset + 12 + 'px'}"
		>
			<block v-for="(item, index) in currentCateTree" :key="index">
				<Linkage
          :distanceTop="distanceTop"
          :recalc="1"
          :scrollTop="scrollTop"
          :index="index"
          @linkage="linkage"
        >
					<view class="page-view" :id="`right_${index}`">
            <view class="padding-top-sm" style="color: #999; font-size: 26upx;">{{ item.text }}</view>
						<view style="width: 100%;">
							<view v-for="(i, k) in item.children" :key="k" class="padding-tb-sm">
                <List :item="i" @on-select="seleGoods"/>
              </view>
						</view>
					</view>
				</Linkage>
			</block>
		</scroll-view>
    
	</view>
</template>

<script>
import Linkage from './Linkage';
import List from './List.vue';

const defaultScrollConfig = {
  TOP_SCROLL_THRESHOLD: 2,
  TOP_SCROLL_OFFSET: 2,
  LEFT_SCROLL_THRESHOLD: 6,
  LEFT_SCROLL_OFFSET: 2,
};

const defaultOffset = {
  HEADER_HEIGHT: 46,
  ACTUAL_HEIGHT: 500,
  HEADER_OFFSET: 52,
  LEFT_OFFSET: 80,
};

export default {
	components: {
		Linkage, List
	},
  props: {
    tree: [Object, Array],
    scrollConfig: {
      type: Object,
      default() {
        return defaultScrollConfig;
      },
    },
    offsetConfig: {
      type: Object,
      default() {
        return defaultOffset;
      },
    }
  },
	data() {
		return {
      productTree: this.tree[0].children,
			leftOffset: this.offsetConfig.LEFT_OFFSET,
			headerOffset: this.offsetConfig.HEADER_OFFSET,
      headerHeight: this.offsetConfig.HEADER_HEIGHT,
      distanceTop: this.offsetConfig.HEADER_HEIGHT + this.offsetConfig.HEADER_OFFSET,
			height: 0, //scroll-view高度
			top: 0,
			currentCate: 0,
			currentTab: 0, //预设当前项的值
			scrollView_leftId: 'left_0', // tap 的起点
			scrollView_rightId: 'right_0', // scroll 的起点
			scrollTop: 0,
			isScroll: true,
			isTap: true
		};
	},
	computed: {
		currentCateTree() {
			return this.productTree[this.currentCate].children;
		},
	},
	/* 只控制 height, top */
	created() {
		this.height = this.offsetConfig.ACTUAL_HEIGHT - this.offsetConfig.HEADER_HEIGHT;
		this.top = this.offsetConfig.HEADER_HEIGHT + this.offsetConfig.HEADER_OFFSET;
	},
	methods: {
    seleGoods(params) {
      this.$emit('on-select', params);
    },
		// 点击标题切换当前页时改变样式
		swichLeft(cur) {
      console.log('swichLeft', cur);
			if (this.currentCate === cur) return false;
			this.currentCate = cur;
			// this.checkCor('LEFT');
		},
		switchTop(cur) {
      console.log('switchTop', cur);
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
			if (this.currentTab > this.scrollConfig.TOP_SCROLL_THRESHOLD) {
				this.scrollView_leftId = `left_${this.currentTab - this.scrollConfig.TOP_SCROLL_OFFSET}`;
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
$yp-background: #f1f1f1;

page {
	background-color: #f1f1f1;
}

/* 左侧导航布局 start */
.scroll-left {
	position: fixed;
	z-index: 11;
	color: $yp-black;
	font-size: 26upx;
  background-color: $yp-background;
  border-top: 2upx solid #eee;
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



/* 上侧导航布局 start */

.scroll-top {
	position: fixed;
  background-color: #fff;
  border-top: 2upx solid #eee;
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
  border-top: 2upx solid #eee;
	padding-bottom: env(safe-area-inset-bottom);
}

</style>
