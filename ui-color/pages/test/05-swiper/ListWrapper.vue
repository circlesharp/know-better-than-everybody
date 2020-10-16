<template>
  <view>
    <view
      class="list"
      v-for="item in recordLists[idx]"
      :key="item.ReceiptNo"
    >
      <List
        :item="item"
        @on-click="onSelectRecord"
      />
    </view>
  </view>
</template>

<script>
import List from './List.vue';
import mock from './pickupRecord.js';

export default {
  components: { List },
  props: {
    idx: Number,
  },
  data() {
    return {
      recordLists: [
        mock.slice(0, 2),
        mock.slice(2, 5),
        mock.slice(5, 7),
        mock.slice(7),
      ],
    };
  },
  created() {
    console.log(this.recordList);
  },
  methods: {
    onSelectRecord(item) {
      console.log(item, 2233)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
