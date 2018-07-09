<template>
    <div class="shopcart-list">
        <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="_emptyFoods">清空</span>
        </div>
        <div class="list-content" ref="selectList">
            <ul>
                <li class="food border-1px(" v-for="food in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                        <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <v-cartcontrol :food="food"></v-cartcontrol>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>    
    import Cartcontrol from '@/components/home/cartControl/cartcontrol';
    import BScroll from 'better-scroll';

    export default {
        components: {
            'v-cartcontrol': Cartcontrol
        },
        props: {
            selectFoods: {
                type: Array
            },
            listShow: {
                type: Boolean
            }
        },
        created(){
            this.$nextTick(() => {
                this._initScroll();
            })
        },
        watch: {
            listShow(){
                this._initScroll();
            }
        },
        methods: {
            _emptyFoods(){
                this.selectFoods.forEach((food) => {
                    food.count = 0
                })
            },
            _initScroll(){
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.selectList, {
                        click: true,
                    });
                }else{
                    this.scroll.refresh();
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../common/style/mixin.less";

    .shopcart-list{
        position: absolute;
        left: 0;
        bottom: 100%;
        z-index: -1;
        width: 100%;
        font-size: 0;

        .list-header{
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);

            .title{
                float: left;
                font-size: 24px;
                color: rgb(7, 17, 27);
            }
            .empty{
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }
        .list-content{
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            background: #fff;

            .food{
                position: absolute;
                padding: 12px 0;
                .border-1px(rgba(7, 17, 27, 0.1));

                .name{
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .price{
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartcontrol-wrapper{
                    position: absolute;
                    right: 0;
                    bottom: 4px;
                }
            }
        }
    }
</style>