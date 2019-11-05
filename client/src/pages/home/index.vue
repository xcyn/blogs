<template>
  <div>
    <div slot="content">
      <div>
        <cube-scroll-nav
          :style="{'height': `${homeH}px`}"
          :current="current"
          class="homeNavs"
          @change="changeHandler">
          <cube-scroll-nav-panel
            class="nav-panel"
            v-for="(item) in datas"
            :key="item.name"
            :label="item.name">
            <ul class="contentH">
              <li class="nav-container" :key="key" v-for="(item, key) in item.contents">
                <div class="person-introduce">
                  <div class="logo">
                    <img :src="item.logo">
                  </div>
                  <div class="person-des">
                    <div :key="key" v-for="(des, key) in item.desc" class="des-item">
                      <div>
                        <div class="des-num">{{des.subT}}</div>
                        <div class="des-content">
                          {{des.message}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </cube-scroll-nav-panel>
        </cube-scroll-nav>
      </div>
    </div>
  </div>
</template>
<script lang="tsx">
import { Component, Provide, Watch } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import { contents } from './config'

@Component
export default class Guide extends VueComponent<{}> {
    @Provide() homeH: Number = self.innerHeight
    @Provide() datas:any =  contents;
    @Provide() current:String =  '个人介绍';
    changeHandler(label:String) {
      this.current = label
      console.log('changed to:', label)
    }
    stickyChangeHandler(current:String) {
      this.current = current
      console.log('sticky-change', current)
    }
    mounted() {
    }
}
</script>

<style lang="stylus" scoped>
.homeNavs /deep/ .cube-scroll-nav-bar-items
  border-bottom: 1px solid #f4f4f4;
.homeNavs /deep/ .cube-sticky-ele
  opacity 0
.NavHeight
  height 55px
// .contentH
//   height 250px
.nav-container
  padding 0 15px
.person-introduce
  display flex
.logo
  width 80px
  height 80px
  border-radius 50%
  overflow hidden
  > img
    width 100%
.person-des
  flex 1
  padding-left 20px
.des-num
  float left
  padding-right 10px
  line-height 1.2
  width 70px
.des-content
  overflow hidden
  font-size 14px
  color #666
  line-height 1.2
.des-item
  display flex
  align-self center
  padding-bottom 10px
</style>
