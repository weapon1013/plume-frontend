<template>
    <header class="layout-topbar">
        <div class="layout-topbar-start">
            <router-link to="/">
                <Plumelogo class="mb-3"></Plumelogo>
            </router-link>
            <div id="search-container" class="flex align-items-center">
                <InputText  type="text" 
                            v-model="searchInput"
                            v-bind:class="{ open: isOpen }" 
                            @keyup.enter="toggleSearch()" 
                            placeholder="검색어를 입력하세요." 
                            class="search-input" />
                <button @click="toggleSearch" class="search-btn">
                    <i aria-hidden="true" class="pi pi-search"></i>
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
            <LoginStaticHeader></LoginStaticHeader>
        </div>
    </header>
</template>

<script setup>
import LoginStaticHeader from './btn/LoginStaticHeader.vue';
import Plumelogo from './btn/PlumeLogo.vue';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// default setting
const route = useRoute();
const isOpen = ref(false);
const searchInput = ref('');

// 상단 메뉴바 활성화
const isActive = (path) => route.path === path;

// 검색창 열리고 닫히는 상태 제어
const toggleSearch = () => { isOpen.value ? fn_search() : isOpen.value = !isOpen.value; }

// 검색 axios
// TODO : 추후 검색 axios 추가해야함
function fn_search() {
  alert(searchInput.value);
}
</script>

<style scoped>
.list-none{ display: flex; align-items: center; }
.list-none li{ display: flex; padding: .5rem 1rem; align-items: center; overflow: hidden; position:relative; }
.list-none li a{ text-decoration-line: none; font-weight: 500; color: var(--primary-menu-color); }

#search-container { display: flex;align-items: center;margin-left: 2rem;height: 35px;}
.search-input {width: 0;height: 2rem; padding: 0; border: none; transition: width 0.5s ease, padding 0.5s ease; opacity: 0; visibility: hidden;}
.search-input.open { width: 12rem; padding-left: 1rem; opacity: 1; visibility: visible; background-color: #eef2fb;}
.search-btn {width: 2rem; height: 2rem; background-color: #eff2fb; border: 1px solid #CBD5E1; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.5s ease;}
.search-input.open ~ .search-btn {transform: translateX(0.5rem);}
.list-none li .red-dot { position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background-color: #db193d8a; border-radius: 50%; }
</style>