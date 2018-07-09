<template>
    <div class="rating-select">
        <div class="rating-type border-1px">
            <span class="tab all" :class="{'z-active':selectType == 2}" @click="_tab(2)">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="tab positive" :class="{'z-active':selectType == 0}" @click="_tab(0)">
                {{desc.positive}}
                <span class="count">{{positiveS.length}}</span>
            </span>
            <span class="tab negative" :class="{'z-active':selectType == 1}" @click="_tab(1)">
                {{desc.negative}}
                <span class="count">{{negativeS.length}}</span>
            </span>
        </div>
        <div class="switch" :class="{'on': onlyContent}" @click="_switch">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const TIVE= {
        all: 2,
        positive: 0,
        negative: 1,
    }

    export default {
        props: {
            ratings: {
                type: Array,
                default(){
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: TIVE.all
            },
            onlyContent: {
                type: Boolean,
                default: false,
            },
            desc: {
                type: Object,
                default(){
                    return {
                        all: "全部",
                        positive: "满意",
                        negative: "不满意"
                    }
                }
            }
        },
        computed: {
            positiveS(){
                return this.ratings.filter((rating) => {
                    return rating.rateType == TIVE.positive;
                });
            },
            negativeS(){
                return this.ratings.filter((rating) => {
                    return rating.rateType == TIVE.negative;
                });
            }
        },
        methods: {
            _tab(type){
                this.$emit('selectTypeChange',type);
            },
            _switch(){
                this.$emit('onlyContentChange',this.onlyContent);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../common/style/mixin.less";
        
    .rating-select{
        .rating-type{
            padding: 18px 0;
            margin: 0 18px;
            font-size: 0;
            .border-1px(rgba(7, 17, 27, 0.2));

            .tab{
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                line-height: 16px;
                border-radius: 1px;
                font-size: 12px;
                color: rgb(77, 85, 93);

                &.z-active{
                    color: #fff;
                }
                &:last-child{
                    margin-right: 0;
                }
                &.all{
                    background: rgba(0, 160, 220, 0.2);

                    &.z-active{
                        background: rgba(0, 160, 220, 1);
                    }
                }
                &.positive{
                    background: rgba(0, 160, 220, 0.2);

                    &.z-active{
                        background: rgba(0, 160, 220, 1);
                    }
                }
                &.negative{
                    background: rgba(77, 85, 93, 0.2);

                    &.z-active{
                        background: rgba(77, 85, 93, 1);
                    }
                }
                .count{
                    display: inline-block;
                    font-size: 8px;
                    margin-left: 2px;
                }
            }
        }
        .switch{
            padding: 12px 18px;
            line-height: 24px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            color: rgb(147, 153, 159);
            font-size: 0;
            
            .icon-check_circle{
                display: inline-block;
                vertical-align: top;
                font-size: 24px;
                margin-right: 4px;
            }
            .text{
                display: inline-block;
                vertical-align: top;
                font-size: 16px;
            }
            &.on{
                .icon-check_circle{
                    color: #00c850;
                    
                }
            }
        }
    }

</style>
