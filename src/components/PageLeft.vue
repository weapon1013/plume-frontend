<template>
    <aside class="layout-sidebar flex flex-column">
        <router-link to="/feed">
            <div class="flex pl-5 pt-5 pr-3 gap-2">
                <span class="pi-profile align-content-center"><i class="pi pi-user"></i></span>
                <div class="flex flex-column text-left">
                    <span class="font-semibold">닉네임</span>
                    <span class="text-sm">aaa@gmail.com</span>
                </div>
                <div class="flex justify-content-end flex-1">
                    <span class="text-2xl"><i class="pi pi-spin pi-cog"></i></span>
                </div>
            </div>
        </router-link>
        <ul class="list-none p-3">
            <li>
                <router-link to="/feed" class="p-3 align-items-center flex">
                    <i class="pi pi-th-large mr-2"></i>
                    <span>전체</span>
                </router-link>
            </li>
            <li>
                <router-link to="/feed" class="p-3 align-items-center flex">
                    <i class="pi pi-lock mr-2"></i>
                    <span>나</span>
                </router-link>
            </li>
            <li>
                <router-link to="/feed" class="p-3 align-items-center flex">
                    <i class="pi pi-user-plus mr-2"></i>
                    <span>팔로우</span>
                </router-link>
            </li>
            <li>
                <router-link to="/feed" class="p-3 align-items-center flex">
                    <i class="pi pi-users mr-2"></i>
                    <span>그룹</span>
                </router-link>
            </li>
        </ul>
        <div class="mt-auto">
            지출현황
        </div>
    </aside>
</template>

<script setup>

</script>

<style>
.pi-profile{
    background-color: blueviolet;
    width: 40px;
    height: 40px;
    border-radius: 30px;
}
</style>
