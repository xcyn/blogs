<template>
  <div class="message-history">
      <div class="form-title">留言记录</div>
      <div class="message" :key="key" v-for="(message, key) in messageList">
        <div class="person">
            <span class="name">{{message.name}}:</span> <span class="phone">{{message.phone}}</span>
        </div>
        <div class="content">
          <span class="content-title">留言信息:</span> <span class="message-content">{{message.message}}</span>
        </div>
      </div>
  </div>
</template>
<script lang="tsx">
import { Component, Provide, Watch } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import request from '../../common/request'

@Component
export default class Guide extends VueComponent<{}> {
    @Provide() messageList: any = []
    async getMessageList() {
      const res = await request({
        url: 'http://127.0.0.1:3099/personal/message/get',
        method: 'get'
      })
      this.messageList = res.data
    }
    mounted() {
      this.getMessageList()
    }
}
</script>

<style lang="stylus" scoped>
.form-title
  border-left 3px solid #fc9153
  padding-left 5px
  margin 10px 0
  display flex
  justify-content space-between
.message-history
  padding 20px
.message
  padding 20px 15px
  border-bottom: 1px solid #f4f4f4
.person
  line-height 1.5
.name
  color red
  opacity 0.5
.phone
  color rgba(0,0,0,.5)
  padding-left 10px
.content
  padding-top 10px
  line-height 1.5
.content-title
  color red
  opacity 0.5
.message-content
  padding-left 10px
  color rgba(0,0,0,0.5)  
</style>
