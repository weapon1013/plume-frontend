<template>
    <Sidebar></Sidebar>
    <div class="recommend">
      <h1>This is an RECOMMEND page</h1>
    </div>
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