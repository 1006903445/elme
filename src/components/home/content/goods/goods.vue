<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index)">
                    <span class="text border-1px">
                        <i v-show="item.type > 0" class="icon" :class="classMap[item.type]"></i>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-lost-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food)">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <v-cartcontrol @cartAdd="cartAdd" :food="food"></v-cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-shopcart  ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shopcart>
        <v-food ref="food" @cartAdd="cartAdd" :food="selectedFood"></v-food>
    </div>
</template>

<script>
    import Cartcontrol from '@/components/home/cartControl/cartcontrol';
    import Shopcart from '@/components/home/content/shopcart/shopcart';
    import Food from '@/components/home/content/food/food';

    import BScroll from 'better-scroll';

    export default {
        components: {
            'v-shopcart': Shopcart,
            'v-cartcontrol': Cartcontrol,
            'v-food': Food
        },
        props: {
            seller: {
                type: Object
            },
            selectFoods: {
                type: Array
            },
            goods: {
                type: Array
            },
        },
        data () {
            return {
                meunScroll: null,
                foodsScroll: null,
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        computed: {
            currentIndex(){
                for(let i = 0; i < this.listHeight.length; i++){
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    if((this.scrollY >= height1 && this.scrollY < height2)){
                        return i;
                    }
                }
                return 0;
            }
        },
        created(){
            this.classMap = ['decrease','discount','guarantee','invoice','special'];
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            })
        },
        methods: {
            selectMenu(index){
                this.scrollY = this.listHeight[index];
                this.foodsScroll.scrollTo(0, -this.scrollY, 300);
            },
            selectFood(food){
                this.selectedFood = food;
                this.$refs.food.show();
            },
            _initScroll(){
                this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true,
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                });
                this.foodsScroll.on('scroll', (pos)=>{
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calculateHeight(){
                let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-lost-hook');
                let height = 0;
                this.listHeight.push(height)
                for(let i = 0; i < foodlist.length; i++){
                    let item = foodlist[i];
                    height += item.clientHeight;
                    this.listHeight.push(height)
                }
            },
            cartAdd(target){
                this.$refs.shopcart.drop(target)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../common/style/mixin.less";

    .goods{
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;

        .menu-wrapper{
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            color: rgb(77, 85, 93);

            .menu-item{
                display: table;
                height: 54px;
                width: 100%;
                line-height: 14px;
                padding: 0 12px;
                
                &.current{
                    position: relative;
                    z-index: 10;
                    margin-top: -1px;
                    background: #fff;
                    font-weight: 700;

                    .text{
                        .border-none()
                    }
                }
                .icon{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    vertical-align: top;
                    margin-right: 2px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;

                    &.decrease{
                        .bg-image('content/goods/decrease_3');
                    }
                    &.discount{
                        .bg-image('content/goods/discount_3');
                    }
                    &.guarantee{
                        .bg-image('content/goods/guarantee_3');
                    }
                    &.invoice{
                        .bg-image('content/goods/invoice_3');
                    }
                    &.special{
                        .bg-image('content/goods/special_3');
                    }
                }
                .text{
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    .border-1px(rgba(7, 17, 27, 0.1));
                    font-size: 12px;
                }
            }
        }
        .foods-wrapper{
            flex: 1;
            background: #fff;

            .title{
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
            }
            .food-item{
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                .border-1px(rgba(7, 17, 27, 0.1));

                &:last-child{
                    .border-none();
                    margin-bottom: 0;
                }
                .icon{
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content{
                    flex: 1;

                    .name{
                        margin: 2px 0 8px 0;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc, .extra{
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc{
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .extra{
                        .count{
                            margin-right: 12px;
                        }
                    }
                    .price{
                        font-weight: 700;
                        line-height: 24px;

                        .now{
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);
                        }
                        .old{
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }

            }         
        }
    }
</style>
