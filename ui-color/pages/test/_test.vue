<template>
  <view class="refund-detail">
    <view>
      <view class="wrap-card">
        <Card title="申请退款信息">
          <view class="wrap-refund-info">
            <view class="item" v-for="item in refundInfo" :key="item.title">
              <view class="title">{{ item.title }}</view>
              <view class="img" v-if="item.type === 'img'">
                <image
                  v-if="item.img"
                  :src="item.img"
                  @tap="viewImage(item.img)"
                ></image>
                <view v-else>未提交图片</view>
              </view>
              <view class="content" v-if="item.type === 'content'">{{
                item.content
              }}</view>
            </view>
          </view>
        </Card>
      </view>

      <view class="wrap-card">
        <Card title="订单视频信息">
          <view class="wrap-video">
            <video
              class="video"
              v-if="orderDetail.VIResult[0]"
              :src="orderDetail.VIResult[0].Url"
            ></video>
            <view v-else>暂无视频</view>
          </view>
        </Card>
      </view>

      <view class="wrap-card">
        <Card title="退款审核处理意见">
          <view class="wrap-product">
            <view
              class="list"
              v-for="(item, idx) in RefundsProducts"
              :key="idx"
            >
              <List
                :item="item"
                :type="type"
                @realQtyChange="onRealQtyChange($event, idx)"
              />
            </view>
          </view>
        </Card>
      </view>

      <view class="wrap-card wrap-remark">
        <Card title="处理意见">
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
    </view>

    <view class="wrap-btns" v-if="type === 0">
      <Btns
        textCancel="拒绝退款"
        textOk="同意退款"
        @onOk="handelSubmit(-1)"
        @onCancel="handelSubmit(2)"
      />
    </view>

    <SimpleModal ref="modal" />
  </view>
</template>

<script>
import Btns from '@/components/BottomFixedButton/BottomFixedBtnAbreast';
import Card from './components/Card';
import List from './components/RefundList';

export default {
  name: 'refund-detail',
  components: { Btns, Card, List },
  data() {
    return {
      id: '',
      type: 0, // 0 待处理 1 已处理
      orderDetail: {},
      RefundsProducts: [],
      remarks: '',
    };
  },
  computed: {
    refundInfo() {
      const translate = {
        REFUNDS_REASON_PRODUCT_VI_MORE: '多识别商品',
        REFUNDS_REASON_PRODUCT_EXPIRED: '商品过期',
        REFUNDS_REASON_PRODUCT_NOT_MATCH: '识别错商品',
      };
      return [
        {
          title: '申请原因',
          type: 'content',
          content: translate[this.orderDetail.UserRefundsReason],
        },
        {
          title: '联系电话',
          type: 'content',
          content: this.orderDetail.UserRefundsMobile,
        },
        {
          title: '申请图片',
          type: 'img',
          img: this.orderDetail.UserRefundsImageUrl[0],
        },
        {
          title: '申请说明',
          type: 'content',
          content: this.orderDetail.UserRefundsRemarks || '未填写说明',
        },
      ];
    },
  },
  onLoad(e) {
    const { id, type } = e;
    this.id = id;
    this.type = type;
    this.orderGetDetails(id);
  },
  methods: {
    // 获取订单详情
    orderGetDetails(id) {
      this.$wxRequest.cabinet.orderGetDetails({ id }).then(res => {
        if (res.error_code === 0) {
          const { data } = res;
          uni.setNavigationBarTitle({
            title: data.ReceiptNo,
          });
          this.orderDetail = data;
          const { Products } = data;
          const { RefundsProducts } = data;
          RefundsProducts.forEach(item => {
            const goods = Products.find(n => n.BarCode === item.BarCode);
            item.QtyBefore = goods.Qty;
            if (parseInt(this.type, 10) === 0) {
              item.RealQty = item.Qty;
            }
            return item;
          });
          this.RefundsProducts = RefundsProducts;
          this.remarks = data.OpRefundsRemarks;
        }
      });
    },
    handelSubmit(status) {
      const params = {
        id: this.orderDetail.id,
        UserRefundsStatus: status,
        RefundsProducts: this.RefundsProducts,
        OpRefundsRemarks: this.remarks,
      };
      this.$wxRequest.cabinet.refundsUpdate(params).then(res => {
        if (res.error_code === 0) {
          this.showSimpleModal({
            content: '提交成功',
            confirm: uni.navigateBack,
          });
        } else {
          this.showSimpleModal(this.$t(`RESPONSE_MSG.${res.error_msg}`));
        }
      });
    },
    // 图片查看
    viewImage(imgList) {
      uni.previewImage({
        urls: [imgList],
        current: imgList,
      });
    },
    // 同步input输入
    onRealQtyChange(qty, idx) {
      this.RefundsProducts[idx].RealQty = qty;
    },
  },
};
</script>

<style lang="scss" scoped>
.refund-detail {
  padding: 20upx 24upx 150upx 24upx;
}

.wrap-card {
  & + .wrap-card {
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
    border: 2upx solid #eeeeee;
  }
}
</style>
