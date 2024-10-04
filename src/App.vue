<template>
    <div class="layout-wrapper min-h-screen">
        <PageHeader></PageHeader>
        <router-view></router-view>
        <Toast position="bottom-right"/>
    </div>
</template>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import Toast from 'primevue/toast';
</script>

<style>
@import "../src/assets/css/index.css";
@import "../src/assets/css/screen.css";
@import 'primeicons/primeicons.css';
</style>
