import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "./type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";
import router from "@/router";
import cloneDeep from "lodash/cloneDeep";
let dynamicRoutes: RouteRecordRaw[] = [];

function filterAsyncRoute(asyncRoute: any, routes: any) {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes);
            }
            return true;
        }
    });
}


const useUserStore = defineStore("User", {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute,
            username: "",
            avatar: "",
        };
    },

    actions: {
        async userLogin(data: any) {
            const result: any = await reqLogin(data);

            if (result.code == 200) {
                this.token = result.data as string;

                SET_TOKEN(result.data as string);
                return "ok";
            } else {
                return Promise.reject(new Error(result.data));
            }
        },

        async userInfo() {
            const result = await reqUserInfo();
            console.log(result);

            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;

                const userAsyncRoute = filterAsyncRoute(
                    cloneDeep(asyncRoute),
                    result.data.routes
                );
                this.menuRoutes = [
                    ...constantRoute,
                    ...userAsyncRoute,
                    anyRoute,
                ];
                dynamicRoutes = [...userAsyncRoute, anyRoute];                 dynamicRoutes.forEach((route) => {
                    router.addRoute(route);                 });
                return "ok";
            } else {
                return Promise.reject(new Error(result.message));
            }
        },

        async userLogout() {
            const result = await reqLogout();
            if (result.code == 200) {
                this.token = "";
                this.username = "";
                this.avatar = "";
                REMOVE_TOKEN();
                dynamicRoutes.forEach((route) => {
                    if (route.name) {
                        router.removeRoute(route.name);
                    }
                });
                return "ok";
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
    },
    getters: {},
});
export default useUserStore;
