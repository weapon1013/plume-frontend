<template>
    <!--로그인 헤더-->
    <div v-if="status" class="card flex justify-center">
        <Button label="Login" @click="visible = true" />
    </div>

    <!--비로그인 헤더-->
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
                    @close-modal = "closeModal"
                ></mdSignInfo>
                <mdLogin 
                    v-if="btnIndex === 'login'" 
                    @switch-modal="openModal('joinDetl')"
                    @close-modal = "closeModal"
                ></mdLogin>
                <mdSignDetail v-if="btnIndex === 'joinDetl'"></mdSignDetail>
                <div class="modal_right">
                    배경배경
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref} from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import mdSignInfo from "../modal/mdSignInfo.vue";
import mdLogin from "../modal/mdLogin.vue";
import mdSignDetail from "../modal/mdSignDetail.vue";

defineProps(['status']);

const btnIndex = ref('');
const visible = ref(false);

const openModal = (index) => {
    btnIndex.value = index;
    visible.value = true;
}

const closeModal = () => {
    visible.value = false;
}

</script>

<style>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';
</style>