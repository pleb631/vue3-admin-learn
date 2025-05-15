import type { RouteRecordRaw } from "vue-router";
export interface UserState {
    token: string | null;
    menuRoutes: RouteRecordRaw[];
    username: string;
    avatar: string;
    buttons: [];
}

interface dataType {
    token?: string;
    message?: string;
}

export interface loginResponseData {
    code: number;
    data: dataType;
}
