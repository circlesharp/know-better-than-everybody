<template>
  <view class="list bg-white">
    <!-- part 1 -->
    <view class="part1 flex align-center">
      <view class="flex-sub">
        <view class="flex">
          <view
            class="cu-avatar round"
            style="width: 40upx; height: 40upx; margin-right: 10upx;"
            :style="{ backgroundImage: 'url(' + 'icons[terminalType]' + ')' }"
          ></view>
          <view
            class="flex-sub text-bold"
            style="font-size: 28upx; line-height: 40upx; color: #333333;"
          >
            设备名称(这是一个很长很长很长很长的设备名称123456)
          </view>
        </view>
        <view style="color: #999; font-size: 24upx; line-height: 36upx; margin-top: 8upx;">
          上次补货时间：
        </view>
      </view>
      <button class="cu-btn round yp-btn-orange" style="margin-left: 14upx;">补货</button>
    </view>
    
    <!-- part 2 -->
    <view class="part2 flex align-center">
      <view class="flex-sub">
        这是一个地点这是一个地点这是一个地点
      </view>
      <view style="margin-left: 18upx;">
        123456.56km
      </view>
    </view>
    
    <!-- part 3 -->
    <view class="warning-sign orange">
      缺货129种
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
$red: #ef2727;
$orange: #ffaf2e;

.list {
  position: relative;
  border-radius: 12upx;
}
.part1 {
  padding: 36upx 30upx 20upx 30upx;
}
.part2 {
  padding: 24upx 30upx;
  font-size: 22upx;
  line-height: 32upx;
  color: #333;
}
.warning-sign {
  font-size: 26upx;
  line-height: 36upx;
  color: #fff;
  padding: 0 8px 0 8px;
  position: absolute;
  top: -10upx;
  border-radius: 12upx 0 0 0;
  &.red {
    background: $red;
    &::before {
      border-color: $red transparent $red transparent;
    }
  }
  &.orange {
    background: $orange;
    &::before {
      border-color: $orange transparent $orange transparent;
    }
  }
  &::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-width: 18upx 18upx 18upx 0;
    border-style: solid;
    position: absolute;
    top: 0;
    right: -18upx;
  }
}
</style>
