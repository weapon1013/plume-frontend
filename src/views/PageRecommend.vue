<template>
    <Sidebar></Sidebar>
    <div class="layout-content-wrapper">
      <div class="col-md-9">
        <h5>This is an Recommend page</h5>
      </div>
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