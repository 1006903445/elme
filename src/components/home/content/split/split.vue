<template>
    <div class="split"></div>
</template>

<script>
    import Cartcontrol from '@/components/home/cartControl/cartcontrol';
    import BScroll from 'better-scroll';

    export default {
    }
</script>

<style lang="less" scoped>
    @import "../../../../common/style/mixin.less";
        
    .split{
        width: 100%;
        height: 16px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        background: #f3f5f7;
    }

</style>
