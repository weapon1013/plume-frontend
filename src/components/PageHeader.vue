<template>
    <header class="layout-topbar">
        <div class="layout-topbar-start">
            <router-link to="/">
                <Plumelogo style="margin-bottom: 20px;"></Plumelogo>
            </router-link>
            <div id="search-container" class="flex align-items-center">
                <InputText type="text" class="search-input" placeholder="검색어를 입력하세요." 
                            v-bind:class="{ open: isOpen }" @keyup.enter="toggleSearch()" 
                            v-model="searchInput"
                />
                <button class="search-btn" @click="toggleSearch">
                    <i class="pi pi-search" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="layout-topbar-mid">
            <ul class="list-none">
                <li :class="{ 'active': isActive('/feed') }">
                    <router-link to="/feed">
                        <span>Feed</span>
                    </router-link>
                    <div v-if="isActive('/feed')" class="red-dot"></div>
                </li>
                <li :class="{ 'active': isActive('/recm') }">
                    <router-link to="/recm">
                        <span>Recommend</span>
                    </router-link>
                    <div v-if="isActive('/recm')" class="red-dot"></div>
                </li>
                <li :class="{ 'active': isActive('/rank') }">
                    <router-link to="/rank">
                        <span>Rank</span>
                    </router-link>
                    <div v-if="isActive('/rank')" class="red-dot"></div>
                </li>
            </ul>
        </div>
        <div class="layout-topbar-end">
            <LoginStatic :status='loginStat'></LoginStatic>
        </div>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import LoginStatic from './btn/LoginStaticHeader.vue';
import Plumelogo from './btn/PlumeLogo.vue';
import InputText from 'primevue/inputtext';
import { useRoute } from 'vue-router';

const route = useRoute();
const loginCheck = ref(false);
const loginStat = ref(loginCheck.value);
const isOpen = ref(false);
const searchInput = ref('');

const isActive = (path) => route.path === path;

const toggleSearch = () => {
  if (isOpen.value) {
    fn_search();
  } else {
    isOpen.value = !isOpen.value;
  }
};

function fn_search() {
  alert(searchInput.value);
}

// 로그인 상태 동기화
watch(loginCheck, (newVal) => {
  loginStat.value = newVal;
});
</script>

<style scoped>
.list-none{ display: flex; align-items: center; }
.list-none li{ display: flex; padding: .5rem 1rem; align-items: center; overflow: hidden; position:relative; }
.list-none li a{ text-decoration-line: none; font-weight: 500; color: var(--primary-menu-color); }

#search-container { display: flex;align-items: center;margin-left: 2rem;height: 35px;}
.search-input {width: 0;height: 2rem; padding: 0; border: none; transition: width 0.5s ease, padding 0.5s ease; opacity: 0; visibility: hidden;}
.search-input.open { width: 12rem; padding-left: 1rem; opacity: 1; visibility: visible; background-color: #eef2fb;}
.search-btn {width: 2rem; height: 2rem; background-color: #eff2fb; border: 1px solid #CBD5E1; border-radius: 10px;
    cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.5s ease;}
.search-input.open ~ .search-btn {transform: translateX(0.5rem);}

.list-none li .red-dot { position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background-color: #db193d8a; border-radius: 50%; }
</style>