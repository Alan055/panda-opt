<template>
    <div class="topBar">
        <el-menu class="sidebar-el-menu"
                 :default-active="onRoutes"
                 :collapse="collapse"
                 background-color="#ffffff"
                 text-color="#333333"
                 active-text-color="#20a0ff"
                 router
                 mode="horizontal"
        >
            <template v-for="item in subTab">
                    <el-menu-item :index="item.index" :key="item.index">
                       <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        props: ['subTab'],
        name: 'vTopTab',
        data() {
            return {
                collapse: false
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏

        }
    }
</script>

<style scoped>
    .topBar{
        display: block;
        position: relative;
        overflow-y: scroll;

    }
    .topBar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: auto;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
