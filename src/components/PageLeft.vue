<template>
    <aside class="d-flex p-3 flex-column text-decoration-none border">
            <div class="d-flex align-items-center">
                <router-link to="/">
                    <i class="bi bi-person-circle fs-1"></i>
                </router-link>
                <div class="d-flex">
                    <div>닉네임</div>
                    <div>aaa@gmail.com</div>
                </div>
            </div>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li><router-link to="/feed">전체</router-link></li>
                <li><router-link to="/feed">나</router-link></li>
                <li><router-link to="/feed">팔로우</router-link></li>
                <li><router-link to="/feed">그룹</router-link></li>
            </ul>
            <div>
                지출현황
            </div>
    </aside>
</template>

<script>
export default {

}
</script>

<style>
aside{height: 100vh; width:240px;}
</style>
