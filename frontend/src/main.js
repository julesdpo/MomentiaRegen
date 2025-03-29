import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // Ensure base URL is correct

const app = createApp(App);
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount('#app');
