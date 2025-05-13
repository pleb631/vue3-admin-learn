
import request from "@/utils/request";
import type {
    UserResponseData,
    User,
    AllRoleResponseData,
    SetRoleData,
} from "./type";

enum API {

    ALLUSER_URL = "/admin/acl/user/",
    ADDUSER_URL = "/admin/acl/user/save",

    UPDATEUSER_URL = "/admin/acl/user/update",
    REMOVEUSER_URL = "/admin/acl/user/remove/",
    DELETEALLUSER_URL = "/admin/acl/user/batchRemove",
    ALLROLEURL = "/admin/acl/user/toAssign/",
    DOASSIGNROLE_URL = "/admin/acl/user/doAssignRole",
}


export const reqUserInfo = (page: number, limit: number, username:string) => {
    return request.get<any, UserResponseData>(
        API.ALLUSER_URL + `${page}/${limit}?username=${username}`
    );
};

export const reqAddOrUpdateUser = (data: User) => {

    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data);
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data);
    }
};

export const reqRemoveUser = (userId: number) =>
    request.delete<any, any>(API.REMOVEUSER_URL + userId);

export const reqAllRole = (userId: number) => {
    return request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId);
};

export const reqSetUserRole = (data: SetRoleData) =>
    request.post<any, any>(API.DOASSIGNROLE_URL, data);

export const reqSelectUser = (idList: number[]) => {
    return request.delete(API.DELETEALLUSER_URL, { data: idList });
};

