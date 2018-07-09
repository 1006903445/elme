<template>
    <div class="shopcart-wrapper">
        <div class="shopcart">
            <div class="content">
                <div class="content-left" :class="{'highlight': totalPrice > 0}" @click="listFold">
                    <div class="logo-wrapper">
                        <div class="logo">
                            <i class="icon-shopping_cart"></i>
                        </div>
                        <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
                    </div>
                    <div class="price">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="payClass" @click="_toPay">
                        {{payDesc}}
                    </div>
                </div>
                <div class="ball-container">
                    <transition-group name="drop" tag="div"
                        @before-enter="beforeEnter"
                        @enter="dropEnter"
                        @after-enter="afterEnter">
                        <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
                            <div class="inner inner-hook">
                            </div>
                        </div>
                    </transition-group>
                </div>
                <transition name="fold">
                    <v-shopcart-list v-show="listShow" :selectFoods="selectFoods" :listShow="listShow"></v-shopcart-list>
                </transition>
            </div>
        </div>
         <transition name="fade">
            <div class="list-mask" v-show="listShow"></div>
        </transition>
    </div>
</template>

<script>    
    import shopcartList from '@/components/home/content/shopcart/shopcartList.vue'

    export default {
        components: {
            "v-shopcart-list": shopcartList,
        },
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return [
                        // {
                        //     id: 1,
                        //     price: 10,
                        //     cound: 1
                        // }
                    ]
                }
            },
            deliveryPrice: {
                type: Number
            },
            minPrice: {
                type: Number
            }
        },
        data(){
            return {
                balls: [
                    {
                        show: false,
                        el: null
                    },
                    {
                        show: false,
                        el: null
                    },
                    {
                        show: false,
                        el: null
                    },
                    {
                        show: false,
                        el: null
                    },
                    {
                        show: false,
                        el: null
                    },
                ],
                dropBalls: [],
                fold: true,
            }
        },
        computed: {
            totalPrice(){
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price*food.count;
                })
                return total;
            },
            totalCount(){
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                })
                return count;
            },
            payDesc(){
                if(this.totalCount === 0){
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPrice >= this.minPrice){
                    return `去结算`;
                }else if(this.totalCount < this.minPrice){
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元`;
                }
            },
            payClass(){
                if(this.totalPrice >= this.minPrice){
                    return 'enough';
                }else{
                    return 'not-enough';
                }
            },
            listShow(){
                if(!this.totalCount){
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                return show;
            }

        },
        methods:{
            drop(el){
                for(let i = 0; i < this.balls.length; i++){
                    let ball = this.balls[i];
                    if(!ball.show){
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeEnter(el){
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show && ball.el) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.transform = `translate3d(0,${y}px,0`;
                        el.style.webkitTransform = `translate3d(0,${y}px,0`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                        ball.el = null;
                    }
                }
            },
            dropEnter(el, done){                
                /* 触发浏览器重绘; */
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0, 0, 0)';
                    el.style.transform = 'translate3d(0, 0, 0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                    inner.style.transform = 'translate3d(0, 0, 0)';
                    el.addEventListener('transitionend', done);
                });
            },
            afterEnter(el){
                let ball = this.dropBalls.shift();
                if(ball){
                    ball.el = null;
                    ball.show = false;
                }
            },
            listFold(){
                if(this.totalCount){
                    this.fold = !this.fold;
                }
            },
            _toPay(){
                if(this.totalCount === 0){
                    return false;
                }else if(this.totalPrice >= this.minPrice){
                    alert(`去结算，金额${this.totalPrice}元`)
                }else if(this.totalCount < this.minPrice){
                    let diff = this.minPrice - this.totalPrice;
                    alert(`再逛逛，还差￥${diff}元`)
                }
            }
        },
        deactivated(){
             for(let i = 0; i < this.balls.length; i++){
                let ball = this.balls[i];
                ball.show = false;
                ball.el = null;
            }
        }
    }
</script>

<style lang="less" scoped>
    .shopcart-wrapper{
    	.shopcart{
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 50;
            width: 100%;
            height: 48px;

            .content{
                display: flex;
                background: #141d27;
                font-size: 0;
                color: rgba(255, 255, 255, 0.4);

                .content-left{
                    flex: 1;
                    white-space: nowrap;

                     &.highlight{
                        .logo-wrapper{
                            .logo{
                                background: rgb(0, 160, 220);

                                .icon-shopping_cart{
                                    color: #fff;
                                }
                            }
                        }
                        .price{
                            color: #fff;
                        }
                    }
                    .logo-wrapper{
                        display: inline-block;
                        vertical-align: top;
                        position: relative;
                        top: -10px;
                        margin: 0 12px;
                        padding: 6px;
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        background: #141d27;

                        .logo{
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            border-radius: 50%;
                            background: #2b343c;
                            
                            .icon-shopping_cart{
                                line-height: 44px;
                                font-size: 24px;
                                color: #808581;
                            }
                        }
                        .num{
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 24px;
                            height: 16px;
                            line-height: 16px;
                            text-align: center;
                            border-radius: 16px;
                            font-size: 9px;
                            font-weight: 700;
                            color: #fff;
                            background: rgb(240, 20, 20);
                            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                        }
                    }
                    .price{
                        display: inline-block;
                        vertical-align: top;
                        margin-top: 12px;
                        line-height: 24px;
                        padding-right: 12px;
                        border-right: 1px solid rgba(255, 255, 255, 0.1);
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .desc{
                        display: inline-block;
                        vertical-align: top;
                        line-height: 24px;
                        margin: 12px 0 0 12px;
                        font-size: 10px;
                    }
                }
                .content-right{
                    flex: 0 0 105px;
                    width: 105px;

                    .pay{
                        height: 48px;
                        line-height: 48px;
                        text-align: center;
                        font-size: 12px;
                        font-weight: 700;
                        background: #2b333b;

                        &.not-enough{
                            background: #2b333b;
                        }
                        &.enough{
                            background: #00b43c;
                            color: #fff;
                        }
                    }
                }
                .ball-container{
                    .ball{
                        position: fixed;
                        left: 32px;
                        bottom: 22px;
                        z-index: 200;

                        .inner{
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background: rgb(0, 160, 220);
                            transition: all 1s linear;
                        }
                        &.drop-enter-active{
                            transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
                        }
                    }
                }
            }
        }
        .list-mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 40;
            backdrop-filter: blur(10px);
            background: rgba(7, 17, 27, 0.6);
        }
    }
</style>