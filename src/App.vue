<template>
  <PageHeader></PageHeader>
  <PageLeft ></PageLeft>
  <router-view></router-view>
  <PageFooter></PageFooter>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'

export default {
  name: 'App',
  components: {
    PageHeader,   //헤더 페이지 컴포넌트 선언
    PageFooter    //푸터 페이지 컴포넌트 선언
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
