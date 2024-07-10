
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // router 객체 가져오기
import store from './store'

// 프라임뷰
import PrimeVue from 'primevue/config';
import "primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
import "primeicons/primeicons.css";


const app = createApp(App).use(store);

// vue router를 app에 등록
app.use(router);    

// primevue app에 등록
app.use(PrimeVue, { unstyled: true });

app.mount('#app');
