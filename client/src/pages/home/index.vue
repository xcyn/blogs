<template>
  <div>
    <div slot="content">
      <div :style="{'height': `${homeH}px`}">
        <cube-scroll-nav
          class="homeNavs"
          @change="changeHandler">
          <cube-scroll-nav-panel
            class="nav-panel"
            v-for="(item) in datas"
            :key="item.name"
            :label="item.name">
            <ul class="contentH">
              <li class="nav-container" :key="key" v-for="(item, key) in item.contents">
                <div class="person-introduce" v-if="!item.isCustom">
                  <div class="logo">
                    <img :src="item.logo">
                  </div>
                  <div class="person-des">
                    <div :key="key" v-for="(des, key) in item.desc" class="des-item">
                      <div>
                        <div class="des-num">{{des.subT}}</div>
                        <div class="des-content" v-html="des.message">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                    v-if="item.isCustom"                
                >
                  <div class="form-title"><div>给我留言</div> <div class="message-history" @click="handleMHistory">留言记录({{messageNum}})</div></div>
                  <cube-form
                    class="cube-form"
                    :model="model"
                    :schema="schema"
                    :immediate-validate="false"
                    :options="options"
                    @validate="validateHandler"
                    ></cube-form>
                  <cube-button class="cube-submit-btn" :disabled="!valid" @click="submitHandler">提交</cube-button>
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
import wxShare from '../../common/wxShare'
import request from '../../common/request'

@Component
export default class Guide extends VueComponent<{}> {
    @Provide() homeH: Number = self.innerHeight
    @Provide() datas:any =  contents;
    @Provide() valid:any = false
    @Provide() messageNum:Number = 0
    @Provide() model:any =  {
      phone: '',
      name: '',
      message: '',
    }
    @Provide() schema:any = {
      groups: [
        {
          fields: [
            {
              type: 'input',
              modelKey: 'phone',
              label: '手机号',
              props: {
                placeholder: '请输入您的手机号'
              },
              rules: {
                required: true,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/
              },
              // validating when blur
              trigger: 'blur',
              messages: {
                pattern: '请输入正确手机号格式'
              }
            },
            {
              type: 'input',
              modelKey: 'name',
              label: '姓名',
              props: {
                placeholder: '请输入您的名字'
              },
              rules: {
                required: true
              },
              // validating when blur
              trigger: 'blur'
            },
            {
              type: 'textarea',
              modelKey: 'message',
              label: '留言',
              props: {
                placeholder: '请写下您的留言',
                maxlength: 200
              },
              rules: {
                required: true
              },
              debounce: 200
            }
          ]
        }
      ]
    }
    @Provide() options:any = {
      scrollToInvalidField: true,
      layout: 'standard' // classic fresh
    }
    changeHandler(label:String) {
    }
    stickyChangeHandler(current:String) {
    }
    async getMessageList() {
      const res = await request({
        url: '/personal/message/get',
        method: 'get'
      })
      this.messageNum = res.data.length
    }
    // 留言表单
    async submitHandler(e:any) {
      e.preventDefault()
      const context:any = this
      console.log('this.model', this.model)
      const res = await request({
        url: '/personal/message/save',
        method: 'post',
        params: this.model
      })
      if(res.errno === 200) {
        const toast:any = context.$createToast({
          time: 1000,
          type: 'correct',
          txt: '提交成功'
        })
        toast.show()
      } else {
        const errnoToast:any = context.$createToast({
          time: 1000,
          type: 'error',
          txt: res.errmsg
        })
        errnoToast.show()
      }

      this.getMessageList()
    }
    validateHandler(result:any) {
      this.valid = result.valid
    }
    resetHandler(e:any) {
      console.log('reset', e)
    }
    handleMHistory() {
      this.$router.push({
        path: '/message-history'
      })
    }
    async mounted() {
      await wxShare({
        title: '欢迎打扰',
        desc: '努力为社会创造一点点价值',
        imgUrl: 'https://i.niupic.com/images/2019/11/05/_4.jpeg'
      })
      this.getMessageList()
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
.contentH
  border-bottom: 1px solid #f4f4f4
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
.form-title
  border-left 3px solid #fc9153
  padding-left 5px
  margin 10px 0
  display flex
  justify-content space-between
.cube-submit-btn
  margin 30px 0
.message-history
  padding 0 10px
  font-size 12px
  color #fc9153
.cube-form /deep/ .cube-form-item
  align-items flex-start
.cube-form /deep/ .cube-form-label
  padding 13px 0
</style>
