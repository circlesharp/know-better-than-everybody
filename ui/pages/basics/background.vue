<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">背景</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class='cuIcon-title text-blue'></text>深色背景
			</view>
		</view>
		<view class="grid col-3 padding-sm">
			<view class="padding-sm" v-for="(item,index) in ColorList" :key="index">
				<view class="padding radius text-center shadow-blur" :class="'bg-' + item.name">
					<view class="text-lg">{{item.title}}</view>
					<view class="margin-top-sm text-Abc">{{item.name}}</view>
				</view>
			</view>
		</view>
		<Comment>
			<ol>
				<li>bg-n 文字颜色已包含在样式中</li>
				<li>shadow-blur 阴影</li>
				<li>
					.text-Abc { text-transform: Capitalize; }
					.text-ABC { text-transform: Uppercase; }
					.text-abc { text-transform: Lowercase; }
				</li>
			</ol>
		</Comment>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>淡色背景
			</view>
		</view>
		<view class="grid col-3 bg-white padding-sm">
			<view class="padding-sm" v-for="(item,index) in ColorList" :key="index" v-show="index<12">
				<view class="padding radius text-center light" :class="'bg-' + item.name">
					<view class="text-lg">{{item.title}}</view>
					<view class="margin-top-sm text-Abc">{{item.name}}</view>
				</view>
			</view>
		</view>
		<Comment>
			<ol>
				<li>.bg-n.light</li>
				<li>背景颜色和文字颜色都改变了</li>
			</ol>
		</Comment>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>渐变背景
			</view>
		</view>
		<view class="grid col-2 padding-sm">
			<view class="padding-sm">
				<view class="bg-gradual-red padding radius text-center shadow-blur">
					<view class="text-lg">魅红</view>
					<view class="margin-top-sm text-Abc">#f43f3b - #ec008c</view>
				</view>
			</view>
			<view class="padding-sm">
				<view class="bg-gradual-orange padding radius text-center shadow-blur">
					<view class="text-lg">鎏金</view>
					<view class="margin-top-sm text-Abc">#ff9700 - #ed1c24</view>
				</view>
			</view>
			<view class="padding-sm">
				<view class="bg-gradual-green padding radius text-center shadow-blur">
					<view class="text-lg">翠柳</view>
					<view class="margin-top-sm text-Abc">#39b54a - #8dc63f</view>
				</view>
			</view>
			<view class="padding-sm">
				<view class="bg-gradual-blue padding radius text-center shadow-blur">
					<view class="text-lg">靛青</view>
					<view class="margin-top-sm text-Abc">#0081ff - #1cbbb4</view>
				</view>
			</view>
			<view class="padding-sm">
				<view class="bg-gradual-purple padding radius text-center shadow-blur">
					<view class="text-lg">惑紫</view>
					<view class="margin-top-sm text-Abc">#9000ff - #5e00ff</view>
				</view>
			</view>
			<view class="padding-sm">
				<view class="bg-gradual-pink padding radius text-center shadow-blur">
					<view class="text-lg">霞彩</view>
					<view class="margin-top-sm text-Abc">#ec008c - #6739b6</view>
				</view>
			</view>
		</view>
		<Comment>
			<ol>
				<li>bg-gradual-n</li>
				<li>需要自定义 background-image: linear-gradient</li>
			</ol>
		</Comment>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>图片背景
			</view>
		</view>
		<view
			class="bg-img bg-mask flex align-center"
			style="height: 414upx;"
			:style="{backgroundImage: 'url(' + bgPic + ')'}"
		>
			<view class="padding-xl text-white">
				<view class="padding-xs text-xxl text-bold">
					钢铁之翼
				</view>
				<view class="padding-xs text-lg">
					Only the guilty need fear me.
				</view>
			</view>
		</view>
		<Comment>
			<ol>
				<li>bg-mask 一层纱</li>
				<li>bg-img，并通过 backgroundImage 设置背景图片</li>
				<li>flex & align 实现水平居中</li>
			</ol>
		</Comment>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>视频背景
			</view>
		</view>
		<view class="bg-video bg-mask flex align-center" style="height: 422upx;">
			<video
				autoplay loop muted
				objectFit="cover"
				:src="bgVideo"
				:show-play-btn="false"
			 	:controls="false"
			></video>
			<cover-view class="padding-xl text-white ">
				<cover-view class="padding-xs  text-xxl text-bold">
					暗裔剑魔
				</cover-view>
				<cover-view class="padding-xs">
					我必须连同希望一起毁坏……
				</cover-view>
			</cover-view>
		</view>
		<Comment>
			<ol>
				<li>通过 cover-view 来绘制界面覆盖元素</li>
				<li>
					<a href="https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html">cover-view</a>
				</li>
			</ol>
		</Comment>
		
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>透明背景(文字层)
			</view>
		</view>
		<view class="grid col-2">
			<view class="bg-img padding-bottom-xl" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10007.jpg');height: 207upx;">
				<view class="bg-shadeTop padding padding-bottom-xl">
					上面开始
				</view>
			</view>
			<view class="bg-img flex align-end" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg');height: 207upx;">
				<view class="bg-shadeBottom padding padding-top-xl flex-sub">
					下面开始
				</view>
			</view>
		</view>
		<Comment>
			<ol>
				<li>文字层，通过设置 padding 改变阴影范围</li>
				<li>bg-shadeTop, bg-shadeBottom 渐变方向 </li>
			</ol>
		</Comment>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				ColorList: this.ColorList,
				bgPic: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				bgVideo: 'https://yz.lol.qq.com/v1/assets/videos/aatrox-splashvideo.webm',
			};
		}
	}
</script>

<style>

</style>
