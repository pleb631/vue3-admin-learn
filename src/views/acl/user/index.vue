<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import {
    reqUserInfo,
    reqAddOrUpdateUser,
    reqRemoveUser,
    reqAllRole,
    reqSetUserRole,
    reqSelectUser,
} from "@/api/acl/user";
import type {
    UserResponseData,
    Records,
    User,
    AllRole,
    AllRoleResponseData,
    SetRoleData,
} from "@/api/acl/user/type";

import useLayOutSettingStore from "@/store/modules/setting";
let settingStore = useLayOutSettingStore();
const reset = () => {
    settingStore.refresh = !settingStore.refresh;
};

const total = ref<number>(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(5);
const drawer = ref<boolean>(false);
const drawer1 = ref<boolean>(false);
const formRef = ref<any>();
const keyword = ref<string>("");

let checkAll = ref<boolean>(false);
let isIndeterminate = ref<boolean>(true);
let allRole = ref<AllRole>([]);
let userRole = ref<AllRole>([]);
let selectIdArr = ref<any>([]);
const userParams = reactive<User>({
    username: "",
    name: "",
    password: "",
});
const userArr = ref<Records>([]);
onMounted(() => {
    getHasUser();
});
const getHasUser = async (pager = 1) => {
    pageNo.value = pager;
    let result: UserResponseData = await reqUserInfo(
        pageNo.value,
        pageSize.value,
        keyword.value
    );
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
};

const hander = () => {
    getHasUser();
};
const search = () => {
    getHasUser();
    keyword.value = "";
};
const deleteSelectUser = async () => {
    let idsList: any = selectIdArr.value.map((item) => {
        return item.id;
    });

    let result: any = await reqSelectUser(idsList);
    if (result.code == 200) {
        ElMessage({ type: "success", message: "删除成功" });
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
};

const addUser = () => {
    drawer.value = true;
    Object.assign(userParams, {
        id: 0,
        username: "",
        name: "",
        password: "",
    });
    nextTick(() => {
        formRef.value.clearValidate("username");
        formRef.value.clearValidate("name");
        formRef.value.clearValidate("password");
    });
};

const cancel = () => {
    drawer.value = false;
};
const save = async () => {
    const res = await formRef.value.validate();
    console.log(res);
    let result: any = await reqAddOrUpdateUser(userParams);
    if (result.code == 200) {
        drawer.value = false;
        ElMessage({
            type: "success",
            message: userParams.id ? "更新成功" : "添加成功",
        });
        window.location.reload();
    } else {
        drawer.value = false;
        ElMessage({
            type: "error",
            message: userParams.id ? "更新失败" : "添加失败",
        });
    }
};

const validatorUsername = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error("用户名字至少五位"));
    }
};
const validatorName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error("用户昵称至少五位"));
    }
};
const validatorPassword = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 6) {
        callBack();
    } else {
        callBack(new Error("用户密码至少六位"));
    }
};
const rules = {
    username: [
        { required: true, trigger: "blur", validator: validatorUsername },
    ],
    name: [{ required: true, trigger: "blur", validator: validatorName }],
    password: [
        { required: true, trigger: "blur", validator: validatorPassword },
    ],
};
const updateUser = (row: User) => {
    drawer.value = true;
    Object.assign(userParams, row);
    nextTick(() => {
        formRef.value.clearValidate("username");
        formRef.value.clearValidate("name");
    });
};
const deleteUser = async (userId: number) => {
    let result: any = await reqRemoveUser(userId);
    if (result.code == 200) {
        ElMessage({ type: "success", message: "删除成功" });
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
};

const setRole = async (row: User) => {
    Object.assign(userParams, row);
    let result: AllRoleResponseData = await reqAllRole(userParams.id as number);
    if (result.code == 200) {
        allRole.value = result.data.allRolesList;
        userRole.value = result.data.assignRoles;
        drawer1.value = true;
    }
};

const handleCheckAllChange = (val: boolean) => {
    userRole.value = val ? allRole.value : [];
    isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
    checkAll.value = value.length === allRole.value.length;
    isIndeterminate.value = value.length !== allRole.value.length;
};

const confirmClick = async () => {
    let data: SetRoleData = {
        userId: userParams.id as number,
        roleIdList: userRole.value.map((item) => {
            return item.id as number;
        }),
    };
    let result: any = await reqSetUserRole(data);
    if (result.code == 200) {
        ElMessage({ type: "success", message: "分配职务成功" });
        drawer1.value = false;
        getHasUser(pageNo.value);
    }
};

const selectChange = (value: any) => {
    selectIdArr.value = value;
};
</script>

<style scoped></style>

<template>
    <el-card style="height: 80px">
        <el-form
            :inline="true"
            class="form"
        >
            <el-form-item label="用户名:">
                <el-input
                    placeholder="请你输入搜索用户名"
                    v-model="keyword"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    size="default"
                    @click="search"
                    >搜索</el-button
                >
                <el-button
                    type="primary"
                    size="default"
                    @click="reset"
                    >重置</el-button
                >
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px">
        <el-button
            type="primary"
            size="default"
            @click="addUser"
            >添加用户</el-button
        >
        <el-button
            type="primary"
            size="default"
            @click="deleteSelectUser"
            >批量删除</el-button
        >
        <!-- table展示用户信息 -->
        <el-table
            style="margin: 10px 0px"
            border
            :data="userArr"
            @selection-change="selectChange"
        >
            <el-table-column
                type="selection"
                align="center"
            ></el-table-column>
            <el-table-column
                label="#"
                align="center"
                type="index"
            ></el-table-column>
            <el-table-column
                label="ID"
                align="center"
                prop="id"
            ></el-table-column>
            <el-table-column
                label="用户名字"
                align="center"
                prop="username"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="用户名称"
                align="center"
                prop="name"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="用户角色"
                align="center"
                prop="roleName"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="创建时间"
                align="center"
                prop="createTime"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="更新时间"
                align="center"
                prop="updateTime"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="操作"
                width="300px"
                align="center"
                ><template #="{ row }">
                    <el-button
                        type="primary"
                        size="small"
                        icon="User"
                        @click="setRole(row)"
                        >分配角色</el-button
                    >
                    <el-button
                        type="success"
                        size="small"
                        icon="Edit"
                        @click="updateUser(row)"
                        >编辑</el-button
                    >
                    <el-popconfirm
                        :title="`你确定要删除${row.username}?`"
                        width="260px"
                        @confirm="deleteUser(row.id)"
                    >
                        <template #reference>
                            <el-button
                                type="danger"
                                size="small"
                                icon="Delete"
                                >删除</el-button
                            >
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 7, 9, 11]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getHasUser"
            @size-change="hander"
        />
    </el-card>

    <el-drawer v-model="drawer">
        <!-- 头部标题:将来文字内容应该动态的 -->
        <template #header>
            <h4>添加用户</h4>
        </template>
        <!-- 身体部分 -->
        <template #default>
            <el-form
                :model="userParams"
                :rules="rules"
                ref="formRef"
            >
                <el-form-item
                    label="用户姓名"
                    prop="name"
                >
                    <el-input
                        placeholder="请您输入用户姓名"
                        v-model="userParams.username"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="用户昵称"
                    prop="username"
                >
                    <el-input
                        placeholder="请您输入用户昵称"
                        v-model="userParams.name"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="用户密码"
                    prop="password"
                >
                    <el-input
                        placeholder="请您输入用户密码"
                        v-model="userParams.password"
                    ></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button
                    type="primary"
                    @click="cancel"
                    >取消</el-button
                >
                <el-button
                    type="primary"
                    @click="save"
                    >确定</el-button
                >
            </div>
        </template>
    </el-drawer>

    <el-drawer v-model="drawer1">
        <template #header>
            <h4>分配角色</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input
                        :disabled="true"
                        v-model="userParams.username"
                    />
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item label="职位列表">
                    <el-checkbox
                        v-model="checkAll"
                        :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange"
                        >全选</el-checkbox
                    >
                    <el-checkbox-group
                        v-model="userRole"
                        @change="handleCheckedCitiesChange"
                    >
                        <el-checkbox
                            v-for="(role, index) in allRole"
                            :key="index"
                            :label="role"
                            >{{ role.roleName }}</el-checkbox
                        >
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer1 = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="confirmClick"
                    >确认</el-button
                >
            </div>
        </template>
    </el-drawer>
</template>
