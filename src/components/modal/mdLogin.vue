<template>
    <form>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <Plumelogo style="margin-bottom: 20px;"></Plumelogo>
        </div>
        <div class="mx-4 -mb-2">
            <div class="flex justify-center mb-4">
                <FloatLabel>
                    <InputText id="username" v-model="nameVal" autocomplete="off"/>
                    <label for="username">Email or Username</label>
                </FloatLabel>
            </div>
            <div class="flex justify-center mb-3">
                <FloatLabel>
                    <Password v-model="value" toggleMask id="password"/>
                    <label for="password">Password</label>
                </FloatLabel>
            </div>
        </div>
        <div class="flex justify-content-end pb-3 router-link">
            <button @click="switchModal">회원가입</button>
            <button @click="switchModal">아이디찾기</button>
            <button @click="switchModal">비밀번호찾기</button>
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
    </form>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Plumelogo from "../btn/PlumeLogo.vue";
import Password from 'primevue/password';
import { ref, defineEmits } from 'vue';

const nameVal = ref(null);
const value = ref(null);

const emit = defineEmits(['switch-modal', 'close-modal']);
const closeModal = () => { emit('close-modal') }
const switchModal = () => {
    emit('switch-modal')
}
</script>

<style>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';
.router-link{margin-right: 25px;}
.router-link button{
    cursor: pointer;
    border: 0;
    background-color: transparent;
    padding: 0;
    margin-right:5px;
    color: #897f7f;
    font-family: "SUIT-Regular"
}
</style>