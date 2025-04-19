import type { RouteRecordRaw } from "vue-router";
export interface UserState {
    token: string | null;
    menuRoutes: RouteRecordRaw[];
}


interface dataType {
    token?: string;
    message?: string;
}

//登录接口返回的数据类型
export interface loginResponseData {
    code: number;
    data: dataType;
}