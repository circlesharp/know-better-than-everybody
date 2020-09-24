<template>
  <view>
    
    <!-- part 1 video -->
    <view class="card">
      <view class="title">订单视频</view>
      <view class="content">
        <view class="video-info-box">
          <block v-if="videoUrl">
            <video class="video" :src="videoUrl"></video>
          </block>
          <view class="text-sm text-center text-gray" v-else>暂无视频</view>
        </view>
      </view>
    </view>
    
    <!-- part 2 order -->
    <view class="card">
      <view class="title">订单信息</view>
      <view class="content">
        <view class="flex item-text" v-for="(item, index) in Order" :key="index">
          <view class="desc flex-sub">{{ item.title }}</view>
          <view class="">{{ item.value }}</view>
        </view>
      </view>
    </view>
    
    <!-- part 3 goods -->
    <view class="card">
      <view class="title">订单明细</view>
      <view class="content">
        view
          class="item-list"
          v-for="(item, index) in OrderDetails"
          :key="index"
        >
          <List
            :ImageFixWidthUrl="item.ImageFixWidthUrl"
            :Name="item.Name"
            :Qty="item.Qty"
            :TotalPrice="item.TotalPrice"
          />
        </view>
        <view class="text-sm text-center text-gray" v-if="OrderDetails.length === 0">无订单明细</view>
      </view>
    </view>
    
  </view>
</template>

<style>
.card {
  margin: 20upx 24upx 0 24upx;
  padding: 30upx;
  padding-top: 0;
  border-radius: 12upx;
  background-color: #FFFFFF;
}
.card > .title{
  margin-bottom: 20upx;
  padding: 20upx 0;
  border-bottom: 2upx solid #eee;
  color: #333;
  font-size: 30upx;
  line-height: 42upx;
}
.card > .content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 26upx;
  line-height: 36upx;
  color: #333;
}
.card > .content .item-text + .item-text {
  margin-top: 24upx;
}
.card > .content .item-list + .item-list {
  margin-top: 20upx;
}
.card > .content .desc {
  color: #999999;
}

.video-info-box {
  text-align: center;
}
.video-info-box .video {
  width: 642upx;
  height: 360upx;
}
</style>

<script>
import mock from './mock.js';
import List from './List';

export default {
  components: { List },
  data() {
    return {
      zhPayType: {
        0: '未知',
        1: '微信支付',
        2: '支付宝支付',
        201: '品牌商代收',
      },
      Order: [
        {
          title: '订单号：',
          value: '',
        },
        {
          title: '支付渠道流水号：',
          value: '',
        },
        {
          title: '支付方式：',
          value: '',
        },
        {
          title: '支付状态：',
          value: '',
        },
        {
          title: '消费者手机号：',
          value: '',
        },
        {
          title: '订单总价：',
          value: '',
        },
      ],
      OrderDetails: null,
      tradeStatus: {
        0: '等待支付',
        1: '支付成功',
        2: '退款成功',
        '-1': '未购物',
      },
      videoUrl: '',
    };
  },
  onLoad(e) {
    const { id } = e;
    this.orderGetDetails(id);
  },
  filters: {
    FormatPrice(value) {
      if (value) {
        return (+(value || 0) / 100).toFixed(2);
      }
      return (0.0).toFixed(2);
    },
  },
  methods: {
    orderGetDetails(id) {
      const Data = mock;
      console.log(Data)
      this.Order[0].value = Data.ReceiptNo;
      this.Order[1].value = Data.TradeNo;
      this.Order[2].value = this.zhPayType[Data.PayType];
      this.Order[3].value = this.tradeStatus[Data.TradeStatus];
      this.Order[4].value = Data.UserVO.MemberVO && Data.UserVO.MemberVO.Mobile;
      this.Order[5].value = `${Data.Price / 100} 元`;
      this.videoUrl = Data.VIResult[0] && Data.VIResult[0].Url;
      this.OrderDetails = Data.Products;
    },
    close() {
      uni.navigateBack();
    },
  },
};
</script>
