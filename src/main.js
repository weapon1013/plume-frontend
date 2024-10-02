
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // router 객체 가져오기
import store from './store'

// 프라임뷰
import PrimeVue from 'primevue/config';
import "primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
import "primeicons/primeicons.css";
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

const app = createApp(App).use(store);

// vue router를 app에 등록
app.use(router);    

// primevue app에 등록
// app.use(PrimeVue);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
      preset: Aura,
      options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
      }
  }
});
app.use(ToastService);

app.mount('#app');
