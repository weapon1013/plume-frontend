<template>
    <PageHeader/>   <!-- 헤더 컴포넌트 -->
    <router-view/>  <!-- 페이지 이동이 표시될 곳 -->
    <PageFooter/>   <!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'

export default {
name: 'App',
components: {
    PageHeader,
    PageFooter
}
}
</script>

<style>

</style>
