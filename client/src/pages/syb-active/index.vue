<script lang="tsx">
import { Component, Provide, Watch } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
@Component
export default class Guide extends VueComponent<{}> {

    render(h: any) {
        return (
            <div class="syb">
                <div class="nav-container">
                    <div class="nav">介绍</div>
                    <div class="nav">内容</div>
                    <div class="nav">介绍</div>
                    <div class="nav">留言</div>
                    <div class="nav">联系方式</div>
                </div>
                <div class="nav-content">
                    <div class="introduce">
                        介绍:
                    </div>
                    <div class="syb-banne">
                        内容:
                    </div>
                    <div class="operation-content">
                        介绍:
                    </div>
                    <div class="message">
                        留言:
                    </div>
                    <div class="link">
                        <span class='link-title'>联系方式:</span> 18811742305
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="stylus" scoped>
.nav-container
    display flex
    align-items center
    height 50px
    background-color #90ee90
    justify-content space-between
    color #fff
    font-size 14px
.nav-container .nav
    width 25%
    text-align center
.nav-content
    padding 0 15px
.introduce
    padding 30px 0
    height 250px
.syb-banne
    padding 30px 0
    height 250px
.operation-content
    padding 30px 0
    height 250px
.message
    padding 30px 0
    height 250px
.link
    padding 30px 0
    text-align center
    font-size 12px
.link-title
    font-size 14px
</style>
