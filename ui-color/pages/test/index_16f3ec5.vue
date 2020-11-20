<template>
  <view class="tabbar-index">
    <operator></operator>
    <!-- 补货页 -->
    <replenish ref="replenish" v-if="PageCur == 'replenish'"></replenish>
    <!-- 管理页 -->
    <manage v-if="PageCur == 'manage'"></manage>
    <!-- 数据页 -->
    <page-data v-if="PageCur == 'data'" :userInfo="userInfo"></page-data>
    <!-- 系统页 -->
    <system v-if="PageCur == 'system'"></system>
    <view class="cu-bar tabbar bg-white shadow foot">
      <!-- 补货 -->
      <view
        class="action"
        @click="NavChange"
        data-cur="replenish"
        v-if="isReplShow"
      >
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-buhuo-xuanze"
            :class="
              PageCur == 'replenish' ? 'text-yellow ' : 'text-bold text-gray'
            "
          ></text>
        </view>
        <view
          class="action-label"
          :class="PageCur == 'replenish' ? 'text-yellow' : 'text-gray'"
        >
          补货
        </view>
      </view>
      <!-- 管理 -->
      <view
        class="action"
        @click="NavChange"
        data-cur="manage"
        v-if="userInfo.BizRole === 99"
      >
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-shebei"
            :class="PageCur == 'manage' ? 'text-yellow' : 'text-bold text-gray'"
          ></text>
        </view>
        <view
          class="action-label"
          :class="PageCur == 'manage' ? 'text-yellow' : 'text-gray'"
          >管理</view
        >
      </view>
      <!-- 数据 -->
      <view class="action" @click="NavChange" data-cur="data" v-if="isDataShow">
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-tongji-xuanze"
            :class="PageCur == 'data' ? 'text-yellow' : 'text-bold text-gray'"
          ></text>
        </view>
        <view
          class="action-label"
          :class="PageCur == 'data' ? 'text-yellow' : 'text-gray'"
        >
          数据
        </view>
      </view>
      <!-- 系统 -->
      <view class="action" @click="NavChange" data-cur="system">
        <view class="cuIcon-cu-image">
          <text
            class="iconfont icon-xitong-xuanze"
            :class="PageCur == 'system' ? 'text-yellow' : 'text-bold text-gray'"
          ></text>
        </view>
        <view
          class="action-label"
          :class="PageCur == 'system' ? 'text-yellow' : 'text-gray'"
        >
          系统
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
import operator from '@/components/CurrentOperator/CurrentOperator';
import replenish from '@/pages/replenish/replenish';
import manage from '@/pages/manage/manage';
import pageData from '@/pages/data/data';
import system from '@/pages/system/system';

export default {
  components: {
    operator,
    replenish,
    manage,
    pageData,
    system,
  },
  data() {
    return {
      PageCur: 'replenish',
      operator: null,
      isShow: false,
    };
  },
  computed: {
    ...mapState(['userInfo', 'code']),
    isDataShow() {
      // 99=超级管理员 1=补货员 2=维修人员 3=合作伙伴
      const isReplenisherEnable = this.userInfo.ReplenisherDataSubscribe;
      return (
        this.userInfo.BizRole === 99 ||
        this.userInfo.BizRole === 3 ||
        isReplenisherEnable
      );
    },
    isReplShow() {
      return this.userInfo.BizRole === 99 || this.userInfo.BizRole === 1;
    },
  },
  onLoad(option) {
    const page = option.type;

    // 通过URL进入激活设备页
    if (option && option.q) {
      const scanUrl = decodeURIComponent(option.q);
      if (scanUrl.indexOf('?') === -1) {
        uni.showModal({
          title: '提示',
          content: '错误: 设备二维码不正确',
          showCancel: false,
        });
        return;
      }
      const { code } = this.$util.parseQueryString(scanUrl);
      this.$store.commit('setCode', code);
    }
    if (page) {
      this.PageCur = page;
    }
    uni.showShareMenu({
      withShareTicket: true,
    });

    // 获取视觉识别费剩余次数预警
    this.getVisualIdentityWarning();
  },
  onShow() {
    // 关闭返回首页按钮
    uni.hideHomeButton();
    this.isShow = false;
    this.getOperators();
    this.getConfig();
    // 判断是否有Code值
    if (this.code && this.userInfo && this.userInfo.OperatorsName) {
      uni.navigateTo({
        url: `../ActiveFacility/ActiveFacility?code=${this.code}`,
      });
      return;
    }
    // 合作伙伴默认选中 data tag
    if (this.userInfo.BizRole === 3) {
      this.PageCur = 'data';
    }

    // 丑陋的路由卫士, 用于通知子组件onShow
    this.uglyRouteGuard();

    // trzmogai
    // this.mogai();
  },
  methods: {
    // trzmogai
    mogai() {
      const url_ReplenishOn =
        '../ReplenishOn/ReplenishOn?cid=5dafb79b75962c0010578120&name=二楼&code=二楼';
      const url_ReplenishCabinetDetail =
        '../ReplenishCabinetDetail/ReplenishCabinetDetail?CID=5dafb79b75962c0010578120&Code=971796950239&Name=二楼&DeviceCode=二楼';
      uni.navigateTo({ url: url_ReplenishCabinetDetail });
    },
    // 获取视觉识别费剩余次数预警
    getVisualIdentityWarning() {
      this.$wxRequest.cabinet.visualIdentityWarning().then(({ data }) => {
        if (data.Warning) {
          const alertText = `您的视觉识别费，已经不足${data.WarningCount}次，预计一天后将会无法进行售卖，请在运营商后台【财务中心-费用中心-自取柜识别费】模块及时充值，以免影响您的柜子使用。`;
          uni.showModal({
            title: '提示',
            content: alertText,
            showCancel: false,
          });
        }
      });
    },
    // 获取运营商信息
    getOperators() {
      this.$store.dispatch('loadOperatorVO').then(data => {
        this.operatorVO = data;
        this.$store.commit('setOperatorVO', data);
      });
    },
    // 获取运营商配置信息
    getConfig() {
      this.$wxRequest.operators.config().then(res => {
        // 提示没有权限跳转运营商选择页
        // if (res.error_msg === 'ERR_PERMISSION_DENY' || res.error_msg === 'ERR_LOGIN_TIMEOUT_OR_INVALID') {}
        if (res.error_code === 0) {
          this.$store.commit('setOperatorConfig', res.data);
          this.operator = res.data;
        } else {
          uni.reLaunch({
            url: '../SelectOperator/SelectOperator',
          });
          return;
        }
      });
    },
    // 补货员访问管理页权限限制
    NavChange(e) {
      const type = e.currentTarget.dataset.cur;
      this.PageCur = type;
    },
    uglyRouteGuard() {
      if (this.PageCur === 'replenish') {
        this.$refs.replenish.componentOnShow();
      }
    },
  },
};
</script>

<style>
/* #ifdef MP-WEIXIN || MP-ALIPAY */
.tabbar-index {
  padding-top: 74upx;
}
/* #endif */
/* #ifdef H5 */
.tabbar-index {
  padding-top: 80upx;
}
/* #endif */
.content {
  text-align: center;
  height: 400upx;
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
.action-label {
  margin-top: 8upx;
}
.cuIcon-cu-image text {
  font-size: 50upx;
  /* color: #8f8f94; */
}
</style>
