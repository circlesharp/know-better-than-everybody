<template>
  <view>
    <List :item="modelings[0]" />
  </view>
</template>

<script>
import mock from './mock.js';
import List from './List.vue';

export default {
  components: { List },
  data() {
    return {
      modelings: mock,
    };
  },
  created() {
    console.log(this.modelings);
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
</style>
