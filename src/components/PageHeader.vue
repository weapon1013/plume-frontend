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

// @parameter :: loginCheck :: true(로그인) / false(비로그인)
// @parameter :: loginStat :: true(로그인) / false(비로그인)
// @parameter :: isOpen :: true(모달O) / false(모달X)
const loginCheck = ref(false);
const loginStat = ref(loginCheck);
const isOpen = ref(false);
const searchInput = ref('');

const toggleSearch = () => {
  if(isOpen.value == true){
    fn_search();
  } else {
    isOpen.value = !isOpen.value;
  }
}

function fn_search (){
    // TODO : 검색 get 방식 넣기
    alert(searchInput.value);
}
</script>

<style scoped>
.list-none{ display: flex; align-items: center; }
.list-none li{ display: flex; padding: .5rem 1rem; align-items: center; overflow: hidden; position:relative; }
.list-none li a{ text-decoration-line: none; font-weight: 500; color: var(--primary-menu-color); }

#search-container { display: flex;align-items: center;margin-left: 2rem;height: 35px;}
.search-input {width: 0;height: 2rem; padding: 0; border: none; transition: width 0.5s ease, padding 0.5s ease; opacity: 0; visibility: hidden;}
.search-input.open { width: 12rem; padding-left: 1rem; opacity: 1; visibility: visible;}
.search-btn {width: 2rem; height: 2rem; background-color: #eff2fb; border: 1px solid #CBD5E1; border-radius: 10px;
    cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.5s ease;}
.search-input.open ~ .search-btn {transform: translateX(0.5rem);}
</style>