<template>
  <view class="wrap-list">
    <view class="wrap-main">
      <view class="wrap-name">
        <view>logo</view>
        <view>{{ item.Name }}</view>
        <view v-if="item.DeviceCode">（{{ item.DeviceCode }}）</view>
      </view>
      <view class="wrap-tag">
        <view class="tag" :class="onlineStatus.class">{{ onlineStatus.text }}</view>
        <view class="tag" :class="sellStatus.class">{{ sellStatus.text }}</view>
      </view>
      <view class="wrap-des">
        <view>型号：</view>
        <view>类型：</view>
      </view>
      <view class="wrap-man">
        补货员：{{ item.ReplenisherAccountVO.TrueName || '' }}
      </view>
    </view>
    <view class="iconfont icon-qianjin_xiayibu_youjiantou_xiayiye"></view>
  </view>
</template>

<script>
export default {
  components: {  },
  data() {
    return {
      item: {"Code":"999203961590","OID":"5db266d87bd4810010954b0e","BID":"5d254c16683ead0011492950","ProviderSerialNumber":"23064","ActiveAt":1599203987,"SellStatus":1,"LastReplenishTime":0,"OnlineStatus":0,"IndustryParentID":"591fcdb69dc38f0f00f24a16","IndustryParentName":"公司企业工厂","IndustryID":"591fcdb65fa45c0f00b4ec13","IndustryName":"零售类公司","Name":"嗨便利","DeviceCode":"嗨便利","ReplenisherAccountID":"5eeacd7535c873000f20fec2","Address":"福永","Location":[113.794833,22.692771],"ExplainLocation":"广东省深圳市宝安区松福大道","Province":"广东省","City":"深圳市","District":"宝安区","PriceRuleID":"","BrandPriceRuleID":"","id":"5f51ea194405f00010750f06","ReplenisherAccountVO":{"TrueName":"超管谭荣钊(wh)"},"PriceRuleVO":false,"QRCodeUrl":"https://dev-c.yopoint.cc/cabinet/wxccc039bec95172f7?CID=5f51ea194405f00010750f06"},
    };
  },
  computed: {
    onlineStatus() {
      switch (this.item.OnlineStatus) {
        case 0: return { text: '离线', class: 'grey' };
        case 1: return { text: '在线', class: 'orange' };
        default:
          console.log('异常 onlineStatus', this.item.OnlineStatus)
          return { text: '', class: 'grey' };
      }
    },
    sellStatus() {
      switch (this.item.SellStatus) {
        case 0: return { text: '停止售货', class: 'grey' };
        case 1: return { text: '正常售货', class: 'orange' };
        case 2: return { text: '待投放', class: 'black' };
        default:
          console.log('异常 sellStatus', this.item.SellStatus)
          return { text: '', class: 'grey' };
      }
    },
  },
  created() {
    console.log(this.item);
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
$yp-orange: red;
$yp-orange-light: #FFF4E2;

.wrap-list {
  padding: 30upx;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12upx;
}
.iconfont {
  color: #666;
}
.wrap-main {
  flex: 1;
  font-size: 24upx;
  color: #333333;
  line-height: 36upx;
  .wrap-name {
    margin-bottom: 8upx;
    display: flex;
    font-size: 28upx;
    line-height: 44upx;
    font-weight: 500;
  }
  .wrap-tag {
    display: flex;
    .tag {
      margin-right: 8upx;
      margin-bottom: 24upx;
      padding: 0 16upx;
      font-size: 22upx;
      line-height: 40upx;
      color: $yp-orange;
      background-color: $yp-orange-light;
      border-radius: 40upx;
    }
    .tag.grey {
      color: #666;
      background-color: #F7F7F7;
    }
    .tag.black {
      color: #fff;
      background-color: #999;
    }
  }
  .wrap-des {
    margin-bottom: 4upx;
    display: flex;
  }
}
</style>
