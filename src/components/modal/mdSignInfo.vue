<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <Plumelogo style="margin-bottom: 20px;"></Plumelogo>
        </div>
        <div class="mx-4 flex flex-column align-items-center">
            <h2>회원가입</h2>
            <p>Plume이 제공하는</p>
            <p>다양한 기능을 경험해보세요.</p>
        </div>
        <div class="flex justify-content-end pb-3">
        <!-- Add content here if needed -->
        </div>
        <div class="flex flex-column justify-end gap-2 mx-4 mt-4">
            <Button type="button" label="카카오로그인" @click="closeModal" severity="help" raised></Button>
            <div class="flex flex-row">
                <div class="flat-line"></div>
                <div>OR</div>
                <div class="flat-line"></div>
            </div>
            <Button type="button" label="회원가입" @click="switchModal" severity="secondary" raised ></Button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import Button from 'primevue/button';
import Plumelogo from "../btn/PlumeLogo.vue";

const emit = defineEmits(['switch-modal', 'close-modal']);

const closeModal = () => {
    emit('close-modal')
}

const switchModal = () => {
    emit('switch-modal')
}

</script>

<style scoped>
@import "../../assets/css/modal.css";
p{margin: 0;}
</style>