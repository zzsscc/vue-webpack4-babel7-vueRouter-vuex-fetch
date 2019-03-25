<template>
  <div class="color">
    1234
    <a href="http://www.baidu.com">123</a>
  </div>
</template>

<script>
  export default {
    name: 'test'
  };
</script>

<style lang="scss" scoped>
@import 'styles/common/index.scss';

$color: red;
.color {
  color: $color
}
</style>