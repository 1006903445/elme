<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <span class="star">
                        <v-star :size="36" :score="seller.score"></v-star>
                    </span>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月销售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2 class="title">起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="_favoriteToggle">
                    <i class="icon-favorite" :class="{'z-active': favorite}"></i>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <v-split></v-split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <v-split></v-split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picsList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <v-split></v-split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul class="info-list">
                    <li class="info-item" v-for="info in seller.infos">
                        {{info}}
                    </li>
                </ul>
            </div>
        </div>
        <v-shopcart  ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shopcart>
    </div>
</template>

<script>
    import Shopcart from '@/components/home/content/shopcart/shopcart';
    import Star from '@/components/home/star/star.vue'
    import Split from '@/components/home/content/split/split';
    import BScroll from 'better-scroll';

    export default {
        components: {
            'v-star': Star,
            'v-split': Split,
            'v-shopcart': Shopcart,
        },
        props: {
            seller: {
                type: Object
            },
            selectFoods: {
                type: Array
            }
        },
        data () {
            return {
                favorite: false,
            }
        },
        computed: {
            favoriteText(){
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        created(){
            this.classMap = ['decrease','discount','guarantee','invoice','special'];
            this.favorite = this.localStorageGet(this.seller.id, 'favorite', this.favorite);
        },
        mounted(){
            this._scrollInit();
            this._picScrollInit();
        },
        watch: {
            seller(){
                this._scrollInit();
                this._picScrollInit();
            } 
        },
        methods: {
            _scrollInit(){
                this.$nextTick(() => {
                    if(!this.sellerScroll){
                        this.sellerScroll = new BScroll(this.$refs.seller, {
                            click: true,
                        });
                    }else{
                        this.sellerScroll.refresh();
                    }
                })
            },
            _picScrollInit(){
                if(this.seller.pics){
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length - 6;
                    this.$refs.picsList.style.width = width + 'px';
                    this.$nextTick(() => {
                        if(!this.picWrapper){
                            this.picWrapper = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                click: true,
                            });
                        }
                    })
                }
            },
            _favoriteToggle(){
                this.favorite = !this.favorite;
                this.localStorageSet(this.seller.id, 'favorite', this.favorite)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../common/style/mixin.less";

	.seller{
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;

        .seller-content{
            .overview{
                padding: 18px;

                .title{
                    margin-bottom: 8px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .desc{
                    padding-bottom: 18px;
                    font-size: 0;
                    .border-1px(rgba(7, 17, 27, 0.1));

                    .star{
                        display: inline-block;
                        margin-right: 8px;
                        line-height: 18px;
                        vertical-align: top;
                    }
                    .text{
                        display: inline-block;
                        margin-right: 12px;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 10px;
                        color: rgb(77, 85, 93);
                    }
                }
                .remark{
                    display: flex;
                    padding-top: 18px;

                    .block{
                        flex: 1;
                        text-align: center;
                        border-right: 1px solid rgba(7, 17, 27, 0.1);
                        &:last-child{
                            border-right: 0;
                        }
                    }
                    .title{
                        margin-bottom: 4px;
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .content{
                        line-height: 24px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);

                        .stress{
                            font-size: 24px;
                        }
                    }
                }
                .favorite{
                    position: absolute;
                    right: 10px;
                    top: 18px;
                    width: 40px;
                    text-align: center;

                    .icon-favorite{
                        display: block;
                        margin-bottom: 4px;
                        font-size: 24px;
                        color: #d4d6d9;

                        &.z-active{
                            color: rgb(240, 20, 20);
                        }
                    }
                    .text{
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }   
                }
            }
            .bulletin{
                padding: 18px 0 18px 18px;
                
                .title{
                    margin-bottom: 8px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .content-wrapper{
                    padding: 0 12px 16px 12px;
                    .border-1px(rgba(7, 17, 27, 0.1));

                    .content{
                        line-height: 24px;
                        font-size: 12px;
                        color: rgb(240, 20, 20);
                    }
                }
                .supports{
                    .support-item{
                        padding: 16px 12px;
                        font-size: 0;
                        .border-1px(rgba(7, 17, 27, 0.1));
                        &:last-child{
                            .border-none()
                        }

                        .icon{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 6px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;

                            &.decrease{
                                .bg-image('content/seller/decrease_4');
                            }
                            &.discount{
                                .bg-image('content/seller/discount_4');
                            }
                            &.guarantee{
                                .bg-image('content/seller/guarantee_4');
                            }
                            &.invoice{
                                .bg-image('content/seller/invoice_4');
                            }
                            &.special{
                                .bg-image('content/seller/special_4');
                            }
                        }
                        .text{
                            line-height: 16px;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                        }
                    }
                }
            }
            .pics{
                padding: 18px;

                .title{
                     margin-bottom: 12px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .pic-wrapper{
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;

                    .pic-list{
                        font-size: 0;

                        .pic-item{
                            display: inline-block;
                            margin-right: 6px;
                            width: 120px;
                            height: 90px;

                            &:list-child{
                                margin-right: 0
                            }
                        }
                    }
                }
            }
            .info{
                padding: 18px 18px 0 18px;

                .title{
                    padding-bottom: 12px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    .border-1px(rgba(7, 17, 27, 0.1));
                }
                .info-list{
                    .info-item{
                        padding: 16px 12px;
                        line-height: 16px;
                        font-size: 12px;
                        .border-1px(rgba(7, 17, 27, 0.1));
                        color: rgb(7, 17, 27);
                        &:last-child{
                            .border-none();
                        }
                    }
                }
            }
        }
    }
</style>
