<template>
    <Sidebar></Sidebar>
    <div class="layout-content-wrapper">
      <div class="col-md-9">
        <div class="h-7rem bg-yellow-400"></div>
        <FeedList></FeedList>
      </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/PageLeft.vue'
import FeedList from '../components/List/FeedList.vue'
</script>

<style scoped>
</style>