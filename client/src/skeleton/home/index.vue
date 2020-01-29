<template>
  <div>
    <skeleton-loading>
        <div class="nav">
          <square-skeleton class="title">
          </square-skeleton>
        </div>
        <div class="personcenter" :key="i" v-for="i in 4">
          <div class="nav-container">
            <row class="title" justify="space-between">
              <column :span="4">
                  <square-skeleton class="logo"></square-skeleton>
              </column>
              <column :span="16">
                  <div class="nav-content">
                    <square-skeleton :key="i" v-for="i in 4" class="content"></square-skeleton>
                  </div>
              </column>
            </row>
          </div>
        </div>
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
.nav
  height 54px
.title >>> div
  height 54px
.personcenter
  height 191px
.nav-container
  padding: 0 15px
  padding-top 16px
.logo >>> div
  width 80px
  height 80px
  border-radius 50%
.content >>> div
  height 20px
  margin-bottom 10px
</style>
