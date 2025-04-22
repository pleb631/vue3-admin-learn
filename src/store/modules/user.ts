import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoute } from "@/router/routes";

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
