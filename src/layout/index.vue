<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";
import useUserStore from "@/store/modules/user";

import { useRouter } from "vue-router";

import useLayOutSettingStore from "@/store/modules/setting";
let LayOutSettingStore = useLayOutSettingStore();

let userStore = useUserStore();

const $router = useRouter();
</script>

<template>
    <div class="layout_container">
        <div
            class="layout_slider"
            :class="{ fold: LayOutSettingStore.fold }"
        >
            <el-scrollbar class="scrollbar">
                <Logo></Logo>

                <el-menu
                    background-color="#001529"
                    text-color="white"
                    :default-active="$router.currentRoute.value.path"
                    :collapse="LayOutSettingStore.fold"
                >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>

        <div
            class="layout_tabbar"
            :class="{ fold: LayOutSettingStore.fold }"
        >
            <Tabbar></Tabbar>
        </div>

        <div
            class="layout_main"
            :class="{ fold: LayOutSettingStore.fold }"
        >
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
        transition: all 0.3s;

        &.fold {
            width: $base-menu-min-width;
        }
    }
    .layout_tabbar {
        position: fixed;
        color: white;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0;
        left: $base-menu-width;
        transition: all 0.3s;

        &.fold {
            width: calc(100% - $base-menu-min-width);
            left: $base-menu-min-width;
        }

        .scrollbar {
            height: calc(100% - $base-menu-logo-height);
        }
    }
    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100% - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>
