<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button
            type="primary"
            size="default"
            icon="Plus"
            @click="addTrademark"
            >添加品牌</el-button
        >
        <el-button
            type="primary"
            size="default"
            @click="test"
            >test</el-button
        >
        <el-table
            ref="table"
            style="margin: 10px 0px"
            :border="true"
            :data="trademarkArr"
            :stripe="true"
            :highlight-current-row="true"
        >
            <el-table-column
                label="序号"
                width="80px"
                align="center"
                type="index"
            ></el-table-column>
            <el-table-column
                label="品牌名称"
                prop="tmName"
            ></el-table-column>
            <el-table-column label="品牌LOGO">
                <template #="{ row, $index }">
                    <img
                        :src="row.logoUrl"
                        alt=""
                        style="width: 50px; height: 50px"
                    />
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row, $index }">
                    <el-button
                        type="text"
                        size="small"
                        @click="updateTradeMar(row)"
                        >修改</el-button
                    >
                    <el-popconfirm title="Are you sure to delete this?" @confirm="removeTradeMark(row.id)">
                        <template #reference>
                            <el-button>Delete</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="getHasTrademark"
            @size-change="sizeChange"
            :pager-count="9"
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :background="true"
            layout=" prev, pager, next, jumper,->,total, sizes,"
            :total="total"
        />
    </el-card>
    <el-dialog
        v-model="dialogFormVisible"
        :title="trademarkParams.id ? '修改' + trademarkParams.tmName : '新增'"
        @closed="cancel"
    >
        <template #footer>
            <el-button
                type="primary"
                size="default"
                @click="cancel"
                >取消</el-button
            >
            <el-button
                type="primary"
                size="default"
                @click="confirm"
                >确定</el-button
            >
        </template>
        <el-form
            style="width: 80%"
            ref="formRef"
            :model="trademarkParams"
            :rules="rules"
        >
            <el-form-item
                label="品牌名称"
                label-width="100px"
                prop="tmName"
            >
                <el-input
                    placeholder="请您输入品牌名称"
                    v-model="trademarkParams.tmName"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="品牌LOGO"
                label-width="100px"
                prop="logoUrl"
            >
                <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9000/product/baseTrademark/uploadPicture"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="trademarkParams.logoUrl"
                        :src="trademarkParams.logoUrl"
                        class="avatar"
                    />
                    <el-icon
                        v-else
                        class="avatar-uploader-icon"
                    >
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import {
    reqHasTrademark,
    reqAddOrUpdateTrademark,
    reqDeleteTrademark,
} from "@/api/product/trademark.ts";
import type { Records, TradeMarkResponseData } from "@/api/product/type.ts";
import { ElMessage, UploadProps } from "element-plus";
import { ref, onMounted, reactive } from "vue";

import type { TradeMark } from "@/api/product/trademark/type";

const table = ref();
const formRef = ref();
let dialogFormVisible = ref<boolean>(false);

let pageNo = ref<number>(1);

let limit = ref<number>(3);

let total = ref<number>(0);

let trademarkArr = ref<Records>([]);

const getHasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTrademark(
        pageNo.value,
        limit.value
    );
    console.log(result);
    if (result.code == 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
        console.log(trademarkArr);
    }
};

const sizeChange = () => {
    pageNo.value = 1;
    getHasTrademark();
};

onMounted(() => {
    getHasTrademark();
});

function test() {
    table.value.toggleAllSelection();
}

let trademarkParams = reactive<TradeMark>({
    tmName: "",
    logoUrl: "",
});

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
    //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
    //要求:上传文件格式png|jpg|gif 4M
    if (
        rawFile.type == "image/png" ||
        rawFile.type == "image/jpeg" ||
        rawFile.type == "image/gif"
    ) {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: "error",
                message: "上传文件大小小于4M",
            });
            return false;
        }
    } else {
        ElMessage({
            type: "error",
            message: "上传文件格式务必PNG|JPG|GIF",
        });
        return false;
    }
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile
) => {
    console.log("upload success");
    //response:即为当前这次上传图片post请求服务器返回的数据
    //收集上传图片的地址,添加一个新的品牌的时候带给服务器
    trademarkParams.logoUrl = response.data;
    //图片上传成功,清除掉对应图片校验结果
    formRef.value.clearValidate("logoUrl");
};

const confirm = async () => {
    await formRef.value.validate();
    let result: any = await reqAddOrUpdateTrademark(trademarkParams);

    if (result.code == 200) {
        dialogFormVisible.value = false;
        trademarkParams.tmName = "";
        trademarkParams.logoUrl = "";

        ElMessage({
            type: "success",
            message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
        });
        if (trademarkParams.id) {
            getHasTrademark();
            trademarkParams.id = "";
        } else {
            sizeChange();
        }
    } else {
        ElMessage({
            type: "error",
            message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
        });

        dialogFormVisible.value = false;
    }
};
const cancel = () => {
    dialogFormVisible.value = false;
    trademarkParams.tmName = "";
    trademarkParams.logoUrl = "";
};

const updateTradeMar = (row) => {
    //修改品牌
    trademarkParams.id = row.id;
    trademarkParams.tmName = row.tmName;
    trademarkParams.logoUrl = row.logoUrl;
    dialogFormVisible.value = true;

    nextTick(() => {
        formRef.value.clearValidate("tmName");
        formRef.value.clearValidate("logoUrl");
    });
};

async function removeTradeMark(id: number) {
    //点击确定按钮删除已有品牌请求
    let result = await reqDeleteTrademark(id);
    if (result.code == 200) {
        //删除成功提示信息
        ElMessage({
            type: "success",
            message: "删除品牌成功",
        });
        //再次获取已有的品牌数据
        getHasTrademark(
            trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1
        );
    } else {
        ElMessage({
            type: "error",
            message: "删除品牌失败",
        });
    }
}

const validatorTmName = (rule: any, value: any, callBack: any) => {
    //是当表单元素触发blur时候,会触发此方法
    //自定义校验规则
    if (value.trim().length >= 2) {
        callBack();
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error("品牌名称位数大于等于两位"));
    }
};
//品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error("LOGO图片务必上传"));
    }
};

const rules = {
    tmName: [
        //required:这个字段务必校验,表单项前面出来五角星
        //trigger:代表触发校验规则时机[blur、change]
        { required: true, trigger: "blur", validator: validatorTmName },
    ],
    logoUrl: [{ required: true, validator: validatorLogoUrl }],
};

const addTrademark = () => {
    //对话框显示
    dialogFormVisible.value = true;
    //清空收集数据
    trademarkParams.id = 0;
    trademarkParams.tmName = "";
    trademarkParams.logoUrl = "";
    //第一种写法:ts的问号语法
    formRef.value?.clearValidate("tmName");
    formRef.value?.clearValidate("logoUrl");
    /* nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  }) */
};
const clicked = ref(false);
function onCancel() {
    clicked.value = true;
}
</script>

<style lang="scss" scoped></style>
