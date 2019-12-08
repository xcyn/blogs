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
            img: 'https://i.niupic.com/images/2019/11/03/_5.jpeg',
            nickname: '我是熊川宇',
            id: '你好未来',
            vote: '未来可期，性感乐观',
            intro: '无论未来如何，不用焦虑悲观，努力就好，干就完了～'
        },
        {
            img: 'https://i.niupic.com/images/2019/11/03/_2.jpeg',
            nickname: '高思的日子👨‍🎓',
            id: '201605-201805',
            vote: '成长的开始-轻松的团队氛围',
            intro: '让人尊敬的领导团队'
        },
        {
            img: 'https://i.niupic.com/images/2019/11/03/_3.jpeg',
            nickname: '滴滴的日子🚗',
            id: '201805-201905',
            vote: '飞速成长的-在优秀的团队中成长',
            intro: '遇到最好的领导强哥，开始执着对业务和团队的思考'
        },
        {
            img: 'https://i.niupic.com/images/2019/11/03/_4.jpeg',
            nickname: '作业帮🏫',
            id: '201905-至今',
            vote: '成长飞速-在更高的岗位成长',
            intro: '有幸开始带小团队一起进步，在更高的纬度要求自己'
        }
    ]

    // 生成虚拟数据
    initPersonArrays() {
        for(var i=0;i<199;i++){
            let images = [
                'https://i.niupic.com/images/2019/11/03/_1.jpeg',
                'https://i.niupic.com/images/2019/11/03/_2.jpeg',
                'https://i.niupic.com/images/2019/11/03/_3.jpeg',
                'https://i.niupic.com/images/2019/11/03/_4.jpeg',
                'https://i.niupic.com/images/2019/11/03/_5.jpeg',
                'https://i.niupic.com/images/2019/11/03/_6.jpeg',
                'https://i.niupic.com/images/2019/11/03/_7.jpeg',
                'https://i.niupic.com/images/2019/11/03/_8.jpeg',
                'https://i.niupic.com/images/2019/11/03/_9.jpeg',
                'https://i.niupic.com/images/2019/11/03/_10.jpeg',
                'https://i.niupic.com/images/2019/11/03/_11.jpeg',
                'https://i.niupic.com/images/2019/11/03/_12.jpeg',
            ]

            const image =images[i%images.length]
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

    handleGoHome() {
        this.$router.push({
            path: '/home'
        })
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
                <div class='guide-title'>熊川宇的博客</div>
                <div class='guide-subTitle'>写下人生百态，记录成长点滴</div>
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
                <div class="goHome" onClick={this.handleGoHome.bind(this)}>去往主页</div>
            </div>
        )
    }
}
</script>

<style lang="stylus" scoped>
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
    font-size 25px
.guide-subTitle
    position absolute
    width 100%
    top 80px
    text-align center
    color #fff
    font-size 12px
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
.goHome
    position absolute
    bottom 15px
    right 15px
    padding 10px
    background-color rgba(255,255,255,0.2)
    color #fff
    border-radius 5px
    font-size 13px
</style>
