
import router from "@/router";
import setting from "./setting";
import nprogress from "nprogress";

import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false });

import useUserStore from "./store/modules/user";

import pinia from "./store";
const userStore = useUserStore(pinia);

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = `${setting.title}-${to.meta.title}`;

    nprogress.start();

    const token = userStore.token;

    let username = userStore.username;

    if (token) {
        if (to.path == "/login") {
            next("/home");
        } else {
            if (username) {
                next();
            } else {
                try {
                    await userStore.userInfo();
                    next();
                } catch (error) {
                    userStore.userLogout();
                    next({ path: "/login", query: { redirect: to.path } });
                }
            }
        }
    } else {
        if (to.path == "/login") {
            next();
        } else {
            next({ path: "/login", query: { redirect: to.path } });
        }
    }
    next();
});

router.afterEach((to: any, from: any) => {
    nprogress.done();
});
