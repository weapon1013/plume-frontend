<!-- ButtonTab.vue -->
<template>
    <!-- <div v-if="visible" class="tab penel"> -->
        <Dialog modal header="회원가입창">
        <!-- <Dialog v-model:visible="visible.value" modal header="회원가입창"> -->
            <div class="modal_container">
                ㅎㅇㅎㅇ
            </div>
        </Dialog>
        <!-- {{ visible }} -->
        <!-- 탭 헤더 -->
        <slot name="header"></slot>
        <!-- 탭 본문 -->
        <slot name="content"></slot>
        {{ visible }}
    <!-- </div> -->
    <!-- {{ visibleModal }} -->
</template>

<script setup>
import Dialog from 'primevue/dialog';
import { defineProps } from 'vue';
defineProps(['visible']);
</script>


<style>
</style>


