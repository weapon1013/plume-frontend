<template>
    <header class="layout-topbar">
        <div class="layout-topbar-start">
            <router-link to="/">
                <Plumelogo style="margin-bottom: 20px;"></Plumelogo>
            </router-link>
            <div class="search-box flex align-items-center">
                <InputText placeholder="검색창"/>
                <button>
                    <i class="pi pi-search" aria-hidden="true"></i>
                </button>
                
            </div>
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
            <LoginStatic :status='loginStat'></LoginStatic>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import LoginStatic from "./btn/LoginStaticHeader.vue";
import Plumelogo from "./btn/PlumeLogo.vue";
import InputText from 'primevue/inputtext';

// loginStat: true(로그인) / false(비로그인)
const loginCheck = ref(false);
const loginStat = ref(loginCheck);

</script>

<style scoped>
.list-none{ display: flex; align-items: center; }
.list-none li{ display: flex; padding: .5rem 1rem; align-items: center; overflow: hidden; position:relative; }
.list-none li a{ text-decoration-line: none; font-weight: 500; color: var(--primary-menu-color); }

.search-box{ margin-left: 2rem; border-left: 2px solid #747d7d; height: 35px; padding: 0 0 0 2rem;}
.search-box input{ width:12rem; height:2rem; transition: all 0.8s ease; }
.search-box input:focus{ border: 1px solid #CBD5E1; }
.search-box button{ width: 2rem; height: 2rem; left: -20px; position: relative;
    background-color: #eff2fb; border: 1px solid #CBD5E1; border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}




</style>