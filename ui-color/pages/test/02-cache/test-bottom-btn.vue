<template>
  <view
    class="btn-box flex"
    style="margin: 0 56upx; z-index: 99; position: fixed; left: 0; right: 0; bottom: 30upx;"
   >
    <button
      class="cu-btn round flex-sub yp-btn-orange-line"
      style="margin-right: 70upx;"
      @click="cancel"
    >
      重置
    </button>
    <button class="cu-btn round flex-sub yp-btn-orange" @click="save">
      保存
    </button>
  </view>
</template>

<script>
const mock = {"Row":1,"Col":2,"BarCode":"6902538004045","ProviderProductID":"17006","ProductVO":{"Name":"脉动青柠口味瓶装600ml","ImageUrl":"https://res.yopoint.com/product/20190506/48dea89ca7e1fab3d5d370621a0a7e2b.png","ImageFixWidthUrl":"https://res.yopoint.com/product/20190506/8b876b7b4025f2b25698e3d4638d513a.png"}};

export default {
  props: {
    goods: {
      type: Object,
      default() {
        return mock;
      },
    },
    row: {
      type: Number,
      default: 0,
    },
    col: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    pic() {
      const img = this.goods.ProductVO && this.goods.ProductVO.ImageFixWidthUrl;
      if (!img) return '../../../static/logo.png';
      return `${img}?x-oss-process=image/resize,h_60`;
    },
    name() {
      const name = this.goods.ProductVO && this.goods.ProductVO.Name;
      if (!name) return '暂无配置';
      return name;
    }
  },
}
  
</script>

<style lang="scss" scoped>
$yp-orange: #FFAF2E;
$yp-black: #333;
$yp-grey: #999;
$yp-background: #f1f1f1;

.btn-box>button {
  height: 90upx !important;
  font-size: 30upx !important;
}

.top-btn {
  width: 100%;
  background-color: red;
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.list {
  color: $yp-black;
}

.name {
  width: 320upx;
  height: 64upx;
  font-size: 28upx;
  line-height: 32upx;
  
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.desc {
  color: $yp-grey;
  font-size: 24upx;
}

.btn-group>.cu-btn {
  font-size: 24upx !important;
  padding: 8upx 38upx !important;
}

</style>
