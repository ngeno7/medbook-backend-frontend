require('./bootstrap');

import { createApp } from 'vue'
import { router } from './router'
import { instance } from './http'
window.axios = instance
import App from './App.vue'
import store from './store';

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")
