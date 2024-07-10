<template>
    <header class="layout-topbar">
        <div class="layout-topbar-start">
            <router-link to="/">
                <img src="../assets/img/plume_logo_temp.svg">
            </router-link>
            <i class="pi pi-search"></i>
            <input placeholder="검색창">
        </div>
        <div class="layout-topbar-mid">
            <ul class="list-none">
                <li>
                    <router-link to="/feed">
                        <span>Feed</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/recm">
                        <span>Recommend</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/rank">
                        <span>Rank</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="layout-topbar-end">
            <router-link to="/sign" class="block-action">
                <span>Sign up</span>
            </router-link>
            <router-link to="/login" class="block-action">
                <span>Login</span>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {

}

</script>

<style scoped>
@import "../assets/css/index.css";
@import 'primeicons/primeicons.css';


.border-right{ border-right: 1px solid #ccc;}
</style>