//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin, reqUserInfo } from "@/api/user";
//引入数据类型
import type { loginForm } from "@/api/user/type";

import type { UserState, loginResponseData } from "./types/type";

import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
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
        async userLogin(data: loginForm) {
            const result: loginResponseData = await reqLogin(data);
            if (result.code == 200) {
                this.token = result.data.token as string;

                SET_TOKEN(result.data.token as string);

                return "ok";
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        },
        async userInfo() {
            //获取用户信息进行存储
            let result = await reqUserInfo();
            console.log("result",result)
            if (result.code == 200) {
                this.username = result.data.checkUser.username;
                this.avatar = result.data.checkUser.avatar;
            }
        },

        userLogout() {
            this.token = "";
            this.username = "";
            this.avatar = "";
            REMOVE_TOKEN();
        },
    },
    getters: {},
});
//对外暴露小仓库
export default useUserStore;
