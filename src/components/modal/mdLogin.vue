<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <img src="../../assets/img/plume_logo_temp.svg">
        </div>
        <div class="mx-4">
            <div class="flex justify-center mb-4">
                <FloatLabel>
                    <InputText id="username" v-model="nameVal" autocomplete="off"/>
                    <label for="username">Email or Username</label>
                </FloatLabel>
            </div>
            <div class="flex justify-center mb-3">
                <FloatLabel>
                    <InputText id="password" v-model="passVal" autocomplete="off"/>
                    <label for="email">Password</label>
                </FloatLabel>
            </div>
        </div>
        <div class="flex justify-content-end pb-3">
            <router-link to="/feed" class="mr-2 text-xs text-800">
                <span>회원가입</span>
            </router-link>
            <router-link to="/feed" class="mr-2 text-xs text-800">
                <span>아이디찾기</span>
            </router-link>
            <router-link to="/feed" class="mr-2 text-xs text-800">
                <span>비밀번호찾기</span>
            </router-link>
        </div>
        <div class="flex flex-column justify-end gap-2 mx-4 mt-4">
            <Button type="button" label="로그인" @click="closeModal" severity="secondary" raised></Button>
            <div class="flex flex-row">
                <div class="flat-line"></div>
                <div>OR</div>
                <div class="flat-line"></div>
            </div>
            <Button type="button" label="카카오로그인" @click="closeModal" severity="help" raised></Button>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { ref, defineEmits } from 'vue';

const nameVal = ref(null);
const passVal = ref(null);

const emit = defineEmits(['close-modal']);
const closeModal = () => {
    emit('close-modal')
}

</script>


<style>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';
</style>


