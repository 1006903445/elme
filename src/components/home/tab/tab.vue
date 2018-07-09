<template>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link :to="{path:'/goods',query:{id:seller.id}}">商品</router-link>
        </div>
         <div class="tab-item">
            <router-link :to="{path:'/ratings',query:{id:seller.id}}">评论</router-link>
        </div>
         <div class="tab-item">
            <router-link :to="{path:'/seller',query:{id:seller.id}}">商家</router-link>
        </div>
    </div>
</template>

<script>    
    export default {
        props: {
            seller: {
                type: Object
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../common/style/mixin.less";
    
	.tab{
        position: relative;
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
        .border-1px(rgba(7, 17, 27, 0.1));

        .tab-item{
            flex: 1;
            text-align: center;

            a{
                display: block;
                font-size: 14px;
                color: rgb(77, 85, 93);

                &.z-active{
                    color: rgb(240, 20, 20);
                }
            }
        }
	}

</style>
