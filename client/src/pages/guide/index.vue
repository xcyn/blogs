<script lang="tsx">
import { Component, Provide, Watch } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
@Component
export default class Guide extends VueComponent<{}> {
    //data
    @Provide() num: number = 1

    //methods
    addNum(): number {
        this.num++
        return this.num
    }

    // computed
    get computedNum () {
        return this.num + 1
    }

    // 生命周期
    mounted() {
        this.num = 2
    }

    // watch
    @Watch('num')
    onChildChanged(val: string, oldVal: string) { 
        console.log(`我在改变，当前值为:${val}, 以前的值为${oldVal}`)
    }

    render(h: any) {
        return (
            <div class="guide">
                <div>引导页 {this.num}</div>
                <div>computedData: {this.computedNum}</div>                
                <div class='button' onClick={this.addNum}>add</div>
            </div>
        )
    }
}
</script>

<style lang="stylus" scoped>
.guide
.button
    width 200px
    text-align center
    padding 20px 0
</style>
