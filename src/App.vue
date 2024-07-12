<template>
    <div class="layout-wrapper min-h-screen">
        <PageHeader></PageHeader>
        <router-view></router-view>
    </div>
</template>

<script>
import PageHeader from "./components/PageHeader.vue";

export default {
    name: "App",
    components: {
        PageHeader, //헤더 페이지 컴포넌트 선언
    },
};
</script>

<style>
@import "../src/assets/css/index.css";
@import "../src/assets/css/screen.css";
@import 'primeicons/primeicons.css';
</style>
