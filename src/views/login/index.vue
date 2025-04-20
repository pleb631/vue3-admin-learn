<template>
    <div class="login_container">
        <el-row>
            <el-col
                :span="12"
                :xs="0"
            ></el-col>
            <el-col
                :span="12"
                :xs="24"
            >
                <el-form
                    class="login_form"
                    ref="loginForms"
                    :rules="rules"
                    :model="loginForm"
                >
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input
                            :prefix-icon="User"
                            v-model="loginForm.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            :prefix-icon="Lock"
                            v-model="loginForm.password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="login_btn"
                            type="primary"
                            size="default"
                            @click="login"
                            :loading="loading"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { ElNotification } from "element-plus";
import useUserStore from "@/store/modules/user";

import { getTime } from "@/utils/time";
//引入路由

import { useRouter, useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();

let useStore = useUserStore();
let loginForms = ref();

//收集账号与密码数据
let loginForm = reactive({ username: "admin", password: "111111" });
const loading = ref(false);
const login = async () => {
    //按钮加载效果
    await loginForms.value.validate();

    loading.value = true;
    try {
        await useStore.userLogin(loginForm);
        let redirect = $route.query.redirect;
        $router.push({ path: redirect || "/" });

        ElNotification({
            type: "success",
            message: "登录成功！",
            title: `Hi,${getTime()}好`,
        });

        loading.value = false;
    } catch (error) {
        loading.value = false;

        ElNotification({
            type: "error",
            message: (error as Error).message,
        });
    }
};

const validatorUserName = (rule: any, value: any, callback: any) => {
    //rule：校验规则对象
    //value:表单元素文本内容
    //callback:符合条件，callback放行通过，不符合：注入错误提示信息
    if (value.length >= 5) {
        callback();
    } else {
        callback(new Error("账号长度至少5位"));
    }
};

const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error("密码长度至少6位"));
    }
};
//定义表单校验需要的配置对象
const rules = {
    username: [{ trigger: "blur", validator: validatorUserName }],
    password: [{ trigger: "blur", validator: validatorPassword }],
};
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;
    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;
        padding: 40px;
        h1 {
            color: white;
            font-size: 40px;
        }
        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }
        .login_btn {
            width: 100%;
        }
    }
}
</style>
