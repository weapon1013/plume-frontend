<template>
    <!--로그인 헤더-->
    <div v-if="status" class="card flex justify-center">
        <Button label="Login" @click="visible = true" />
    </div>
    <!--비로그인 헤더-->
    <div v-else class="card flex justify-center">
        <Button label="Sign up" @click="btnIndex='join', visible = true" />
        <Button label="Login" @click="btnIndex='login', visible = true" />
        <Button label="SignDetail" @click="btnIndex='joinDetl', visible = true" />
        <Dialog v-model:visible="visible" modal header="">
            <div class="modal_container">
                <mdSignInfo v-if="btnIndex === 'join'" btnIndex="join" @emit-args="getNumbers"></mdSignInfo>
                <mdLogin v-if="btnIndex === 'login'" ></mdLogin>
                <mdSignDetail v-if="btnIndex === 'joinDetl'"></mdSignDetail>
                <div class="modal_right">
                    배경배경
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import mdSignInfo from "../modal/mdSignInfo.vue";
import mdLogin from "../modal/mdLogin.vue";
import mdSignDetail from "../modal/mdSignDetail.vue";

defineProps(['status']);
const visible = ref(false);

const getNumbers = function(data){
    console.log('자식에서 이벤트 발생' + data)
}
</script>

<style>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';
</style>