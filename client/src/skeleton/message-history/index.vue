<template>
  <div class="skt-c">
    <div class="messageHistorySkt">
      <skeleton-loading>
          <div class="skt-title">
            <square-skeleton class="title">
            </square-skeleton>
          </div>
          <div class="skeleton" :key="n" v-for="n in 6">
            <square-skeleton class="messge">
            </square-skeleton>
          </div>
      </skeleton-loading>
    </div>
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
.skt-c
  width 100%
.skt-title
  padding 20px 15px
  padding-bottom 10px
.title
  margin 5px 0
  margin-bottom 0
.title >>> div
  height 30px
.skeleton
  padding 5px 15px
.messge >>> div
  width 100%
  height 99px
</style>
