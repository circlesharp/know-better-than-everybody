<template>
  <view>
    <!-- tabbar -->
    <view
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
    
    <!-- select depot -->
    <view style="height: 80upx;"></view>
    
    <!-- main part -->
    <view v-if="currentTab === 0">
      <ListWrapper :idx="0" :key="0"/>
    </view>
    <view v-if="currentTab === 1">
      <ListWrapper :idx="1"/>
    </view>
    <view v-if="currentTab === 2">
      <ListWrapper :idx="2" />
    </view>
    <view v-if="currentTab === 3">
      <ListWrapper :idx="3" />
    </view>
    
  </view>
</template>

<script>
import mock from './pickupRecord.js';
import ListWrapper from './ListWrapper.vue';

export default {
  components: { ListWrapper },
  data() {
    return {
      tabArr: ['待提货', '待审核', '已提货', '已拒绝'],
      currentTab: 0,
    };
  },
  methods: {
    onTabSelect(idx) {
      this.currentTab = idx;
    }
  },
}
</script>

<style lang="scss" scoped>
$yp-orange: #FFAF2E;

.tabbar-item {
  /* https://cubic-bezier.com/, http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html */
  transition: 0.1s;
  height: 88upx;
  line-height: 88upx;
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
</style>
