<template>
  <div>
    <skeleton-loading>
        <square-skeleton class="title">
        </square-skeleton>
        <square-skeleton class="cli-item">
        </square-skeleton>
        <square-skeleton class="cli-item mb150">
        </square-skeleton>
        <square-skeleton class="cli srceen2">
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
