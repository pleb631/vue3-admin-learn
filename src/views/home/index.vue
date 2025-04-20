<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();

onMounted(() => {
  userStore.userInfo()
})
</script>

<template><div>hello {{ userStore.username }}</div></template>

<style scoped></style>
