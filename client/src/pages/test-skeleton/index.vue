<template>
  <div>
    <div class="title">测试骨架屏幕</div>
    <div class="content">
      <div class="cli srceen1">
        <div class="cli-item">
          哈哈1
        </div>
        <div class="cli-item">
          哈哈2
        </div>
      </div>
      <div class="cli srceen2">
        屏幕2
      </div>
    </div>
  </div>
</template>
<script lang="tsx">
import { Component, Provide, Watch } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'

@Component
export default class Guide extends VueComponent<{}> {
    @Provide() homeH: Number = self.innerHeight
    @Provide() valid:any = false
    @Provide() messageNum:Number = 0
    async mounted() {
    }
}
</script>

<style lang="stylus" scoped>
.title
  font-size 30px
  line-height 70px
  text-align center
  background-color yellow
.cli
  height 300px
.cli-item
  line-height 70px
  background-color pink
  border-bottom 1px solid rgba(0,0,0,0.5)
.srceen1
  background-color red
.srceen2
  background-color green
</style>
