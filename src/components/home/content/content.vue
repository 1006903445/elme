<template>
    <div class="content">
        <keep-alive>
            <transition name="fade">
                <router-view :seller="seller" :selectFoods="selectFoods" :goods="goods"></router-view>
            </transition>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data(){
            return {
                goods: []
            }
        },
        computed: {
            selectFoods(){
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count){
                            foods.push(food)
                        }
                    })
                })
                return foods;
            }
        }, 
        created(){
            this.Axios.get('/api/goods?id='+this.seller.id)
                .then((res) => {
                    if(res.errno === this.ERR_OK){
                        this.goods = res.data;
                    }else{
                        alert('网络错误，请稍后重试')
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },
    }
</script>

<style scoped>
	
</style>
