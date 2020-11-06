<template>
  <view class="padding">
    
    <Card class="card" title="申请退款信息">
      <view class="wrap-refund-info">
        <view class="item" v-for="item in refundInfo" :key="item.title">
          <view class="title">{{ item.title }}</view>
          <view class="img" v-if="item.type === 'img'">
            <image v-if="item.img" :src="item.img" @tap="viewImage(item.img)"></image>
            <view v-else>未提交图片</view>
          </view>
          <view class="content" v-if="item.type === 'content'">{{item.content}}</view>
        </view>
      </view>
    </Card>
    
    <Card class="card" title="订单视频信息" 
      isExtra
      extraText="+添加商品"
    >
      <view class="wrap-video">
        <video class="video" v-if="!orderDetail.VIResult[0]" :src="orderDetail.VIResult[0].Url"></video>
        <view v-else>暂无视频</view>
      </view>
    </Card>
    
    <Card class="card" title="退款审核处理意见">
      <view class="wrap-produc">
        <block v-for="(item, idx) in RefundsProducts" :key="index">
          <List class="list" :item="item" :type="type" @realQtyChange="onRealQtyChange($event, idx)" />
        </block>
      </view>
    </Card>
    
    <Card class="card wrap-remark" title="处理意见">
      <view v-if="type === 0">
        <textarea
          v-model="remarks"
          placeholder-style="color: #d6d6d6;"
          placeholder="请填写您的处理意见"
        />
      </view>
      <view v-else>
        {{ remarks || '未填写' }}
      </view>
    </Card>
  </view>
</template>

<script>
import mock from './refund_detail_mock.js';
import Card from './Card.vue';
import List from './SuspiciousList.vue';

export default {
  components: { Card, List },
  data() {
    return {
      orderDetail: mock.orderDetail,
      RefundsProducts: mock.RefundsProducts,
      type: 0, // 0: 可修改 ; 1: 不可修改
      remarks: '',
    };
  },
  created() {
    console.log(mock);
  },
  computed: {
    refundInfo() {
      const translate = {
        REFUNDS_REASON_PRODUCT_VI_MORE: '多识别商品',
        REFUNDS_REASON_PRODUCT_EXPIRED: '商品过期',
        REFUNDS_REASON_PRODUCT_NOT_MATCH: '识别错商品',
      };
      return [
        { title: '申请原因', type: 'content', content: translate[this.orderDetail.UserRefundsReason] },
        { title: '联系电话', type: 'content', content: this.orderDetail.UserRefundsMobile },
        { title: '申请图片', type: 'img', img: this.orderDetail.UserRefundsImageUrl[0] },
        { title: '申请说明', type: 'content', content: this.orderDetail.UserRefundsRemarks || '未填写说明' },
      ];
    }
  },
  methods: {
    viewImage(img) {
      console.log(img);
    },
    onRealQtyChange(qty, idx) {
      this.RefundsProducts[idx].RealQty = qty;
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  & + .card {
    margin-top: 20upx;
  }
}

.wrap-refund-info {
  .item {
    display: flex;
    align-items: center;
    & + .item {
      margin-top: 20upx;
    }
    .title {
      color: #999;
      margin-right: 40upx;
    }
    .img {
      image {
        width: 80upx;
        height: 80upx;
      }
    }
  }
}

.wrap-video {
  .video {
    width: 100%;
    height: 360upx;
  }
  .empty-text {
    text-align: center;
  }
}

.wrap-product {
  .list + .list {
    margin-top: 50upx;
  }
}

.wrap-remark {
  textarea {
    padding: 10upx;
    width: 100%;
    height: 200upx;
    border: 2upx solid #EEEEEE;
  }
}
</style>
