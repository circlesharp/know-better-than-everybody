<template>
  <view>
    <view class="wrap-operator">
      <view class="wrap-left">
        <view class="add-goods" @click="showModal">
          <view class="cuIcon-roundclose"></view>
          添加商品
        </view>
        <view class="total-num">
          提货数量：{{ totalNum }} 个
        </view>
      </view>
      <view class="wrap-right" @click="onSubmit">
        提交
      </view>
    </view>
    
    <ModalWrapper
      ref="modalWrapper"
      @selectGoods="onSelectGoods"
    />
  </view>
</template>

<script>
import ModalWrapper from './ModalWrapper.vue';

export default {
  components: { ModalWrapper },
  props: { 
    totalNum: Number,
  },
  data() {
    return {
      
    };
  },
  methods: {
    showModal() {
      this.$refs.modalWrapper.showModal();
    },
    onSelectGoods(goods) {
      this.$emit('selectGoods', goods);
    },
    onSubmit() {
      this.$emit('submit');
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap-operator {
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #FFFFFF;
  height: 88upx;
  line-height: 88upx;
  border-radius: 88upx;
  .wrap-left {
    display: flex;
    align-items: center;
    flex: 1;
    background-color: #47403C;
  }
  .wrap-right {
    background-color: #FFAF2E;
    padding: 0 52upx;
  }
}
.add-goods {
  display: flex;
  align-items: center;
  flex: 1;
  .cuIcon-roundclose {
    margin-left: 26upx;
    margin-right: 10upx;
    transform: rotate(45deg);
  }
}
.total-num {
  padding-right: 20upx;
}
</style>
