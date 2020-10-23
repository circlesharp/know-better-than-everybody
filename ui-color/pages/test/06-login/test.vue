<template>
  <view class="login">
    <view class="wrap-hello">
      <view>Hi，您好！</view>
      <view>欢迎登录运营助手</view>
    </view>
    <view class="wrap-form">
      <view class="wrap-input">
      	<view class="title">账号</view>
        <view class="value input">
          <input placeholder="请输入账号" placeholder-style="color: #bbb;"></input>
        </view>
      </view>
      <view class="wrap-input" style="margin-top: 100upx;">
      	<view class="title">密码</view>
        <view class="value input">
          <input password placeholder="请输入密码" placeholder-style="color: #bbb;"></input>
        </view>
      </view>
      <view class="wrap-input" style="margin-top: 10upx;">
      	<view class="title"></view>
        <view class="value wrap-radio">
          1
        </view>
      </view>
    </view>
    <view class="wrap-bottom"></view>
  </view>
</template>

<script>
export default {
  components: {  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.login{
  height: 600px;
  background-color: #ffffff;
}
.wrap-hello {
  padding: 80upx 0 160upx 80upx;
  color: #333333;
  font-size: 48upx;
  font-weight: 500;
  line-height: 66upx;
}
.wrap-form {
  padding: 80upx;
  .wrap-input {
    display: flex;
    .title {
      width: 56upx;
    }
    .value {
      flex: 1;
      margin-left: 20upx;
    }
    .input {
      position: relative;
      font-size: 30upx;
      color: #333;
      &::after {
        position: absolute;
        top: 60upx;
        width: 100%;
        content: '';
        border-bottom: 2upx #ddd solid;
      }
    }
    .wrap-radio {
      padding-top: 30upx;
      color: red;
    }
  }
}
</style>
