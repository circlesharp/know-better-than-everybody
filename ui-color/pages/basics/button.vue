<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">按钮</block></cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<view class="cuIcon-title text-blue"></view>按钮形状
			</view>
			<view class="action">
				<navigator class="action" url="design" hover-class="none">
					<text class="cuIcon-skinfill"></text>
					<text class="text-df">设计</text>
				</navigator>
			</view>
		</view>
		<Comment>
			<ol>
				<li>cu-bar 默认 space-between</li>
				<li>navigator</li>
			</ol>
		</Comment>
		<view class="padding flex flex-wrap justify-between align-center bg-white">
			<button class="cu-btn">默认</button>
			<button class="cu-btn round">圆角</button>
			<button class="cu-btn cuIcon">
				<text class="cuIcon-emojifill"></text>
			</button>
		</view>
		<Comment>
			<ol>
				<li>默认 button.cu-btn</li>
				<li>圆角 round</li>
				<li>图标 cuIcon</li>
			</ol>
		</Comment>

		<view class="cu-bar margin-top bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按钮尺寸
			</view>
		</view>
		<view class="padding flex flex-wrap justify-between align-center bg-white">
			<button class="cu-btn round sm">小尺寸</button>
			<button class="cu-btn round">默认</button>
			<button class="cu-btn round lg">大尺寸</button>
		</view>
		<Comment>
			sm, , lg
		</Comment>

		<view class="cu-bar margin-top bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按钮颜色
			</view>
			<view class="action">
				<text class="text-df margin-right-sm">阴影</text>
				<switch @change="SetShadow" class="radio" :class="shadow?'checked':''" color="#39B54A"></switch>
			</view>
		</view>
		<Comment>
			switch 是一个原生组件, 默认样式被修改
		</Comment>

		<view class="grid col-5 padding-sm">
			<view class="margin-tb-sm text-center" v-for="(item,index) in ColorList" :key="index">
				<button class="cu-btn round" :class="['bg-' + item.name , shadow?'shadow':'']">{{item.title}}</button>
			</view>
		</view>
		<Comment>
			<ol>
				<li>bg-n</li>
				<li>shadow</li>
			</ol>
		</Comment>

		<view class="cu-bar margin-top bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>镂空按钮
			</view>
			<view class="action">
				<radio-group @change="SetBorderSize">
					<label class="margin-left-sm">
						<radio class="blue radio" value="" checked></radio>
						<text class="margin-left-sm">小</text>
					</label>
					<label class="margin-left-sm">
						<radio class="blue radio" value="s"></radio>
						<text class="margin-left-sm">大</text>
					</label>
				</radio-group>
			</view>
		</view>
		<Comment>
			<a href="https://uniapp.dcloud.io/component/radio?id=radio-group">radio-group</a>
		</Comment>
		<view class="grid col-5 padding-sm">
			<view class="margin-tb-sm text-center" v-for="(item,index) in ColorList" :key="index" v-if="item.name!='white'">
				<button class="cu-btn round" :class="[bordersize?'lines-' + item.name:'line-' + item.name, shadow?'shadow':'']">{{item.title}}</button>
			</view>
		</view>
		<Comment>
			<ol>
				<li>line-n (与 bg-n 相似)</li>
				<li>lines-n (粗边框) .cu-btn[class*="lines"]::after</li>
				<li>也可以用 shadow</li>
			</ol>
		</Comment>

		<view class="cu-bar margin-top bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>块状按钮
			</view>
		</view>
		<view class="padding flex flex-direction">
		<!-- <view class="padding flex justify-between"> -->
			<!-- <view class="bg-red">test</view> -->
			<button class="cu-btn bg-grey lg">玄灰</button>
			<button class="cu-btn bg-red margin-tb-sm lg">嫣红</button>
		</view>
		<Comment>
			<ol>
				<li>按钮本来没有宽度, 宽是由 padding 来的</li>
				<li>flex-direction 就是 column</li>
				<li>方向为 row 时, 英文高度度已固定, 所以高度不会占满区域</li>
				<li>也可以增加 .block (如无效状态)</li>
			</ol>
		</Comment>

		<view class="cu-bar margin-top bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>无效状态
			</view>
		</view>
		<view class="padding">
			<button class="cu-btn block bg-blue margin-tb-sm lg" disabled type="">无效状态</button>
			<button class="cu-btn block line-blue margin-tb-sm lg" disabled>无效状态(镂空)</button>
		</view>
		<Comment>
			<ol>
				<li>disabled attrs</li>
				<li><a href="https://www.w3school.com.cn/cssref/selector_attr_begin.asp">css [attribute]</a></li>
			</ol>
		</Comment>

		<view class="cu-bar margin-top bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按钮加图标
			</view>
		</view>
		<view class="padding-xl">
			<button class="cu-btn block line-orange lg">
				<text class="cuIcon-upload"></text> 图标
				<!-- <text class="cuIcon-upload cuIconfont-spin"></text> 图标 -->
			</button>
			<button class="cu-btn block bg-blue margin-tb-sm lg">
				<text class="cuIcon-loading2 cuIconfont-spin"></text> 加载
			</button>
			<button class="cu-btn block bg-black margin-tb-sm lg" loading>
				原生加载
			</button>
		</view>
		<Comment>
			<ol>
				<li>仅仅是增加了文字图标</li>
				<li>cuIconfont-spin 图标旋转</li>
			</ol>
		</Comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ColorList: this.ColorList,
				shadow: false,
				bordersize: ''
			};
		},
		methods: {
			SetShadow(e) {
				this.shadow = e.detail.value
			},
			SetBorderSize(e) {
				this.bordersize = e.detail.value
			}
		}
	}
</script>

<style>

</style>
