<template>
  <view
    class="flex align-center bg-white"
    style="width: 100%; border-bottom: 1upx solid #EEEEEE;"
  >
    <view class="flex align-center" style="padding: 42upx 0; width: 100%;">
      <!-- part 1 before icon -->
      <view class="first-line flex flex-sub align-center">
        <!-- part 1.1 左边名字和日期 -->
        <view class="flex flex-direction flex-sub">
          <!-- part 1.1.1 第一行 名字 -->
          <view class="flex flex-sub">
            <view
              class="cu-avatar round"
              style="width: 36upx; height: 36upx; margin-right: 10upx;"
              :style="{ backgroundImage: 'url(' + icons.cabinet + ')' }"
            ></view>
            <view class="flex-sub text-bold" style="font-size: 28upx; color: #333;">
              {{ item.CabinetVO.Name }}（{{ item.CabinetVO.DeviceCode }}）
            </view>
          </view>
          <!-- part 1.1.2 第二行 日期 -->
          <view class="desc flex">
            <view class="margin-right-lg">
              {{ zhPayType[item.PayType] }}
            </view>
            <view>{{ item.CreateAt | formatData }}</view>
          </view>
        </view>
        
        <!-- part 1.2 右边支付 -->
        <view class="flex flex-direction align-end" style="margin-left: 66upx;">
          <!-- part 1.2.1 支付状态 -->
          <view class="desc">{{ tradeStatus[item.TradeStatus] }}</view>
          <!-- part 1.2.2 支付金额 -->
          <view class="text-price" style="color: #151515; font-size: 32upx;">{{ item.Price | FormatPrice }}</view>
        </view>
      </view>
      
      <!-- part 2 icon -->
      <view class="right-icon">
        <view class="iconfont icon-qianjin_xiayibu_youjiantou_xiayiye"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number,
      default: 1,
    },
    // item: Object,
  },
  data() {
    return {
      item: {"CID":"5f519ebf4405f00010750ef5","OID":"5db266d87bd4810010954b0e","BID":"5d254c16683ead0011492950","UserID":"5ef00a45b0d735000ff5b6a3","OpenID":"o8oq-4tq9GpvYMq9-9akJV050GQw","PayType":201,"PayExtend":{"AppID":"wxccc039bec95172f7","WxWxaUserID":"5f4c4f2c4e861600101c9ec8","ServiceID":"2004000000000693496251943551684","MerchantID":"1470672602","CabinetWxaPayMode":1},"ClientIPAddress":"223.104.63.3","ScenesType":0,"ReceiptNo":"OD200917100813552469","Provider":"XIAOMAI","TradeNo":"4200000768202009171709965656","TradeRawData":{"appid":"wxccc039bec95172f7","mchid":"1470672602","service_id":"2004000000000693496251943551684","out_order_no":"OD200917100813552469","service_introduction":"智慧零售","state":"DONE","state_description":"","total_amount":1,"post_payments":[{"name":"脉动青柠口味瓶装600ml","amount":1,"count":1}],"risk_fund":{"name":"ESTIMATE_ORDER_COST","amount":10000,"description":""},"time_range":{"start_time":"20200917100813","end_time":"20200917100847"},"location":{"start_location":"福海街道"},"attach":"","notify_url":"https://dev-c.yopoint.cc/wx/gateway/cabinet_payscore_notify/5f62c50d619793001058fece","order_id":"1000000000202009171697996890489","need_collection":true,"collection":{"state":"USER_PAID","total_amount":1,"paying_amount":0,"paid_amount":1,"details":[{"amount":1,"paid_type":"NEWTON","paid_time":"20200917100848","transaction_id":"4200000768202009171709965656"}]},"openid":"o8oq-4tq9GpvYMq9-9akJV050GQw"},"PayTime":1600308528,"Products":[{"ProviderProductID":"17006","Qty":1,"BarCode":"6902538004045","Name":"脉动青柠口味瓶装600ml","Price":1,"CostPrice":98,"TotalPrice":1}],"DoorStatus":0,"ServiceStatus":2,"TradeStatus":1,"ProviderOrderCode":"756094290639327232","ProviderOrderData":{"deviceCode":"12684","exParams":"{\"videoUrl\":\"https://xiaomaibox.oss-cn-shanghai.aliyuncs.com/box/video/16354228_top_1600308493188.mp4\"}","goodsList":"[{\"goodsAmount\":0,\"goodsId\":17006,\"goodsNum\":1,\"goodsPrice\":6.5,\"goodsPromotionAmount\":0,\"name\":\"脉动青柠\"}]","nonceStr":"k4gs8lww5nm8rzmoafbw2yq5","orderAmount":"6.5","orderCode":"756094290639327232","productAmount":"6.5","promotionAmount":"0.0","requestSerial":"16354228","sign":"FA0E0EB607B317033FF7095BA2E46A58","timeStamp":"1600308526855","type":"1","userId":"ORDER_OD200917100813552469"},"Price":1,"IsSuspicious":0,"VIResult":[{"Type":2,"Url":"https://xiaomaibox.oss-cn-shanghai.aliyuncs.com/box/video/16354228_top_1600308493188.mp4","Name":""}],"RefundsProducts":[],"RefundsPrice":0,"RefundsRawData":{},"UserRefundsStatus":0,"UserRefundsTime":0,"UserRefundsReason":"","UserRefundsRemarks":"","UserRefundsImageUrl":[],"UserRefundsMobile":"","UserOrderInfo":"","RefundsTime":0,"OpAccountID":"","OpRefundsRemarks":"","DealResultStatus":0,"DealTime":0,"DealRemarks":"","SOpAccountID":"","CreateAt":1600308493,"UpdatedAt":1600308531,"id":"5f62c50d619793001058fece","CabinetVO":{"Name":"二楼","DeviceCode":"二楼"},"UserVO":{"Platform":1,"OpenID":"ogg_-t3aUwtbUa2SYuzZ5eFqM2mE","Scope":"userinfo","LastIPAddress":"223.104.63.3","MemberID":"5ef809f0447cc0000f4ba0d4","NickName":"张熙","Sex":1,"Province":"广东","City":"深圳","ImageUrl":"http://thirdwx.qlogo.cn/mmopen/vi_32/AhaSicobIfA85ZUYjOZ26AbSoPuywCIicOr5V1eXs03UHlUF0w9dueuH0PFAlm9QfGah0rzEtdssCghSQYpJPU5w/132","RawData":{"openid":"ogg_-t3aUwtbUa2SYuzZ5eFqM2mE","nickname":"张熙","sex":1,"language":"zh_CN","city":"深圳","province":"广东","country":"中国","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/AhaSicobIfA85ZUYjOZ26AbSoPuywCIicOr5V1eXs03UHlUF0w9dueuH0PFAlm9QfGah0rzEtdssCghSQYpJPU5w/132","privilege":[],"unionid":"oz69Q02fRXtw4hPT6gaapY4qOvn4"},"isFirstFlash":true,"LastLoginTime":1600308193,"CreateAt":1592789573,"UpdatedAt":1600308193,"id":"5ef00a45b0d735000ff5b6a3","MemberVO":{"Mobile":"13715352279"}}},
      icons: {
        cabinet: 11,
      },
      zhPayType: {
        0: '未知',
        1: '微信支付',
        2: '支付宝支付',
        201: '品牌商代收',
      },
      tradeStatus: {
        0: '等待支付',
        1: '支付成功',
        2: '退款成功',
        '-1': '未购物',
      },
    };
  },
  created() {
    console.log(this.item)
  }
};
</script>

<style>
  .desc {
    color: #999;
    font-size: 24upx;
    padding: 5upx 0;
  }
  .right-icon {
    margin-left: 24upx;
    color: #aaa;
    font-size: 22upx;
  }
</style>
