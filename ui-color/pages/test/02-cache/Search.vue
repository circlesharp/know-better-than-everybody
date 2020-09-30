<template>
  <view>
    <view id="search" class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input
          id="input"
          type="text"
          confirm-type="search"
          v-model="SearchVal"
          :adjust-position="false"
          :placeholder="placeholder"
          placeholder-style="color: #BBB;"
          @focus="focus"
          @confirm="confirm"
        />
      </view>
      <text id="icon" class="iconfont icon-quxiao1" v-if="isFocus && SearchVal" @touchstart="clear"></text>
      <view class="action" v-if="isFocus">
        <button class="btn cu-btn bg-yp-orange shadow-blur radius" @touchstart="search">搜索</button>
      </view>
    </view>
    <view class="mask" v-if="isFocus" @click="blur"></view>
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
    };
  },
  methods:{
    focus() {
      this.isFocus = true;
    },
    blur(e) {
      this.isFocus = false;
    },
    confirm() {
      this.search();
    },
    clear(e) {
      const curTargetId = e.currentTarget && e.currentTarget.id;
      const targetId = e.target && e.target.id;
      console.log(curTargetId, targetId);
      this.SearchVal = '';
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

.mask {
  position: fixed;
  top: 100upx;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0);
}
</style>
