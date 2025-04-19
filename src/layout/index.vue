<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
import useUserStore from "@/store/modules/user";

import { useRouter } from "vue-router";

let userStore = useUserStore();

const $router = useRouter();
console.log($router.currentRoute.value.path);
</script>

<template>
    <div class="layout_container">
        <div class="layout_slider">
            <el-scrollbar class="scrollbar">
                <Logo></Logo>
                <!-- 菜单组件 -->
                <el-menu
                    background-color="#001529"
                    text-color="white"
                    :default-active="$router.currentRoute.value.path"
                >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar"></div>
        <!-- 内容展示区域 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
    }
    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background: cyan;
        top: 0;
        left: $base-menu-width;

        .scrollbar {
            height: calc(100% - $base-menu-logo-height);
        }
    }
    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: yellowgreen;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
    }
}
</style>
