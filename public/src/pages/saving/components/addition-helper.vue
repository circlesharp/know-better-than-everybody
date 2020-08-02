<template>
	<view class="bg-white margin padding-tb-s">
		<!-- part 1 加法等式 -->
		<view class="monitor padding-xs solid-bottom">
			<view class="add-factors">
				<button
					class="cu-btn margin-xs"
					v-for="(factor, idx) in addFactors"
					:class="idx !== currentIdx ? 'bg-grey' : 'bg-blue'"
					:key="idx+factor"
					@tap="currentChange(idx)"
				>
					{{factor}}
				</button>
			</view>
			<view class="add-result dashed-left padding-tb">
				<view class="cu-btn lg bg-orange margin-lr radius">
					{{addResult}}
				</view>
			</view>
		</view>

		<!-- part 2 操作控件 -->
		<view class="operator">
			<view class="flex padding" style="align-items: center;">
				<input
					:placeholder="placeholder"
					type="digit"
					v-model="operateNum"
					class="border"
					style="flex: 1;"/>
				<button
					class="cu-btn"
					:class="isModify ? 'bg-blue' : 'bg-green'"
					@tap="operate"
				>
					{{operatorText}}
				</button>
			</view>
			<!-- <button class="cu-btn block margin-lr bg-orange">完成</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AdditionHelper',
		props: {

		},
		data() {
			return {
				addFactors: [1, 2, 4, 5, 72, 4],
				operateNum: '',
				currentIdx: -1,
				addResult: 0,
			};
		},
		created() {
			this.explicitHandleAddFactorsChange();
		},
		computed: {
			isModify() {
				return this.currentIdx > -1;
			},
			placeholder() {
				return this.isModify ? '请输入修改的金额' : '下一项金额';
			},
			operatorText() {
				return this.isModify ? '修改' : '添加';
			}
		},
		methods: {
			currentChange(currentIdx) {
				this.currentIdx = currentIdx;
			},
			operate() {
				if (this.isModify) {
					this.modify();
				} else {
					this.add();
				}
				this.explicitHandleAddFactorsChange();
				this.operateNum = '';
			},
			add() {
				if (+this.operateNum > 0) {
					this.addFactors.push(+this.operateNum);
				} else {
					// 提示输入数字
				}
			},
			modify() {
				this.addFactors[this.currentIdx] = +this.operateNum;
				this.currentIdx = -1;
			},
			// 不知道傻逼mp还是傻逼uni不能深度监听数组变化
			explicitHandleAddFactorsChange() {
				this.addResult = this.addFactors.reduce((a, b) => {
					return a + b;
				});
			},
		},
	}
</script>

<style>
	.monitor {
		display: flex;
		align-items: center;
	}
	.add-factors {
		flex: 1;
	}
</style>
