<template>
  <view class="no-repo">
    <view class="main-part flex justify-between">
      <view class="item">
        <image :src="pic" style="width: 200upx; height: 200upx;"></image>
        <view class="title">{{ title }}</view>
      </view>
      <view class="item">2</view>
    </view>
    <view class="vice-part">
      <view class="item flex align-center">
        <view
          class="bg-img"
          style="width: 90upx; height: 90upx; margin-right: 20upx;"
          :style="[{ backgroundImage: 'url(' + pic + ')' }]"
        />
        <view class="title flex-sub">{{ name }}</view>
        <view
          class="iconfont icon-right icon-qianjin_xiayibu_youjiantou_xiayiye"
          style="color: #aaa;"
        ></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.no-repo{
  color: #333;
  font-size: 32upx;
  line-height: 44upx;
}
.main-part {
  .item {
    background-color: #fff;
    padding: 60upx 72upx 40upx 72upx;
    border-radius: 20upx;
    .title {
      margin-top: 56upx;
      text-align: center;
    }
  }
}
.vice-part {
  margin-top: 40upx;
  border-radius: 20upx;
  .item {
    padding: 0 40upx;
    height: 120upx;
    background-color: #fff;
  }
}
</style>

<script>
export default {
  components: {  },
  data() {
    return {
      pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1569624780,2898748844&fm=26&gp=0.jpg',
      icon: '',
      title: '测试标题',
      name: '补货记录',
    };
  },
  methods: {
    
  },
}
</script>
