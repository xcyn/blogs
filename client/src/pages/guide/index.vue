<script lang="tsx">
import { Component, Provide, Watch } from 'vue-property-decorator'
import { Component as VueComponent } from 'vue-tsx-support'
import * as THREE from 'three'
const TWEEN = require('tween.js')
import { extendCSS3DRenderer } from '../../library/CSS3DRenderer'
interface guideInterFace {
    img: any;
    nickname: String;
    id: String;
    vote: String;
    intro: string,
}
@Component
export default class Guide extends VueComponent<{}> {
    @Provide() num: any = 0
    @Provide() showInfo: Boolean = false
    @Provide() guideH: Number = self.innerHeight
    @Provide() THREE: any = null
    @Provide() TWEEN: any = TWEEN
    @Provide() personArray: any = []
    @Provide() camera: any
    @Provide() scene: any
    @Provide() renderer: any
    @Provide() objects: any = []
    @Provide() targets: any = { sphere: [] }
    @Provide() showInfoConfig: guideInterFace[] = [
        {
            img: require('@/assets/guide/guide1.jpeg'),
            nickname: '我要和你结婚❤️',
            id: '2020520',
            vote: '说好要相守50年哟～',
            intro: '2020年5月20号这个特殊的日子我们领证～'
        },
        {
            img: require('@/assets/guide/guide2.jpeg'),
            nickname: '相遇的日子😄',
            id: '20180405',
            vote: '一首《慢慢》征服你',
            intro: '感谢嫂嫂和苗哥让我们相遇，清明节约会，我们也是没谁了😂'
        },
        {
            img: require('@/assets/guide/guide3.jpeg'),
            nickname: '南京的日子🏠',
            id: '20181001',
            vote: '国庆节南京看房',
            intro: '已经约定终身，所以决定在你想去的城市买房🌹'
        },
        {
            img: require('@/assets/guide/guide4.jpeg'),
            nickname: '回家见爸妈😊',
            id: '20191001',
            vote: '吃延吉美食',
            intro: '你个心机girl,说好来延吉吃好吃的，结果自己都不怎么吃，害得我胖5斤😣'
        }
    ]

    // 生成虚拟数据
    initPersonArrays() {
        for(var i=0;i<199;i++){
            const image =this.showInfoConfig[i%4].img
            this.personArray.push({
                image
            });
        }
    }

    // 初始化
    init() {
        this.camera = new this.THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
				this.camera.position.z = 3000;
				this.scene = new THREE.Scene();
				var vector = new THREE.Vector3();
                var spherical = new THREE.Spherical();
                var document:any = window.document
				for ( var i = 0, l = this.personArray.length; i < l; i ++ ) {
					var element = document.createElement( 'div' );
					element.className = 'photo-guide';
					element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
                    var img = document.createElement('img');
                    img.src = this.personArray[i].image
                    element.appendChild( img );
                    var object = new this.THREE.CSS3DObject( element );
					object.position.x = Math.random() * 4000 - 2000;
					object.position.y = Math.random() * 4000 - 2000;
					object.position.z = Math.random() * 4000 - 2000;
					this.scene.add( object );
                    this.objects.push( object );
					var phi = Math.acos( -1 + ( 2 * i ) / l );
					var theta = Math.sqrt( l * Math.PI ) * phi;
					object = new this.THREE.Object3D();
					spherical.set( 700, phi, theta );
					object.position.setFromSpherical( spherical );
					vector.copy( object.position ).multiplyScalar( 2 );
					object.lookAt( vector );
					this.scene.add( object );
					this.targets.sphere.push( object );
                }
				//渲染
				this.renderer = new this.THREE.CSS3DRenderer();
				this.renderer.setSize( window.innerWidth, window.innerHeight );
                this.renderer.domElement.style.position = 'absolute';
				document.getElementById( 'container' ).appendChild( this.renderer.domElement );
				this.transform( this.targets.sphere, 2000 );
    }

    // 旋转
    transform(targets:any, duration:any) {
        this.TWEEN.removeAll();

            for ( var i = 0; i < this.objects.length; i ++ ) {

                var object = this.objects[ i ];
                var target = targets[ i ];
                new this.TWEEN.Tween( object.position )
                    .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                    .easing( this.TWEEN.Easing.Exponential.InOut )
                    .start();

                new this.TWEEN.Tween( object.rotation )
                    .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                    .easing( this.TWEEN.Easing.Exponential.InOut )
                    .start();

            }
            new this.TWEEN.Tween( this )
                .to( {}, duration * 2 )
                .onUpdate( this.renderApi )
                .start();
    }

    animate() {
        // 让场景通过x轴或者y轴旋转  & z
        this.scene.rotation.y += 0.008;
        requestAnimationFrame( this.animate );
        this.TWEEN.update();
        // 渲染循环
        this.renderApi();
    }

    renderApi() {
        this.renderer.render( this.scene, this.camera );
    }

    infinite() {
        this.num = ++this.num % this.showInfoConfig.length
        var outTimer:any = null
        // 模拟推送数据
        var inTimer:any = setTimeout(()=>{
            clearInterval(outTimer)
            this.showInfo = true;
            outTimer = setTimeout(()=>{
                clearInterval(inTimer)
                this.showInfo = false;
                this.infinite()
            },3000);
        },0);
    }

    // computed
    get computedNum () {
        return this.showInfo
    }

    // 生命周期
    created() {
        this.THREE = THREE
        extendCSS3DRenderer(this.THREE)
        this.initPersonArrays()
    }
    mounted() {
        this.infinite()
        this.init()
        this.animate()
    }

    // watch
    @Watch('showInfo')
    onChildChanged(val: string, oldVal: string) { 
    }

    render(h: any) {
        return (
            <div class="guide" style={{ height: `${this.guideH}px` }}>
                <div class='guide-title'>JUST FOR YOU</div>
                <div id="container"></div>
                <transition name="fade">
                    <div v-show={this.showInfo} class="show_info animated fadeInUp">
                        <div class="info_my">
                            <img 
                            class='info_my_img'
                            src={this.showInfoConfig[this.num].img}/>
                            <div class="info_mem">
                                <div class="nickname">{this.showInfoConfig[this.num].nickname}</div>
                                <div class="id">{this.showInfoConfig[this.num].id}</div>
                                <div class="vote">{this.showInfoConfig[this.num].vote}</div>
                            </div>
                        </div>
                        <div class="intro">{this.showInfoConfig[this.num].intro}</div>
                    </div>
                </transition>
            </div>
        )
    }
}
</script>

<style lang="stylus">
.photo-guide
    width 100px
    height 100px
    box-shadow 0px 0px 12px rgba(0,255,255,0.5)
    border 1px solid rgba(127,255,255,0.25)
    text-align center
    cursor default
.photo-guide:hover
    box-shadow 0px 0px 12px rgba(0,255,255,0.75)
    border 1px solid rgba(127,255,255,0.75)
.photo-guide img
    width 100px
    height 100px
.photo-guide .number
    position absolute
    top 20px
    right 20px
    font-size 12px
    color rgba(127,255,255,0.75)
.photo-guide .symbol
    position absolute
    top 40px
    left 0px
    right 0px
    font-size 60px
    font-weight bold
    color rgba(255,255,255,0.75)
    text-shadow 0 0 10px rgba(0,255,255,0.95)
.photo-guide .details
    position absolute
    bottom 15px
    left 0px
    right 0px
    font-size 12px
    color rgba(127,255,255,0.75)
</style>

<style lang="stylus" scoped>
.guide-title
    position absolute
    width 100%
    top 40px
    text-align center
    color #fff
    font-size 30px
.guide
    background-color rgba(0,0,0,0.8)
    margin 0
    font-family Helvetica, sans-serif
    overflow hidden
    position relative
.show_info
    position fixed
    background-color rgba(0,0,0,.6)
    padding 20px
    width 250px
    margin 0 auto
    left 0
    right 0
    border-radius 5px
    box-shadow 0 0 10px 0 #fff
    top 30%
    display block
.show_info .intro
    color:#fff
    margin-top 8px
    overflow hidden
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    padding 0 20px
    line-height 1.5
.show_info .info_my
    display flex
    justify-content center
.info_my_img
    width 60px
    height 100%
    padding 5px
    border-radius 5px
    box-shadow 0 0 10px 0 #888
.info_mem
    color #fff
    max-width 250px
    line-height 1.5
.info_mem > div
    text-align left
    padding-left 15px
.show_info .info_my .info_mem > div.nickname
    max-width 120px
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-active
  opacity 0
</style>
