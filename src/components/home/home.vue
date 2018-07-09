<template>
    <div class="home">
        <v-header :seller="seller"></v-header>
        <v-tab :seller="seller"></v-tab>
        <v-content :seller="seller"></v-content>
    </div>
</div>
</template>

<script>
    import Header from '@/components/home/header/header.vue'
    import Tab from '@/components/home/tab/tab.vue'
    import Content from '@/components/home/content/content.vue'

    export default {
        components: {
            "v-header": Header,
            "v-tab": Tab,
            "v-content": Content
        },
        data () {
            return {
                id: null,
                seller: {}
            }
        },
        created () {
            this.id = this.urlParse().id;
            this.Axios.get('/api/seller?id='+this.id)
                .then((res) => {
                    if(res.errno === this.ERR_OK){
                        this.seller = res.data;
                        this.$set(this.seller,'id', this.id);
                    }else{
                        alert('网络错误，请稍后重试')
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },
        computed: {

        }
    }
</script>

<style lang="less">
    
</style>
