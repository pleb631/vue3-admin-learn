import request from "@/utils/request";
import type {
    loginFormData,
    loginResponseData,
    userInfoResponseData,
} from "./type.ts";

enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout",
}

export const reqLogin = (data: loginFormData) => {
    return request.post<any, loginResponseData>(API.LOGIN_URL, data);
};

export const reqUserInfo = () => {
    return request.get<any, userInfoResponseData>(API.USERINFO_URL);
};

export const reqLogout = () => {
    return request.post<any, any>(API.LOGOUT_URL);
};
