<template>
  <div class="messageHistorySkt">
    <skeleton-loading>
        <square-skeleton class="title">
        </square-skeleton>
        <square-skeleton class="messge" :key="n" v-for="n in 5">
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
.messageHistorySkt
  padding 20px
.title
  margin 10px 0
.title >>> div
  height 16px
.messge
  padding 20px 15px
.messge >>> div
    height 99px
</style>
