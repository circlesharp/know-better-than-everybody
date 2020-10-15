<template>
  <view>
    <scroll-view scroll-y class="padding" :class="'bg-'+bgColor" style="height: 600upx;">
      <view class="item" v-for="(item, index) in Array(10)" :key="index">
        {{ index }}
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: { 
    idx: Number,
  },
  data() {
    return {
      
    };
  },
  created() {
    console.log('created', this.idx, this.bgColor)
  },
  computed: {
    bgColor() {
      switch (this.idx) {
        case 0:
          return 'red';
        case 1:
          return 'green';
        case 2:
          return 'blue';
      }
    },
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.item {
  height: 200upx;
  border: 1px solid black;
}
</style>
