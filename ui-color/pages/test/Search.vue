<template>
  <view id="search" class="cu-bar search bg-white">
    <view class="search-form">
      <text class="cuIcon-search"></text>
      <input
        type="text"
        confirm-type="search"
        v-model="SearchVal"
        :focus="test"
        :adjust-position="false"
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
        @confirm="confirm"
      />
    </view>
    <text class="iconfont icon-quxiao1" v-if="isFocus" @touchstart="clear"></text>
    <view class="action" v-if="isFocus">
      <button class="btn cu-btn bg-yp-orange shadow-blur radius" @touchstart.stop="search">搜索</button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入设备名称',
    }
  },
  data() {
    return {
      SearchVal: '',
      isFocus: false,
      test: false,
    };
  },
  methods:{
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    },
    confirm() {
      this.search();
    },
    clear() {
      this.SearchVal = '';
      this.test=true;
    },
    search() {
      this.$emit('on-search', this.SearchVal);
    },
  }
}
</script>

<style lang="scss">
.search {
  position: relative;
}
.search-form {
  border-radius: 12upx;
  font-size: 40upx;
  color: #BBBBBB;
  .cuIcon-search {
    font-size: 36upx;
    &.focus {
      
    }
  }

}
.icon-quxiao1 {
  position: absolute;
  right: 180upx;
  padding: 0 10upx;
  font-size: 36upx;
}
.btn {
  border-radius: 12upx;
}
</style>
