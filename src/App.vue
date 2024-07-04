<template>
  <PageHeader></PageHeader>
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
  font-family: 'SUIT-Regular', 'GongGothicMedium','KOHIBaeumOTF';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
    font-family: 'SUIT-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'GongGothicMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KOHIBaeumOTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/KOHIBaeumOTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>
