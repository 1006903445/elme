<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart" @click.stop>
                <transition name="rotate">
                    <span class="inner icon-remove_circle_outline" v-show="food.count > 0"></span>
                </transition>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add" @click="addCart" @click.stop>
            <span class="inner icon-add_circle"></span>
        </div>
    </div>
</template>

<script>    
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event){
                if(!this.food.count){
                    this.$set(this.food,'count',1);
                }else{
                    this.food.count ++;
                }
                this.$emit('cartAdd',event.target);
            },
            decreaseCart(){
                if(this.food.count){
                    this.food.count --;
                }else{
                    this.food.count = 0;
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .cartcontrol{
        font-size: 0;

        .cart-decrease, .cart-add{
            display: inline-block;
            padding: 6px;

            .inner{
                display: inline-block;
                line-height: 24px;
                font-size: 24px;
                color: rgb(0, 162, 220);
            }
        }
        .cart-count{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
    }
	
</style>
