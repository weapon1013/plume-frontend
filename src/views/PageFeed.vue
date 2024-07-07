<template>
    <main class="d-flex flex-nowrap">
      <Sidebar></Sidebar>
      <div class="feed">
        <h1>This is an Feed page</h1>
      </div>
    </main>
</template>

<script>
import Sidebar from '../components/PageLeft.vue'
export default {
  name: 'App',
  components: {
    Sidebar,     //사이드 페이지 컴포넌트 선언
  }
}
</script>

<style scoped>
main{height: -webkit-fill-available; max-height: 100vh;}
</style>