<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">进度条</block></cu-custom>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>进度条形状
			</view>
		</view>
		<view class="padding bg-white">
			<view class="cu-progress">
				<view class="bg-red" :style="[{ width: progerssStr }]">{{ progerssStr }}</view>
			</view>
			<view class="cu-progress radius margin-top">
				<view class="bg-red" :style="[{ width:loading?'61.8%':''}]">61.8%</view>
			</view>
			<view class="cu-progress round margin-top">
				<view class="bg-red" :style="[{ width:loading?'61.8%':''}]">61.8%</view>
			</view>
		</view>
		<Comment>
			<ol>
				<li>子级 bg-n, width, text</li>
				<li>父级 cu-progress</li>
				<li>radius, round 通用</li>
				<li>_, sm, xs</li>
			</ol>
		</Comment>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>进度条尺寸
			</view>
		</view>
		<view class="padding bg-white">
			<view class="cu-progress round">
				<view class="bg-red" :style="[{ width:loading?'61.8%':''}]">default</view>
			</view>
			<view class="cu-progress round margin-top sm">
				<view class="bg-red" :style="[{ width:loading?'61.8%':''}]">sm</view>
			</view>
			<view class="cu-progress round margin-top xs">
				<view class="bg-red" :style="[{ width:loading?'61.8%':''}]">xs</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top" @tap="showModal" data-target="ColorModal">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>进度条颜色
			</view>
			<view class="action">
				<view class="padding solid radius shadow-blur" :class="'bg-' + color"></view>
			</view>
		</view>
		<view class="padding" :class="color=='white'?'bg-grey':'bg-white'">
			<view class="cu-progress round">
				<view :class="'bg-' + color" :style="[{ width:loading?'61.8%':''}]"></view>
			</view>
		</view>
		<Comment>
			todo: 这个 modal 很秀，留着以后研究
		</Comment>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>进度条条纹
			</view>
			<switch class="margin-right-sm" :class="active?'checked':''" @change="SetActive"></switch>
		</view>
		<view class="padding bg-white">
			<view class="cu-progress round sm striped" :class="active?'active':''">
				<view class="bg-green" :style="[{ width:loading?'60%':''}]"></view>
			</view>
			<view class="cu-progress round sm margin-top-sm striped" :class="active?'active':''">
				<view class="bg-black" :style="[{ width:loading?'40%':''}]">40%</view>
			</view>
		</view>
		<Comment>
			<ol>
				<li>条纹：.striped</li>
				<li>条纹会动：.striped.active</li>
				<li>有条纹依然可以写内容</li>
				<li>实现：background-image: linear-gradient()</li>
			</ol>
		</Comment>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>进度条比例
			</view>
		</view>
		<view class="padding bg-white">
			<view class="cu-progress radius striped active">
				<view class="bg-red" :style="[{ width:loading?'30%':''}]">30%</view>
				<view class="bg-olive" :style="[{ width:loading?'45%':''}]">45%</view>
				<view class="bg-cyan" :style="[{ width:loading?'25%':''}]">25%</view>
			</view>
		</view>
		<Comment>
			在一个父级 cu-progress 下有多个 子元素
		</Comment>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>进度条布局
			</view>
		</view>
		<view class="padding bg-white ">
			<view class="flex">
				<view class="cu-progress round">
					<view class="bg-green" :style="[{ width:loading?'100%':''}]"></view>
				</view>
				<text class="cuIcon-roundcheckfill text-green margin-left-sm"></text>
			</view>
			<view class="flex margin-top">
				<view class="cu-progress round">
					<view class="bg-red" :style="[{ width:loading?'20%':''}]"></view>
					<view class="bg-green" :style="[{ width:loading?'60%':''}]"></view>
				</view>
				<text class="margin-left">80%</text>
			</view>
		</view>
		<Comment>
			使用了 flex 布局，并控制了之间的 margin
		</Comment>

		<view class="cu-modal" :class="modalName=='ColorModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-end solid-bottom">
					<view class="content">选择颜色</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid col-5 padding">
					<view class="padding-xs" v-for="(item,index) in ColorList" :key="index" @tap="SetColor" :data-color="item.name" v-if="item.name!='gray' && item.name!='white'">
						<view class="padding-tb radius" :class="'bg-' + item.name"> {{item.title}} </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ColorList: this.ColorList,
				color: 'red',
				loading: false,
				greatLoading: false,
				finalLoading: false,
				modalName: '',
				progerssStr: '0.0%',
				active: false
			};
		},
		onLoad: function() {
			let that = this;
			setTimeout(function() {
				that.loading = true;
				that.progerssStr = '61.8%';
			}, 500);
			setTimeout(() => { this.greatLoading = true; this.progerssStr = '88.8%'; }, 1500)
			setTimeout(() => { this.finalLoading = true; this.progerssStr = '100%'; }, 2000)
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			SetColor(e) {
				this.color = e.currentTarget.dataset.color;
				this.modalName = null
			},
			SetActive(e) {
				this.active = e.detail.value
			},
		}
	}
</script>

<style>

</style>
