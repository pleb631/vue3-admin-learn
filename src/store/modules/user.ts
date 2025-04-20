//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "./types/type";
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入路由（常量路由）
import { constantRoute } from "@/router/routes";

//创建用户小仓库
const useUserStore = defineStore("User", {
    //小仓库存储数据地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(), //用户唯一标识token
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
                return "ok";
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
    },
    getters: {},
});
export default useUserStore;
