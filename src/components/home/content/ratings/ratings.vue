<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务状态</span>
                        <span class="star">
                            <v-star :size="36" :score="seller.serviceScore"></v-star>
                        </span>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <span class="star">
                            <v-star :size="36" :score="seller.foodScore"></v-star>
                        </span>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <v-split></v-split>
            <v-rating-select 
            :desc="desc"
            :selectType="selectType" 
            :onlyContent="onlyContent" 
            :ratings="ratings" 
            @selectTypeChange="selectTypeChange"
            @onlyContentChange="onlyContentChange"
            ></v-rating-select>
            <div class="rating-wrapper">
                <ul v-if="showRatings.length">
                    <li v-for="rating in showRatings" class="rating-item">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <span class="star">
                                    <v-star :size="24" :score="rating.score"></v-star>
                                </span>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend.length">
                                <i :class="{'icon-thumb_up':rating.rateType == 0,'icon-thumb_down': rating.rateType == 1}"></i>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate('yyyy-MM-dd hh:mm')}}</div>
                        </div>
                    </li>
                </ul>
                <div class="no-rating" v-else>
                    暂无评论
                </div>
            </div>
        </div>
        <v-shopcart  ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shopcart>
    </div>
</template>

<script>
    import RatingSelect from '@/components/home/content/ratingSelect/ratingSelect';
    import Shopcart from '@/components/home/content/shopcart/shopcart';
    import Split from '@/components/home/content/split/split';
    import Star from '@/components/home/star/star.vue'
    import BScroll from 'better-scroll';

    const TIVE= {
        all: 2,
        positive: 0,
        negative: 1,
    }

    export default {
        components: {
            'v-rating-select': RatingSelect,
            'v-split': Split,
            'v-star': Star,
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
                ratings: [],
                desc: {
                    all: "全部",
                    positive: "满意",
                    negative: "不满意"
                },
                selectType: TIVE.all,
                onlyContent: false,
            }
        },
        computed: {
            showRatings(){
                this._scrollInit();
                if(this.selectType == TIVE.all){
                    return this.ratings.filter((rating) => {
                        return !this.onlyContent || rating.text;
                    });
                }else if(this.selectType == TIVE.positive){
                    return this.ratings.filter((rating) => {
                        return rating.rateType == TIVE.positive && (!this.onlyContent || rating.text);
                    });
                }else if(this.selectType == TIVE.negative){
                    return this.ratings.filter((rating) => {
                        return rating.rateType == TIVE.negative && (!this.onlyContent || rating.text);;
                    });
                }
            }
        },
        created(){
            this.Axios.get('/api/ratings?id='+this.seller.id)
                .then((res) => {
                    if(res.errno === this.ERR_OK){
                        this.ratings = res.data;
                    }else{
                        alert('网络错误，请稍后重试')
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },
        methods: {
            _scrollInit(){
                this.$nextTick(() => {
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.ratings, {
                            click: true,
                        });
                    }else{
                        this.scroll.refresh();
                    }
                })
            },
            selectTypeChange(type){
                this.selectType = type;
            },
            onlyContentChange(){
                this.onlyContent = !this.onlyContent;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../common/style/mixin.less";

	.ratings{
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;

        .ratings-content{
            .overview{
                display: flex;
                padding: 18px 0;

                .overview-left{
                    flex: 0 0 137px;
                    padding-bottom: 6px 0;
                    width: 137px;
                    border-right: 1px solid rgba(7, 17, 27, 0.1);
                    text-align: center;
                    @media only screen and (max-width: 350px){
                        flex: 0 0 120px;
                        width: 120px;
                    }

                    .score{
                        margin-bottom: 6px;
                        line-height: 28px;
                        font-size: 24px;
                        color: rgb(255, 153, 0);
                    }
                    .title{
                        margin-bottom: 8px;
                        line-height: 12px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .rank{
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
                .overview-right{
                    flex: 1;
                    padding: 6px 0 6px 24px;
                    @media only screen and (max-width: 350px){
                        padding: 6px 0 6px 6px;
                    }
                    
                    .score-wrapper{
                        margin-bottom: 8px;
                        font-size: 0;

                        .title{
                            display: inline-block;
                            line-height: 18px;
                            vertical-align: top;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                        }
                        .star{
                            display: inline-block;
                            margin: 0 6px;
                            vertical-align: top;
                        }
                        .score{
                            display: inline-block;
                            line-height: 18px;
                            vertical-align: top;
                            font-size: 12px;
                            color: rgb(255, 153, 0);
                        }
                    }
                    .delivery-wrapper{
                        font-size: 0;

                        .title{
                            line-height: 18px;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                        }
                        .delivery{
                            margin-left: 12px;
                            font-size: 12px;
                            color: rgb(147, 153, 159);
                        }
                    }
                }
            }
            .rating-wrapper{
                padding: 0 18px;
                
                .rating-item{
                    display: flex;
                    padding: 18px 0;
                    .border-1px(rgba(7, 17, 27, 0.1));

                    .avatar{
                        flex: 0 0 28px;
                        width: 28px;
                        height: 28px;
                        margin-right: 12px;

                        img{
                            display: block;
                            border-radius: 50%;
                        }
                    }
                    .content{
                        position: relative;
                        flex: 1;
                        
                        .name{
                            margin-bottom: 4px;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(7, 17, 27);
                        }
                        .star-wrapper{
                            margin-bottom: 6px;
                            font-size: 0;

                            .star{
                                display: inline-block;
                                margin-right: 6px;
                                vertical-align: top;
                            }
                            .delivery{
                                display: inline-block;
                                line-height: 12px;
                                font-size: 10px;
                                color: rgb(147, 153, 159);
                            }
                        }
                        .text{
                            margin-bottom: 8px;
                            line-height: 18px;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                        }
                        .recommend{
                            line-height: 16px;
                            font-size: 0;

                            .icon-thumb_up, .icon-thumb_down, .item{
                                display: inline-block;
                                margin: 0 8px 4px 0;
                                vertical-align: top;
                                font-size: 9px;
                            }
                            .icon-thumb_up{
                                color: rgb(0, 160, 220);
                            }
                            .icon-thumb_down{
                                color: rgb(147, 153, 159);
                            }
                            .item{
                                padding: 0 6px;
                                border: 1px solid rgba(7, 17, 27, 0.1);
                                border-radius: 1px;
                                color: rgb(147, 153, 159);
                                background: #fff;
                            }
                        }
                        .time{
                            position: absolute;
                            right: 0;
                            top: 0;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                }
            }
        }
    }
</style>