<template>
    <el-card class="box-card">
        <el-button
            type="primary"
            size="default"
            icon="Plus"
            @click="addTrademark"
            >添加品牌</el-button
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
                        size="small"
                        @click="updateTradeMar(row)"
                        >修改</el-button
                    >
                    <el-popconfirm
                        title="Are you sure to delete this?"
                        @confirm="removeTradeMark(row.id)"
                    >
                        <template #reference>
                            <el-button size="small">Delete</el-button>
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
import { ElMessage, UploadProps } from "element-plus";
import { ref, onMounted, reactive, nextTick } from "vue";

import {
    reqHasTrademark,
    reqAddOrUpdateTrademark,
    reqDeleteTrademark,
} from "@/api/product/trademark";
import type { Records, TradeMarkResponseData,TradeMark } from "@/api/product/trademark/type.ts";

const table = ref();
const formRef = ref();

const dialogFormVisible = ref<boolean>(false);
const pageNo = ref<number>(1);
const limit = ref<number>(3);
const total = ref<number>(0);
const trademarkArr = ref<Records>([]);

const trademarkParams = reactive<TradeMark>({
    tmName: "",
    logoUrl: "",
});

const getHasTrademark = async (page: number = 1) => {
    pageNo.value = page;
    let result: TradeMarkResponseData = await reqHasTrademark(
        pageNo.value,
        limit.value
    );
    if (result.code == 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
        console.log(trademarkArr);
    }
};

const sizeChange = () => {
    getHasTrademark();
};

onMounted(() => {
    getHasTrademark();
});

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
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

    trademarkParams.logoUrl = response.data;
    formRef.value.clearValidate("logoUrl");
};

const confirm = async () => {
    if (trademarkParams.logoUrl == "") {
        trademarkParams.logoUrl = "";
    }
    await formRef.value.validate();
    let result: any = await reqAddOrUpdateTrademark(trademarkParams);

    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
        });

        getHasTrademark(trademarkParams.id ? pageNo.value : 1);
    } else {
        ElMessage({
            type: "error",
            message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
        });
    }
    cancel();
};
const cancel = () => {
    dialogFormVisible.value = false;
    trademarkParams.id = 0;
    trademarkParams.tmName = "";
    trademarkParams.logoUrl = "";
};

const updateTradeMar = (row: TradeMark) => {
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
    let result = await reqDeleteTrademark(id);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "删除品牌成功",
        });

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
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error("品牌名称位数大于等于两位"));
    }
};

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    if (value) {
        callBack();
    } else {
        callBack(new Error("LOGO图片务必上传"));
    }
};

const rules = {
    tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
    logoUrl: [{ required: true, validator: validatorLogoUrl }],
};

const addTrademark = () => {
    dialogFormVisible.value = true;
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
