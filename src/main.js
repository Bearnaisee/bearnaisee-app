import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(store).use(VueSweetalert2).use(router).mount('#app');
