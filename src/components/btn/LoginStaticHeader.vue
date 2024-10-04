<template>
    <!--로그인시 헤더-->
    <div v-if="storageId" class="card flex justify-center">
        <Button label="Log out" @click="logout"></Button>
    </div>

    <!--비로그인시 헤더-->
    <div v-else class="card flex justify-center">
        
        <!--서로 다른 모달창을 띄우는 버튼-->
        <Button label="Sign up" @click="openModal('join')" />
        <Button label="Login" @click="openModal('login')" />
        
        <!--모달창-->
        <Dialog v-model:visible="visible" modal header="">
            <div class="modal_container">
                <mdSignInfo 
                    v-if="btnIndex === 'join'" 
                    @switch-modal="openModal('joinDetl')"
                    @close-modal = "closeModal"></mdSignInfo>
                <mdLogin 
                    v-if="btnIndex === 'login'" 
                    @switch-modal="openModal('joinDetl')"
                    @close-modal = "closeModal"
                    @login-success="getStorageId(storageId)"></mdLogin>
                <mdSignDetail 
                    v-if="btnIndex === 'joinDetl'" 
                    @submit-success="openModal('login')"></mdSignDetail>
                <div class="modal_right">
                    배경배경
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import mdSignInfo from "@/components/modal/mdSignInfo.vue";
import mdLogin from "@/components/modal/mdLogin.vue";
import mdSignDetail from "@/components/modal/mdSignDetail.vue";
import { onMounted, ref } from 'vue';
import { wToast} from '@/assets/js/toast.js'

// default setting
const btnIndex = ref('');
const visible = ref(false);
const storageId = ref('');

// 모달창 열기
const openModal = (index) => (btnIndex.value = index, visible.value = true)

// 모달창 닫기
const closeModal = () => (visible.value = false)

// localStorage의 아이디값 가져오기
const getStorageId = () => {
    storageId.value = localStorage.getItem('savedUserId');
}

// 로그아웃 처리
const logout = () => {
    wToast('로그아웃됩니다', '😭로그아웃😭')
    localStorage.removeItem('savedUserId');
    getStorageId();
}

// 새로고침시, 로그인 체크하기
onMounted(() => {
    getStorageId();
});

</script>
<style scoped>
@import "@/assets/css/modal.css";
@import 'primeicons/primeicons.css';
</style>