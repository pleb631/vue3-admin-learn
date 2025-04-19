import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import path from "path";
import { viteMockServe } from "vite-plugin-mock";
// https://vite.dev/config/
export default ({ command }) => {
    return {
        plugins: [
            vue(),
            VueSetupExtend(),
            viteMockServe({
                mockPath: "mock", // mock 文件夹路径
                localEnabled: command === "serve",
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
                // Specify symbolId format
                symbolId: "icon-[dir]-[name]",
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "~": path.resolve(__dirname, "src/assets"),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // javascriptEnabled: true,
                    additionalData: `@import "@/styles/variable.scss";`,
                },
            },
        },
    };
};
