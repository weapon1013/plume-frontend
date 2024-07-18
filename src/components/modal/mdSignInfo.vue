<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <img src="../../assets/img/plume_logo_temp.svg">
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
            <Button type="button" label="회원가입" @click="emitArgs" severity="secondary" raised ></Button>
        </div>
        {{ props }}
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { ref, defineProps, defineEmits } from 'vue';
const visible = ref(false);

const props = defineProps({
    btnIndex : String
})

const emit = defineEmits(['emitArgs'])
const emitArgs = function(){
    emit('emitArgs', 'joinDetl')
}

</script>

<style scoped>
@import "../../assets/css/modal.css";
p{margin: 0;}
</style>