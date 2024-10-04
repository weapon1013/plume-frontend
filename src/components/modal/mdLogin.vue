<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <Plumelogo class="mb-3"></Plumelogo>
        </div>
        <div class="mx-4 -mb-2">
            <div class="flex justify-center mb-4">
                <FloatLabel>
                    <InputText id="p_userId" v-model="userId" autocomplete="off"/>
                    <label for="p_userId">아이디</label>
                </FloatLabel>
            </div>
            <div class="flex justify-center mb-3">
                <FloatLabel>
                    <Password id="p_userPw" v-model="userPw" toggleMask :feedback="false"/>
                    <label for="p_userPw">비밀번호</label>
                </FloatLabel>
            </div>
        </div>
        <div class="flex justify-content-end pb-3 router-link">
            <button @click="switchModal">회원가입</button>
            <button @click="switchModal">아이디찾기</button>
            <button @click="switchModal">비밀번호찾기</button>
        </div>
        <div class="flex flex-column justify-end gap-2 mx-4 mt-4">
            <Button type="button" label="로그인" @click="submit" severity="secondary" raised></Button>
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
import Password from 'primevue/password';
import { ref, defineEmits } from 'vue';
import Plumelogo from "@/components/btn/PlumeLogo.vue";
import {axiosPost} from '@/plugins/axios';
import { sToast, eToast  } from '@/assets/js/toast';

// default setting
const userId     = ref(null);       // 아이디
const userPw    = ref(null);       // 비밀번호

const emit = defineEmits(['switch-modal', 'close-modal', 'login-success']);
const closeModal = () => { emit('close-modal') };
const switchModal = () => { emit('switch-modal') };

// 로그인처리
const submit = () => {
    const data = {
        userId: userId.value,
        userPw: userPw.value
    };

axiosPost("auth/login", data)
    .then((response) => {
        if(response.status === 200){
            sToast('로그인 성공💫', 'Login Success')
            localStorage.setItem('savedUserId', userId.value);
            emit('login-success');
        }
    })
    .catch((e) => {
        eToast('로그인 실패💦', 'Login Error');
        console.log(`${e.name}(${e.code}): ${e.message})`);
    });
};
</script>

<style>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';
.router-link{margin-right: 25px;}
.router-link button{cursor: pointer; border: 0; background-color: transparent; padding: 0; margin-right:5px; color: #897f7f;font-family: "SUIT-Regular"}
.p-inputtext{ width:19rem; }
</style>