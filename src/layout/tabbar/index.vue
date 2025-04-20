
import type { Loading } from 'element-plus/es/components/loading/src/service.mjs';
<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <!-- 顶部左侧的图标 -->
            <el-icon
                style="margin-right: 10px"
                @click="changeIcon"
            >
                <component
                    :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"
                ></component>
            </el-icon>
            <!-- 左侧的面包屑 -->
            <el-breadcrumb
                separator-icon="ArrowRight"
            >
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
                src="/logo.jpg"
                style="width: 24px; height: 24px; margin: 0px 10px"
            />
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";

import { useRoute } from "vue-router";
//获取路由对象
let $route = useRoute();
let LayOutSettingStore = useLayOutSettingStore();
//点击图标的切换
const changeIcon = () => {
    //图标进行切换
    LayOutSettingStore.fold = !LayOutSettingStore.fold;
};

const updateRefresh = () => {

  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
};

//全屏按钮点击的回调
const fullScreen = () => {
  //DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  //切换成全屏
  if (!full) {
    //文档根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
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
