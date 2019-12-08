<template>
  <div>
    <skeleton-loading>
        <square-skeleton class="title">
        </square-skeleton>
    </skeleton-loading>
  </div>
</template>
<script>
import skeleton from '../../components/skeleton/index';
export default {
  components: {
    ...skeleton
  }
};
</script>
<style lang="stylus" scoped>
.title >>> div
    height 70px
.srceen1 >>> div
    height 300px
.cli-item >>> div
    height 70px
.mb150
    margin-bottom 150px
.srceen2 >>> div
    height 300px
</style>
