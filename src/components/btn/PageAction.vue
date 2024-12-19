<template>
    <div class="scroll_btn">
        <button v-if="storageId">등록!</button>
        <button>위로!</button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const storageId = ref('');

// localStorage의 아이디값 가져오기
const getStorageId = () => {
    storageId.value = localStorage.getItem('savedUserId');
}

// 새로고침시, 로그인 체크하기
onMounted(() => {
    getStorageId();
});
</script>
<style>
.scroll_btn{position:fixed; right:10px; cursor:pointer; z-index:99;}
</style>