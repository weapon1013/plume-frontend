<template>
    <div class="card flex justify-center">
        <Button label="Sign up" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="회원가입창">
            <div class="modal_container">
                <div class="modal_left">
                    <div class="flex justify-content-center my-5">
                        <img src="../assets/img/plume_logo_temp.svg">
                    </div>
                    <div class="mx-4 flex flex-column align-items-center">
                        <h2>회원가입</h2>
                        <p>Plume이 제공하는</p>
                        <p>다양한 기능을 경험해보세요.</p>
                    </div>
                    <div class="flex justify-content-end pb-3">
                        
                    </div>
                    <div class="flex flex-column justify-end gap-2 mx-4 mt-4">
                        <Button type="button" label="카카오로그인" @click="visible = false" severity="help" raised></Button>
                        <div class="flex flex-row">
                            <div class="flat-line"></div>
                            <div>OR</div>
                            <div class="flat-line"></div>
                        </div>
                        <Button type="button" label="회원가입" @click="visible = false" severity="secondary" raised></Button>
                    </div>
                </div>
                <div class="modal_right">
                    배경배경
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { ref } from 'vue';

const visible = ref(false);
</script>

<style scoped>
@import "../assets/css/modal.css";
p{margin: 0;}
</style>