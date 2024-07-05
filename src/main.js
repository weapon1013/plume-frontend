
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // router 객체 가져오기
import 'bootstrap';             // bootstrap 객체 가져오기
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  //bootsstrap 아이콘

const app = createApp(App); 
app.use(router);    // vue router를 app에 등록
app.mount('#app');
