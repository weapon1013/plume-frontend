
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // router 객체 가져오기
import store from './store'

// 프라임뷰
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';

const app = createApp(App).use(store).use(router);
app.use(router);    // vue router를 app에 등록

// primevue app에 등록
app.use(PrimeVue, {         
    // Default theme configuration
    theme: {
        preset: Aura,
    }
});  

app.mount('#app');
