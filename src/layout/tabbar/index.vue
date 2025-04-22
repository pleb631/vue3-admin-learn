import type { Loading } from
'element-plus/es/components/loading/src/service.mjs';
<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon
                style="margin-right: 10px"
                @click="changeIcon"
            >
                <component
                    :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"
                ></component>
            </el-icon>

            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item
                    v-for="(item, index) in $route.matched"
                    :key="index"
                    v-show="item.meta.title"
                    :to="item.path"
                >
                    <el-icon style="vertical-align: middle">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span style="margin: 0 5px; vertical-align: middle">
                        {{ item.meta.title }}
                    </span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <el-button
                size="small"
                icon="Refresh"
                circle
                @click="updateRefresh"
            ></el-button>
            <el-button
                size="small"
                icon="FullScreen"
                circle
                @click="fullScreen"
            ></el-button>
            <el-button
                size="small"
                icon="Setting"
                circle
            ></el-button>
            <img
                :src="userStore.avatar"
                style="
                    width: 24px;
                    height: 24px;
                    margin: 0px 10px;
                    border-radius: 50%;
                "
            />

            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userStore.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout"
                            >退出登陆</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";

import { useRoute, useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";

let $route = useRoute();
let $router = useRouter();
let LayOutSettingStore = useLayOutSettingStore();
const userStore = useUserStore();

const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold;
};

const updateRefresh = () => {
    LayOutSettingStore.refresh = !LayOutSettingStore.refresh;
};

const fullScreen = () => {
    let full = document.fullscreenElement;

    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

const logout = async () => {
    await userStore.userLogout();
    $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(
        to right,
        rgb(236, 229, 229),
        rgb(151, 136, 136),
        rgb(240, 234, 234)
    );
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>
