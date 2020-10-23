<template>
  <view class="page-login">
    <form>
      <view class="cu-form-group">
        <view class="title">登录账号</view>
        <input
          placeholder="请输入账号"
          name="UserName"
          type="text"
          v-model="userInfo.UserName"
          placeholder-class="pla-default"
        ></input>
        <view
          class="foot-clear"
          v-if="userInfo.UserName.length>0"
          @tap="clearInput"
          data-name="UserName"
        >
          <text class="operator_cabinetclose"></text>
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">密码</view>
        <input
          placeholder="请输入密码"
          name="UserPwd"
          :type="PwsShow"
          v-model="userInfo.UserPwd"
          placeholder-class="pla-default"
          :focus="isFocus"
          @focus="focus"
          @blur="blur"
        ></input>
        <view
          class="foot-clear"
          v-if="userInfo.UserPwd.length>0"
          @tap="clearInput"
          data-name="UserPwd"
        >
          <text class="operator_cabinetclose"></text>
        </view>
      </view>
      <view class="to-register">
        <checkbox-group
          class="uni-list"
          @change="checkboxChange"
        >
          <label class="uni-list-cell uni-list-cell-pd">
            <view class="checkbox-box">
              <checkbox
                class="yellow"
                value=""
                :checked="checkbox"
                style="transform:scale(0.7)"
              ></checkbox>
              <text class="text">绑定当前微信</text>
            </view>
          </label>
        </checkbox-group>
        <navigator
          url="../register/register"
          hover-class=""
          class="reg"
        >注册账号</navigator>
      </view>
      <view class="login-submit">
        <button
          class="cu-btn block btn margin-tb-sm lg"
          form-type="submit"
          @tap="getAccountAuth"
          v-if="!isLogin && !checkbox"
          open-type="getUserInfo"
        >
          确认登录</button>
        <button
          class="cu-btn block bg-yellow margin-tb-sm lg"
          form-type="submit"
          open-type="getUserInfo"
          @getuserinfo="wxGetUserInfo"
          v-if="!isLogin && checkbox"
        >
          确认登录</button>
        <button
          class="cu-btn block bg-yellow margin-tb-sm lg"
          v-if="isLogin"
          disabled
        >
          <text class="operator_cabinetloading cuIconfont-spin"></text>
          登录中</button>
      </view>
    </form>
  </view>
</template>

<script>
// import Vue from 'vue';
export default {
  data() {
    return {
      options: {
        noToeknVerify: true,
      },
      userInfo: {
        Code: '',
        UserName: '',
        UserPwd: '',
      },
      checkbox: false,
      isLogin: false,
      isFocus: false,
      isShow: false,
      PwsShow: 'password',
    };
  },
  onShow() {
    this.isLogin = false;
    uni.showShareMenu({
      withShareTicket: true,
    });
  },
  methods: {
    // 授权登录
    loginFormSubmit() {
      const _this = this;
      if (!_this.validUser()) return;
      _this.isLogin = true;
      uni.login({
        provider: 'weixin',
        success(res) {
          _this.userInfo.Code = res.code;
          // 获取用户信息
          uni.getUserInfo({
            provider: 'weixin',
            success() {
              _this.$wxRequest.operators
                .accountLogin(_this.userInfo)
                .then(res => {
                  if (res.error_code !== 0) {
                    _this.$util.showToast(
                      _this.$t(`RESPONSE_MSG.${res.error_msg}`),
                    );
                    _this.isLogin = false;
                    return;
                  }
                  _this.$store.commit('SET_USER_LOGIN', res.data); // 存储用户数据
                  uni.setStorageSync('auth-token', res.data['auth-token']); // 存储auth-token
                  Vue.prototype.$token = res.data['auth-token'];

                  uni.navigateTo({
                    url: '../SelectOperator/SelectOperator',
                  });
                });
            },
          });
        },
        fail(err) {
          _this.isLogin = false;
        },
      });
    },
    // 登录
    getAccountAuth() {
      const params = {
        UserName: this.userInfo.UserName,
        UserPwd: this.userInfo.UserPwd,
      };
      this.$wxRequest.operators.accountAuth(params).then(res => {
        if (res.error_code === 0) {
          this.$store.commit('SET_USER_LOGIN', res.data); // 存储用户数据
          uni.setStorageSync('auth-token', res.data['auth-token']); // 存储auth-token
          Vue.prototype.$token = res.data['auth-token'];
          uni.navigateTo({
            url: '../SelectOperator/SelectOperator',
          });
        } else {
          this.$util.showToast(this.$t(`RESPONSE_MSG.${res.error_msg}`));
          this.isLogin = false;
        }
      });
    },
    wxGetUserInfo(res) {
      if (!res.detail.iv) {
        this.$util.showToast('您取消了授权,登录失败');
        this.isLogin = false;
        return false;
      }
      const obj = this.userInfo;
      obj.rawData = res.detail.rawData;
      obj.signature = res.detail.signature;
      obj.iv = res.detail.iv;
      obj.encryptedData = res.detail.encryptedData;
      this.userInfo = obj;
      this.loginFormSubmit();
    },
    validUser() {
      const result =
        this.userInfo.UserName.trim().length &&
        this.userInfo.UserPwd.trim().length;
      if (!result) {
        this.$util.showToast('请输入账号和密码');
      }
      return result > 0;
    },
    checkboxChange() {
      if (this.checkbox) {
        this.checkbox = false;
      } else {
        this.checkbox = true;
      }
    },
    // 清空输入框
    clearInput(e) {
      const { name } = e.currentTarget.dataset;
      if (name === 'UserName') {
        this.userInfo.UserName = '';
      } else if (name === 'UserPwd') {
        this.userInfo.UserPwd = '';
      }
    },
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$yp-orange: orange;

.ad-image {
  height: 350upx;
  .img {
    height: 100%;
    width: 100%;
  }
}

.to-register {
  display: flex;
  justify-content: space-between;
  padding: 20upx 30upx;
  .reg {
    color: $yp-orange;
  }
  .checkbox-box {
    display: flex;
    align-items: center;
  }
}

.login-submit .cu-btn {
  font-size: 26upx;
  color: #ffffff;
  background-color: $yp-orange;
}
.login-submit .cu-btn[disabled]:not([type]),
.login-submit .cu-btn[disabled][type='default'] {
  background-color: $yp-orange;
}

.pla-default {
  color: #999;
}
.cu-form-group {
  min-height: 90upx;
  .title {
    min-width: calc(4em + 15px);
  }
  .foot-clear {
    font-size: 30upx;
    color: #999;
  }
}
</style>
