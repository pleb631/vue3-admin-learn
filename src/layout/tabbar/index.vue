<script setup lang="ts">
import { ref } from "vue";
import useLayOutSettingStore from "@/store/modules/setting";
import { useRoute, useRouter } from "vue-router";
import useUserSrote from "@/store/modules/user";

const userSrote = useUserSrote();

const route = useRoute();
const router = useRouter();

const settingStore = useLayOutSettingStore();
const changeIcon = () => {
    settingStore.fold = !settingStore.fold;
};

const refresh = () => {
    settingStore.refresh = !settingStore.refresh;
};

const fullScreen = () => {
    const full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

const logout = async () => {
    await userSrote.userLogout();
    router.push({ path: "/login", query: { redirect: route.path } });
};

const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
    "#ff4500",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
    "rgba(255, 69, 0, 0.68)",
    "rgb(255, 120, 0)",
    "hsv(51, 100, 98)",
    "hsva(120, 40, 94, 0.5)",
    "hsl(181, 100%, 37%)",
    "hsla(209, 100%, 56%, 0.73)",
    "#c7158577",
]);

const setColor = () => {
    const el = document.documentElement;
    el.style.setProperty("--el-color-primary", color.value);
};

const dark = ref(false);
const changeDark = () => {
    const html = document.documentElement;
    dark.value ? (html.className = "dark") : (html.className = "");
};
</script>

<template>
    <div class="tabbar">
        <!-- 左侧 -->
        <div class="tabbar_left">
            <el-icon
                class="icon"
                @click="changeIcon"
            >
                <!-- component通过属性is的值可以渲染不同的组件 -->
                <component
                    :is="settingStore.fold ? 'Fold' : 'Expand'"
                ></component>
                <!-- <Expand /> -->
            </el-icon>
            <el-breadcrumb separator-icon="ArrowRight">
                <!-- 这里只能用v-show，不能用v-if，因为在vue3中v-if比v-for的优先级更高 -->
                <el-breadcrumb-item
                    v-for="item in route.matched"
                    :key="item.path"
                    v-show="item.meta.title"
                    :to="item.path"
                >
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    {{ item.meta.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 右侧 -->
        <div class="tabbar_right">
            <el-button
                icon="Refresh"
                circle
                @click="refresh"
            />
            <el-button
                icon="FullScreen"
                circle
                @click="fullScreen"
            />
            <el-popover
                placement="bottom"
                title="主题设置"
                :width="250"
                trigger="hover"
            >
                <el-form>
                    <el-form-item label="主题颜色">
                        <el-color-picker
                            @change="setColor"
                            v-model="color"
                            show-alpha
                            :predefine="predefineColors"
                            :teleported="false"
                        />
                    </el-form-item>
                    <el-form-item label="暗黑模式">
                        <el-switch
                            v-model="dark"
                            inline-prompt
                            active-icon="MoonNight"
                            inactive-icon="Sunny"
                            @change="changeDark"
                        />
                    </el-form-item>
                </el-form>
                <template #reference>
                    <el-button
                        icon="Setting"
                        circle
                    />
                </template>
            </el-popover>
            <img :src="userSrote.avatar" />
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userSrote.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 20px;
    background-image: linear-gradient(
        to right,
        rgb(189, 245, 178),
        rgb(67, 240, 28),
        rgb(148, 225, 140)
    );

    .tabbar_left {
        display: flex;
        align-items: center;

        .icon {
            margin-right: 7px;
        }
    }

    .tabbar_right {
        display: flex;
        align-items: center;

        img {
            width: 24px;
            height: 24px;
            margin: 0 10px;
            border-radius: 50%;
        }
    }
}
</style>
