<template>
    <div class="detail">
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
                <h1 class="name">{{seller.name}}</h1>
                <div class="star-wrapper">
                    <v-star :size="48" :score="seller.score"></v-star>
                </div>
                <div class="titile">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
                <div class="titile">
                    <div class="line"></div>
                    <div class="text">商家信息</div>
                    <div class="line"></div>
                </div>
                <div class="bulletin">
                    <div class="content">{{seller.bulletin}}</div>
                </div>
            </div>
        </div>
        <div class="detail-close">
            <i class="icon-close" @click="changeDetail"></i>
        </div>
    </div>
</template>

<script>
    import Star from '@/components/home/star/star.vue'

    export default {
        components: {
            "v-star": Star,
        },
        props: {
            seller: {
                type: Object
            },
            detailShow: {
                type: Boolean
            }
        },
        methods: {
            
        },
        created(){
            this.classMap = ['decrease','discount','guarantee','invoice','special']
        },
        methods: {
            changeDetail(){
                this.$emit('changeDetail');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../common/style/mixin.less";
    
    .detail{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);

        .detail-wrapper{
            width: 100%;
            min-height: 100%;
            
            .detail-main{
                margin-top: 64px;
                padding-bottom: 100px;

                .name{
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                .star-wrapper{
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .titile{
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px;
                    
                    .line{
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .text{
                        padding: 0 12px;
                        font-weight: 700px;
                        font-size: 14px;
                    }
                }
                .supports{
                    width: 80%;
                    margin: auto;
                    
                    .support-item{
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        
                        &:last-child{
                            margin-bottom: 0;
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
                                .bg-image('header/decrease_2');
                            }
                            &.discount{
                                .bg-image('header/discount_2');
                            }
                            &.guarantee{
                                .bg-image('header/guarantee_2');
                            }
                            &.invoice{
                                .bg-image('header/invoice_2');
                            }
                            &.special{
                                .bg-image('header/special_2');
                            }
                        }
                        .text{
                            display: inline-block;
                            line-height: 16px;
                            font-size: 12px;
                            color: rgb(255, 255, 255);
                        }
                    }
                }
                .bulletin{
                    width: 80%;
                    margin: 0 auto;

                    .content{
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
        }

        .detail-close{
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0;
            clear: both;
            font-size: 32px;
        }
    }
</style>
