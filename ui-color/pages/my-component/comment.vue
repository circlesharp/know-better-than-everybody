<template>
  <view
    class="solid"
    style="background: rgba(196, 188, 186, .4);"
  >
    <h4 class="text-lg text-orange">comment:</h4>
    <view class="margin-lr">
      <slot>default comment content</slot>
    </view>
    <h4 class="text-orange">comment end</h4>
  </view>
</template>

<script>
export default {
  name: 'comment',
}
</script>

<style>

</style>