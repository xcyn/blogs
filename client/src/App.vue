<template>
  <div id="app">
    <transition :name="transitionName">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Provide } from 'vue-property-decorator';

@Component({
  components: {
  }
})
export default class App extends Vue {
  @Provide() transitionName:any = 'slide-left'
  @Watch('$route')
  onChildChanged(to:any, from:any) {
    const toLevel = to.meta && to.meta.level
    const fromLevel = from.meta && from.meta.level
    if(toLevel && fromLevel) {
      this.transitionName = toLevel > fromLevel ? 'slide-left' : 'slide-right'
    }
  }
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active
  will-change: transform
  transition all 500ms
  position absolute
.slide-right-enter
  opacity 0
  transform translate3d(-100%, 0, 0)
.slide-right-leave-active
  opacity 0
  transform translate3d(100%, 0, 0)
.slide-left-enter
  opacity 0
  transform translate3d(100%, 0, 0)
.slide-left-leave-active
  opacity 0
  transform translate3d(-100%, 0, 0)
</style>
<style>
#app {
  max-width: 500px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
