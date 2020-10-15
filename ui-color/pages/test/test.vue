<template>
  <view>
    <!-- tabbar -->
    <view
      id="tabbar"
      class="padding-lr-lg flex justify-between align-center bg-white"
      style="height: 100%; font-size: 28upx; color: #333;"
    >
      <view
        v-for="(item, idx) in tabArr"
        :key="idx"
        class="tabbar-item"
        :class="[{ active: idx === currentTab }]"
        @click="onTabSelect(idx)"
      >
        {{ item }}
      </view>
    </view>
    
    <!-- content -->
    <swiper class="wrap-swiper" :current="currentTab" :duration="500" @change="onSwiperChange">
      <swiper-item>
        <testComp :idx="0"></testComp>
      </swiper-item>
      <swiper-item>
        <testComp :idx="1"></testComp>
      </swiper-item>
      <swiper-item>
        <testComp :idx="2"></testComp>
      </swiper-item>
    </swiper>
    
    test
    
  </view>
</template>

<script>
import testComp from './testComp.vue';
export default {
  components: { testComp },
  data() {
    return {
      tabArr: ['待审核', '已审核', '已拒绝'],
      currentTab: 0,
    };
  },
  methods: {
    onTabSelect(idx) {
      this.currentTab = idx;
    },
    onSwiperChange(e) {
      const idx = e.detail && e.detail.current;
      this.currentTab = idx;
    }
  },
}
</script>

<style lang="scss" scoped>
$yp-orange: orange;
$yp-red: red;
.tabbar-item {
  /* https://cubic-bezier.com/, http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html */
  transition: 0.1s;
  height: 88upx;
  line-height: 88upx;
  .badge {
    position: absolute;
    top: 8upx;
    right: -18upx;
    background-color: $yp-red;
    border-radius: 100%;
    color: #fff;
    font-size: 22upx;
    line-height: 28upx;
    text-align: center;
    width: 28upx;
    height: 28upx;
  }
}
.active {
  position: relative;
  display: block;
  color: $yp-orange;
}
.active:after {
  content: '';
  position: absolute;
  left: 0%;
  bottom: 0upx;
  width: 100%;
  height: 8upx;
  border-radius: 10upx;
  background-color: $yp-orange;
}

.wrap-swiper {
  height: 600upx;
}
</style>
