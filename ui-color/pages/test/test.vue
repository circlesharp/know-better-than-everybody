<template>
  <view>
    <view>
      <Search @on-search="search"/>
    </view>
    <view class="list-wrap">
      <view class="cate" v-for="(cate, cateName) in productCategories" :key="cateName">
        <view class="title">{{ cateName }}</view>
        <block v-for="item in cate" :key="item.BarCode">
          <view class="item">
            <List :item="item" @on-select="onSelect" />
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.list-wrap {
  background-color: #fff;
  margin-top: 20upx;
  padding: 0 24upx;
  .cate {
    padding-top: 20upx;
    .title {
      color: #999999;
      font-size: 26upx;
      line-height: 36upx;
    }
    .item {
      padding: 20upx 0;
    }
  }
  .cate+.cate {
    border-top: 2upx solid #eee;
  }
}
</style>

<script>
import mock from './mock/search-list.mock.js';
import List from './List.vue';
import Search from './Search.vue';

export default {
  components: { Search, List },
  data() {
    return {
      ProductList: mock,
    };
  },
  computed: {
    reducedProducts() {
      return this.ProductList.map(item => {
        return {
          Name: item.ProductVO.Name,
          BarCode: item.BarCode,
          ImageFixWidthUrl: item.ProductVO.ImageFixWidthUrl,
          ImageUrl: item.ProductVO.ImageUrl,
          CategoryName: item.CategoryVO.Name,
          CategoryID: item.CategoryVO.id,
          ParentCategoryID: item.ParentCategoryVO.id,
          ParentCategoryName: item.ParentCategoryVO.Name,
        };
      });
    },
    productCategories() {
      const rst = {};
      this.reducedProducts.forEach(item => {
        const category = item.CategoryName;
        if (!rst[category]) rst[category] = [];
        rst[category].push(item);
      });
      return rst;
    }
  },
  created() {
    console.log(this.productCategories);
  },
  methods: {
    search(keyword) {
      console.log(keyword)
    }
  }
}
</script>
