<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="changeDetail">
                <span class="count">{{seller.supports.length}}</span>
                个
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="changeDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
            <v-detail :seller="seller" :detailShow="detailShow" @changeDetail="changeDetail" v-show="detailShow"></v-detail>
        </transition>
    </div>
</template>

<script>
    import detail from '@/components/home/header/detail.vue'

    export default {
        components: {
            "v-detail": detail,
        },
        props: {
            seller: {
                type: Object
            }
        },
        data(){
            return {
                detailShow: false
            };
        },
        methods: {
            changeDetail(){
                this.detailShow = !this.detailShow;
            }
        },
        created(){
            this.classMap = ['decrease','discount','guarantee','invoice','special']
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../common/style/mixin.less";
    .header{
        position: relative;
        overflow: hidden;
        color: #fff;
        background: rgba(7, 12, 27, 0.5);

        .content-wrapper{
            position: relative;
            padding: 24px 12px 18px 24px;
            font-size: 0;

            .avatar{
                display: inline-block;
                vertical-align: top;
                
                img{
                    border-radius: 2px;
                }
            }
            .content{
                display: inline-block;
                font-size: 14px;
                margin-left: 16px;
                vertical-align: top;

                .title{
                    margin: 2px 0 8px 0;

                    .brand{
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        vertical-align: top;
                        .bg-image('header/brand');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name{
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                        vertical-align: top;
                    }
                }
                .description{
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .support{
                    .icon{
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        &.decrease{
                            .bg-image('header/decrease_1');
                        }
                        &.discount{
                            .bg-image('header/discount_1');
                        }
                        &.guarantee{
                            .bg-image('header/guarantee_1');
                        }
                        &.invoice{
                            .bg-image('header/invoice_1');
                        }
                        &.special{
                            .bg-image('header/special_1');
                        }
                    }
                    .text{
                        vertical-align: top;
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
            }

            .support-count{
                position: absolute;
                right: 12px;
                bottom: 14px;
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                border-radius: 14px;
                background: rgba(0, 0, 0, 0.2);
                text-align: center;

                .count{
                    vertical-align: top;
                    font-size: 10px;
                }
                .icon-keyboard_arrow_right{
                    vertical-align: top;
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 10px;
                }
            }
        }

        .bulletin-wrapper{
            position: relative;
            width: 100%;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(7, 17, 27, 0.2);

            .bulletin-title{
                display: inline-block;
                vertical-align: top;
                margin-top: 8px;
                width: 22px;
                height: 12px;
                .bg-image('header/bulletin');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bulletin-text{
                vertical-align: top;
                margin: 0 8px;
                font-size: 10px;
                font-weight: 200;
            }
            .icon-keyboard_arrow_right{
                position: absolute;
                font-size: 10px;
                right: 12px;
                top: 8px;
            }
        }

        .background{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(10px);

            img{
                display: block;
            }
        }
    }
</style>
